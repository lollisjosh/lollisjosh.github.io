/**
 * Directory Tree Component
 * Interactive collapsible file/folder tree with localStorage persistence
 */
(function (global) {
    'use strict';

    const STORAGE_PREFIX = 'dirTree_';
    const ICONS = {
        folder: 'fa-solid fa-folder',
        folderOpen: 'fa-solid fa-folder-open',
        file: 'fa-solid fa-file-code',
        chevron: 'fa-solid fa-chevron-right'
    };

    /**
     * Create a tree node element
     */
    function createNode(item, depth, treeId) {
        const nodeDiv = document.createElement('div');
        nodeDiv.className = `directory-tree__node directory-tree__node--${item.type}`;
        nodeDiv.style.setProperty('--depth', depth);

        const toggle = document.createElement('div');
        toggle.className = 'directory-tree__toggle';
        toggle.setAttribute('role', 'treeitem');
        
        // Only folders should be focusable
        if (item.type === 'folder') {
            toggle.setAttribute('tabindex', '0');
        }

        // Icon
        const iconSpan = document.createElement('span');
        iconSpan.className = 'directory-tree__icon';
        
        if (item.type === 'folder') {
            const chevron = document.createElement('i');
            chevron.className = ICONS.chevron;
            iconSpan.appendChild(chevron);
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            const fileIcon = document.createElement('i');
            fileIcon.className = ICONS.file;
            iconSpan.appendChild(fileIcon);
        }

        // Label
        const labelSpan = document.createElement('span');
        labelSpan.className = 'directory-tree__label';
        labelSpan.textContent = item.name;

        // Comment (if exists)
        if (item.comment) {
            const commentSpan = document.createElement('span');
            commentSpan.className = 'directory-tree__comment';
            commentSpan.textContent = item.comment;
            labelSpan.appendChild(commentSpan);
        }

        toggle.appendChild(iconSpan);
        toggle.appendChild(labelSpan);
        nodeDiv.appendChild(toggle);

        // Children container for folders
        if (item.type === 'folder' && item.children && item.children.length > 0) {
            const childrenDiv = document.createElement('div');
            childrenDiv.className = 'directory-tree__children';
            
            item.children.forEach(child => {
                const childNode = createNode(child, depth + 1, treeId);
                childrenDiv.appendChild(childNode);
            });

            nodeDiv.appendChild(childrenDiv);

            // Add click handler for folders only
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleNode(nodeDiv, treeId);
            });

            // Keyboard support for folders only
            toggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleNode(nodeDiv, treeId);
                } else if (e.key === 'ArrowRight' && !nodeDiv.classList.contains('is-open')) {
                    e.preventDefault();
                    toggleNode(nodeDiv, treeId);
                } else if (e.key === 'ArrowLeft' && nodeDiv.classList.contains('is-open')) {
                    e.preventDefault();
                    toggleNode(nodeDiv, treeId);
                }
            });
        } else {
            // Files are not interactive - remove role for proper accessibility
            toggle.removeAttribute('role');
        }

        return nodeDiv;
    }

    /**
     * Toggle a folder node open/closed
     */
    function toggleNode(nodeElement, treeId) {
        const isOpen = nodeElement.classList.toggle('is-open');
        const toggle = nodeElement.querySelector('.directory-tree__toggle');
        
        if (toggle) {
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        }

        // Save state to localStorage
        if (treeId) {
            saveState(treeId, nodeElement.closest('.directory-tree'));
        }
    }

    /**
     * Expand all folders in a tree
     */
    function expandAll(treeElement) {
        const folders = treeElement.querySelectorAll('.directory-tree__node--folder');
        folders.forEach(folder => {
            if (!folder.classList.contains('is-open')) {
                folder.classList.add('is-open');
                const toggle = folder.querySelector('.directory-tree__toggle');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', 'true');
                }
            }
        });
    }

    /**
     * Collapse all folders in a tree
     */
    function collapseAll(treeElement) {
        const folders = treeElement.querySelectorAll('.directory-tree__node--folder');
        folders.forEach(folder => {
            folder.classList.remove('is-open');
            const toggle = folder.querySelector('.directory-tree__toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /**
     * Save expansion state to localStorage
     */
    function saveState(treeId, treeElement) {
        const openPaths = [];
        const openFolders = treeElement.querySelectorAll('.directory-tree__node--folder.is-open');
        
        openFolders.forEach(folder => {
            const path = getNodePath(folder);
            if (path) openPaths.push(path);
        });

        try {
            localStorage.setItem(STORAGE_PREFIX + treeId, JSON.stringify(openPaths));
        } catch (e) {
            console.warn('Failed to save directory tree state:', e);
        }
    }

    /**
     * Load expansion state from localStorage
     */
    function loadState(treeId, treeElement) {
        try {
            const saved = localStorage.getItem(STORAGE_PREFIX + treeId);
            if (!saved) return false;

            const openPaths = JSON.parse(saved);
            
            openPaths.forEach(path => {
                const node = findNodeByPath(treeElement, path);
                if (node && node.classList.contains('directory-tree__node--folder')) {
                    node.classList.add('is-open');
                    const toggle = node.querySelector('.directory-tree__toggle');
                    if (toggle) {
                        toggle.setAttribute('aria-expanded', 'true');
                    }
                }
            });

            return true;
        } catch (e) {
            console.warn('Failed to load directory tree state:', e);
            return false;
        }
    }

    /**
     * Get the path of a node (used for state persistence)
     */
    function getNodePath(nodeElement) {
        const labels = [];
        let current = nodeElement;

        while (current && current.classList.contains('directory-tree__node')) {
            const label = current.querySelector(':scope > .directory-tree__toggle > .directory-tree__label');
            if (label) {
                labels.unshift(label.textContent.trim().split('\n')[0]); // Get just the name, not comment
            }
            current = current.parentElement?.closest('.directory-tree__node');
        }

        return labels.join('/');
    }

    /**
     * Find a node by its path
     */
    function findNodeByPath(treeElement, path) {
        const parts = path.split('/');
        let current = treeElement;

        for (const part of parts) {
            if (!current) return null;
            
            const nodes = current.querySelectorAll(':scope > .directory-tree__node');
            let found = false;

            for (const node of nodes) {
                const label = node.querySelector(':scope > .directory-tree__toggle > .directory-tree__label');
                if (label && label.textContent.trim().startsWith(part)) {
                    current = node;
                    found = true;
                    break;
                }
            }

            if (!found) return null;
        }

        return current;
    }

    /**
     * Set default expansion state (top level open, rest closed)
     */
    function setDefaultState(treeElement) {
        const topLevelFolders = treeElement.querySelectorAll(':scope > .directory-tree__node--folder');
        topLevelFolders.forEach(folder => {
            folder.classList.add('is-open');
            const toggle = folder.querySelector('.directory-tree__toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    }

    /**
     * Initialize a directory tree
     * @param {string} selector - CSS selector for the container element
     * @param {Object} data - Tree data structure
     * @param {Object} options - Configuration options
     */
    function init(selector, data, options = {}) {
        const container = document.querySelector(selector);
        
        if (!container) {
            console.warn(`Directory tree container not found: ${selector}`);
            return;
        }

        const treeId = container.getAttribute('data-tree-id') || 'default';
        const treeElement = container.querySelector('.directory-tree');
        
        if (!treeElement) {
            console.warn(`Directory tree element not found in: ${selector}`);
            return;
        }

        // Clear existing content
        treeElement.innerHTML = '';

        // Add controls
        const controls = document.createElement('div');
        controls.className = 'directory-tree__controls';

        const expandBtn = document.createElement('button');
        expandBtn.className = 'directory-tree__control-btn';
        expandBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Expand All';
        expandBtn.addEventListener('click', () => {
            expandAll(treeElement);
            saveState(treeId, treeElement);
        });

        const collapseBtn = document.createElement('button');
        collapseBtn.className = 'directory-tree__control-btn';
        collapseBtn.innerHTML = '<i class="fa-solid fa-minus"></i> Collapse All';
        collapseBtn.addEventListener('click', () => {
            collapseAll(treeElement);
            saveState(treeId, treeElement);
        });

        controls.appendChild(expandBtn);
        controls.appendChild(collapseBtn);
        treeElement.appendChild(controls);

        // Set ARIA role
        treeElement.setAttribute('role', 'tree');

        // Render tree
        const treeContent = document.createElement('div');
        if (Array.isArray(data)) {
            data.forEach(item => {
                treeContent.appendChild(createNode(item, 0, treeId));
            });
        } else {
            treeContent.appendChild(createNode(data, 0, treeId));
        }
        treeElement.appendChild(treeContent);

        // Load saved state or set defaults
        const stateLoaded = loadState(treeId, treeElement);
        if (!stateLoaded) {
            setDefaultState(treeElement);
        }

        console.log(`Directory tree initialized: ${treeId}`);
    }

    // Export to global scope
    global.directoryTree = {
        init: init
    };

})(window);
