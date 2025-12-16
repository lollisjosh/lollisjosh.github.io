/*
  Profile picture (pfp) component
  - Loads `pfp.html` into a placeholder
  - Exposes `window.pfpComponent.init(placeholderSelector)`
*/
(function (global) {
    /**
     * Initialize and load the profile picture section into a placeholder
     * @param {string} placeholderSelector
     */
    function init(placeholderSelector = '#pfp-placeholder') {
        const placeholder = document.querySelector(placeholderSelector);
        if (!placeholder) {
            console.warn('pfpComponent.init: placeholder not found', placeholderSelector);
            return;
        }

        fetch('pfp.html')
            .then(response => response.text())
            .then(data => {
                placeholder.innerHTML = data;
            })
            .catch(err => console.error('Error loading pfp:', err));
    }

    global.pfpComponent = {
        init
    };
})(window);
