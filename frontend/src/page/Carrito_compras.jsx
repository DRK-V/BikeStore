
//carrito_compras
import { Footer } from '../components/Footer'
import Item_cart from '../components/Item_cart'
import { Navbar } from '../components/Navbar'
import { Presio_compra } from '../components/Presio_compra'
import '../css/carrito_compras.css'

export const Carrito_compras = () => {
  const id_producto = 1; // Set the appropriate id_producto here

  return (
    <>
      <Navbar />
      <div className='car_comp'>
        <h1>Carrito de Compras</h1>
        <Item_cart id_producto={id_producto} />
        <div className='precios_pagos'>
          <Presio_compra />
        </div>
      </div>
      <Footer />
    </>
  );
};
