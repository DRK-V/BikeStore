import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authcontext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { isLoggedIn, user } = useAuth();

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Update local storage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (isLoggedIn && user) {
      // If the user is logged in, save cartItems to user's data
      // Example: user.cartItems = cartItems
    } else {
      // If the user is not logged in, just set the cartItems state
    }
  }, [cartItems, isLoggedIn, user]);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeItemFromCart = (productId) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.product.id !== productId);
    setCartItems(updatedCart);
  };

  const getCartItemCount = () => {
    return cartItems.length;
  };

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, cartItem) => {
      return total + cartItem.product.precio;
    }, 0);
    return totalPrice;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        getCartItemCount,
        selectedProductId,
        setSelectedProductId,
        getTotalPrice, // Add the getTotalPrice function to the context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
