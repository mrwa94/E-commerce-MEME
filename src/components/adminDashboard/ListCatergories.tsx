import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'

import {
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
  Spinner,
  Dialog,
  IconButton,
  Tooltip
} from '@material-tailwind/react'
import { PencilIcon } from '@heroicons/react/24/solid'
import { TiDelete } from 'react-icons/ti'
import { AdminSidebar } from './AdminSidebar'
import {
  fetchCategories,
  deleteCategory,
  createCategory,
  clearError,
  Category
} from '../../redux/slices/categories/categoriesSlice'
import { toast } from 'react-toastify'

const ListCatergories = () => {
  const { categories, error } = useSelector((state: RootState) => state.categories)
  const [categoryName, setCategoryName] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  const handelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value)
  }
  useEffect(() => {
    if (error) {
      const toastId = toast.error(error, {
        onClose: () => {
          dispatch(clearError())
        }
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 1000)
    }
  }, [error])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(!open)
  const TABLE_HEAD = ['Categories Name', 'Status']

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log(categoryName)
    dispatch(createCategory(categoryName))
    setOpen(!open)
  }

  //open form to create a new category
  const handleCreateForm = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (error) {
      const toastId = toast.error(error, {
        onClose: () => {
          dispatch(clearError())
        }
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 1000)
    }
  }, [error])

  // delete categories
  const handleDeleteCategories = (slug: string) => {
    dispatch(deleteCategory(slug))
  }

  const handleEditCategory = (slug: string, name: string) => {
    setCategoryName(slug)
    // setIsEdit(!isEdit)
    setCategoryName(name)
  }

  return (
    <div>
      <div className="flex flex-row">
        <AdminSidebar />
        <div className="flex flex-col w-full ">
          <div className="flex flex-row  gap-96">
            <Button className=" rounded-full text-2xl  " onClick={handleCreateForm}>
              +
            </Button>
          </div>
          <div>
            <Dialog className=" w-full" open={open} handler={handleCreateForm}>
              <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-between">
                  <DialogHeader className="flex flex-col items-start">
                    {' '}
                    <Typography variant="h4">Create Category</Typography>
                  </DialogHeader>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-3 h-5 w-5"
                    onClick={handleOpen}>
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <DialogBody>
                  <div className="grid gap-6">
                    <Typography className="-mb-1" color="blue-gray" variant="h6">
                      Category Name
                    </Typography>
                    <Input
                      label="Computer"
                      value={categoryName}
                      name="categoryName"
                      onChange={handelChange}
                    />
                  </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                  <Button variant="text" color="gray" onClick={handleOpen}>
                    cancel
                  </Button>
                  <Button variant="gradient" color="gray" type="submit">
                    Create Category
                  </Button>
                </DialogFooter>
              </form>
            </Dialog>
          </div>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((item, index) => {
                const isLast = index === categories.length - 1
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={item._id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {item.name}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={classes}>
                      <Tooltip content="Edit category">
                        <IconButton variant="text" onClick={() => handleEditCategory}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="delete category">
                        <IconButton
                          variant="text"
                          onClick={() => {
                            handleDeleteCategories(item.slug)
                          }}>
                          <TiDelete className="h-4 w-4 text-red-900" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListCatergories
