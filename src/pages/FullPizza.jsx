import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const FullPizza = () => {
  const { id } = useParams()
  const [pizza, setPizza] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    async function getPizzas() {
      try {
        const { data } = await axios.get('https://64be88e35ee688b6250c9498.mockapi.io/pizzas/' + id)
        setPizza(data)
      } catch (error) {
        alert('Чет пиццы не загрузились')
        navigate('/')
      }
    }
    getPizzas()
  }, [])

  if (!pizza) {
    return 'Loading...'
  }

  return (
    <div className="container">
      <div className="full">
        <div className="full__inner">
          <img src={pizza.imageUrl} alt="чет не пошло" />
          <h1>{pizza.title}</h1>
          <p>{pizza.description}</p>
          <span>
            <b>{pizza.price} </b>Тенге
          </span>
        </div>
      </div>
    </div>
  )
}

export default FullPizza
