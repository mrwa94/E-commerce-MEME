import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'
import { Button, Typography, Card, CardFooter } from '@material-tailwind/react'

import { UserSidebar } from './UserSidebar'
import { logoutUser } from '../../redux/slices/users/userSlice'

export function LogoutUser() {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }
  return (
    <div className="flex flex-row ">
      <UserSidebar />
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
