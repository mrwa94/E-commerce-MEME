import './App.css'
import { useEffect } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Index from './router/Index'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './redux/store'
import { fetchUser } from './redux/slices/users/userSlice'
import { fetchProducts } from './redux/slices/products/productSlice'
import { fetchCategories } from './redux/slices/categories/categoriesSlice'
import { fetchOrder } from './redux/slices/orders/orderSlice'
import './App.css'
function App() {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUser())
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    dispatch(fetchOrder())
  }, [])
  const style = {
    backgroundColor: '#fafafa'
  }
  return (
    <div style={style}>
      <Index />
    </div>
  )
}

export default App
