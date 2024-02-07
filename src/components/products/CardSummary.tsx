import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import CardProducts from './CardProducts'
import { Typography } from '@mui/material'
import { fetchProducts } from '../../redux/slices/products/productSlice'

const CardSummary = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { products } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchProducts)
  }, [])

  return (
    <div className="container text-center ml-4 ">
      <Typography variant="h5">Explore Categories</Typography>
      <div className=" grid  grid-cols-2 md:grid-cols-4 w-full ml-12 ">
        {products.length > 0 &&
          products.map((product) => (
            <CardProducts
              key={product._id}
              price={product.price}
              image={product.image as string}
              name={product.name}
              description={product.description}
              quantity={product.quantity}
              category={product.category}
            />
          ))}
      </div>
    </div>
  )
}

export default CardSummary
