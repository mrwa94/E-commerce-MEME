import { Outlet } from 'react-router-dom'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import Login from '../components/register/Login'

const AdminRouter = () => {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.users)
  return isLoggedIn && userData?.isAdmin ? <Outlet /> : <Login />
}

export default AdminRouter
