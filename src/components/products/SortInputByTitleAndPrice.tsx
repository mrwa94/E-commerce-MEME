import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { sortProduct } from '../../redux/slices/products/productSlice'

const SortInputByTitleAndPrice = () => {
  const dispatch: AppDispatch = useDispatch()
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortProduct(event.target.value))
  }
  return (
    <div className="m-5">
      <select
        onChange={handleSort}
        defaultValue={10}
        name="demo-select"
        placeholder="Sort by Title">
        <option value="name">name</option>
        <option value="price">price</option>
      </select>
    </div>
  )
}

export default SortInputByTitleAndPrice
