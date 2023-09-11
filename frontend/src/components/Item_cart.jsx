//item_card
import React, { useState } from 'react';
import { useCart } from './CartContext';

const Item_cart = ({ product, image }) => {
  const { removeItemFromCart, updateCartItemQuantity } = useCart();
 const [quantity, setQuantity] = useState(1);
  
 const handleIncreaseQuantity = () => {
  const newQuantity = quantity + 1;
  setQuantity(newQuantity);

  updateCartItemQuantity(product.id_producto, newQuantity);
  
  // Calcula el precio total del producto recién agregado
  const addedPrice = product.precio;
  
  // Llama a la función para actualizar el precio total
  updateTotalPrice(addedPrice);
};

const handleDecreaseQuantity = () => {
  if (quantity > 1) {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    
    updateCartItemQuantity(product.id_producto, newQuantity);
    
    // Calcula el precio total del producto recién agregado
    const addedPrice = product.precio;
    
    // Llama a la función para actualizar el precio total
    updateTotalPrice(addedPrice);
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
  return (
    <div className="Cart_compras_carrito">
      {product ? (
        <>
          <h2>{product.nombre_producto}</h2>
          <div className='info_bici_compra'>
            <img className='img_bicci' src={image} alt="" />
            <div className='descrip_produc'>
              <p>{product.tipo}</p>
              <p>$ {precioConPuntos}</p><br />
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

