import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { api } from "../category/categorySlice";
import supabase from "../../supabase";

export const getProducts = createAsyncThunk("products/getProducts", async (_ , {rejectWithValue})=> {
    try {
        // const {data} = await api.get("/products")
        // return data
        const {data} = await supabase
        .from("products")
        .select("*")

        return data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const addProduct = createAsyncThunk("product/addProduct", async(payload, {rejectWithValue})=>{
    try {
        // const {data} = await api.post("/products", {
        //     id: Date.now(),
        //     title: payload.prodTitle,
        //     quantity: payload.prodQuantity,
        //     category: payload.prodCat,
        //     createdAt: new Date().toISOString(),
        // })
        // return data

        const {data} = await supabase
        .from("products")
        .insert({
            id: Date.now(),
            title: payload.prodTitle,
            quantity: payload.prodQuantity,
            category: payload.prodCat,
            createdAt: new Date().toISOString(),
        })
        .select()

        return data[0]

    } catch (error) {
        return rejectWithValue(error.message)        
    }
})

export const deleteProduct = createAsyncThunk("product/deleteProduct", async(payload, {rejectWithValue})=>{
    try {
        // await api.delete(`/products/${payload.id}`)
        // return {id: payload.id}

        await supabase
        .from("products")
        .delete()
        .eq("id", payload.id)

        return {id: payload.id}
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const editProduct = createAsyncThunk("product/editproduct", async(payload, {rejectWithValue})=> {
    try {
        // const {data} = await api.patch(`/products/${payload.id}`, {
        //     title: payload.title,
        //     quantity: payload.quantity,
        //     category: payload.category
        // })
        // return data

        const {data} = await supabase
        .from("products")
        .update({
            title: payload.title,
            quantity: payload.quantity,
            category: payload.category
        })
        .eq("id", payload.id)
        .select()

        return data
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
        .addCase(editProduct.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(editProduct.fulfilled, (state, action)=> {
            state.loading = false
            const selectedProduct = state.products.find(product => product.id === Number(action.payload[0].id))
            selectedProduct.title = action.payload[0].title
            selectedProduct.quantity = action.payload[0].quantity
            selectedProduct.category = action.payload[0].category
        })
    }
})

export default productSlice.reducer