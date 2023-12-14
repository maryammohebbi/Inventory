import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCategory } from '../features/category/categorySlice'

function CategoryForm() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const dispatch = useDispatch()

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(!title || !description) return
        dispatch(addCategory({title, description}))
        setTitle("")
        setDescription("")
    }
  return (
    <div className='section'>
        <section>
            <div className="mb-5" id="category-wrapper">
                <h1 className="text-slate-400 font-bold">Add New Category</h1>
                <form onSubmit={handleSubmit} className= "bg-slate-700 p-5 flex flex-col gap-y-6 rounded-lg"> 
                    <div>
                        <label className="block mb-1 text-slate-400">Category Title:</label>
                        <input 
                            value={title}
                            onChange={(e)=> setTitle(e.target.value)}
                            type="text" name="category-title" id="category-title" placeholder="Title..." 
                            className="bg-transparent border border-slate-500 p-2 rounded text-slate-300 focus:ring-slate-300"/>
                    </div>
                    <div>
                        <label className="block mb-1 text-slate-400">Category Description:</label>
                        <textarea 
                            value={description}
                            onChange={(e)=> setDescription(e.target.value)}
                            name="category-description" id="category-description" cols="30" rows="10" 
                            className="w-full h-20 bg-transparent border border-slate-500 rounded text-slate-300 focus:ring-slate-400"></textarea>
                    </div>
                    <div className="flex gap-x-2">
                        <button id="cancel-new-category" className="flex-1 border border-slate-500 py-3 px-7 text-xs rounded text-slate-300 bg-transparent">Cancel</button>
                        <button id="add-new-category" className="flex-1 border border-slate-500 bg-slate-300 py-3 px-7 text-xs rounded text-slate-700">Add New Category</button>
                    </div>
                </form>
            </div>
            <button id="toggle-add-category" className=" text-slate-500 text-lg mb-5">Add New Category?</button>
        </section>
    </div>
  )
}

export default CategoryForm