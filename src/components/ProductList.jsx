import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProducts } from '../features/products/productSlice'
import toast from 'react-hot-toast'
import EditModal from './EditModal'
import { IoTrashBin } from "react-icons/io5"
import { FaEdit } from "react-icons/fa"

function ProductList() {
    const {products, loading, error} = useSelector(state=> state.products)
    const [query, setQuery] = useState("")
    const [filteredProducts, setFilteredProducts] = useState([])
    const [sort, setSort] = useState("latest")

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProducts())
    }, [])

     useEffect(()=>{
        const filtered = products.filter(product => product.title.toLowerCase().includes(query.toLowerCase()))
        const sortedProducts = sortProducts(filtered, sort);
        setFilteredProducts(sortedProducts)
     }, [query, products, sort])

     const sortProducts = (products, sortOption) => {
        return [...products].sort((a, b) => {
          if (sortOption === 'latest') {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else if (sortOption === 'earliest') {
            return new Date(a.createdAt) - new Date(b.createdAt);
          }
        });
      };

  return (
    <div className='section'>
        <h1 className="text-slate-400 font-bold mb-5">Products list:</h1>            
        <Search query={query} setQuery={setQuery}/>
        <SortProduct sort={sort} setSort={setSort}/>
        <div id="product-list">
            {
                loading ? ( <p className='font-bold text-yellow-50'>Loading ...</p> ) : error ? (toast.error(error)) : (
                    filteredProducts.map(product => {
                        return(
                            <div key={product.id} className="flex items-center justify-between mb-5">
                                <span className="text-slate-300 text-sm font-bold">{product.title}</span>
                                <div className="flex items-center gap-x-2">
                                    <span className="text-slate-400 text-sm">{new Date().toLocaleDateString("fa-IR")}</span>
                                    <span className="text-slate-500 border border-slate-500 px-2 rounded-xl">{product.category}</span>
                                    <span className="border-2 border-slate-300 rounded-full w-6 h-6 bg-slate-500 font-bold flex items-center justify-center p-2 text-slate-300">{product.quantity}</span>
                                    <EditProduct {...product}/>
                                    <DeleteProduct {...product}/>
                                </div>
                            </div> 
                        )
                    })
                )
            }
        </div>
    </div>
  )
}

export default ProductList

function DeleteProduct({id}){
    const dispatch = useDispatch()
    return(
        <button 
            onClick={()=> dispatch(deleteProduct({id}))}
            className="text-red-400 text-sm font-bold">
            <IoTrashBin className='w-5 h-5'/>
        </button>
    )
}

function EditProduct({id, title, quantity, category}){
    const [isOpen, setIsOpen] = useState(false)
    return(
        <div>
            <button 
                onClick={()=>setIsOpen((is)=> !is)}
                className="text-blue-400 text-sm font-bold">
                <FaEdit className='w-5 h-5'/>
            </button>

            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} id={id} title={title} quantity={quantity} category={category}/>
        </div>
    )
}

function Search({query, setQuery}){

    return(
        <div className="flex items-center justify-between mb-5">
            <label className="block text-slate-400">Search</label>
            <input 
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                className="bg-transparent rounded-lg text-slate-400 focus:ring-slate-400" 
                type="text" placeholder="Search products..." name="search-input"/>
        </div>
    )
}

function SortProduct({sort, setSort}){
    const handleSort = (e) => {
        setSort(e.target.value);
      }
    return(
        <div className="flex items-center justify-between mb-5">
            <label className="text-slate-400">Sort Products</label>
            <select 
                onChange={handleSort}
                value={sort}
                name="sort-products" className="bg-transparent text-slate-400 focus:ring-slate-400 rounded-lg text-sm">
                {/* <option className="bg-slate-800 text-slate-400">Select an option</option> */}
                <option 
                    className="bg-slate-800 text-slate-400" 
                    value="latest">
                        Latest
                    </option>
                <option 
                    className="bg-slate-800 text-slate-400" 
                    value="earliest">
                        Earliest
                    </option>
            </select>
        </div>
    )
}
