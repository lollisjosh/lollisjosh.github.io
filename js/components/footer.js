/*
  Footer component
  - Loads `/footer.html` into a placeholder
  - Exposes `window.footerComponent.init(placeholderSelector)`
*/
(function (global) {
    /**
     * Initialize and load the footer into the given placeholder
     * @param {string} placeholderSelector
     */
    function init(placeholderSelector = '#footer-placeholder') {
        const placeholder = document.querySelector(placeholderSelector);
        if (!placeholder) {
            console.warn('footerComponent.init: placeholder not found', placeholderSelector);
            return;
        }

        fetch('/footer.html')
            .then(response => response.text())
            .then(data => {
                placeholder.innerHTML = data;
            })
            .catch(err => console.error('Error loading footer:', err));
    }

    global.footerComponent = { init };
})(window);
