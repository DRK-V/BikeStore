import React, { useState } from 'react';
import { Footer } from '../components/Footer';
import { Item_cart } from '../components/Item_cart';
import { Navbar } from '../components/Navbar';
import { Presio_compra } from '../components/Presio_compra';
import '../css/carrito_compras.css';

export const Carrito_compras = () => {
  const [cartItems, setCartItems] = useState([]);

  // This function will be used to add a product ID to the cart
  const addToCart = (productId) => {
    setCartItems([...cartItems, productId]);
  };

  // This function will be used to remove a product ID from the cart
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((id) => id !== productId);
    setCartItems(updatedCartItems);
  };

  return (
    <>
      <Navbar />
      <div className='car_comp'>
        <h1>Carrito de Compras</h1>
        <Item_cart cartItems={cartItems} removeFromCart={removeFromCart} />
        <div className='precios_pagos'>
          <Presio_compra />
        </div>
      </div>
      <Footer />
    </>
  );
};
