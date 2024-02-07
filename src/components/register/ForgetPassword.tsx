import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { forgetPassword } from '../../redux/slices/users/userSlice'
import { Button, Input, Typography } from '@material-tailwind/react'
const ForgetPassword = () => {
  const dispatch = useDispatch<AppDispatch>()

  const [email, setEmail] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(forgetPassword(email))
    console.log('email has been send')
    toast.success('check your email to reset your password')
  }

  return (
    <form onSubmit={handleSubmit} className="  sm:w-96 text-center justify-center ml-96 pb-9 ">
      <ToastContainer />
      <Typography variant="h4" color="blue-gray" className="">
        Reset Password
      </Typography>
      <div className="mb-1 flex flex-col gap-6  ">
        <Typography variant="h6" color="blue-gray" className="-mb-3 ">
          Your Email
        </Typography>
        <Input
          size="lg"
          value={email}
          name="email"
          onChange={handleChange}
          placeholder="name@mail.com"
          className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
          labelProps={{
            className: 'before:content-none after:content-none'
          }}
        />
      </div>
      <Button type="submit" className="mt-6" fullWidth>
        Reset Password
      </Button>
    </form>
  )
}

export default ForgetPassword
