import express from 'express'
import dotenv from 'dotenv'
import { connectionDB } from './config/db.js'
import Product from './models/product.model.js'

dotenv.config()
const app = express()
app.use(express.json())

app.post('/api/products', async (req, res) => {
    const product = req.body
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: 'Please provide all fields'})
    }
    const newProduct = Product(product)
    try {
        await newProduct.save()
        res.status(201).json({success: true, data: newProduct})
    } catch(error) {
        console.log('Failed to save product to database', error)
        res.status(500).json({success: false, error: error})
    }
})

app.delete('/api/products/:id', async (req, res) => {
    const {id} = req.params
    console.log("deleting product from database", id)

    try {
        await  Product.findByIdAndDelete(id)
        res.status(200).json({success: true, data: null})
    } catch (e) {
        console.log('Failed to delete product from database', e)
        res.status(500).json({success: false, error: e})
    }
})

app.listen(8000, () => {
    connectionDB()
    console.log('started to listen at port 8000')
})
