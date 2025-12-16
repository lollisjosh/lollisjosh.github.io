/*
  Carousel component
  - Handles image click -> open full-res
  - Prev/next navigation and auto-rotation
  - Exposes `window.carouselComponent.init(options)`
*/
(function (global) {
    /**
     * Initialize the carousel behavior
     * @param {{carouselSelector?:string, prevBtnSelector?:string, nextBtnSelector?:string, autoRotate?:boolean, interval?:number}} options
     */
    function init(options = {}) {
        const carouselSelector = options.carouselSelector || '.carousel-images';
        const prevBtnSelector = options.prevBtnSelector || '.carousel-btn.prev';
        const nextBtnSelector = options.nextBtnSelector || '.carousel-btn.next';
        const autoRotate = options.autoRotate !== false; // default true
        const intervalMs = options.interval || 10000;

        const carouselEl = document.querySelector(carouselSelector);
        if (!carouselEl) return console.warn('carouselComponent.init: carousel element not found', carouselSelector);

        const images = carouselEl.querySelectorAll('img');
        if (!images.length) return;

        images.forEach(img => {
            img.addEventListener('click', () => {
                const full = img.getAttribute('data-full-res') || img.src;
                window.open(full, '_blank');
            });
        });

        let currentIndex = 0;
        const totalImages = images.length;

        function updateCarousel() {
            const imageWidth = carouselEl.querySelector('img').offsetWidth;
            carouselEl.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
        }

        function prevImage() {
            currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
            updateCarousel();
        }

        function nextImage() {
            currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        }

        const prevBtn = document.querySelector(prevBtnSelector);
        const nextBtn = document.querySelector(nextBtnSelector);

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevImage);
            nextBtn.addEventListener('click', nextImage);
        } else {
            console.warn('carouselComponent: Prev/Next buttons not found.');
        }

        if (autoRotate) {
            setInterval(nextImage, intervalMs);
        }

        // expose controls if desired
        return {
            prev: prevImage,
            next: nextImage,
            update: updateCarousel
        };
    }

    global.carouselComponent = {
        init
    };
})(window);
