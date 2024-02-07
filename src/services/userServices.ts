import axios from 'axios'
import { baseURL } from '../api/api'

//register new user
export const registerUser = async (newUser: FormData) => {
  try {
    const response = await axios.post('http://localhost:3002/api/users/register', newUser)
    const user = response.data.payload.users
    console.log(user)
    return user
  } catch (error) {
    throw new Error('Failed to register the user.')
  }
}
//register new user
export const getSingleProduct = async (slug: string) => {
  try {
    const response = await axios.get(`${baseURL}/products/${slug}`)
    console.log(response.data.payload)
    return response.data.payload
  } catch (error) {
    throw new Error('Failed to get single product.')
  }
}

//activate user
export const activeUser = async (token: string) => {
  try {
    const response = await axios.post(`${baseURL}/users/activate`, { token })
    const user = response.data.payload.users
    return user
  } catch (error) {
    throw new Error('Failed to active the user account' + error)
  }
}

//ban the user from the API
export const banUser = async (id: string) => {
  try {
    const response = await axios.put(`${baseURL}/user/ban/${id}`)
    const user = response.data
    console.log(user)
    return user
  } catch (error) {
    throw new Error('Failed to ban the  user' + error)
  }
}
//un ban the user from the API
export const unBanUser = async (id: string) => {
  try {
    const response = await axios.put(`${baseURL}/user/unban/${id}`)
    const user = response.data
    console.log(user)
    return user
  } catch (error) {
    throw new Error('Failed to un ban the  user')
  }
}

//remove the user from the API
export const removeUser = async (id: string) => {
  try {
    const response = await axios.delete(`${baseURL}/users/${id}`)
    const user = response.data
    console.log(user)
    return user
  } catch (error) {
    throw new Error('Failed to delete the  user' + error)
  }
}

export const grantRole = async (email: string, isAdmin: boolean) => {
  try {
    const response = await axios.put(`${baseURL}/api/auth/grant-role`, { email, isAdmin })
    return response.data
  } catch (error: any) {
    throw new Error('Error when grantRole user: ', error)
  }
}
