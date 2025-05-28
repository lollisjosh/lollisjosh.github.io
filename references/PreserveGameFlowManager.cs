using UnityEngine;

[AddComponentMenu("Bootstrap/Preserve GameFlowManager")]
public class PreserveGameFlowManager : MonoBehaviour
{
    void Awake()
    {
        DontDestroyOnLoad(gameObject);
    }
}
