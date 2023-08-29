import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { Item_cart } from '../components/Item_cart';
import { Navbar } from '../components/Navbar';
import { Presio_compra } from '../components/Presio_compra';
import '../css/carrito_compras.css';

export const Carrito_compras = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (productId) => {
    setCartItems([...cartItems, productId]);
  };

  return (
    <>
      <Navbar />
      <div className='car_comp'>
        <h1>Carrito de Compras</h1>
        <Item_cart cartItems={cartItems} />
        <div className='precios_pagos'>
          <Presio_compra />
        </div>
      </div>
      <Footer />
    </>
  );
};
