(function (global) {
    let autoRotateTimers = [];

    // Return the carousel container element from an event
    function getContainerFromEvent(event) {
        return event.currentTarget.closest('.carousel-container');
    }

    // Return the carousel strip element within the container
    function getStrip(container) {
        return container.querySelector('.carousel-images');
    }

    // Return the number of images within the carousel strip
    function getCount(container) {
        const strip = getStrip(container);
        return strip ? strip.querySelectorAll('img').length : 0;
    }

    // Return the current index of the carousel
    function getIndex(container) {
        return parseInt(container.dataset.carouselIndex || '0', 10);
    }

    // Set the current index of the carousel
    function setIndex(container, index) {
        container.dataset.carouselIndex = String(index);
    }

    // Update the visibility of the carousel controls based on the number of images
    function updateControls(container) {
        const count = getCount(container);
        if (count <= 1) {
            container.classList.add('carousel-single');
        } else {
            container.classList.remove('carousel-single');
        }
    }

    // Update the carousel strip position based on the current index
    function update(container) {
        const strip = getStrip(container);
        if (!strip) return;

        const count = getCount(container);
        if (count <= 0) return;

        let index = getIndex(container);
        if (index < 0 || index >= count) {
            index = 0;
            setIndex(container, 0);
        }

        const stepWidth = strip.getBoundingClientRect().width;
        strip.style.transform = `translate3d(-${index * stepWidth}px, 0, 0)`;
    }

    // Cycle through the carousel images in the specified direction ('prev' or 'next')
    function navigate(container, direction) {
        const count = getCount(container);
        if (count <= 1) return;

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

    // Handle window resize events to update carousel layout
    function handleResize() {
        document.querySelectorAll('.carousel-container').forEach((container) => {
            updateControls(container);
            update(container);
        });
    }

    // Initialize the carousel component
    function init(options = {}) {
        const carouselSelector = options.carouselSelector || '.carousel-images';
        const autoRotate = options.autoRotate !== false;
        const intervalMs = options.interval || 20000;

        autoRotateTimers.forEach(timer => clearInterval(timer));
        autoRotateTimers = [];

        const carouselEls = document.querySelectorAll(carouselSelector);
        if (!carouselEls.length) return;

        carouselEls.forEach((carouselEl) => {
            const container = carouselEl.closest('.carousel-container');
            if (!container) return;

            const images = carouselEl.querySelectorAll('img');
            if (!images.length) return;

            if (container.dataset.carouselIndex === undefined) {
                setIndex(container, 0);
            } else {
                const count = images.length;
                const idx = getIndex(container);
                if (idx < 0 || idx >= count) setIndex(container, 0);
            }

            updateControls(container);
            update(container);

            if (autoRotate && images.length > 1) {
                const timer = setInterval(() => navigate(container, 'next'), intervalMs);
                autoRotateTimers.push(timer);
            }
        });

        window.removeEventListener('resize', handleResize);
        window.addEventListener('resize', handleResize);
    }

    // Navigate to the previous image in the carousel
    global.prevImage = function () {
        const container = getContainerFromEvent(event);
        if (container) navigate(container, 'prev');
    };

    // Navigate to the next image in the carousel
    global.nextImage = function () {
        const container = getContainerFromEvent(event);
        if (container) navigate(container, 'next');
    };


    global.carouselComponent = {
        init
    };
})(window);
