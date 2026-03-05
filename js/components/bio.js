/*
  Bio component for portfolio
  - Exposes `window.bioComponent` with `render(selector)` and `setData(data)`
  - Can be loaded dynamically from `scripts.js` without changing page HTML
*/
(function (global) {
    const bioData = {
        tags: ["Junior Software Engineer"],
        bio: "Career-changing full-stack SWE with 10+ years developing personal and academic projects spanning dev tools, music production utilities, desktop apps, and websites, with a special focus on games. Recently graduated with a B.S. in Computer Science from CSUF (Cum Laude, GPA: 3.63) after a non-traditional educational journey."
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
