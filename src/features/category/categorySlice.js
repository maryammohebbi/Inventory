import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000"
})

export const getCategories = createAsyncThunk("categories/getCategories", async(_ , {rejectWithValue})=>{
    try {
        const {data} = await api.get("/categories")
        return data

    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const addCategory = createAsyncThunk("category/addCategory", async(payload, {rejectWithValue})=>{
    try {
        const {data} = await api.post("/categories", {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            title: payload.title,
            description: payload.description
        })
        return data

    } catch (error) {
        return rejectWithValue(error.message)
    }
})


const categorySlice = createSlice({
    name: "categories",
    initialState: {
        categories: [],
        loading: false,
        error: ""
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getCategories.pending, (state, action)=> {
            state.categories= []
            state.loading= true
            state.error= ""
        })
        .addCase(getCategories.fulfilled, (state, action)=> {
            state.categories = action.payload
            state.loading = false
            state.error = ""
        })
        .addCase(getCategories.rejected, (state, action)=>{
            state.categories= []
            state.loading= false
            state.error = action.payload
        })
        .addCase(addCategory.pending, (state, action)=>{
            state.loading = true
        })
        .addCase(addCategory.fulfilled, (state, action)=>{
            state.categories.push(action.payload)
            state.loading = false
        })
    }
})

export default categorySlice.reducer