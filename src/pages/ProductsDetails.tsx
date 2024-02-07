import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProducts,
  fetchSingleProduct,
  searchProductByName
} from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import { Reviews } from '../components/products/Reviews'
import { Card, Button, Chip } from '@material-tailwind/react'
import { CardMedia } from '@mui/material'
import { addToCart } from '../redux/slices/addToCart/cartSlice'
import { Typography } from '@mui/material'
import { MdOutlineFavorite } from 'react-icons/md'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import useProductState from '../hooks/useProductState'
import { addToFavorite } from '../redux/slices/addToFavorite/favoriteSlice'
const ProductsDetails = () => {
  const { slug } = useParams()
  const { singleProduct } = useProductState()
  const { categories } = useSelector((state: RootState) => state.categories)

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  console.log(slug)
  useEffect(() => {
    if (slug) {
      dispatch(fetchSingleProduct(slug))
    }
  }, [dispatch, slug])

  const handleAddToCart = () => {
    dispatch(addToCart(singleProduct))
  }
  const handleAddToFaviorte = () => {
    dispatch(addToFavorite(singleProduct))
  }
  const getCategoryName = (id: string) => {
    const categoryFound = categories.find((category) => category._id === id)

    return categoryFound ? categoryFound.name : 'No category assigned'
  }

  return (
    <div>
      <Card className="  pt-5  w-4/5  m-32">
        {singleProduct && (
          <div className="flex flex-row  justify-around">
            <CardMedia
              className=" border-x-cyan-800"
              sx={{ maxHeight: 400, maxWidth: 350 }}
              component="img"
              image={singleProduct.image}
              alt={singleProduct.name}
            />

            <div className="flex flex-col text-left text-black">
              <Typography variant="h5" sx={{ paddingBottom: 1 }}>
                Product Details{' '}
              </Typography>
              <p className=" text-xl pb-4">{singleProduct.description}</p>
              <Typography variant="h6">
                Name :
                <Chip
                  className=" shadow-sm inline"
                  variant="ghost"
                  value={singleProduct.name}></Chip>
              </Typography>

              <Typography variant="h6">
                Price :
                <Chip
                  className=" shadow-sm inline"
                  variant="ghost"
                  value={singleProduct.price}></Chip>
              </Typography>
              <Typography variant="h6">
                Category :
                <Chip
                  className=" shadow-sm inline"
                  variant="ghost"
                  value={getCategoryName(String(singleProduct.categoryId))}></Chip>
              </Typography>
              <div>
                <div className="mt-9 pt-3 mb-3">
                  <button className=" text-2xl mx-3 ">
                    <MdOutlineFavorite color="#be123c" onClick={handleAddToFaviorte} />
                  </button>
                  <button onClick={handleAddToCart} className="text-2xl">
                    <PiShoppingCartSimpleFill />
                  </button>

                  <Button
                    variant="text"
                    className="flex items-center gap-2"
                    onClick={() => navigate('/products')}>
                    Go Back
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-4 w-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
      <Typography variant="h5">Reviews</Typography>
      <div className="flex flex-row mb-5 ">
        <Card className="m-5 shadow-lg p-5 ">
          <Reviews />
        </Card>
        <Card className="m-5 shadow-lg p-5">
          <Reviews />
        </Card>
        <Card className="m-5 shadow-lg p-5">
          <Reviews />
        </Card>
      </div>
    </div>
  )
}

export default ProductsDetails
