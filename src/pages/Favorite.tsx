import { useDispatch, useSelector } from 'react-redux'
import { PiShoppingCartSimpleFill } from 'react-icons/pi'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button
} from '@material-tailwind/react'

import useProductState from '../hooks/useProductState'
import { AppDispatch, RootState } from '../redux/store'
import { addToCart } from '../redux/slices/addToCart/cartSlice'

const Favorite = () => {
  const { favoriteItem } = useSelector((state: RootState) => state.favorite)
  const { singleProduct } = useProductState()
  const dispatch: AppDispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart(singleProduct))
  }
  return (
    <div className="m-5 p-5 flex  flex-col justify-center text-left">
      <Typography variant="h6">
        You have {favoriteItem.length > 0 ? favoriteItem.length : 0} in you Favorite .
      </Typography>
      {favoriteItem.length > 0 &&
        favoriteItem.map((item) => (
          <Card key={item._id} className=" w-screen max-w-[48rem] flex-row m-5  ">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none">
              <img src={item.image} alt={item.name} className="h-52 w-52" />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="gray" className="mb-4 uppercase">
                {item.name}
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                {item.description}
              </Typography>
              <Typography>{`${item.price}$`}</Typography>
            </CardBody>
            <CardFooter>
              <Button className=" bg-cyan-600 m-4 " onClick={handleAddToCart}>
                <PiShoppingCartSimpleFill />
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}
export default Favorite
