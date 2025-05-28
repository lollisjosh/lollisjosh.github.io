// BootstrapLoader.cs
using UnityEngine;
using UnityEngine.SceneManagement;

[DefaultExecutionOrder(-100)]
public class BootstrapLoader : MonoBehaviour
{
    void Awake()
    {
        // If no GameFlowManager exists, load the BootstrapScene
        if (FindObjectOfType<StateMachineSceneDriver>() == null &&
            !SceneManager.GetActiveScene().name.Equals("BootstrapScene"))
        {
            SceneManager.LoadScene("BootstrapScene", LoadSceneMode.Single);
        }
    }
}
