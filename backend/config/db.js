import mongoose from "mongoose"

export const connectionDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongoDB connected successfully ${conn.connection.host}`)
    } catch(err) {
        console.log(err)
        process.exit(1) // code 1 -> exit with error 0 -> success
    }
}