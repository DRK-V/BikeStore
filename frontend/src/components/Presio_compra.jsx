// Presio_compra.js
import React from 'react';
import { useCart } from './CartContext';
import carritoo from "../assets/bolsa-de-la-compra.png";

const Presio_compra = () => {
  const { cartItems } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce((total, cartItem) => total + cartItem.product.precio, 0);
  };

  return (
    <div className='info_pc'>
      <h2>Envio $0.0</h2>
      <h1>Costo Total {getTotalPrice().toLocaleString()}</h1>
      <button className='pagar'><img src={carritoo} alt="carrito" className="carro_pagar" />Continuar compra</button>
    </div>
  );
};

export default Presio_compra;
