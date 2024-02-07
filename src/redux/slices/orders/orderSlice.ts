import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { Product } from '../products/productSlice'

const baseURL = 'http://localhost:3002/api/orders'

export const fetchOrder = createAsyncThunk('orders/fetchOrder', async () => {
  try {
    const response = await axios.get(baseURL)
    return response.data.payload
  } catch (error) {
    throw new Error('Error fetching order')
  }
})
//delete order
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (_id: string) => {
  try {
    axios.delete(`${baseURL}/${_id}`)
    return _id
  } catch (error) {
    throw new Error('Error delete order')
  }
})
export type Orders = {
  _id: string
  product: Product['_id']
  quantity: number
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Canceled'
  totalAmount: number
  createdAt: string
  shippingAddress: string
}
export type orderState = {
  order: Orders[]
  isLoading: boolean
  error: null | string
  searchTerm: string
}

const initialState: orderState = {
  order: [],
  isLoading: false,
  error: null,
  searchTerm: ''
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload
        state.isLoading = false
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.order = state.order.filter((orderItem) => orderItem._id !== action.payload)
        state.isLoading = false
      })

      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true
          state.error = null
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.error = action.payload || 'Error'
          state.isLoading = false
        }
      )
  }
})

export default orderSlice.reducer
