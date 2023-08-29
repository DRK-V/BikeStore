import React, { useState, useEffect } from 'react';
import '../css/carrito_compras.css';

export const Item_cart = ({ cartItems }) => {
   const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3060/products-with-images`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="Cart_compras_carrito">
      {cartItems.map((productId) => {
        const product = getProductData(productId); // Fetch product data based on the productId

        return (
          <div key={productId}>
            <h2>{product.nombre_producto}</h2>
            <img className='img_bicci' src={product.imagenURL} alt="" />
            <div className='descrip_produc'>
              <p>{product.descripcion}</p>
              <p>Precio: ${product.precio}</p>
            </div>
            {/* Add increment/decrement buttons and other UI elements here */}
          </div>
        );
      })}
    </div>
  );
};


