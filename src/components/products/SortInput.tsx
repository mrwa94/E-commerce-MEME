import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { fetchCategories } from '../../redux/slices/categories/categoriesSlice'
import { fetchFilterProducts, fetchProducts } from '../../redux/slices/products/productSlice'

const SortInput = () => {
  const { categories } = useSelector((state: RootState) => state.categories)
  const [categorySelect, setCategorySelect] = useState<string[]>([])
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFilterProducts())
  }, [])

  // const handleSortCategories = (event: ChangeEvent<HTMLSelectElement>) => {
  //   event.target.value
  // }
  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log('categoried id ' + event.target.value)
    const categoryId = event.target.value
    // if (categorySelect.includes(categoryId)) {
    //   const filterCategory = categories.filter((c) => c._id !== categoryId)
    //   setCategorySelect(filterCategory)
    // }
    const filterCategory = categories.find((c) => c.name === categoryId)
    if (filterCategory) {
      setCategorySelect(filterCategory)
    }
  }

  console.log(categorySelect)

  return (
    <div className="w-72 mx-20">
      <select defaultValue={10} name="demo-select" onChange={handleSort}>
        {categories.length > 0 &&
          categories.map((category) => {
            return <option key={category._id}>{category.name}</option>
          })}
      </select>
    </div>
  )
}

export default SortInput
