import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import categoriesSlice from './slices/categories/categoriesSlice'
import userSlice from './slices/users/userSlice'
import orderSlice from './slices/orders/orderSlice'
import cartSlice from './slices/addToCart/cartSlice'
import favoriteSlice from './slices/addToFavorite/favoriteSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesSlice,
    users: userSlice,
    orders: orderSlice,
    cart: cartSlice,
    favorite: favoriteSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
