import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./category/categorySlice";
import productReducer from "./products/productSlice";

const store = configureStore({
    reducer:{
        categories: categoryReducer,
        products: productReducer
    }
})

export default store