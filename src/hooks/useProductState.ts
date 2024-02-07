import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useProductState = () => {
  const { products, isLoading, error, searchTerm, singleProduct, pagination } = useSelector(
    (state: RootState) => state.products
  )

  return {
    products,
    isLoading,
    error,
    searchTerm,
    singleProduct,
    pagination
  }
}

export default useProductState
