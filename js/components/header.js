/*
  Header component
  - Loads `/header.html` into a placeholder and attaches menu + header-height logic
  - Exposes `window.headerComponent.init(placeholderSelector)`
*/
(function (global) {
    /**
     * Initialize and load the header into the given placeholder
     * @param {string} placeholderSelector - CSS selector for the header placeholder
     */
    function init(placeholderSelector = '#header-placeholder') {
        const placeholder = document.querySelector(placeholderSelector);
        if (!placeholder) {
            console.warn('headerComponent.init: placeholder not found', placeholderSelector);
            return;
        }

        fetch('/header.html')
            .then(response => response.text())
            .then(data => {
                placeholder.innerHTML = data;

                const navbar = document.getElementById('navbar');
                if (navbar) {
                    const setHeaderHeight = () => {
                        document.documentElement.style.setProperty('--header-height', `${navbar.offsetHeight}px`);
                    };
                    setHeaderHeight();
                    window.addEventListener('resize', setHeaderHeight);
                }

                const menuButton = document.getElementById('mobile-menu');
                const navbarMenu = document.querySelector('.header-list');

                if (menuButton && navbarMenu) {
                    menuButton.addEventListener('click', function (e) {
                        e.stopPropagation();
                        navbarMenu.classList.toggle('active');
                    });

                    document.addEventListener('click', function (e) {
                        if (navbarMenu.classList.contains('active') && !navbarMenu.contains(e.target) && !menuButton.contains(e.target)) {
                            navbarMenu.classList.remove('active');
                        }
                    });

                    navbarMenu.addEventListener('click', function (e) { e.stopPropagation(); });
                } else {
                    console.error('Menu button or header list not found. Check IDs and classes.');
                }
            })
            .catch(err => console.error('Error loading header:', err));
    }

    global.headerComponent = {
        init
    };
})(window);
