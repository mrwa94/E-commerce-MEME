import { ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { banUser, clearError, fetchUser, unBanUser } from '../../redux/slices/users/userSlice'
import { AppDispatch } from '../../redux/store'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Avatar, Spinner } from '@material-tailwind/react'
import { Typography, Chip, IconButton, Tooltip } from '@material-tailwind/react'
import { PencilIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { TiDelete } from 'react-icons/ti'
import { FaBan } from 'react-icons/fa'
import { AdminSidebar } from './AdminSidebar'
import SearchInput from '../SearchInput'
import useUserState from '../../hooks/useUserState'
import { removeUser } from '../../redux/slices/users/userSlice'

const ListUsers = () => {
  const { users, isLoading, error, userTerm } = useUserState()
  const dispatch: AppDispatch = useDispatch()
  console.log(error)

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      const toatId = toast.error(error, { onClose: () => dispatch(clearError) })
      setTimeout(() => {
        toast.dismiss(toatId)
      }, 1000)
    }
  }, [error])
  if (isLoading) {
    return <Spinner className="h-16 w-16 text-gray-900/50" />
  }
  if (error) {
    return <p>{error}</p>
  }

  //search users
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    //dispatch(searchUser(event.target.value))
    console.log(event.target.value)
  }
  const searchUsers = userTerm
    ? users.filter((user) => user.name.toLowerCase().includes(userTerm.toLocaleLowerCase()))
    : users

  //     delete user
  const handleDeleteUser = async (_id: string) => {
    dispatch(removeUser(_id))
  }

  //  ban and un ban user
  const handleBanAndUnBan = async (id: string, isBanned: boolean) => {
    try {
      const response = isBanned ? dispatch(unBanUser(id)) : dispatch(banUser(id))
      dispatch(fetchUser())
      console.log(response)
      //?toast ..success message
      toast.success('Operation completed successfully!', {
        position: 'top-right',
        autoClose: 3000
      })
    } catch (error) {
      console.log(error)
      //?toast .. failure message
      toast.success('Operation completed successfully!', {
        position: 'top-right',
        autoClose: 3000
      })
    }
  }

  const TABLE_HEAD = ['Avatar', 'Member', 'Function', 'Status']
  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <div className="container flex flex-col ">
        <SearchInput value={userTerm} handleSearch={handleSearch} />
        <table className="mt-4 w-50 min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    {head}{' '}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {searchUsers.map(({ _id, name, email, isAdmin, isBanned, image }, index) => {
              const isLast = index === users.length - 1
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'
              if (!isAdmin) {
                return (
                  <tr key={email}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">{/* <Avatar src={image} /> */}</div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70">
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={isAdmin ? 'admin' : 'visitor'}
                          color={isAdmin ? 'green' : 'blue-gray'}
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      <Tooltip content="delete User">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            handleDeleteUser(_id)
                          }}>
                          <TiDelete className="h-4 w-4 text-red-900" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content={isBanned ? 'un-ban user' : 'ban user'}>
                        <IconButton
                          variant="text"
                          onClick={() => {
                            handleBanAndUnBan(_id, isBanned)
                          }}>
                          <Chip
                            variant="ghost"
                            size="lg"
                            value={isBanned ? 'unban' : 'ban'}
                            color={isBanned ? 'green' : 'blue-gray'}
                          />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListUsers
