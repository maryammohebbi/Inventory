import { Toaster } from "react-hot-toast"
import CategoryForm from "./components/CategoryForm"
import NavBar from "./components/NavBar"
import ProductForm from "./components/ProductForm"
import ProductList from "./components/ProductList"

function App() {

  return (
    <div>
      <Toaster/>
      <NavBar/>
      <CategoryForm/>
      <ProductForm/>
      <ProductList/>
    </div>
  )
}

export default App
