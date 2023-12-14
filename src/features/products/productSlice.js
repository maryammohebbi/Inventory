import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../category/categorySlice";

export const getProducts = createAsyncThunk("products/getProducts", async (_ , {rejectWithValue})=> {
    try {
        const {data} = await api.get("/products")
        return data

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const addProduct = createAsyncThunk("product/addProduct", async(payload, {rejectWithValue})=>{
    try {
        const {data} = await api.post("/products", {
            id: Date.now(),
            title: payload.prodTitle,
            quantity: payload.prodQuantity,
            category: payload.prodCat,
            createdAt: new Date().toISOString(),
        })
        return data

    } catch (error) {
        return rejectWithValue(error.message)        
    }
})

export const deleteProduct = createAsyncThunk("product/deleteProduct", async(payload, {rejectWithValue})=>{
    try {
        await api.delete(`/products/${payload.id}`)
        return {id: payload.id}
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: ""
    },
    extraReducers: (builder)=> {
        builder
        .addCase(getProducts.pending, (state, action)=>{
            state.products = []
            state.loading = true
            state.error = ""
        })
        .addCase(getProducts.fulfilled, (state, action)=>{
            state.products = action.payload
            state.loading = false
            state.error = ""
        })
        .addCase(getProducts.rejected, (state, action)=>{
            state.products = []
            state.loading = false
            state.error = action.payload
        })
        .addCase(addProduct.pending, (state, action)=> {
            state.loading = true
        })
        .addCase(addProduct.fulfilled, (state, action)=> {
            state.products.push(action.payload)
            state.loading = false
        })
        .addCase(deleteProduct.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(deleteProduct.fulfilled, (state, action)=>{
            state.products = state.products.filter(product => product.id !== Number(action.payload.id))
            state.loading = false
            state.error = ""
        })
        .addCase(deleteProduct.rejected, (state, action)=>{
            state.products = []
            state.loading = false
            state.error = action.payload
        })
    }
})

export default productSlice.reducer