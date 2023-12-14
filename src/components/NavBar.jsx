import React from 'react'
import { useSelector } from 'react-redux'

function NavBar() {
  const {products} = useSelector(state => state.products)
  return (
    <div className="h-12 flex items-center justify-center gap-x-3 bg-slate-700 mb-5">
        <h1 className="text-xl font-bold text-slate-300">Inventory App</h1>
        <span 
          id="product-numbers" 
          className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500  border-2 border-slate-300 font-bold text-slate-300">
            {products.length}
          </span>
    </div>
  )
}

export default NavBar