import mongoose from 'mongoose'

const sensorDataSchema = new mongoose.Schema({

    timestamp: {
        type: String,
        required: true
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