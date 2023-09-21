import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';

const Item_cart = ({ product, image }) => {
  const { removeItemFromCart, updateCartItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [saldo, setSaldo] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Realiza la solicitud para obtener el saldo
    const fetchSaldo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3060/stockPorCodigoProducto/${product.id_producto}`
        );
        const data = await response.json();
        // Asigna el saldo del producto al estado de saldo
        setSaldo(data[0]?.saldo);
      } catch (error) {
        console.error("Error fetching saldo:", error);
      }
    };

    fetchSaldo();
  }, [product.id_producto]);

  const handleIncreaseQuantity = () => {
    if (saldo !== null && quantity < saldo) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateCartItemQuantity(product.id_producto, newQuantity);
    } else {
      // El producto está agotado, muestra un mensaje
      showMessageWithTimeout('Producto agotado', 2000); // Mostrar el mensaje por 2 segundos
    }
  };

  const showMessageWithTimeout = (message, timeout) => {
    setMessage(message);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      setMessage('');
    }, timeout);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCartItemQuantity(product.id_producto, newQuantity);
    }
  };

  const handleRemoveFromCart = () => {
    console.log("Eliminando producto con id_producto:", product.id_producto);
    removeItemFromCart(product.id_producto);
  };

  const precioConPuntos = product.precio.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const nombreArray = product.nombre.split(' ');
  const nombreCorto = nombreArray.slice(0, 2).join(' ');

  return (
    <div className="Cart_compras_carrito">
      {product ? (
        <>
          <h2>{nombreCorto}</h2>
          <div className='info_bici_compra'>
            <img className='img_bicci' src={image} alt="" />
            <div className='descrip_produc'>
              <h2>tipo:{product.tipo}</h2>
              <h2>precio:
                <span className="green_text">
                  $  {precioConPuntos}
                </span>
              </h2><br />
            </div>
            <div className='botones_compra'>
              <div className='boton2'>
                <button className="su_su" onClick={handleIncreaseQuantity}>
                  <i className="fas fa-plus"></i>
                </button>
                {quantity}
                <button className='su_re' onClick={handleDecreaseQuantity}>
                  <i className="fa fa-minus"></i>
                </button>
              </div>
              {showMessage && (
                <div className="message-overlay">
                  <div className="message-content">{message}</div>
                </div>
              )}
              <button className='boton1' onClick={handleRemoveFromCart}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Item_cart;
