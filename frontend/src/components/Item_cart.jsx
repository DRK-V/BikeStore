import React, { useState, useEffect } from 'react';
import '../css/carrito_compras.css';

export const Item_cart = ({ cartItems, removeFromCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log('Fetching products for cartItems:', cartItems);
      try {
        const productRequests = cartItems.map(async (productId) => {
          const response = await fetch(`http://localhost:3060/products-with-images/${productId}`);
          const productData = await response.json();
          return productData;
        });

        const fetchedProducts = await Promise.all(productRequests);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (cartItems.length > 0) {
      fetchProducts();
    }
  }, [cartItems]);

  console.log('cartItems:', cartItems);
  console.log('products:', products);

  return (
    <div className="Cart_compras_carrito">
      {products.map((product) => (
        <div key={product.id_producto}>
          <h2>{product.nombre_producto}</h2>
          <div className='info_bici_compra'>
            <img className='img_bicci' src={`http://localhost:3060/images/${product.id_imagen}`} alt="" />
            <div className='descrip_produc'>
              <p>{product.descripcion}</p>
              <p>${product.precio} -20%</p><br />
              <b><p>${product.precio * 0.8}</p></b>
            </div>
            <div className='botones_compra'>
              <div className='boton2'>
                <button className='su_re'>+</button>
                2
                <button className='su_re'>-</button>
              </div>
              <button className='boton1'>Buscar</button>
              <button className='boton1' onClick={() => removeFromCart(product.id_producto)}>Eliminar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


