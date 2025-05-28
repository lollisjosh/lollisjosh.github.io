using UnityEditor;
using UnityEngine;
using System.Reflection;
using System.Collections.Generic;

[CustomEditor(typeof(StateMachine))]
public class StateMachineEditor : Editor
{
    private FieldInfo currentStateField;

    private void OnEnable()
    {
        // Grab the private 'currentState' field
        currentStateField = typeof(StateMachine).GetField("currentState", BindingFlags.NonPublic | BindingFlags.Instance);
    }

    public override void OnInspectorGUI()
    {
        // Draw default fields (initialState, etc.)
        DrawDefaultInspector();
        EditorGUILayout.Space();

        // Show the active state
        if (Application.isPlaying)
        {
            var sm = (StateMachine)target;
            var state = currentStateField?.GetValue(sm) as State;
            EditorGUILayout.LabelField("Current State:", state != null ? state.name : "None", EditorStyles.boldLabel);

            // If we have a current state, list its transitions as buttons
            if (state != null)
            {
                EditorGUILayout.Space();
                EditorGUILayout.LabelField("Available Triggers:", EditorStyles.boldLabel);

                foreach (var transition in state.transitions)
                {
                    var ev = transition.triggerEvent;
                    // reflect listener count
                    int count = 0;
                    var listenersField = typeof(GameEvent).GetField("listeners", BindingFlags.NonPublic | BindingFlags.Instance);
                    if (listenersField != null)
                    {
                        var list = listenersField.GetValue(ev) as IList<System.Action>;
                        count = list?.Count ?? 0;
                    }
                    // disable if no listeners
                    EditorGUI.BeginDisabledGroup(count == 0);
                    if (GUILayout.Button($"{ev.name} ({count})"))
                    {
                        ev.Raise();
                    }
                    EditorGUI.EndDisabledGroup();
                }
            }
        }
        else
        {
            EditorGUILayout.HelpBox("Play the scene to inspect and fire triggers on the current state.", MessageType.Info);
        }
    }
}
