// GameEventEditor.cs
using System;
using static UnityEngine.GraphicsBuffer;
using System.Collections.Generic;
using System.Reflection;
using UnityEditor;
using UnityEngine;



[CustomEditor(typeof(GameEvent))]
public class GameEventEditor : Editor
{
    public override void OnInspectorGUI()
    {
        DrawDefaultInspector();
        GUILayout.Space(6);

        var gameEvent = (GameEvent)target;
        if (GUILayout.Button("Raise Event"))
        {
            gameEvent.Raise();
        }

        // Reflect private listeners list to show count
        var field = typeof(GameEvent).GetField("listeners", BindingFlags.NonPublic | BindingFlags.Instance);
        if (field != null)
        {
            var list = field.GetValue(gameEvent) as IList<Action>;
            EditorGUILayout.LabelField("Listener Count:", list != null ? list.Count.ToString() : "0");
        }
    }
}
