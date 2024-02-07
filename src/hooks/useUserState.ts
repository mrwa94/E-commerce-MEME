import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

const useUserState = () => {
  const { users, userData, isLoading, error, isLoggedIn, ban, userTerm } = useSelector(
    (state: RootState) => state.users
  )

  return {
    users,
    userData,
    isLoading,
    error,
    isLoggedIn,
    ban,
    userTerm
  }
}

export default useUserState
