import { useEffect, useState, useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'

const Home = () => {
  const dispatch = useDispatch()
  const categoryId = useSelector((state) => state.filter.categoryId)
  console.log('redux state', categoryId)

  const { searchVal } = useContext(SearchContext)
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' })
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  const onClickCategory = () => {
    
  }

  useEffect(() => {
    setIsLoading(true)

    const sortBy = sortType.sortProperty.replace('-', '')
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchVal > 0 ? `search=${searchVal}` : ''

    fetch(
      `https://649c06c10480757192375541.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => {
        return res.json()
      })
      .then((arr) => {
        setItems(arr)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchVal, currentPage])

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory()} />
        <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  )
}

export default Home
