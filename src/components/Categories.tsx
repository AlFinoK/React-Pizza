import { FC } from 'react'

type CategoriesProps = {
  value: number
  onChangeCategory: (index: number) => void
}

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']

const Categories: FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            onClick={() => onChangeCategory(index)}
            className={value === index ? 'active' : ''}
            key={index}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
