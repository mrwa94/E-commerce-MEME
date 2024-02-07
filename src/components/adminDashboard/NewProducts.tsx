import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { TiDelete } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux'
import { PencilIcon } from '@heroicons/react/24/outline'
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Tooltip
} from '@material-tailwind/react'
import { Card, Input, Button, Typography, Spinner } from '@material-tailwind/react'

import { AdminSidebar } from './AdminSidebar'
import { AppDispatch, RootState } from '../../redux/store'
import useProductState from '../../hooks/useProductState'
import {
  Product,
  createProduct,
  deleteProduct,
  fetchProducts
} from '../../redux/slices/products/productSlice'
import SearchInput from '../SearchInput'
import { toast } from 'react-toastify'
import { fetchCategories } from '../../redux/slices/categories/categoriesSlice'

const NewProducts = () => {
  const { products, isLoading, error } = useProductState()
  const { categories } = useSelector((state: RootState) => state.categories)
  const dispatch = useDispatch<AppDispatch>()
  const [open, setOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const handleOpen = () => setOpen(!open)
  const handleOpenEdit = () => setOpenEdit(!openEdit)
  const TABLE_HEAD = [
    'Product image',
    'Product name ',
    'Description',
    'catrgory name',
    'price',
    'Function'
  ]

  const initialProductState: Product = {
    _id: '',
    name: '',
    image: '',
    description: '',
    price: 0,
    slug: '',
    sold: 0,
    quantity: 0,
    shipping: 0,
    categoryId: ''
  }
  // type ProductEditType = {
  //   name: string
  //   price: string
  //   category: string
  //   image: File | undefined | string
  //   description: string
  //   quantity: string
  //   sold?: string
  //   shipping: string
  // }

  const [product, setProduct] = useState<Product>(initialProductState)
  //const [productInfo, setProductInfo] = useState<ProductEditType>({ ...initialProductData })
  //const [editId, setEditId] = useState('')

  // const editProductData = new FormData()
  // editProductData.append('title', productInfo.name)
  // editProductData.append('description', productInfo.description)
  // editProductData.append('category', productInfo.category)
  // editProductData.append('image', productInfo.image as Blob)
  // editProductData.append('price', productInfo.price)
  // editProductData.append('quantity', productInfo.quantity)
  // editProductData.append('shipping', productInfo.shipping)

  //dispatch(updateProduct({ updatedProduct: editProductData, id: editId }))
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //to check if image has there already
    if (event.target.type === 'file') {
      const fileInput = (event.target as HTMLInputElement) || ''
      setProduct((prevState) => {
        return { ...prevState, [event.target.name]: fileInput.files?.[0] }
      })
    } else {
      setProduct((prevState) => {
        return { ...prevState, [event.target.name]: event.target.value }
      })
    }
  }
  const createNewProduct = async (event: FormEvent) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('image', product.image as Blob)
    formData.append('description', product.description)
    formData.append('categoryId', String(product.categoryId))
    formData.append('price', product.price.toString())
    formData.append('quantity', product.quantity.toString())
    //formData.append('sizes', product.sizes.toString())
    console.log('New product data:', product)
    // let's add Id property to the object (usually IDs are generated automatically on the backend)
    for (const [key, value] of formData) {
      console.log([key, value])
    }
    try {
      const createdProduct = await dispatch(createProduct(formData))
      console.log(createdProduct)
      dispatch(fetchProducts())
    } catch (error) {
      console.log(error)
    }
    setProduct(initialProductState)

    // const updateProduct = { id: singleProduct._id, ...product }
    // dispatch(addProduct(updateProduct))
  }

  const handleSearch = () => {
    // search
  }
  //handle to edit product
  const handleUpdate = (product: Product) => {
    setIsEditing(true)
    // setFieldValue('slug', product.slug)
    // setFieldValue('name', product.name)
    // setFieldValue('description', product.description)
    // setFieldValue('image', product.image)
    // setFieldValue('category', product.category._id)
    // setFieldValue('price', product.price)
    // setFieldValue('quantity', product.quantity)
    // setFieldValue('size', product.size ? product.size.join(', ') : '')
    // setFieldValue('variant', product.variant ? product.variant.join(', ') : '')
  }
  // const handleEditProduct = (
  //   productData: SetStateAction<{
  //     _id: string
  //     name: string
  //     slug: string
  //     description: string
  //     categoryId: string
  //     price: number
  //     image: string
  //     sizes: string
  //     quantity: number
  //     sold: number
  //   }>
  // ) => {
  //   setProduct(productData)
  //   setIsEditing(true)
  // }

  //handle to delete product
  const handleRemoveProduct = async (slug: string) => {
    try {
      dispatch(deleteProduct(slug))
      toast.success('Product deleted successfully')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="lg">
      <div className=" flex flex-row">
        <AdminSidebar />

        <div className="">
          <Dialog className="" open={open} handler={handleOpen}>
            <form onSubmit={createNewProduct}>
              <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                  {' '}
                  <Typography variant="h4">Create Product</Typography>
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
                <label className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Product Name
                  </Typography>
                  <Input
                    name="name"
                    onChange={handleChange}
                    value={product.name}
                    size="lg"
                    placeholder="Computer"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Image URL:
                  </Typography>
                  <Input
                    size="lg"
                    name="image"
                    type="file"
                    onChange={handleChange}
                    // src={product.image}
                    placeholder="product.jpg"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Description:
                  </Typography>
                  <Input
                    type={''}
                    onChange={handleChange}
                    name="description"
                    value={product.description}
                    size="lg"
                    placeholder=" Description:"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Price:
                  </Typography>
                  <Input
                    type={''}
                    onChange={handleChange}
                    name="price"
                    value={product.price}
                    size="lg"
                    placeholder=" 250$"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  />

                  {/* <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Category:
                  </Typography>
                  <Input
                    type={''}
                    onChange={handleChange}
                    name="categoryId"
                    value={product.categoryId}
                    size="lg"
                    placeholder=" 250$"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  /> */}

                  <select
                    name="categoryId"
                    id="category"
                    className=""
                    onChange={handleChange}
                    value={product.categoryId}>
                    {categories.map((category) => {
                      console.log('category: ' + category._id)
                      return (
                        <option value={category._id} key={category._id}>
                          {category.name}
                        </option>
                      )
                    })}
                  </select>

                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Quantity:
                  </Typography>
                  <Input
                    type={''}
                    onChange={handleChange}
                    name="quantity"
                    value={product.quantity}
                    size="lg"
                    placeholder=" 250$"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  />
                </label>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" onClick={handleOpen}>
                  cancel
                </Button>
                <Button variant="gradient" color="gray" type="submit" onClick={handleOpen}>
                  Create Product
                </Button>
              </DialogFooter>
            </form>
          </Dialog>

          {/* edit Product */}
          <Dialog className="" open={openEdit} handler={handleOpenEdit}>
            <form onSubmit={createNewProduct}>
              <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                  {' '}
                  <Typography variant="h4">Edit Product</Typography>
                </DialogHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-3 h-5 w-5"
                  onClick={handleOpenEdit}>
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <DialogBody>
                <label className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Product Name
                  </Typography>
                  <Input
                    name="name"
                    onChange={handleChange}
                    value={product.name}
                    size="lg"
                    placeholder="Computer"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Image URL:
                  </Typography>
                  <Input
                    size="lg"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    src={product.image}
                    placeholder="product.jpg"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Description:
                  </Typography>
                  <Input
                    type={''}
                    onChange={handleChange}
                    name="description"
                    value={product.description}
                    size="lg"
                    placeholder=" Description:"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Price:
                  </Typography>
                  <Input
                    type={''}
                    onChange={handleChange}
                    name="price"
                    value={product.price}
                    size="lg"
                    placeholder=" 250$"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  />

                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    CategoryId:
                  </Typography>
                  <Input
                    type={''}
                    onChange={handleChange}
                    name="categoryId"
                    value={product.categoryId}
                    size="lg"
                    placeholder=" 250$"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  />

                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Quantity:
                  </Typography>
                  <Input
                    type={''}
                    onChange={handleChange}
                    name="quantity"
                    value={product.quantity}
                    size="lg"
                    placeholder=" 250$"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none'
                    }}
                  />
                </label>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" onClick={handleOpenEdit}>
                  cancel
                </Button>
                <Button variant="gradient" color="gray" type="submit" onClick={handleOpenEdit}>
                  Create Product
                </Button>
              </DialogFooter>
            </form>
          </Dialog>
        </div>
        <div className="ml-9 mb-5">
          <div className="flex felx-row gap-96">
            <SearchInput value={''} handleSearch={handleSearch} />
            <button
              className="  rounded-full p-3 text-2xl  bg-gray-900 text-gray-50"
              onClick={handleOpen}>
              +
            </button>
          </div>

          {/* show all product */}
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => {
                const isLast = index === products.length - 1
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={item._id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <img src={item.image} width={50} />
                        </div>
                      </div>
                    </td>
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
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {item.description}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    {/* <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {item.categoryId}
                          </Typography>
                        </div>
                      </div>
                    </td> */}
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography variant="small" color="blue-gray" className="font-normal">
                            {item.price}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text" onClick={handleOpenEdit}>
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="delete User">
                        <IconButton variant="text" onClick={() => handleRemoveProduct(item.slug)}>
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

export default NewProducts
