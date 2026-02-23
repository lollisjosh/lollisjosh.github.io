(function (global) {
    function init() {
        const button = document.querySelector('.back-to-top-button');
        
        if (!button) {
            return;
        }

        let isScrolling = false;
        const scrollThreshold = 300;

        // Throttled scroll handler
        function handleScroll() {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > scrollThreshold) {
                        button.classList.remove('hidden');
                        button.classList.add('visible');
                    } else {
                        button.classList.remove('visible');
                        button.classList.add('hidden');
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }

        // Click handler - smooth scroll to top
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Attach scroll listener
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    global.backToTopComponent = { init };
})(window);
