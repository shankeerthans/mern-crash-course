import Product from "../models/product.model.js";
import mongoose from 'mongoose'

// Get all the products from Database
export const getProducts = async (req, res) => {
    try {
        const products = Product.find({})
        res.status(200).json({success: true, data: products})
    } catch (e) {
        console.log('Failed to get products from database', error)
        res.status(500).json({success: false, error: e})
    }
}

// Create new product to Database
export const createProduct = async (req, res) => {
    const product = req.body
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: 'Please provide all fields'})
    }
    const newProduct = Product(product)
    try {
        await newProduct.save()
        res.status(201).json({success: true, data: newProduct})
    } catch(error) {
        console.log('Failed to create product to database', error)
        res.status(500).json({success: false, error: error})
    }
}

// Update a product on Database
export const updateProduct = async (req, res) => {
    const productId = req.params.id
    const product = req.body

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({success: false, error: 'Product with ID does not exist'})
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, product, {new:true})
        res.status(200).json({success: true, data: updatedProduct})
    } catch (e) {
        console.log('Failed to update product on database', e)
        res.status(500).json({success: false, error: e})
    }
}

// Delete a product from Database
export const deleteProduct = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({success: false, error: 'Product with ID does not exist'})
    }
    console.log("deleting product from database", id)
    try {
        await  Product.findByIdAndDelete(id)
        res.status(200).json({success: true, data: null})
    } catch (e) {
        console.log('Failed to delete product from database', e)
        res.status(500).json({success: false, error: e})
    }
}