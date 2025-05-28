#if UNITY_EDITOR
using UnityEditor;
using UnityEditor.AddressableAssets;
using UnityEditor.AddressableAssets.Settings;
using System.IO;
using System.Linq;
using UnityEngine;

[CustomEditor(typeof(AddressableSceneDriver))]
public class AddressableSceneDriverEditor : Editor
{
    private SerializedProperty stateMachineProp;
    private SerializedProperty mappingsProp;

    private void OnEnable()
    {
        stateMachineProp = serializedObject.FindProperty("stateMachine");
        mappingsProp = serializedObject.FindProperty("mappings");
    }

    public override void OnInspectorGUI()
    {
        serializedObject.Update();

        // Draw core fields
        EditorGUILayout.PropertyField(stateMachineProp);
        EditorGUILayout.PropertyField(mappingsProp, true);
        EditorGUILayout.Space();

        // Show last Addressables build info
        var settings = AddressableAssetSettingsDefaultObject.Settings;
        if (settings != null)
        {
            var profileId = settings.activeProfileId;
            var buildPath = settings.profileSettings.EvaluateString(profileId, AddressableAssetSettings.kLocalBuildPath);
            var fullPath = Path.GetFullPath(Path.Combine(Application.dataPath, "..", buildPath));

            if (Directory.Exists(fullPath))
            {
                var jsons = Directory.GetFiles(fullPath, "*.json");
                if (jsons.Length > 0)
                {
                    var latest = jsons.OrderBy(f => File.GetLastWriteTime(f)).Last();
                    EditorGUILayout.HelpBox(
                        $"Addressables catalog found at:\n{fullPath}\nLast build: {File.GetLastWriteTime(latest)}", MessageType.Info);
                }
                else
                {
                    EditorGUILayout.HelpBox($"No Addressables catalog JSON in:{fullPath}", MessageType.Warning);
                }
                if (GUILayout.Button("Open Addressables Build Folder"))
                {
                    EditorUtility.RevealInFinder(fullPath);
                }
            }
            else
            {
                EditorGUILayout.HelpBox($"Addressables build folder missing:\n{fullPath}", MessageType.Warning);
            }
        }
        else
        {
            EditorGUILayout.HelpBox("AddressableAssetSettings not found.", MessageType.Error);
        }

        serializedObject.ApplyModifiedProperties();
    }
}
#endif
