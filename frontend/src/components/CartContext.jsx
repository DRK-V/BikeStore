// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
    // Update local storage
    // You can also handle duplicates, increase quantity, etc.
  };

  const removeItemFromCart = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    // Update local storage
  };

  const getCartItemCount = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider value={{ cartItems, addItemToCart, removeItemFromCart, getCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
