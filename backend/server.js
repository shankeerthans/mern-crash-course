import express from 'express'
import { connectionDB } from './config/db.js'
import dotenv from 'dotenv'
import productRoutes from './routes/product.router.js'
dotenv.config({ path: "backend/.env" }) // Make sure you add the correct path of your .env

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use("/api/products", productRoutes)

app.listen(port, () => {
    connectionDB()
    console.log('started to listen at port', port)
})
