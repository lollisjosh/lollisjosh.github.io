(function (global) {
    let autoRotateTimers = [];

    function getContainerFromEvent(event) {
        return event.currentTarget.closest('.carousel-container, .carousel-container-medium');
    }

    function getStrip(container) {
        return container.querySelector('.carousel-images');
    }

    function getCount(container) {
        const strip = getStrip(container);
        return strip ? strip.querySelectorAll('img').length : 0;
    }

    function getIndex(container) {
        return parseInt(container.dataset.carouselIndex || '0', 10);
    }

    function setIndex(container, index) {
        container.dataset.carouselIndex = String(index);
    }

    function update(container) {
        const strip = getStrip(container);
        if (!strip) return;
        const index = getIndex(container);
        const stepWidth = strip.clientWidth;
        strip.style.transform = `translateX(-${index * stepWidth}px)`;
    }

    function navigate(container, direction) {
        const count = getCount(container);
        if (count === 0) return;
        const currentIndex = getIndex(container);
        let newIndex;
        if (direction === 'prev') {
            newIndex = (currentIndex === 0) ? count - 1 : currentIndex - 1;
        } else {
            newIndex = (currentIndex === count - 1) ? 0 : currentIndex + 1;
        }
        setIndex(container, newIndex);
        update(container);
    }

    function handleResize() {
        document.querySelectorAll('.carousel-container, .carousel-container-medium').forEach(update);
    }

    function init(options = {}) {
        const carouselSelector = options.carouselSelector || '.carousel-images';
        const autoRotate = options.autoRotate !== false;
        const intervalMs = options.interval || 20000;

        autoRotateTimers.forEach(timer => clearInterval(timer));
        autoRotateTimers = [];

        const carouselEls = document.querySelectorAll(carouselSelector);
        if (!carouselEls.length) return;

        carouselEls.forEach((carouselEl) => {
            const container = carouselEl.closest('.carousel-container, .carousel-container-medium');
            if (!container) return;

            const images = carouselEl.querySelectorAll('img');
            if (!images.length) return;

            images.forEach(img => {
                img.addEventListener('click', () => {
                    const full = img.getAttribute('data-full-res') || img.src;
                    window.open(full, '_blank');
                });
            });

            setIndex(container, 0);
            update(container);

            if (autoRotate) {
                const timer = setInterval(() => navigate(container, 'next'), intervalMs);
                autoRotateTimers.push(timer);
            }
        });

        window.removeEventListener('resize', handleResize);
        window.addEventListener('resize', handleResize);
    }

    global.prevImage = function() {
        const container = getContainerFromEvent(event);
        if (container) navigate(container, 'prev');
    };

    global.nextImage = function() {
        const container = getContainerFromEvent(event);
        if (container) navigate(container, 'next');
    };

    global.carouselComponent = {
        init
    };
})(window);
