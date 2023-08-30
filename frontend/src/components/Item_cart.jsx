//item_card
import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';

const Item_cart = ({ product, image }) => {
  return (
    <div className="Cart_compras_carrito">
      {product ? (
        <>
          <h2>{product.nombre_producto}</h2>
          <div className='info_bici_compra'>
            <img className='img_bicci' src={image} alt="" /> {/* Use the provided image prop */}
            <div className='descrip_produc'>
              <p>{product.nombre_producto}</p>
              <p>$ {product.precio}</p><br />
            </div>
            <div className='botones_compra'>
              <div className='boton2'>
                <button className='su_re'>+</button>
                2
                <button className='su_re'>-</button>
              </div>
              <button className='boton1'>buscar</button>
              <button className='boton1'></button>
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
