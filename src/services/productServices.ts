import axios from 'axios'
import { baseURL } from '../api/api'
import { createAction } from '@reduxjs/toolkit'
import { Product } from '../redux/slices/products/productSlice'
import { AppDispatch } from '../redux/store'

const productURL = `${baseURL}/products`

// export const getProductById = async (_id: string) => {
//   try {
//     const response = await axios.get(`${baseURL}/product/${_id}`)
//     console.log(response.data.payload)
//     return response.data.payload.product
//   } catch (error) {
//     throw new Error('Cannot get single Product ')
//   }
// }
// export const createProduct = async (newProduct: FormData) => {
//   try {
//     const response = await axios.post(`${productURL}`, newProduct)
//     return response.data.payload
//   } catch (error) {
//     throw new Error('Can not Create Product ')
//   }
// }
// //add new product
// export const addNewProduct = async (newProduct: FormData) => {
//   try {
//     const response = await axios.post(productURL, newProduct)
//     console.log(response.data)
//     return response.data
//   } catch (error) {
//     throw new Error('Cannot Create Product ')
//   }
// }

//update product
// export const updateProduct = async (id: string) => {
//   try {
//     const response = await axios.put(`${productURL}/${id}`)
//     const product = response.data
//     console.log(product)
//     return product
//   } catch (error) {
//     throw new Error('Error updating product' + error)
//   }
// }
