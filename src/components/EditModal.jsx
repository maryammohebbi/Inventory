import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editProduct } from '../features/products/productSlice';

function EditModal({isOpen, setIsOpen, id, title, quantity, category}) {
  const [editTitle, setEditTitle] = useState(title)
  const [editQuantity, setEditQuantity] = useState(quantity)
  const [editCategory, setEditCategoty] = useState(category)
  const {categories} = useSelector(state=> state.categories)
  const dispatch = useDispatch()

  const handleEdit = (e)=>{
    e.preventDefault()
    dispatch(editProduct({id: id, title: editTitle, quantity: editQuantity, category: editCategory}))
    setIsOpen(false)
  }
  return (
    <div>
        <div 
          onClick={()=> setIsOpen(false)}
          className={`${!isOpen && "hidden"} bg-slate-900 fixed top-0 left-0 right-0 h-full opacity-90 z-10`}>
        </div>

        <div className={`${!isOpen && "hidden"} absolute w-[90%] md:w-[60%] lg:w-[50%] bg-slate-900 z-20 left-[50%] -translate-x-[50%] top-[20%] rounded-lg p-3 shadow-2xl`}>
            <h1 className="text-slate-400 font-bold">Edit Product</h1>
            <form 
              onSubmit={handleEdit}
              className="bg-slate-700 flex flex-col gap-y-6 p-5 rounded-lg">
                <div>
                    <label className="block text-slate-400 mb-1" >Product Title:</label>
                    <input 
                      value={editTitle}
                      onChange={(e)=>setEditTitle(e.target.value)}
                      className="bg-transparent border text-slate-400 border-slate-500 rounded p-2 focus:ring-slate-400" 
                      type="text" name="product-title" id="edit-product-title" placeholder="Product Title..."/>
                </div>
                <div>
                    <label className="block text-slate-400 mb-1 ">Quantity:</label>
                    <input 
                      value={editQuantity}
                      onChange={(e)=> setEditQuantity(e.target.value)}
                      className="bg-transparent rounded border border-slate-400 text-slate-400 focus:ring-slate-400 p-2" 
                      type="number" name="product-quantity" placeholder="Quantity..."/>
                </div>

                <div>
                    <label className="block text-slate-400">Category:</label>
                    <select name="product-category"
                          value={editCategory}
                          onChange={(e)=> setEditCategoty(e.target.value)}
                          className="product-category bg-transparent w-full text-slate-400 focus:ring-slate-400">
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

                <button className="flex-1 bg-slate-300 py-2 rounded text-slate-700 text-md" data-id="">Save Edit Product</button>
            </form>
        </div>

    </div>
  )
}

export default EditModal