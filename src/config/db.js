import mongoose from 'mongoose'

/**
 * Connects to the MongoDB database using the connection string from environment variables. Logs success or error messages accordingly.
 * Exits the process with an error code if the connection fails.
 */
export const connectDB = async () => {

    try {

        await mongoose.connect(
            process.env.MONGO_URI
        )

        console.log('MongoDB connected')

    } catch (error) {

        console.error(
            'MongoDB connection error:',
            error
        )

        process.exit(1)
    }
}