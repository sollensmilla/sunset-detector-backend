import 'dotenv/config'

import app from './app.js'

import { connectDB } from './config/db.js'

import { startMQTT } from './services/mqttService.js'


const PORT = process.env.PORT || 3020


const startServer = async () => {

    await connectDB()

    startMQTT()

    app.listen(PORT, () => {

        console.log(
            `Server running on port ${PORT}`
        )
    })
}

startServer()