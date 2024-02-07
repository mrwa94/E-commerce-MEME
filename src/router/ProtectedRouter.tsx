import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import Login from '../components/register/Login'

const ProtectedRouter = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.users)
  return isLoggedIn ? <Outlet /> : <Login />
}

export default ProtectedRouter
