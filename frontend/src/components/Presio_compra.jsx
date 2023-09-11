import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import carritoo from "../assets/bolsa-de-la-compra.png";

const Presio_compra = () => {
  const { cartItems } = useCart();
  const [totalPrice, setTotalPrice] = useState(0); 
  const updateTotalPrice = (addedPrice) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + addedPrice);
  };
  
  
  const calculateTotalPrice = () => {
    const newTotalPrice = cartItems.reduce(
      (total, cartItem) => {
        const productPrice = parseFloat(cartItem.product.precio); 
        const quantity = parseInt(cartItem.quantity); 
       
        console.log('Producto:', cartItem.product);
        console.log('Precio:', productPrice);
        console.log('Cantidad:', quantity);
  
        if (isNaN(productPrice) || isNaN(quantity)) {
          console.error('Producto con precio o cantidad no válidos:', cartItem);
          return total; 
        }
        return total + productPrice * quantity;
      },
      0
    );
  
    if (isNaN(newTotalPrice)) {
      console.error('El nuevo precio total calculado es NaN');
    }
  
    setTotalPrice(newTotalPrice);
  };
  
  


  useEffect(() => {
    calculateTotalPrice();
    console.log('Carrito actualizado:', cartItems);
  }, [cartItems]);

  return (
    <div className='info_pc'>
      <h2>Envío $0.0</h2>
      <h1>Costo Total {totalPrice.toLocaleString()}</h1>
      <button className='pagar'><img src={carritoo} alt="carrito" className="carro_pagar" />Continuar compra</button>
    </div>
  );
};

export default Presio_compra;
