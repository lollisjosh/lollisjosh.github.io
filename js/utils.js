/*
  Utility helpers for the site
  - Exposes `window.appUtils.loadScript(url)` which returns a Promise
*/
(function (global) {
    /**
     * Dynamically load a script and return a Promise that resolves when loaded
     * @param {string} url - Script URL
     * @returns {Promise<void>}
     */
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const existing = document.querySelector(`script[src='${url}']`);
            if (existing) {
                // If script already loaded, resolve after a tick
                return existing.onload ? resolve() : resolve();
            }
            const script = document.createElement('script');
            script.src = url;
            script.defer = true;
            script.onload = () => resolve();
            script.onerror = (err) => reject(err);
            document.head.appendChild(script);
        });
    }

    global.appUtils = {
        loadScript
    };
})(window);
