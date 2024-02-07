import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { ToastContainer, toast } from 'react-toastify'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Input, Button, Typography } from '@material-tailwind/react'

import useUserState from '../../hooks/useUserState'
import { signUser } from '../../redux/slices/users/userSlice'

const Login = () => {
  const navigate = useNavigate()
  const { userData } = useUserState()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(signUser(user))
  }, [])

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value }
    })
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (user.email === '' || user.password === '') {
      toast.error('please enter  email and password')
    } else {
      toast.success('Login successfully')
    }
    dispatch(signUser(user))
    if (userData && userData) {
      navigate(`/profile/${userData && userData?.isAdmin ? 'adminProfile' : 'userprofile'}`)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="  sm:w-96 text-center justify-center ml-96 pb-9 ">
      <ToastContainer />
      <Typography variant="h4" color="blue-gray" className="">
        Login
      </Typography>
      <Typography color="gray" className="mt-1 font-normal ">
        Nice to meet you! Enter your info to Login.
      </Typography>
      <div className="mb-1 flex flex-col gap-6  ">
        <Typography variant="h6" color="blue-gray" className="-mb-3 ">
          Your Email
        </Typography>
        <Input
          size="lg"
          value={user.email}
          name="email"
          onChange={handleInputChange}
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: 'before:content-none after:content-none'
          }}
        />
        <Typography variant="h6" color="blue-gray" className="-mb-3">
          Password
        </Typography>
        <Input
          type="password"
          name="password"
          value={user.password}
          onChange={handleInputChange}
          size="lg"
          placeholder="********"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: 'before:content-none after:content-none'
          }}
        />
      </div>
      <Button type="submit" className="mt-6" fullWidth>
        Login
      </Button>
      <Typography className="fon">
        <Link className="nav-link font-medium" to={'/forget-password'}>
          Forget your Password?
        </Link>
      </Typography>

      <Typography color="gray" className="mt-4 text-center font-normal">
        not have an account?{' '}
        <Link to={'/register'} className="font-medium text-gray-900">
          Register Now
        </Link>
      </Typography>
    </form>
  )
}
export default Login
