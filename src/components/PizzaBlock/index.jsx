import React from 'react'

function PizzaBlock({ title, price, imageUrl, description, sizes, types }) {
  const [activeType, setActiveType] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0)

  const TypeNames = ['тонкое', 'традиционное']

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <p className="pizza-block__description">{description}</p>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? 'active' : ''}>
              {TypeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={size}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? 'active' : ''}>
              {size}
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₸</div>
        <button className="button button--outline button--add">
          <span>Добавить</span>
          <i>0</i>
        </button>
      </div>
    </div>
  )
}

export default PizzaBlock
