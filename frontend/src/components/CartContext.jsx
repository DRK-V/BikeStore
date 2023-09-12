//CARDCONTEXT
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
  const [productQuantityMap, setProductQuantityMap] = useState({});
  const [totalPrice, setTotalPrice] = useState(0); 

  
  const getCartFromCookie = () => {
    const cartCookie = Cookies.get(`cart_${idCliente}`);
    if (cartCookie) {
      return JSON.parse(cartCookie);
    }
    return [];
  };

  
  const saveCartToCookie = (updatedCart) => {
    Cookies.set(`cart_${idCliente}`, JSON.stringify(updatedCart), { expires: 7 }); // Puedes ajustar la duración de la cookie según tus necesidades
  };

 
  useEffect(() => {
    if (isLoggedIn) {
      const cartFromCookie = getCartFromCookie();
      setCartItems(cartFromCookie);
    }
  }, [isLoggedIn, idCliente]);

  const addItemToCart = (item) => {
   
    const isItemInCart = cartItems.some((cartItem) => cartItem.product.id_producto === item.product.id_producto);
  
    if (isItemInCart) {
    
      console.log('El producto ya está en el carrito');
      return;
    }
  
    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  
    if (isLoggedIn) {
    
      saveCartToCookie([...cartItems, { ...item, quantity: 1 }]);
    }
  
    
    const newTotalPrice =
      cartItems.reduce((total, cartItem) => total + cartItem.product.precio * cartItem.quantity, 0) +
      item.product.precio * 1; 
    setTotalPrice(newTotalPrice);
  };
  

  const removeItemFromCart = (id_producto) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.product.id_producto !== id_producto);
    setCartItems(updatedCart);
    if (isLoggedIn) {
     
      saveCartToCookie(updatedCart);
    }

   
    const newTotalPrice = updatedCart.reduce((total, cartItem) => total + cartItem.product.precio * cartItem.quantity, 0);
    setTotalPrice(newTotalPrice);
  };

  const getCartItemCount = () => {
    return cartItems.length;
  };

 
  const updateCartItemQuantity = (id_producto, newQuantity) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.product.id_producto === id_producto) {
        return {
          ...cartItem,
          quantity: newQuantity,
        };
      }
      return cartItem;
    });

    setCartItems(updatedCart);

    if (isLoggedIn) {
     
      saveCartToCookie(updatedCart);
    }

   
    const newTotalPrice = updatedCart.reduce((total, cartItem) => total + cartItem.product.precio * cartItem.quantity, 0);
    setTotalPrice(newTotalPrice);
  };
  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    if (isLoggedIn) {
      saveCartToCookie([]); // Limpiar la cookie del carrito si el usuario está autenticado
    }
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
        updateCartItemQuantity,
        totalPrice, 
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
