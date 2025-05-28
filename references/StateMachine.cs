// StateMachine.cs
using System;
using System.Collections.Generic;
using UnityEngine;

[AddComponentMenu("State Machine/State Machine")]
public class StateMachine : MonoBehaviour
{
    [Tooltip("Initial state to start in.")]
    public State initialState;

    private State currentState;
    private readonly List<StateTransition> activeTransitions = new List<StateTransition>();
    private readonly Dictionary<StateTransition, Action> callbacks = new Dictionary<StateTransition, Action>();

    private void Start()
    {
        if (initialState != null)
            GoToState(initialState);
    }

    public void GoToState(State newState)
    {
        if (currentState != null)
        {
            currentState.OnExit?.Invoke();
            UnregisterCurrentTransitions();
        }

        currentState = newState;
        currentState.OnEnter?.Invoke();
        RegisterTransitions();
    }

    private void RegisterTransitions()
    {
        foreach (var t in currentState.transitions)
        {
            Action callback = () => OnTransitionTriggered(t);
            callbacks[t] = callback;
            t.triggerEvent.RegisterListener(callback);
            activeTransitions.Add(t);
        }
    }

    private void UnregisterCurrentTransitions()
    {
        foreach (var t in activeTransitions)
        {
            if (callbacks.TryGetValue(t, out var cb))
            {
                t.triggerEvent.UnregisterListener(cb);
            }
        }
        activeTransitions.Clear();
        callbacks.Clear();
    }

    private void OnTransitionTriggered(StateTransition t)
    {
        GoToState(t.nextState);
    }
}