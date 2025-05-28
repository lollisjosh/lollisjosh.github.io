// State.cs
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

[CreateAssetMenu(menuName = "State Machine/State")]
public class State : ScriptableObject
{
    [Tooltip("Transitions from this state: on triggerEvent, go to nextState.")]
    public List<StateTransition> transitions = new List<StateTransition>();

    [Header("State Callbacks")]
    public UnityEvent OnEnter;
    public UnityEvent OnExit;
}