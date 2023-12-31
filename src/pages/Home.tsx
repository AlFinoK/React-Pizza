import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import Pagination from '../components/Pagination'
import PizzaBlock from '../components/PizzaBlock'
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import SkeletonLoader from '../components/PizzaBlock/SkeletonLoader'
import { fetchPizzas } from '../redux/slices/pizzasSlice'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import { current } from '@reduxjs/toolkit'

const Home: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isMounted = useRef(false)
  // const isSearch = useRef(false)
  const { items, status } = useSelector((state) => state.pizzas)
  const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter)
  // const [isLoading, setIsLoading] = useState(true)

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index))
  }, [])

  const onChangePage = useCallback((page: number) => {
    dispatch(setCurrentPage(page))
  }, [])

  const getPizzas = async () => {
    // setIsLoading(true)

    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    const search = searchValue ? `search=${searchValue}` : ''

    dispatch(
      // @ts-ignore
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    )
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort.sortProperty,
        currentPage,
      }
      const queryString = qs.stringify(params, { skipNulls: true })
      navigate(`/?${queryString}`)
    }
    if (!window.location.search) {
      fetchPizzas()
    }
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  // Если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    getPizzas()
  }, [categoryId, sort.sortProperty, searchValue, currentPage])

  // Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      )
    }
    isMounted.current = true
  }, [])

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(12)].map((_, index) => <SkeletonLoader key={index} />)

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status == 'error' ? (
        <div className="content__error">
          <h2>Почему то пицц нет &#128511;</h2>
          <p>Попробуйте позже</p>
        </div>
      ) : (
        <div className="content__items">{status == 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home

// const requestPizzas = async () => {
//   const category = categoryId > 0 ? `category${categoryId}` : ''
//   const sortBy = sort.sortProperty.replace('-', '')
//   const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
//   const search = searchValue ? `&search=${searchValue}` : ''

//   dispatch(
//     fetchPizzas({
//       sortBy,
//       category,
//       order,
//       search,
//       currentPage,
//     }),
//   ),
//     window.scrollTo(0, 0)
// }
