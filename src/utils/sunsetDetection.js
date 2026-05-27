/**
 * Determines if the given lux and cct values indicate a sunset.
 * @param {number} lux - The lux value
 * @param {number} cct - The cct value
 * @returns {boolean} - True if the values indicate a sunset, false otherwise
 */
export const isSunset = (
    lux,
    cct
) => {

    if (
        cct === null
    ) {

        return false
    }

    return (
        lux < 150 &&
        cct < 4000
    )
}