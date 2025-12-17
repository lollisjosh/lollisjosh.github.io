/*
  Bio component for portfolio
  - Exposes `window.bioComponent` with `render(selector)` and `setData(data)`
  - Can be loaded dynamically from `scripts.js` without changing page HTML
*/
(function (global) {
    const bioData = {
        tags: ["Junior Software Engineer"],
        bio: "I build interactive desktop and web applications using C#, Python, C++, and JavaScript. Projects I’ve shipped include my senior capstone game and other Unity projects, as well as Qt/QML desktop applications with Python backends, C++ desktop applications and games, and web projects built with HTML, CSS, and JavaScript."
    };

    function generateBioHTML(data) {
        const tagsHTML = (data.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('<span class="tag-separator">•</span>');
        return `
            <div id="bio-container" class="hover-transform-up">
                <div id="role-tags">
                    <nav class="tags-list">
                        ${tagsHTML}
                    </nav>
                </div>
                <article id="bio">
                    <p>${data.bio || ''}</p>
                </article>
            </div>
        `;
    }

    /**
     * Render the bio component into container (selector string or DOM element)
     * @param {string|Element} selector
     */
    function render(selector) {
        const el = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (!el) {
            console.warn('bioComponent.render: placeholder not found', selector);
            return;
        }
        el.innerHTML = generateBioHTML(bioData);
    }

    /**
     * Update internal bio data used when rendering
     * @param {{tags?:string[], bio?:string}} newData
     */
    function setData(newData) {
        if (!newData) return;
        if (Array.isArray(newData.tags)) bioData.tags = newData.tags;
        if (typeof newData.bio === 'string') bioData.bio = newData.bio;
    }

    global.bioComponent = {
        render,
        setData
    };
})(window);
