// item_card.jsx
import '../css/carrito_compras.css';

import React, { useState, useEffect } from 'react';

const Item_cart = ({ id_producto }) => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3060/product-details/${id_producto}`);
        const data = await response.json();
        setProductDetails(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (id_producto) {
      fetchProductDetails();
    }
  }, [id_producto]);

  return (
    <div className="Cart_compras_carrito">
      {productDetails ? (
        <>
        <h2>{additionalProductDetails?.product?.nombre_producto}</h2>
          <div className='info_bici_compra'>
            <img className='img_bicci' src={productDetails.product.imagenURL} alt="" />
            <div className='descrip_produc'>
              <p>{productDetails.product.nombre_producto}</p>
              <p>$ {productDetails.product.precio}</p><br />
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
  
}

export default Item_cart;
