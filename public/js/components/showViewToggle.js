/*
    Show View Toggle Component
    Author: Josh Lollis
    Date: February 26, 2026

    Purpose:
    - Provides physical switch toggle for switching between card and poster views
    - Persists user preference to localStorage
    - Used on band.html for show display toggling
*/

(function () {
    'use strict';

    const STORAGE_KEY = 'bandPageShowView';
    const VIEW_CARDS = 'cards';
    const VIEW_POSTERS = 'posters';

    /**
     * Initialize all view toggle controls on the page
     */
    function init() {
        const switches = document.querySelectorAll('.switch');
        
        if (switches.length === 0) return;

        // Get saved preference or default to cards
        const savedView = localStorage.getItem(STORAGE_KEY) || VIEW_CARDS;

        switches.forEach(switchEl => {
            setupToggle(switchEl, savedView);
        });
    }

    /**
     * Set up a single toggle control
     * @param {HTMLElement} switchEl - The .switch label element
     * @param {string} initialView - Initial view state ('cards' or 'posters')
     */
    function setupToggle(switchEl, initialView) {
        const checkbox = switchEl.querySelector('input[type="checkbox"]');
        
        if (!checkbox) {
            console.warn('Show view toggle: missing checkbox input');
            return;
        }

        // Find the associated skills-grid (in parent section)
        const section = switchEl.closest('section');
        const skillsGrid = section ? section.querySelector('.skills-grid') : null;

        if (!skillsGrid) {
            console.warn('Show view toggle: no skills-grid found for toggle');
            return;
        }

        // Set initial state
        checkbox.checked = (initialView === VIEW_POSTERS);
        applyView(checkbox.checked, skillsGrid);

        // Add change event listener
        checkbox.addEventListener('change', () => {
            applyView(checkbox.checked, skillsGrid);
            
            // Save preference
            const view = checkbox.checked ? VIEW_POSTERS : VIEW_CARDS;
            try {
                localStorage.setItem(STORAGE_KEY, view);
            } catch (e) {
                console.warn('Failed to save view preference to localStorage:', e);
            }
        });
    }

    /**
     * Apply the view state to the skills grid
     * @param {boolean} isChecked - Whether checkbox is checked (true = posters, false = cards)
     * @param {HTMLElement} skillsGrid - The skills grid to toggle
     */
    function applyView(isChecked, skillsGrid) {
        if (isChecked) {
            skillsGrid.classList.add('poster-view');
        } else {
            skillsGrid.classList.remove('poster-view');
        }
    }

    // Export the component
    window.showViewToggleComponent = {
        init: init
    };

})();
