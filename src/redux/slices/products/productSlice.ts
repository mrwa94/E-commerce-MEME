import axios from 'axios'
import { baseURL } from '../../../api/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from '../../store'
import { Category } from '../categories/categoriesSlice'
import { toast } from 'react-toastify'

const productURL = `${baseURL}/products`
export type Product = {
  _id?: string
  name: string
  slug: string
  price: number
  image: File | undefined | string
  quantity: number
  sold?: number
  shipping?: number
  description: string
  createdAt?: string
  updatedAt?: string
  categoryId?: string

  // categories?: number[]
  // category: string
}
export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  singleProduct: Product | undefined
  pagination: {
    currentPage: number
    totalPages: number
    totalProducts: number
  }
}

const initialState: ProductState = {
  products: [],
  error: null,
  isLoading: false,
  searchTerm: '',
  singleProduct: {} as Product,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0
  }
}

//fetch product from API endpoint
export const fetchProducts = createAsyncThunk('product/fetchProducts', async (page: number) => {
  try {
    const response = await axios.get(`${productURL}?page=${page}`)
    const products = response.data.payload.products
    return products
  } catch (error) {
    console.log(error)
  }
})
//Filter products by category
export const fetchFilterProducts = createAsyncThunk('product/fetchFilterProducts', async () => {
  try {
    const response = await axios.get(`${productURL}/filter-products`)
    const products = response.data.payload.products
    return products
  } catch (error) {
    console.log(error)
  }
})

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/products/${slug}`)
      if (!response) {
        throw new Error('No response')
      }

      return response.data.payload
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.errors[0] || error.response?.data.msg)
      }
    }
  }
)

//fetch single product from API endpoint
// export const getSingleProduct = createAsyncThunk('product/fetchProduct', async (_id: string) => {
//   try {
//     const response = await axios.get(`${productURL}/:${_id}`)
//     console.log(response.data.payload)
//     return response.data.payload.payload
//   } catch (error) {
//     console.log(error)
//   }
// })
//get products
//add new product
// export const addNewProduct = createAsyncThunk('users/createUser', async (newProduct: FormData) => {
//   try {
//     const response = await axios.post(productURL, newProduct)
//     console.log(response.data.payload)
//     return response.data.payload
//   } catch (error) {
//     throw new Error('Can not Create Product ')
//   }
// })
// export const createProduct = createAsyncThunk(
//   'product/createProduct',
//   async (newProduct: FormData, { rejectWithValue }) => {
//     try {
//       // console.log('in slice formdata is ')
//       // for (const entry of newProduct.entries()) {
//       //   console.log(` ${entry[0]}, ${entry[1]}`)
//       // }
//       const response = await axios.post(`/api/products`, newProduct, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       })
//       console.log('slice response.data,', response.data)
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error.response.data.message)
//     }
//   }
// )

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (newProduct: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3002/api/products', newProduct)
      console.log(response.data.payload)
      return response.data.payload.payload
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.errors[0] || error.response?.data.msg)
      }
    }
  }
)
export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (updatedProduct: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${productURL}/${updatedProduct.get('slug')}`,
        updatedProduct
      )
      return response.data.payload
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${productURL}/${slug}`)
      console.log(response)
      return slug
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)
// export const newProduct = createAsyncThunk('product/newProduct', async (formData: FormData) => {
//   try {
//     const response = await axios.post(productURL, formData)

//     return response.data
//   } catch (error: any) {
//     throw error.response.data.message
//   }
// })

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    findBySlug: (state, action) => {
      const { slug } = action.payload
      const foundSingleProduct = state.products.find((product) => product.slug === slug)
      if (foundSingleProduct) {
        state.singleProduct = foundSingleProduct
      }
    },
    searchProductByName: (state, action) => {
      state.searchTerm = action.payload
    },
    sortProduct: (state, action) => {
      const sortItem = action.payload
      if (sortItem === 'name') {
        state.products.sort((a, b) => a.name.localeCompare(b.name))
      } else if (sortItem === 'price') {
        state.products.sort((a, b) => Number(a.price) - Number(b.price))
      }
    }
    // addProduct: (state, action: { payload: { product: Product } }) => {
    //   // let's append the new product to the beginning of the array
    //   state.singleProduct = [action.payload.product, ...state.singleProduct]
    // }
    // productsRequest: (state) => {
    //   state.isLoading = true
    // },
    // productsSuccess: (state, action) => {
    //   state.isLoading = false
    //   state.products = action.payload
    // },
    // addProduct: (state, action) => {
    //   // let's append the new product to the beginning of the array
    //   // state.products = [action.payload.product, ...state.products]
    //   state.products.push(action.payload)
    // }
    // removeProduct: (state, action: { payload: { productId: number } }) => {
    //   const filteredItems = state.products.filter(
    //     (product) => product._id !== action.payload.productId
    //   )
    //   state.products = filteredItems
    // }
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.isLoading = false
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.products = action.payload.payload
      })

      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.singleProduct = action.payload
      })

    //updateProduct
    builder
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { _id, name, image, description, categoryId, price, quantity, shipping } =
          action.payload.payload
        const productFound = state.products.find((product) => product._id === _id)
        if (productFound) {
          productFound.name = name
          productFound.image = image
          productFound.description = description
          productFound.categoryId = categoryId
          productFound.price = price
          productFound.quantity = quantity
          productFound.shipping = shipping
        }
        state.isLoading = false
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = state.products.filter((product) => product.slug !== action.payload)
      })

    builder.addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state) => {
        state.isLoading = true
        state.error = null
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.error = action.payload || 'Error'
        state.isLoading = false
      }
    )
  }
})
export const { searchProductByName, findBySlug, sortProduct } = productsSlice.actions

export default productsSlice.reducer
