/*
  Modal image viewer component
  - Attaches click handlers to `.image-grid img` to open a modal
  - Exposes `window.modalComponent.init(options)`
*/
(function (global) {
    /**
     * Initialize the image modal behavior
     * @param {{gridSelector?:string, modalSelector?:string, modalImageSelector?:string}} options
     */
    function init(options = {}) {
        const gridSelector = options.gridSelector || '.image-grid img';
        const modalSelector = options.modalSelector || '#imageModal';
        const modalImageSelector = options.modalImageSelector || '#modalImage';

        const modal = document.querySelector(modalSelector);
        const modalImg = document.querySelector(modalImageSelector);
        const gridImages = document.querySelectorAll(gridSelector);

        if (!modal || !modalImg || !gridImages.length) {
            // nothing to do
            return;
        }

        gridImages.forEach(img => {
            img.addEventListener('click', function () {
                modal.style.display = 'block';
                modalImg.src = this.src;
                modalImg.alt = this.alt || '';
            });
        });

        modal.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }

    global.modalComponent = { init };
})(window);
