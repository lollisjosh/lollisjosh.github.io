/**
 * Dynamic Status Ticker with Seamless Looping
 * Creates an infinitely scrolling ticker with no gaps
 * Handles mobile-to-desktop transitions gracefully
 */

document.addEventListener('DOMContentLoaded', function() {
    // Store animation reference globally
    let tickerAnimation = null;
    let isSetup = false;
    
    // Set a consistent spacing value
    const SPACING_GAP = 150; // Increased for better visibility
    
    // Function to set up the ticker
    function setupTicker(forceReinit = false) {
        const statusElement = document.getElementById('status');
        const containerElement = document.querySelector('.status-text-container');
        
        if (!statusElement || !containerElement) return;
        
        // Check if we're on mobile via CSS - if status container is hidden, abort
        if (window.getComputedStyle(statusElement.parentElement).display === 'none') {
            isSetup = false;
            return; // Don't set up ticker on mobile
        }
        
        // Clear any existing animation
        if (tickerAnimation) {
            tickerAnimation.cancel();
            tickerAnimation = null;
        }
        
        // Reset the content and style
        const originalText = statusElement.getAttribute('data-original-text') || statusElement.textContent;
        
        // Store original text if not already stored
        if (!statusElement.getAttribute('data-original-text')) {
            statusElement.setAttribute('data-original-text', originalText);
        }
        
        // Complete reset of element
        statusElement.innerHTML = '';
        statusElement.style.transform = '';
        
        // Create the main text span
        const textSpan = document.createElement('span');
        textSpan.textContent = originalText;
        textSpan.className = 'ticker-text';
        statusElement.appendChild(textSpan);
        
        // Wait for DOM updates
        setTimeout(() => {
            // Get dimensions
            const containerWidth = containerElement.offsetWidth;
            const textWidth = textSpan.offsetWidth;
            
            // Create the clone with proper spacing
            const clone = textSpan.cloneNode(true);
            statusElement.appendChild(clone);
            
            // Use a consistent speed regardless of text length
            const baseSpeed = 40; // pixels per second - lower is slower
            const duration = (textWidth + SPACING_GAP) / baseSpeed;
            
            // Set up the animation with fixed spacing
            tickerAnimation = statusElement.animate([
                { transform: 'translateX(0)' },
                { transform: `translateX(-${textWidth + SPACING_GAP}px)` }
            ], {
                duration: duration * 1000, // Convert to milliseconds
                iterations: Infinity,
                easing: 'linear'
            });
            
            isSetup = true;
        }, 50);
    }
    
    // Initial setup
    setupTicker();
    
    // Create a MutationObserver to watch for display changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'style' || mutation.attributeName === 'class') {
                // Check if visibility changed
                const statusContainer = document.getElementById('status-container');
                const isVisible = statusContainer && 
                                  window.getComputedStyle(statusContainer).display !== 'none';
                
                if ((isVisible && !isSetup) || (!isVisible && isSetup)) {
                    setupTicker(true); // Force reinitialize
                }
            }
        });
    });
    
    // Start observing the status container
    const statusContainer = document.getElementById('status-container');
    if (statusContainer) {
        observer.observe(statusContainer, { attributes: true });
    }
    
    // Handle window resize events with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Always reinitialize on resize when in desktop view
            setupTicker(true);
        }, 250);
    });
    
    // Additionally, listen for visibility changes when user returns to the tab
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            setupTicker(true);
        }
    });
});
