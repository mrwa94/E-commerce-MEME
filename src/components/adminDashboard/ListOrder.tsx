import { useEffect } from 'react'
import { TiDelete } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { Chip, IconButton, Spinner, Tooltip, Typography } from '@material-tailwind/react'

import { AdminSidebar } from './AdminSidebar'
import { AppDispatch, RootState } from '../../redux/store'
import { deleteOrder, fetchOrder } from '../../redux/slices/orders/orderSlice'

const ListOrder = () => {
  const { order, isLoading, error } = useSelector((state: RootState) => state.orders)
  const dispatch: AppDispatch = useDispatch()
  const TABLE_HEAD = [
    'order Id',
    'totalAmount',
    'shippingAddress',
    'createdAt',
    'status',
    'function'
  ]
  console.log(order)
  useEffect(() => {
    dispatch(fetchOrder())
  }, [])

  if (isLoading) {
    return <Spinner className="h-16 w-16 text-gray-900/50" />
  }
  if (error) {
    return <p>{error}</p>
  }
  const handleDeleteOrder = (_id: string) => {
    dispatch(deleteOrder(_id))
  }
  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <div className="w-full content-center m-10">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order.map((item, index) => {
              const isLast = index === order.length - 1
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

              return (
                <tr key={item._id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item._id}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {`${item.totalAmount}$`}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.shippingAddress}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {item.createdAt}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={item.status}
                          color={
                            item.status == 'Pending'
                              ? 'red'
                              : item.status == 'Shipped'
                              ? 'red'
                              : item.status == 'Delivered'
                              ? 'red'
                              : item.status == 'Canceled'
                              ? 'red'
                              : 'red'
                          }
                        />
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Tooltip content="delete order">
                          <IconButton variant="text" onClick={() => handleDeleteOrder(item._id)}>
                            <TiDelete className="h-4 w-4 text-red-900" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListOrder
