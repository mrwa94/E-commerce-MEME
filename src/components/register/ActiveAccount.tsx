import jwtDecode from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography } from '@material-tailwind/react'
import { AppDispatch } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { activeUserAccount } from '../../redux/slices/users/userSlice'

const ActivityAccount = () => {
  const dispatch: AppDispatch = useDispatch()
  const { token } = useParams()
  const decoded = token
  console.log('the decoded token is: ' + decoded)
  const navigate = useNavigate()
  const handleActivate = async () => {
    try {
      dispatch(activeUserAccount(String(token)))
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container m-5 p-5 ">
      <Typography variant="h5"> Click here to active account !</Typography>

      <button onClick={handleActivate}>Active account </button>
    </div>
  )
}

export default ActivityAccount
