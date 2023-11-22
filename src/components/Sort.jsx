import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSort } from '../redux/slices/filterSlice'

export const sortList = [
  { name: 'популярности (убыв.)', sortProperty: 'rating' },
  { name: 'популярности (возр.)', sortProperty: '-rating' },
  { name: 'цене (убыв.)', sortProperty: 'price' },
  { name: 'цене (возр.)', sortProperty: '-price' },
  { name: 'алфавиту (убыв.)', sortProperty: 'title' },
  { name: 'алфавиту (возр.)', sortProperty: '-title' },
]

const Sort = () => {
  const dispatch = useDispatch()
  const sort = useSelector((state) => state.filter.sort)
  const [isOpen, setIsOpen] = useState(false)
  const sortRef = useRef()

  const onClickPopup = (obj) => {
    dispatch(setSort(obj))
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setIsOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)

    return () => {
      document.body.removeEventListener('click', handleClickOutside)
      // return внутри useffect означает unmount
    }
  }, [])

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b onClick={() => onClickPopup()}>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{sort.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                className={sort === obj.sortProperty ? 'active' : ''}
                onClick={() => onClickPopup(obj)}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Sort
