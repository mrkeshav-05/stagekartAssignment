import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Page01 from './pages/Page01'
import { CartProvider } from './context/CartContext'
import CartPage from './pages/Cart'
function App() {
  return (
    <>
    <CartProvider>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage onClose={() => { /* handle close */ }} />} />
        <Route path="/" element={<Page01 onClose={() => { /* handle close */ }} equipmentId={1} />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      </Router>
    </CartProvider>
    </>
  )
}

export default App