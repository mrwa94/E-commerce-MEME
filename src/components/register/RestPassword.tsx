import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { resetPassword } from '../../redux/slices/users/userSlice'
import { ToastContainer, toast } from 'react-toastify'
import { Button, Input, Typography } from '@material-tailwind/react'

const RestPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const [password, setPassword] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch(resetPassword({ password, token }))
    //use toast
    toast.success('Reset Password successfully')
    navigate('/login')
  }
  return (
    <form onSubmit={handleSubmit} className="  sm:w-96 text-center justify-center ml-96 pb-9 ">
      <ToastContainer />
      <Typography variant="h4" color="blue-gray" className="">
        Reset Password
      </Typography>
      <div className="mb-1 flex flex-col gap-6  ">
        <Typography variant="h6" color="blue-gray" className="-mb-3 ">
          add new password
        </Typography>
        <Input
          size="lg"
          value={password}
          name="password"
          onChange={handleChange}
          placeholder="******"
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

export default RestPassword
