import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectCartItemById } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

const typePizzas = ['тонкое', 'классическое']

function PizzaBlock({ id, imageUrl, title, description, sizes, types, price }) {
  const [activeType, setActiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const cartItem = useSelector(selectCartItemById(id))
  const dispatch = useDispatch()
  const { items } = useSelector((state) => state.pizzas)

  const addedCount = cartItem ? cartItem.count : 0

  const onClickSizes = (id) => {
    setActiveSize(id)
  }
  const onClickTypes = (id) => {
    setActiveType(id)
  }

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typePizzas[activeType],
      size: sizes[activeSize],
    }
    dispatch(addItem(item))
  }

  return (
    <>
      <div className="pizza-block">
        <Link to={`pizza/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <p className="pizza-block__description">{description}</p>
        <div className="pizza-block__selector">
          <ul>
            {sizes.map((value, id) => (
              <li
                onClick={() => onClickSizes(id)}
                className={activeSize === id ? 'active' : ''}
                key={id}>
                {`${value}см.`}
              </li>
            ))}
          </ul>
          <ul>
            {types.map((id) => (
              <li
                onClick={() => onClickTypes(id)}
                className={activeType === id ? 'active' : ''}
                key={id}>
                {typePizzas[id]}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₸</div>
          <button onClick={onClickAdd} className="button button--outline button--add">
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </>
  )
}

export default PizzaBlock
