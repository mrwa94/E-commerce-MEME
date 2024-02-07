import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button
} from '@material-tailwind/react'
import { MdDelete } from 'react-icons/md'
import { removeCart } from '../redux/slices/addToCart/cartSlice'
import Payment from '../components/products/Payment'

const Cart = () => {
  const { cartItem } = useSelector((state: RootState) => state.cart)
  const dispatch: AppDispatch = useDispatch()

  const handleDeleteItem = (id: string) => {
    dispatch(removeCart(id))
  }
  return (
    <div className="m-5 p-5 flex  flex-col justify-center text-left">
      <Typography variant="h6">
        You have {cartItem.length > 0 ? cartItem.length : 0} in you cart .
      </Typography>
      {cartItem.length > 0 &&
        cartItem.map((item) => (
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
              <Button
                className=" bg-deep-orange-900 "
                onClick={() => handleDeleteItem(String(item._id))}>
                <MdDelete />
              </Button>
            </CardFooter>
          </Card>
        ))}

      <div>
        <Button>payment</Button>
      </div>
    </div>
  )
}
export default Cart
