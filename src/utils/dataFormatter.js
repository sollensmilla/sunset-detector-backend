import { createSkyColor }
    from './skyColor.js'

import { isSunset }
    from './sunsetDetection.js'


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