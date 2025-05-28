// MainMenuController.cs
// Place this in your MainMenuScene to hook UI buttons to your state machine events.

using UnityEngine;
using UnityEngine.UI;

// Requires your GameEvent scriptable objects
// using your existing namespace for GameEvent

public class MainMenuController : MonoBehaviour
{
    [Header("State Machine Events")]
    [Tooltip("Raised when Start Game is clicked")]
    [SerializeField] private GameEvent startMatchEvent;
    [Tooltip("Raised when Quit is clicked")]
    [SerializeField] private GameEvent quitGameEvent;

    [Header("UI References")]
    [Tooltip("Button to begin the match flow")]
    [SerializeField] private Button startButton;
    [Tooltip("Button to exit the game")]
    [SerializeField] private Button quitButton;

    private void Awake()
    {
        // Wire up UI buttons to raise events
        if (startButton != null)
            startButton.onClick.AddListener(OnStartClicked);
        if (quitButton != null)
            quitButton.onClick.AddListener(OnQuitClicked);
    }

    private void OnDestroy()
    {
        // Clean up listeners
        if (startButton != null)
            startButton.onClick.RemoveListener(OnStartClicked);
        if (quitButton != null)
            quitButton.onClick.RemoveListener(OnQuitClicked);
    }

    private void OnStartClicked()
    {
        if (startMatchEvent != null)
            startMatchEvent.Raise();
    }

    private void OnQuitClicked()
    {
        if (quitGameEvent != null)
            quitGameEvent.Raise();
    }
}
