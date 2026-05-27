import { createSkyColor }
    from './skyColor.js'

import { isSunset }
    from './sunsetDetection.js'

/**
 * Formats sensor data for API response
 * @param {Object} entry - The sensor data entry
 * @returns {Object} - The formatted sensor data
 */
export const formatSensorData =
    (entry) => {

        return {

            timestamp:
                entry.deviceTimestamp,

            lux:
                entry.lux,

            cct:
                entry.cct,

            rgb:
                entry.rgb,

            skyColor:
                createSkyColor(
                    entry.rgb
                ),

            isSunset:
                isSunset(
                    entry.lux,
                    entry.cct
                )
        }
    }