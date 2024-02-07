import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../products/productSlice'

const data =
  localStorage.getItem('favorite') !== null
    ? JSON.parse(String(localStorage.getItem('favorite')))
    : []

export type FavoriteItems = {
  favoriteItem: Product[]
  favoriteTotal: number
  favoriteTotalAmount: number
}

const initialState: FavoriteItems = {
  favoriteItem: data,
  favoriteTotal: 0,
  favoriteTotalAmount: 0
}

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite(state, action) {
      state.favoriteItem.push(action.payload)
      localStorage.setItem('favorite', JSON.stringify(state.favoriteItem))
    },
    removeFavorite: (state, action) => {
      state.favoriteItem = state.favoriteItem.filter((item) => item._id !== action.payload)
      localStorage.setItem('favorite', JSON.stringify(state.favoriteItem))
    }
  }
})
export const { addToFavorite, removeFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
