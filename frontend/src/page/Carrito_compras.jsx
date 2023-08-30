//carrito_
import React from 'react';
import { Footer } from '../components/Footer';
import Item_cart from '../components/Item_cart';
import { Navbar } from '../components/Navbar';
import { Presio_compra } from '../components/Presio_compra';
import '../css/carrito_compras.css';
import { useCart } from '../components/CartContext'; // Import the CartContext

export const Carrito_compras = () => {
  const { cartItems } = useCart(); // Use the cartItems from the context

  return (
    <>
      <Navbar />
      <div className="car_comp">
        <h1>Carrito de Compras</h1>
        {cartItems.map((product) => (
  <Item_cart key={product.id} product={product.product} image={product.image} />
))}
        <div className="precios_pagos">
          <Presio_compra />
        </div>
      </div>
      <Footer />
    </>
  );
};
