/**
 * Dynamic Status Ticker
 * Handles the status ticker animation with dynamic timing based on text length
 */

document.addEventListener('DOMContentLoaded', function() {
    const statusElement = document.getElementById('status');
    const containerElement = document.querySelector('.status-text-container');
    
    if (!statusElement || !containerElement) return;
    
    // Remove any existing CSS animation
    statusElement.style.animation = 'none';
    
    function setupTicker() {
        // Get dimensions
        const containerWidth = containerElement.offsetWidth;
        const textWidth = statusElement.offsetWidth;
        
        // Reset position to prepare for JS animation
        statusElement.style.transform = 'translateX(' + containerWidth + 'px)';
        
        // Calculate duration based on text length - longer text needs more time
        // Base speed: ~100px per second
        const baseSpeed = 100; // pixels per second
        const totalDistance = containerWidth + textWidth + 50; // Add extra space at the end
        const duration = totalDistance / baseSpeed;
        
        // Set up the animation
        statusElement.animate([
            { transform: 'translateX(' + containerWidth + 'px)' },
            { transform: 'translateX(-' + (textWidth + 50) + 'px)' }
        ], {
            duration: duration * 1000, // Convert to milliseconds
            iterations: Infinity,
            easing: 'linear'
        });
    }
    
    // Initial setup
    setupTicker();
    
    // Recalculate on window resize
    window.addEventListener('resize', setupTicker);
});
