import mongoose from "mongoose"

export const connectionDB = async() => {
    const URI = process.env.MONGO_URI;
    console.log("Mongo URI:", URI)
    try {
        const conn = await mongoose.connect(URI)
        console.log(`mongoDB connected successfully ${conn.connection.host}`)
    } catch(err) {
        console.log("MongoDB connection error",err)
        process.exit(1) // code 1 -> exit with error 0 -> success
    }
}