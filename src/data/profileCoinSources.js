/**
 * @typedef {'faces' | 'sequence-loop' | 'sequence-march'} ProfileCoinImageMode
 */

/**
 * @typedef {'atlas'} ProfileCoinAtlasSourceType
 */

/**
 * @typedef {object} ProfileCoinAtlasSource
 * @property {ProfileCoinAtlasSourceType} type - Source format used by the sequence renderer.
 * @property {string} src - Public path to the sprite sheet image.
 * @property {number} columns - Number of columns in the sprite sheet.
 * @property {number} rows - Number of rows in the sprite sheet.
 * @property {number} frameCount - Number of usable frames in the sheet.
 * @property {number} frameWidth - Width of each sprite frame in pixels.
 * @property {number} frameHeight - Height of each sprite frame in pixels.
 */

/**
 * Reusable image-mode constants for ProfileCoin.
 */
export const profileCoinImageModes = Object.freeze({
    faces: 'faces',
    sequenceLoop: 'sequence-loop',
    sequenceMarch: 'sequence-march',
})

/**
 * Water Dragon hand-sign sequence atlas.
 *
 * Frame order is left-to-right, top-to-bottom.
 * The final frame is the Water Dragon result image.
 *
 * @type {ProfileCoinAtlasSource}
 */
export const waterDragonHandSignAtlas = {
    type: 'atlas',
    src: '/assets/images/hand-seals/water_dragon_hand_sign_sprite_sheet.webp',
    columns: 4,
    rows: 12,
    frameCount: 45,
    frameWidth: 728,
    frameHeight: 546,
}