import { Link } from 'react-router-dom'
import empty from '../assets/img/empty-cart.png'
import { FC } from 'react'

const CartEmpty: FC = () => {
  return (
    <div className="cart cart--empty">
      <h2>
        Корзина пустая <span>😕</span>
      </h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br />
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={empty} alt="Empty cart" />
      <Link className="button button--black" to="/">
        <span>Вернуться назад</span>
      </Link>
    </div>
  )
}

export default CartEmpty
