import SensorData from '../models/SensorData.js'

export class DataController {

    async getHistoricalData(req, res) {

        try {

            const thirtyMinutesAgo =
                new Date(
                    Date.now() - 30 * 60 * 1000
                )

            const data =
                await SensorData.find({

                    serverTimestamp: {
                        $gte: thirtyMinutesAgo
                    }

                })
                    .sort({
                        serverTimestamp: 1
                    })
                    .limit(1000)

            res.json(data)

        } catch (error) {

            console.error(error)

            res.status(500).json({

                error:
                    'Failed to fetch data'
            })
        }
    }
}