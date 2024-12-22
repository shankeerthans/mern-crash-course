import express from 'express'
import { connectionDB } from './config/db.js'
import dotenv from 'dotenv'
import productRoutes from './routes/product.router.js'
import path from 'path'

dotenv.config({ path: "backend/.env" }) // Make sure you add the correct path of your .env

const app = express()
const port = process.env.PORT || 8000
const __dirname = path.resolve()

app.use(express.json())
app.use("/api/products", productRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))
    })
}

app.listen(port, () => {
    connectionDB()
    console.log('started to listen at port', port)
})
