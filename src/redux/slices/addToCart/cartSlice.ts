import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../products/productSlice'

const data =
  localStorage.getItem('cart') !== null ? JSON.parse(String(localStorage.getItem('cart'))) : []

export type CartItems = {
  cartItem: Product[]
  cartTotal: number
  cartTotalAmount: number
}

const initialState: CartItems = {
  cartItem: data,
  cartTotal: 0,
  cartTotalAmount: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItem.push(action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItem))
    },
    removeCart: (state, action) => {
      state.cartItem = state.cartItem.filter((item) => item._id !== action.payload)
      localStorage.setItem('cart', JSON.stringify(state.cartItem))
    }
  }
})
export const { addToCart, removeCart } = cartSlice.actions
export default cartSlice.reducer
