import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

import './scss/app.scss'

function App() {
  const [searchVal, setSearchVal] = useState('')

  return (
    <div className="wrapper">
      <Header searchVal={searchVal} setSearchVal={setSearchVal} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchVal={searchVal} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
