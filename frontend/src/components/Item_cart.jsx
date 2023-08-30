import React, { useState, useEffect } from 'react';
import { useCart } from '../components/CartContext';

export const Item_cart = () => {
  const { cartItems } = useCart();
  const [productsInCart, setProductsInCart] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetails = [];

      for (const productId of cartItems) {
        if (productId) { // Check if productId is defined
          try {
            const response = await fetch(`http://localhost:3060/products-with-images/${productId}`);
            const data = await response.json();
            productDetails.push(data);
          } catch (error) {
            console.error('Error fetching product details:', error);
          }
        }
      }

      setProductsInCart(productDetails);
    };

    fetchProductDetails();
  }, [cartItems]);


  return (
    <div>
      {productsInCart.map((product) => (
        <div key={product.id}>
          {/* Display product details */}
          <img src={product.imageURL} alt={product.name} />
          <p>{product.name}</p>
          <p>${product.price}</p>
          {/* Add buttons to modify quantities or remove from cart */}
        </div>
      ))}
    </div>
  );
};
