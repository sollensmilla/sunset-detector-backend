import mongoose from 'mongoose'

const sensorDataSchema = new mongoose.Schema({

    deviceTimestamp: {
        type: String,
        required: true
    },

    serverTimestamp: {
        type: Date,
        default: Date.now
    },

    lux: {
        type: Number,
        required: true
    },

    cct: {
        type: Number,
        default: null
    },

    rgb: {

        r: Number,
        g: Number,
        b: Number
    }

}, {
    timestamps: true
})

export default mongoose.model(
    'SensorData',
    sensorDataSchema
)