/*
    Portfolio Site JavaScript (orchestrator)
    Author: Josh Lollis
    Date: December 3, 2024
    Refactor: modularized components (December 15, 2025)

    Purpose:
    - Orchestrates page initialization and dynamic loading of small components
    - Components now live under `/js/components/` (bio, header, footer, pfp, carousel, modal, wakatime)
    - Keeps page-level scripts minimal and improves maintainability
*/

document.addEventListener("DOMContentLoaded", function () {

    // Component loading and initialization

    /**
     * Dynamically load a component script and return a Promise that resolves when loaded.
     * Uses `appUtils.loadScript` if available for de-duplication, otherwise inserts a script tag.
     * @param {string} url - URL to the script to load
     * @returns {Promise<void>}
     */
    function loadComponentScript(url) {
        if (window.appUtils && typeof window.appUtils.loadScript === 'function') {
            return window.appUtils.loadScript(url);
        }
        return new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = url;
            s.defer = true;
            s.onload = () => resolve();
            s.onerror = (e) => reject(e);
            document.head.appendChild(s);
        });
    }

    // Load bio component
    (function loadBio() {
        const initialData = {
            tags: ["Junior Software Engineer"],
            bio: "I build interactive desktop and web applications using C#, Python, C++, and JavaScript. My work includes Unity projects, Qt/QML desktop applications with Python backends, C++ desktop applications and games, and web projects using HTML, CSS, and JavaScript. I’m currently seeking an entry-level software engineering role."
        };

        if (window.bioComponent) {
            window.bioComponent.setData && window.bioComponent.setData(initialData);
            window.bioComponent.render && window.bioComponent.render("#bio-placeholder");
            return;
        }

        loadComponentScript('/js/components/bio.js')
            .then(() => {
                if (window.bioComponent && window.bioComponent.setData) {
                    window.bioComponent.setData(initialData);
                }
                if (window.bioComponent && window.bioComponent.render) {
                    window.bioComponent.render("#bio-placeholder");
                }
            })
            .catch(() => console.error("Failed to load bio component script."));
    })();



    // Initialize carousel component
    (function loadCarousel() {
        // Only load carousel on pages that include a carousel element
        if (!document.querySelector('.carousel-images')) return;
        if (window.carouselComponent) {
            window.carouselComponent.init();
            return;
        }
        loadComponentScript('/js/components/carousel.js')
            .then(() => {
                if (window.carouselComponent && window.carouselComponent.init) {
                    window.carouselComponent.init();
                }
            })
            .catch(() => console.error('Failed to load carousel component script.'));
    })();

    // Load header component
    (function loadHeader() {
        if (window.headerComponent) {
            window.headerComponent.init("#header-placeholder");
            return;
        }
        loadComponentScript('/js/components/header.js')
            .then(() => {
                if (window.headerComponent && window.headerComponent.init) {
                    window.headerComponent.init("#header-placeholder");
                }
            })
            .catch(() => console.error('Failed to load header component script.'));
    })();

    // Load footer component
    (function loadFooter() {
        if (window.footerComponent) {
            window.footerComponent.init("#footer-placeholder");
            return;
        }
        loadComponentScript('/js/components/footer.js')
            .then(() => {
                if (window.footerComponent && window.footerComponent.init) {
                    window.footerComponent.init("#footer-placeholder");
                }
            })
            .catch(() => console.error('Failed to load footer component script.'));
    })();

    // Load profile picture component
    (function loadPfp() {
        if (window.pfpComponent) {
            window.pfpComponent.init('#pfp-placeholder');
            return;
        }
        loadComponentScript('/js/components/pfp.js')
            .then(() => {
                if (window.pfpComponent && window.pfpComponent.init) {
                    window.pfpComponent.init('#pfp-placeholder');
                }
            })
            .catch(() => console.error('Failed to load pfp component script.'));
    })();


    // Lazy-load WakaTime charts when their canvas becomes visible
    (function lazyLoadWaka() {
        const chartSelectors = ['#desktop-wakatime30DayLangChart', '#mobile-wakatime30DayLangChart', '#desktop-wakatimeAllTimeLangChart', '#mobile-wakatimeAllTimeLangChart', '#desktop-editorsUsedChart', '#mobile-editorsUsedChart', '#desktop-editorChart', '#mobile-editorChart'];
        const firstChart = document.querySelector(chartSelectors.join(','));
        if (!firstChart) return; // no charts on this page

        const loadWaka = () => {
            if (window.wakatimeLoaded) return;
            window.wakatimeLoaded = true;
            loadComponentScript('/js/components/wakatime.js')
                .then(() => {
                    if (window.wakatimeComponent && window.wakatimeComponent.init) {
                        window.wakatimeComponent.init();
                    }
                })
                .catch(() => console.error('Failed to load wakatime component script.'));
        };

        if ('IntersectionObserver' in window) {
            const obs = new IntersectionObserver((entries, observer) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        loadWaka();
                        observer.disconnect();
                    }
                });
            }, { rootMargin: '200px' });
            obs.observe(firstChart);

            // Fallback: if user doesn't scroll into view within 10s, load automatically
            setTimeout(() => { if (!window.wakatimeLoaded) loadWaka(); }, 10000);
        } else {
            // Older browsers: load after small delay and on first scroll
            setTimeout(loadWaka, 3000);
            window.addEventListener('scroll', loadWaka, { once: true });
        }
    })();

    // Load modal component
    (function loadModal() {
        if (window.modalComponent) {
            window.modalComponent.init();
            return;
        }
        loadComponentScript('/js/components/modal.js')
            .then(() => {
                if (window.modalComponent && window.modalComponent.init) {
                    window.modalComponent.init();
                }
            })
            .catch(() => console.error('Failed to load modal component script.'));
    })();

    /**
     * Lazy-load images across the site by setting `loading="lazy"` on images
     * Exclude images that must be loaded eagerly: icons, profile picture, wakatime badge, or images marked `.no-lazy`.
     */
    (function lazyLoadImages() {
        const exclude = 'img.no-lazy, img#pfp-img, a#wakatime-site-hours img, img.icon, img.small';
        const images = document.querySelectorAll('img:not(' + exclude + ')');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                try { img.setAttribute('loading', 'lazy'); } catch (e) { /* defensive */ }
            }
        });

        // Fallback for browsers that don't support native loading attribute and use data-src pattern
        if (!('loading' in HTMLImageElement.prototype)) {
            const lazyImgs = document.querySelectorAll('img[data-src]');
            if ('IntersectionObserver' in window) {
                const io = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const el = entry.target;
                            el.src = el.getAttribute('data-src');
                            el.removeAttribute('data-src');
                            observer.unobserve(el);
                        }
                    });
                }, { rootMargin: '200px' });
                lazyImgs.forEach(img => io.observe(img));
            } else {
                // No support: load them all after a timeout
                setTimeout(() => lazyImgs.forEach(img => {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                }), 2000);
            }
        }
    })();

});
