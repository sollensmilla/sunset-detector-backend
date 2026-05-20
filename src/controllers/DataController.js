import SensorData
    from '../models/SensorData.js'

import { formatSensorData }
    from '../utils/dataFormatter.js'


export class DataController {

    async getHistoricalData(
        req,
        res
    ) {

        try {

            const thirtyMinutesAgo =
                new Date(
                    Date.now()
                    - 30 * 60 * 1000
                )

            const data =
                await SensorData.find({

                    serverTimestamp: {
                        $gte:
                            thirtyMinutesAgo
                    }

                })
                    .sort({
                        serverTimestamp: 1
                    })
                    .limit(1000)

            const formattedData =
                data.map(
                    formatSensorData
                )

            res.json(
                formattedData
            )

        } catch (error) {

            console.error(error)

            res.status(500).json({

                error:
                    'Failed to fetch data'
            })
        }
    }

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