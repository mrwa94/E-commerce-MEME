import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { baseURL } from './../../../api/api'

export type Category = {
  _id: string
  name: string | undefined
  slug: string
}

export type categoriesState = {
  categories: Category[]
  isLoading: boolean
  error: null | string
  searchTerm: string
}

const initialState: categoriesState = {
  categories: [],
  isLoading: false,
  error: null,
  searchTerm: ''
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const response = await axios.get(`${baseURL}/categories`)
    return response.data.payload
  } catch (error) {
    throw new Error('failed fetch categories')
  }
})
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (name: string, { rejectWithValue }) => {
    try {
      console.log('name im create  category', name)
      const response = await axios.post(`${baseURL}/categories`, { name })
      console.log(response.data.payload)
      return response.data.payload
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.response.data.msg)
    }
  }
)
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async (categoryData: Partial<Category>, { rejectWithValue }) => {
    try {
      await axios.put(`${baseURL}categories/${categoryData.slug}`, {
        name: categoryData.name
      })
      return categoryData
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

//delete categories
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (_id: string) => {
  try {
    await axios.delete(`${baseURL}/categories/${_id}`)
    return _id
  } catch (error) {
    throw new Error('Failed delete category ')
  }
})

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        console.log(action.payload)
        state.categories = action.payload
        state.isLoading = false
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.slug !== action.payload)
        state.isLoading = false
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload)
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const { name, slug } = action.payload
        const foundCategory = state.categories.find((category) => category.slug === slug)
        if (foundCategory) {
          foundCategory.name = name
        }
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
        state.isLoading = false
        state.error = action.payload
      }
    )
  }
})
export const { clearError } = categoriesSlice.actions
export default categoriesSlice.reducer
