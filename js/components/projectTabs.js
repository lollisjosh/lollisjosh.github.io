/*
  Project Tabs Component
  Author: Josh Lollis
  Date: January 12, 2026

  Purpose:
  - Dynamically sizes sliding project tabs to fit viewport
  - Scales proportionally: height, preview width, slide distance
  - Handles bounce animation via dynamic CSS injection
  - Responds to window resize/zoom
*/
(function (global) {
    // Configuration constants
    const CONFIG = {
        maxTabs: 5,
        minTabHeight: 80,
        maxTabHeight: 120,
        previewRatio: 1.25,      // preview width = height * ratio (150/120)
        contentWidth: 350,       // fixed content area width
        gapRatio: 0.167,         // gap = height * ratio (20/120)
        minGap: 10,
        maxGap: 20,
        bounceAmount: 10,        // pixels to bounce inward
        topBuffer: 40,           // buffer from top of viewport (below header)
        bottomBuffer: 120,       // buffer from bottom (room for footer when scrolled)
        bounceDuration: 3,       // seconds for full bounce cycle
        oddDelay: 0.5,           // seconds delay for odd tabs
        evenDelay: 1.5           // seconds delay for even tabs
    };

    let container = null;
    let tabs = [];
    let styleElement = null;
    let resizeTimeout = null;
    let isInitialized = false;

    /**
     * Initialize the project tabs component
     */
    function init() {
        container = document.querySelector('.sliding-projects');
        if (!container) return;

        tabs = Array.from(container.querySelectorAll('.project-tab'));
        if (tabs.length === 0) return;

        // Create style element for dynamic keyframes
        styleElement = document.createElement('style');
        styleElement.id = 'project-tabs-dynamic-styles';
        document.head.appendChild(styleElement);

        calculateLayout();
        setupEventListeners();
        isInitialized = true;

        console.log('projectTabsComponent initialized');
    }

    /**
     * Calculate and apply layout dimensions based on viewport
     */
    function calculateLayout() {
        if (!container || tabs.length === 0) return;

        // Check if container is visible
        if (getComputedStyle(container).display === 'none') return;

        // Get header height from CSS custom property (set by header.js)
        const headerHeight = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--header-height')
        ) || 0;

        // Calculate available vertical space
        const viewportHeight = window.innerHeight;
        const availableHeight = viewportHeight - headerHeight - CONFIG.topBuffer - CONFIG.bottomBuffer;

        // Calculate tab count (capped at maxTabs)
        const tabCount = Math.min(tabs.length, CONFIG.maxTabs);

        // Calculate gap first (scales with eventual tab height)
        // Start with max values and scale down if needed
        let tabHeight = CONFIG.maxTabHeight;
        let gap = CONFIG.maxGap;

        // Total height needed = (tabCount * tabHeight) + ((tabCount - 1) * gap)
        // Solve for tabHeight given availableHeight
        const totalGapsCount = tabCount - 1;
        
        // First pass: calculate with max gap
        let neededHeight = (tabCount * CONFIG.maxTabHeight) + (totalGapsCount * CONFIG.maxGap);
        
        if (neededHeight > availableHeight) {
            // Need to shrink - calculate optimal tab height
            const divisor = tabCount + (totalGapsCount * CONFIG.gapRatio);
            tabHeight = availableHeight / divisor;
            
            // Clamp tab height
            tabHeight = Math.max(CONFIG.minTabHeight, Math.min(CONFIG.maxTabHeight, tabHeight));
            
            // Recalculate gap based on clamped height
            gap = tabHeight * CONFIG.gapRatio;
            gap = Math.max(CONFIG.minGap, Math.min(CONFIG.maxGap, gap));
        }

        // Calculate proportional dimensions
        const previewWidth = Math.round(tabHeight * CONFIG.previewRatio);
        const tabWidth = previewWidth + CONFIG.contentWidth;
        const slideDistance = tabWidth - previewWidth; // hides content, shows preview
        const bounceOffset = slideDistance - CONFIG.bounceAmount;

        // Calculate vertical offset to center tabs below header
        const verticalCenter = headerHeight + CONFIG.topBuffer + (availableHeight / 2);

        // Apply CSS custom properties to container
        container.style.setProperty('--tab-height', `${Math.round(tabHeight)}px`);
        container.style.setProperty('--tab-gap', `${Math.round(gap)}px`);
        container.style.setProperty('--tab-preview-width', `${previewWidth}px`);
        container.style.setProperty('--tab-slide-distance', `${Math.round(slideDistance)}px`);
        container.style.top = `${Math.round(verticalCenter)}px`;

        // Inject dynamic keyframes and animation styles
        injectDynamicStyles(slideDistance, bounceOffset);

        // Apply animation classes to tabs
        tabs.forEach((tab, index) => {
            if (index >= CONFIG.maxTabs) {
                tab.style.display = 'none';
                return;
            }
            
            tab.style.display = '';
            // Remove any inline transform that might be stuck
            tab.style.transform = '';
            
            // Apply animation class based on odd/even
            tab.classList.remove('tab-animate-odd', 'tab-animate-even', 'tab-hovered');
            if (index % 2 === 0) {
                tab.classList.add('tab-animate-odd');
            } else {
                tab.classList.add('tab-animate-even');
            }
        });
    }

    /**
     * Inject dynamic CSS with calculated keyframe values
     */
    function injectDynamicStyles(slideDistance, bounceOffset) {
        if (!styleElement) return;

        styleElement.textContent = `
            @keyframes projectTabBounce {
                0%, 100% { transform: translateX(${slideDistance}px); }
                50% { transform: translateX(${bounceOffset}px); }
            }
            
            .sliding-projects .project-tab.tab-animate-odd {
                animation: projectTabBounce ${CONFIG.bounceDuration}s ease-in-out infinite;
                animation-delay: ${CONFIG.oddDelay}s;
            }
            
            .sliding-projects .project-tab.tab-animate-even {
                animation: projectTabBounce ${CONFIG.bounceDuration}s ease-in-out infinite;
                animation-delay: ${CONFIG.evenDelay}s;
            }
            
            .sliding-projects .project-tab.tab-hovered {
                animation: none !important;
                transform: translateX(0) !important;
            }
        `;
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Hover handlers for each tab
        tabs.forEach((tab, index) => {
            if (index >= CONFIG.maxTabs) return;
            
            tab.addEventListener('mouseenter', () => {
                tab.classList.add('tab-hovered');
            });
            
            tab.addEventListener('mouseleave', () => {
                tab.classList.remove('tab-hovered');
            });
        });

        // Debounced resize handler
        const handleResize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                calculateLayout();
            }, 150);
        };

        // Standard window resize
        window.addEventListener('resize', handleResize);

        // ResizeObserver for DevTools resize and other layout changes
        if (typeof ResizeObserver !== 'undefined') {
            const resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(document.body);
        }

        // Watch for visibility changes when crossing the media query breakpoint
        const mediaQuery = window.matchMedia('(min-width: 1001px)');
        const handleMediaChange = (e) => {
            if (e.matches) {
                // Just became visible - reinitialize after a short delay
                setTimeout(calculateLayout, 50);
            }
        };
        
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleMediaChange);
        } else {
            mediaQuery.addListener(handleMediaChange);
        }
    }

    /**
     * Recalculate layout (public method for external calls)
     */
    function refresh() {
        calculateLayout();
    }

    // Expose component
    global.projectTabsComponent = { init, refresh };

})(window);
