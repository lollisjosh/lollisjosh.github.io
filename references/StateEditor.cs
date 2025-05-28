using UnityEditor;
using UnityEditorInternal;
using UnityEngine;

[CustomEditor(typeof(State))]
public class StateEditor : Editor
{
    private ReorderableList transitionsList;

    private void OnEnable()
    {
        transitionsList = new ReorderableList(serializedObject,
            serializedObject.FindProperty("transitions"),
            true, true, true, true);

        transitionsList.drawHeaderCallback = rect =>
            EditorGUI.LabelField(rect, "State Transitions (Event -> Next State)");

        transitionsList.drawElementCallback = (rect, index, isActive, isFocused) => {
            var element = transitionsList.serializedProperty.GetArrayElementAtIndex(index);
            var eventProp = element.FindPropertyRelative("triggerEvent");
            var stateProp = element.FindPropertyRelative("nextState");
            float half = rect.width / 2;
            const float pad = 4f;

            EditorGUI.PropertyField(
                new Rect(rect.x, rect.y + 2, half - pad, EditorGUIUtility.singleLineHeight),
                eventProp, GUIContent.none);
            EditorGUI.PropertyField(
                new Rect(rect.x + half + pad, rect.y + 2, half - pad, EditorGUIUtility.singleLineHeight),
                stateProp, GUIContent.none);
        };
    }

    public override void OnInspectorGUI()
    {
        serializedObject.Update();

        EditorGUILayout.PropertyField(serializedObject.FindProperty("OnEnter"));
        EditorGUILayout.PropertyField(serializedObject.FindProperty("OnExit"));
        GUILayout.Space(8);
        transitionsList.DoLayoutList();

        serializedObject.ApplyModifiedProperties();
    }
}