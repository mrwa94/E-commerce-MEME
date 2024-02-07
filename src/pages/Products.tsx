import { Pagination } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Typography } from '@mui/material'
import { useEffect, ChangeEvent, useState } from 'react'

import { AppDispatch } from '../redux/store'
import SortInput from '../components/products/SortInput'
import SearchInput from '../components/SearchInput'
import useProductState from '../hooks/useProductState'
import CardProducts from '../components/products/CardProducts'
import { fetchProducts, searchProductByName } from '../redux/slices/products/productSlice'
import SortInputByTitleAndPrice from '../components/products/SortInputByTitleAndPrice'

const Products = () => {
  const { products, searchTerm } = useProductState()
  const [currentPage, setCurrentPage] = useState(1)

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  console.log(products)

  const fetchProductsItems = async () => {
    await dispatch(fetchProducts(currentPage))
  }

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    fetchProductsItems()
  }, [currentPage])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(searchProductByName(event.target.value))
    console.log(event.target.value)
  }
  return (
    <div className=" container m-auto ">
      <div className="">
        {/* Search and Sort sections */}

        <Typography variant="h4">PRODUCTS</Typography>

        <div className="flex flex-row  m-4  justify-between">
          <SortInputByTitleAndPrice />
          <SortInput />
          <SearchInput value={searchTerm} handleSearch={handleSearch} />
        </div>
      </div>
      <div className="grid  grid-cols-2 md:grid-cols-4 w-full ml-9 mb-5">
        {products.map((item) => {
          return (
            <div key={item.slug}>
              <CardProducts
                _id={item._id}
                image={item.image}
                price={item.price}
                name={item.name}
                description={item.description}
                slug={item.slug}
              />
            </div>
          )
        })}
      </div>
      <div className=" flex flex-row gap-3 justify-center m-5  p-5">
        <Pagination count={10} page={currentPage} onChange={handleChange} />
      </div>
    </div>
  )
}

export default Products
