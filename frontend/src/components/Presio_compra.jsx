import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import carritoo from "../assets/bolsa-de-la-compra.png";
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Presio_compra = () => {
  const { cartItems } = useCart();
  const [totalPrice, setTotalPrice] = useState(0); 
  const { isLoggedIn } = useAuth(); // Obtén el estado de inicio de sesión desde el contexto
  const [showPagar, setShowPagar] = useState(false); // Estado para mostrar el mensaje

  const updateTotalPrice = (addedPrice) => {
    setTotalPrice((prevTotalPrice) => prevTotalPrice + addedPrice);
  };

  const calculateTotalPrice = () => {
    const newTotalPrice = cartItems.reduce(
      (total, cartItem) => {
        const productPrice = parseFloat(cartItem.product.precio); 
        const quantity = parseInt(cartItem.quantity); 

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
  }, [cartItems]);

  // Agrega esta función para ocultar el mensaje después de 2 segundos
  const hidePagarMessage = () => {
    setTimeout(() => {
      setShowPagar(false);
    }, 2000);
  };

  return (
    <div className='info_pc'>
      <h2>Envío $0.0</h2>
      <h1>Costo Total {totalPrice.toLocaleString()}</h1>
      {isLoggedIn ? (
        <Link className="pagar-1" to="/payment">
          <button className='pagar'>
            <img src={carritoo} alt="carrito" className="carro_pagar" />Continuar compra
          </button>
        </Link>
      ) : (
        <button
          className='pagar-1'
          onClick={() => {
            setShowPagar(true);
            hidePagarMessage(); // Llama a la función para ocultar el mensaje después de 2 segundos
          }}
        >
          <img src={carritoo} alt="carrito" className="carro_pagar" />Continuar compra
        </button>
      )}
      {showPagar && (
        <div className="pagar-3">
          Debes iniciar sesión o registrarte para continuar.
        </div>
      )}
    </div>
  );
};

export default Presio_compra;
