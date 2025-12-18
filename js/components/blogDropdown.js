/*
  Blog Dropdown component
  - Toggles collapsible dropdown sections for blog content
  - Exposes `window.blogDropdownComponent.init()`
*/
(function (global) {
    /**
     * Initialize blog dropdown functionality
     * Adds click handlers to all dropdown headers to toggle content visibility
     */
    function init() {
        const dropdownHeaders = document.querySelectorAll('.dropdown-header');
        
        if (dropdownHeaders.length === 0) {
            console.warn('blogDropdownComponent.init: no dropdown headers found');
            return;
        }

        dropdownHeaders.forEach(header => {
            header.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const dropdownId = this.dataset.dropdown;
                if (!dropdownId) {
                    console.warn('blogDropdownComponent: dropdown header missing data-dropdown attribute');
                    return;
                }
                
                const content = document.getElementById(`${dropdownId}-content`);
                if (!content) {
                    console.warn(`blogDropdownComponent: content element not found for id: ${dropdownId}-content`);
                    return;
                }
                
                // Toggle active state on both header and content
                this.classList.toggle('active');
                content.classList.toggle('active');
            });
        });

        console.log(`Blog dropdown initialized with ${dropdownHeaders.length} dropdown(s)`);
    }

    global.blogDropdownComponent = {
        init
    };
})(window);
