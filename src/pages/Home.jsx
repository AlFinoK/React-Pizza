import { useSelector, useDispatch } from 'react-redux'
import { useContext, useEffect, useState } from 'react'
import Sort from '../components/Sort'
import { SearchContext } from '../App'
import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Categories from '../components/Categories'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'
import SkeletonLoader from '../components/PizzaBlock/SkeletonLoader'
import axios from 'axios'

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { searchValue } = useContext(SearchContext)
  const dispatch = useDispatch()
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter)

  const pizzas = items.map((obj, id) => <PizzaBlock key={id} {...obj} />)
  const skeletons = [...new Array(12)].map((_, index) => <SkeletonLoader key={index} />)
  const API_KEY = 'https://64be88e35ee688b6250c9498.mockapi.io/pizzas'

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id))
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }
  useEffect(() => {
    setIsLoading(true)

    const category = categoryId > 0 ? `category${categoryId}` : ''
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const search = searchValue ? `&search=${searchValue}` : ''

    axios
      .get(
        `${API_KEY}?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data)
        setIsLoading(false)
      })

    window.scrollTo(0, 0)
  }, [categoryId, sort, searchValue, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home

// const myPromise = new Promise((resolve, reject) => {
//   resolve(console.log('успех'))
// })

// myPromise
//   .then((value) => {
//     console.log('value')
//   })

//   .catch((error) => {
//     console.log('error')
//   })

// fetch(`${API_KEY}?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`)
//   .then((res) => res.json())
//   .then((arr) => {
//     setItems(arr)
//     setIsLoading(false)
//   })

// useEffect(() => {
//   if (window.location.search) {
//     // это условие проверяет есть ли что то в строке после -  ?
//     const params = qs.parse(window.location.search.substring(1))
//     const sort = sortArr.find((obj) => obj.sortProperty === params.sortProperty)
//     dispatch(
//       setFilters({
//         ...params,
//         sort,
//       }),
//     )
//   }
// })

//  useEffect(() => {
//    const queryString = qs.stringify({
//      sortProperty: sort.sortProperty,
//      categoryId,
//      currentPage,
//    })
//    navigate(`?${queryString}`)
//  }, [categoryId, sort, searchValue, currentPage])
