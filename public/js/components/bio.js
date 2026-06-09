/*
  Bio component for portfolio
  - Exposes `window.bioComponent` with `render(selector)` and `setData(data)`
  - Can be loaded dynamically from `scripts.js` without changing page HTML
*/
(function (global) {
    const bioData = {
        tags: ["Front-End", "Interactive Apps", "Creative Tools"],
            bio: "Software engineer focused on front-end development, interactive interfaces, and creative tools. I have 10+ years of personal and academic project experience across websites, desktop apps, games, and music-related utilities. Recently graduated Cum Laude with a B.S. in Computer Science from California State University, Fullerton after a non-traditional educational path."
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
