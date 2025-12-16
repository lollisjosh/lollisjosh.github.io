Components directory

Guidelines:
- Each component should attach itself to `window` with a short name, e.g. `window.bioComponent`.
- Provide an `init` or `render` method and a `setData` method when appropriate.
- Keep components self-contained and defensive (check for missing placeholders before operating).
- Prefer dynamic loading from `scripts.js` via `loadComponentScript('/js/components/<name>.js')`.
- Add JSDoc-style comments for exported methods to aid maintainability.
