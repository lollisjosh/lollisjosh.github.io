// StateTransition.cs
using UnityEngine;

[System.Serializable]
public class StateTransition
{
    public GameEvent triggerEvent;
    public State nextState;
}