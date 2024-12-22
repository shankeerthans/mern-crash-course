import {create} from "zustand";

export const useProductStore = create((set) => (
    {
        products: [],
        setProducts: (products) => set({products}),
        createProduct: async (newProduct) => {
            if (!newProduct.name || !newProduct.image || !newProduct.price) {
                return {success: false, message: 'Please provide all fields.'};
            }
            console.log('Ready to fetch requests');
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct)
            })
            const data = await res.json()
            set((state) => ({products: [...state.products, data.data]}))
            return {success: true, message: 'Product created successfully.'};
        },
        fetchProducts: async () => {
            const res = await fetch('/api/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json()
            set({products: data.data})
        },
        deleteProduct: async (id) => {
            console.log("Deleted Product id:",id)
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json()
            set((state) => ({products: state.products.filter(product => product._id !== id)}))
            if (data.success) {
                return {success: true, message: 'Product deleted successfully.'};
            } else {
                return {success: false, message: 'Product not found.'};
            }
        },
        updateProduct: async (id, newProduct) => {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct)
            })
            const data = await res.json()
            set((state) => ({products: state.products.map((product) => (product._id === id) ? data.data : product)}))
            if (data.success) {
                return {success: true, message: 'Product updated successfully.'};
            } else {
                return {success: false, message: 'Product not found.'};
            }
        }
    }
))