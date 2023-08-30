//carrito_compras
import { Footer } from '../components/Footer'
import { Item_cart } from '../components/Item_cart'
import { Navbar } from '../components/Navbar'
import { Presio_compra } from '../components/Presio_compra'
import '../css/carrito_compras.css'
import { useCart } from '../components/CartContext';

export const Carrito_compras = () => {
  const { cartItems } = useCart();
  return (
    <>
    <Navbar />
    <div className='car_comp'>
        <h1>Carrito de Compras</h1>
        <Item_cart/>
        <div className='precios_pagos'>
          <Presio_compra/>
        </div>
    </div>

    <Footer />
    </>
  )
}

