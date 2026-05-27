/**
 * Creates a CSS rgb color string from an RGB object.
 * @param {Object} rgb - The RGB values
 * @param {number} rgb.r - The red value
 * @param {number} rgb.g - The green value
 * @param {number} rgb.b - The blue value
 * @returns {string} - The CSS rgb color string
 */
export const createSkyColor = (rgb) => {

    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}