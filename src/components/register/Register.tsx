import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Input, Button, Typography, Avatar } from '@material-tailwind/react'
import { AppDispatch } from '../../redux/store'
import { registerUser } from '../../redux/slices/users/userSlice'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    image: ''
  })

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (user.email === '' || user.password === '' || user.phone === '' || user.name === '') {
      toast.error('please full all fields')
    }
    const formData = new FormData()
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('password', user.password)
    formData.append('phone', user.phone)
    formData.append('image', user.image)

    try {
      dispatch(registerUser(formData))
    } catch (error) {
      throw new Error('Could not register user')
    }

    //  navigate('/Login')
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    //to check if image has there already
    if (event.target.type === 'file') {
      const fileInput = (event.target as HTMLInputElement) || ''
      console.log(fileInput.files?.[0].name)
      setUser((prevState) => {
        return { ...prevState, [event.target.name]: fileInput.files?.[0].name }
      })
    } else {
      setUser((prevState) => {
        return { ...prevState, [event.target.name]: event.target.value }
      })
    }
  }

  return (
    <Card color="transparent" className="text-center  mb-4 ">
      <ToastContainer />
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal ">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form onSubmit={handleSubmit} className="mt-2 mb-1 w-80 rejister ">
        <div className="mb-1 flex flex-col gap-6">
          <label>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Avatar
            </Typography>
          </label>
          <Input
            onChange={handleInputChange}
            type="file"
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />

          <label>
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Full Name
            </Typography>
          </label>

          <Input
            size="lg"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="marwa"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
          <label>
            <Typography variant="h6" color="blue-gray" className="-mb-2">
              Phone number
            </Typography>
          </label>

          <Input
            size="lg"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            placeholder="alsubhi"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
          <label>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
          </label>
          <Input
            size="lg"
            name="email"
            value={user.email}
            type="text"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            onChange={handleInputChange}
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
          <label>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
          </label>
          <Input
            name="password"
            value={user.password}
            onChange={handleInputChange}
            type="text"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{' '}
          <Link to={'/login'} className="font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
  )
}

export default Register
