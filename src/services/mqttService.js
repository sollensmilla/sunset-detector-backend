import mqtt from 'mqtt'

import SensorData from '../models/SensorData.js'
import { isSunset } from '../utils/sunsetDetection.js'
import { MQTT_CONFIG } from '../config/mqtt.js'


export const startMQTT = () => {

    const client = mqtt.connect(
        MQTT_CONFIG.brokerUrl,
        {
            username: process.env.MQTT_USER,
            password: process.env.MQTT_PASSWORD
        }
    )

    client.on('connect', () => {

        console.log('MQTT connected')

        client.subscribe(
            MQTT_CONFIG.topic,
            (err) => {

                if (err) {

                    console.error(
                        'MQTT subscribe error:',
                        err
                    )

                    return
                }

                console.log(
                    'Subscribed to:',
                    MQTT_CONFIG.topic
                )
            }
        )
    })

    client.on('message', async (topic, message) => {

        try {

            const data = JSON.parse(
                message.toString()
            )

            console.log(
                `Message received on ${topic}`
            )

            if (
                typeof data.lux !== 'number'
            ) {

                throw new Error(
                    'Invalid lux value'
                )
            }

            if (
                !data.rgb ||
                typeof data.rgb.r !== 'number' ||
                typeof data.rgb.g !== 'number' ||
                typeof data.rgb.b !== 'number'
            ) {

                throw new Error(
                    'Invalid RGB values'
                )
            }

            const sensorData = new SensorData({

                deviceTimestamp: new Date(data.timestamp),

                serverTimestamp: new Date(),

                lux: data.lux,

                cct: data.cct,

                rgb: data.rgb
            })

            await sensorData.save()

            console.log(
                'Sensor data saved'
            )

        } catch (error) {

            console.error(
                'MQTT message error:',
                error.message
            )
        }
    })
}