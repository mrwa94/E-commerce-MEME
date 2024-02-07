import Card from '@mui/material/Card'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { MdOutlineFavorite } from 'react-icons/md'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'

import { AppDispatch } from '../../redux/store'
import { addToCart } from '../../redux/slices/addToCart/cartSlice'
import useProductState from '../../hooks/useProductState'
import { Product } from '../../redux/slices/products/productSlice'
import { addToFavorite } from '../../redux/slices/addToFavorite/favoriteSlice'

const CardProducts = (props: Product) => {
  const { singleProduct } = useProductState()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handleAddToCart = () => {
    dispatch(addToCart(singleProduct))
  }
  const handleAddToFavorite = () => {
    dispatch(addToFavorite(singleProduct))
  }

  return (
    <Card sx={{ maxWidth: 300, padding: 1, margin: 2 }}>
      <CardMedia
        sx={{ maxHeight: 200 }}
        component="img"
        alt={props.name}
        image={props.image}
        onClick={() => navigate(`/product/${props.slug}`)}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions className="sm:gap-24 lg:gap-36">
        <div>
          <button className=" text-2xl" onClick={handleAddToFavorite}>
            <MdOutlineFavorite className="mx-1 lg:mx-2" color="#be123c" />
          </button>
          <button className="text-2xl" onClick={handleAddToCart}>
            <PiShoppingCartSimpleFill />
          </button>
        </div>
        <Typography gutterBottom variant="body2" component="div">
          {props.price}
        </Typography>
      </CardActions>
    </Card>
  )
}

export default CardProducts
