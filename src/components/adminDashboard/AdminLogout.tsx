import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Card, CardFooter } from '@material-tailwind/react'

import { AdminSidebar } from './AdminSidebar'
import { logoutUser } from '../../redux/slices/users/userSlice'
import { AppDispatch } from '../../redux/store'

export function AdminLogout() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      dispatch(logoutUser())
      navigate('/')
    } catch (error) {
      throw new Error('Could not log out')
    }
  }
  return (
    <div className="flex flex-row ">
      <AdminSidebar />
      <Card className=" h-3/4  w-3/4 p-9">
        <div>
          <Typography variant="h6">Are You sure you want logout ?</Typography>
        </div>

        <CardFooter>
          <Button variant="gradient" color="red" onClick={handleLogout}>
            <span>Logout</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
