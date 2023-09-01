import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './authcontext';
import Cookies from 'js-cookie';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { isLoggedIn, idCliente } = useAuth();

  // Función para obtener el carrito específico del cliente desde las cookies
  const getCartFromCookie = () => {
    const cartCookie = Cookies.get(`cart_${idCliente}`);
    if (cartCookie) {
      return JSON.parse(cartCookie);
    }
    return [];
  };

  // Función para guardar el carrito del cliente en las cookies
  const saveCartToCookie = (updatedCart) => {
    Cookies.set(`cart_${idCliente}`, JSON.stringify(updatedCart), { expires: 7 }); // Puedes ajustar la duración de la cookie según tus necesidades
  };

  // Cargar el carrito del cliente al iniciar sesión
  useEffect(() => {
    if (isLoggedIn) {
      const cartFromCookie = getCartFromCookie();
      setCartItems(cartFromCookie);
    }
  }, [isLoggedIn, idCliente]);

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
    if (isLoggedIn) {
      // Si el usuario está autenticado, guardar el carrito en las cookies
      saveCartToCookie([...cartItems, item]);
    }
  };

  const removeItemFromCart = (productId) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.product.id !== productId);
    setCartItems(updatedCart);
    if (isLoggedIn) {
      // Si el usuario está autenticado, actualizar el carrito en las cookies
      saveCartToCookie(updatedCart);
    }
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
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
