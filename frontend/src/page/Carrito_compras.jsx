import { Footer } from '../components/Footer'
import { Item_cart } from '../components/Item_cart';
import { Navbar } from '../components/Navbar'
import { Presio_compra } from '../components/Presio_compra'
import '../css/carrito_compras.css'

export const Carrito_compras = ({ cartItems }) => {
  console.log('Cart items in Carrito_compras:', cartItems); // Log the cart items
  return (
    <>
    <Navbar />
    <div className='car_comp'>
        <h1>Carrito de Compras</h1>
        {cartItems.map((item) => (
          <Item_cart key={item.id} item={item} />
        ))}
        <div className='precios_pagos'>
          <Presio_compra/>
        </div>
    </div>

    <Footer />
    </>
  )
}