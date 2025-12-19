(function (global) {
    function init(options = {}) {
        const gridSelector = options.gridSelector || '.image-grid img, .carousel-images img';
        const modalSelector = options.modalSelector || '#imageModal';
        const modalImageSelector = options.modalImageSelector || '#modalImage';

        const modal = document.querySelector(modalSelector);
        const modalImg = document.querySelector(modalImageSelector);
        const gridImages = document.querySelectorAll(gridSelector);

        if (!modal || !modalImg || !gridImages.length) {
            return;
        }

        gridImages.forEach(img => {
            img.addEventListener('click', function () {
                modal.style.display = 'block';
                const full = this.getAttribute('data-full-res') || this.src;
                modalImg.src = full;
                modalImg.alt = this.alt || '';
            });
        });

        modal.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    global.modalComponent = { init };
})(window);
