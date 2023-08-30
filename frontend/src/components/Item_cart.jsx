//item_card
import React, { useState } from 'react';
import { useCart } from './CartContext';

const Item_cart = ({ product, image }) => {
  const { removeItemFromCart } = useCart(); // Make sure you're using useCart here
  const [quantity, setQuantity] = useState(0);
  const handleRemoveFromCart = () => {
    removeItemFromCart(product.id); // Pass the product ID to remove
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1); // Increment the quantity by 1
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1); // Decrement the quantity by 1 if it's greater than 0
    }
  };
  return (
    <div className="Cart_compras_carrito">
      {product ? (
        <>
          <h2>{product.nombre_producto}</h2>
          <div className='info_bici_compra'>
            <img className='img_bicci' src={image} alt="" /> {/* Use the provided image prop */}
            <div className='descrip_produc'>
              <p>{product.descripcion_producto}</p>
              <p>$ {product.precio}</p><br />
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
              <button className='boton1'>buscar</button>
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
