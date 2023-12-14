import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../features/category/categorySlice'
import {addProduct} from "../features/products/productSlice"

function ProductForm() {
    const [prodTitle, setProdTitle] = useState("")
    const [prodQuantity, setProdQuantity] = useState(0)
    const [prodCat, setProdCat] = useState("")

    const {categories} = useSelector(state => state.categories)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCategories())
    }, [])

    const handleSubmit = (e)=> {
        e.preventDefault()
        dispatch(addProduct({prodTitle, prodQuantity, prodCat}))
        setProdTitle("")
        setProdQuantity(0)
        setProdCat("")
    }
  return (
    <div className="section mb-5">
        <h1 className="text-slate-400 font-bold">Add New Product</h1>
        <form 
            onSubmit={handleSubmit}
            className="bg-slate-700 flex flex-col gap-y-6 p-5 rounded-lg">
            <div>
                <label className="block text-slate-400 mb-1">Product Title:</label>
                <input 
                    value={prodTitle}
                    onChange={(e)=> setProdTitle(e.target.value)}
                    className="bg-transparent border text-slate-400 border-slate-500 rounded p-2 focus:ring-slate-400" 
                    type="text" name="product-title" id="product-title" placeholder="Product Title..."/>
            </div>
            <div>
                <label className="block text-slate-400 mb-1">Quantity:</label>
                <input 
                    value={prodQuantity}
                    onChange={(e)=> setProdQuantity(e.target.value)}
                    className="bg-transparent rounded text-slate-400 focus:ring-slate-400 p-2" 
                    type="number" name="product-quantity" id="product-quantity" placeholder="Quantity..."/>
            </div>
            <div>
                <label className="block text-slate-400">Category:</label>
                <select 
                    value={prodCat}
                    onChange={(e)=>setProdCat(e.target.value)}
                    name="product-category" 
                    id="product-category" 
                    className="bg-transparent w-full text-slate-400 focus:ring-slate-400">
                        <option className="text-slate-400 bg-slate-800" >Select a category</option>
                        {
                            categories.map(category => {
                                return(
                                    <option 
                                        key={category.id} 
                                        value={category.title}
                                        className="text-slate-400 bg-slate-800">
                                            {category.title}
                                        </option>
                                )
                            })
                        }
                </select>
            </div>
            <button  id="add-new-product" 
                className="flex-1 bg-slate-300 py-2 rounded text-slate-700 text-md">Add New Product</button>
        </form>
    </div>
  )
}

export default ProductForm