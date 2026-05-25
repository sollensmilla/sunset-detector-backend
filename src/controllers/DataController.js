import SensorData
    from '../models/SensorData.js'

import { formatSensorData }
    from '../utils/dataFormatter.js'

const HOURS_BACK = 48

const SAMPLE_RATE = 30

const MAX_RESULTS = 50000

/**
 * Controller for handling data-related API requests
 */
export class DataController {

    /**
     * Gets the date from a specified number of hours ago
     * @param {number} hours - Number of hours to go back (default is 24)
     * @returns {Date} - Date object representing the time from the specified hours ago
     */
    getFromDate(hours = HOURS_BACK) {

        return new Date(
            Date.now()
            - hours * 60 * 60 * 1000
        )
    }

    /**
     * Samples data at a specified rate
     * @param {Array} data - Array of data entries to sample
     * @param {number} rate - Sampling rate (e.g., 30 means every 30th entry)
     * @returns {Array} - Sampled data
     */
    sampleData(data, rate = SAMPLE_RATE) {

        return data.filter(
            (_, index) =>
                index % rate === 0
        )
    }

    /**
     * Gets historical sensor data
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    async getHistoricalData(
        req,
        res
    ) {

        try {

            const hours =
                Number(req.query.hours)
                || HOURS_BACK

            const fromDate =
                this.getFromDate(hours)

            const data =
                await SensorData.find({

                    serverTimestamp: {
                        $gte:
                            fromDate
                    }

                })
                    .sort({
                        serverTimestamp: 1
                    })
                    .limit(MAX_RESULTS)

            const formattedData =
                data.map(
                    formatSensorData
                )

            const sampledData =
                this.sampleData(
                    formattedData
                )

            res.json(sampledData)

        } catch (error) {

            console.error(error)

            res.status(500).json({

                error:
                    'Failed to fetch data'
            })
        }
    }

    /**
     * Gets sensor data by ID
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @returns {Object} - Formatted sensor data
     */
    async getDataById(
        req,
        res
    ) {

        try {

            const data =
                await SensorData.findById(
                    req.params.id
                )

            if (!data) {

                return res.status(404).json({

                    error:
                        'Data not found'
                })
            }

            const formattedData =
                formatSensorData(data)

            res.json(formattedData)

        } catch (error) {

            console.error(error)

            res.status(500).json({

                error:
                    'Failed to fetch data'
            })
        }
    }
}