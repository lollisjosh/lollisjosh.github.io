// AddressableSceneDriver.cs
// Centralized state-to-scene Addressables driver with in-editor build status

using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.AddressableAssets;
using UnityEngine.ResourceManagement.AsyncOperations;
using UnityEngine.ResourceManagement.ResourceProviders;
using UnityEngine.SceneManagement;

[System.Serializable]
public struct AddressableSceneMapping
{
    public State state;           // ScriptableObject state
    public AssetReference sceneReference;  // Addressable scene asset
    public bool additive;       // Load additively if true
}

[AddComponentMenu("State Machine/Addressable Scene Driver")]
public class AddressableSceneDriver : MonoBehaviour
{
    [Tooltip("Your SO-based StateMachine component")]
    public StateMachine stateMachine;

    [Tooltip("Map each State to an Addressable scene reference and load mode")]
    public List<AddressableSceneMapping> mappings = new List<AddressableSceneMapping>();

    // Track only additive scenes so we only unload those explicitly
    private Dictionary<State, AsyncOperationHandle<SceneInstance>> handles = new Dictionary<State, AsyncOperationHandle<SceneInstance>>();

    private void OnEnable()
    {
        foreach (var m in mappings)
        {
            var mapping = m; // capture for closure
            UnityAction onEnter = () => {
                if (!mapping.additive)
                {
                    // Unload all previously loaded additive scenes
                    foreach (var kv in handles)
                    {
                        Addressables.UnloadSceneAsync(kv.Value, true);
                    }
                    handles.Clear();
                    // Load this scene in single mode (auto-unloads non-persistent scenes)
                    mapping.sceneReference.LoadSceneAsync(LoadSceneMode.Single);
                }
                else
                {
                    // Additive load: stack on top of existing
                    var handle = mapping.sceneReference.LoadSceneAsync(LoadSceneMode.Additive);
                    handles[mapping.state] = handle;
                }
            };
            UnityAction onExit = () => {
                if (mapping.additive && handles.TryGetValue(mapping.state, out var h))
                {
                    Addressables.UnloadSceneAsync(h, true);
                    handles.Remove(mapping.state);
                }
            };
            mapping.state.OnEnter.AddListener(onEnter);
            mapping.state.OnExit.AddListener(onExit);
        }
    }

    private void OnDisable()
    {
        // Unregister all
        foreach (var m in mappings)
        {
            m.state.OnEnter.RemoveAllListeners();
            m.state.OnExit.RemoveAllListeners();
        }
        // Ensure any additive scenes are unloaded
        foreach (var kv in handles)
        {
            Addressables.UnloadSceneAsync(kv.Value, true);
        }
        handles.Clear();
    }
}