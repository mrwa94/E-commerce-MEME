import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import api from '../../../api/index'
import { baseURL } from '../../../api/api'
import { Orders } from '../orders/orderSlice'

axios.defaults.withCredentials = true
export type User = {
  _id: string
  name: string
  isAdmin: boolean
  isBanned: boolean
  email: string
  password: string
  image: File | undefined | string
  phone: string
  token: string
  orders: Orders['_id'][] //? you should change it ASAP
}
export type UserState = {
  users: User[]
  isLoading: boolean
  isLoggedIn: boolean
  userData: null | User
  userTerm: string
  error: null | string
  ban: boolean
}

export const fetchUser = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await axios.get(`${baseURL}/users`)
    const user = response.data.payload.users
    console.log(user)
    return user
  } catch (error) {
    throw new Error('failed to fetch user')
  }
})

//create new user
export const registerUser = createAsyncThunk('users/register', async (user: FormData) => {
  try {
    const response = await axios.post(`${baseURL}/users/register`, user)
    return response
  } catch (error) {
    throw new Error('Failed to Register User')
  }
})

//active user
export const activeUserAccount = createAsyncThunk(
  'user/activeUserAccount',
  async (token: string) => {
    try {
      const response = await axios.post(`${baseURL}/users/activate`, { token })
      console.log(response.data.payload.payload)
      return response.data.payload.payload
    } catch (error) {
      throw new Error('Failed to activate')
    }
  }
)

//login the user
export const signUser = createAsyncThunk(
  'user/loginUser',
  async (user: object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, user)
      console.log(response.data)
      return response.data.payload
    } catch (error) {
      return rejectWithValue(error.response.data.messsage)
    }
  }
)
//logout the user
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  try {
    const response = await axios.post(`${baseURL}/auth/logout`)
    console.log(response.data)
    return response.data
  } catch (error) {
    throw new Error(error.response.data)
  }
})
//ban the user
export const banUser = createAsyncThunk('users/banUser', async (id: string) => {
  try {
    const response = await axios.put(`${baseURL}/users/ban/${id}`)
    const user = response.data
    console.log(user)
    return user
  } catch (error) {
    throw new Error('Failed to ban the  user' + error)
  }
})
//un ban the user
export const unBanUser = createAsyncThunk('users/unBanUser', async (id: string) => {
  try {
    const response = await axios.put(`${baseURL}/users/unban/${id}`)
    const user = response.data
    console.log(user)
    return user
  } catch (error) {
    throw new Error('Failed to un ban the  user' + error)
  }
})

export const removeUser = createAsyncThunk(
  'user/removeUser',
  async (_id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/users/${_id}`)
      return _id
    } catch (error: any) {
      return rejectWithValue(error.response.data.messsage)
      return
    }
  }
)

export const forgetPassword = createAsyncThunk(
  'user/forgetPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/users/forget-password`, { email: email })
      return response.data.payload
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)
export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}users/reset-password`, {
        password: data.password,
        token: data.token
      })
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await api.put(`${baseURL}/users/${userData._id}`, userData)
      console.log(response)
      return userData
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg)
    }
  }
)

const data =
  localStorage.getItem('loginData') !== null
    ? JSON.parse(String(localStorage.getItem('loginData')))
    : []
const initialState: UserState = {
  users: [],
  isLoading: false,
  isLoggedIn: data.isLoggedIn,
  userData: data.userData,
  userTerm: '',
  error: null,
  ban: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    searchUser: (state, action) => {
      state.userTerm = action.payload
    },
    updateUserProfile: (state, action) => {
      const { _id, name, email, password, phone } = action.payload
      const foundUser = state.users.find((user) => user._id == _id)
      if (foundUser) {
        foundUser.name = name
        foundUser.email = email
        foundUser.password = password
        foundUser.phone = phone
        state.userData = foundUser
      }
    },
    clearError: (state) => {
      state.error = null
    },
    grantRoleLocally: (state, action) => {
      const { email, isAdmin } = action.payload
      const userIndex = state.users.findIndex((user) => user.email === email)

      if (userIndex !== -1) {
        state.users[userIndex].isAdmin = isAdmin
      }
    }
  },

  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.users = action.payload
      state.isLoading = false
    })

    builder
      .addCase(signUser.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.userData = action.payload
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLoggedIn: state.isLoggedIn,
            userData: state.userData
          })
        )
      })
      //logout user
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false
        state.userData = null
        localStorage.setItem(
          'loginData',
          JSON.stringify({
            isLogin: state.isLoggedIn,
            userData: state.userData
          })
        )
      })

    builder.addCase(removeUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user._id === action.payload)
      state.isLoading = false
    })
    builder.addCase(activeUserAccount.fulfilled, (state, action) => {
      state.users = action.payload.payload
      state.isLoading = false
    })
    builder.addCase(banUser.fulfilled, (state, action) => {
      const id = action.payload
      const foundUser = state.users.find((state) => state._id == id)
      if (foundUser) {
        foundUser.isBanned = !foundUser.isBanned
      }
      localStorage.setItem(
        'loginData',
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData
        })
      )
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
        state.error = action.payload || 'error'
      }
    )
  }
})
export const { searchUser, updateUserProfile, clearError } = userSlice.actions
export default userSlice.reducer
