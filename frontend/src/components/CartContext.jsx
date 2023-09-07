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
  const [totalPrice, setTotalPrice] = useState(0); // Agregamos totalPrice aquí

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
    // Verificar si el producto ya está en el carrito
    const isItemInCart = cartItems.some((cartItem) => cartItem.product.id_producto === item.product.id_producto);

    if (isItemInCart) {
      // Si el producto ya está en el carrito, puedes manejarlo de acuerdo a tus necesidades.
      // Puedes mostrar un mensaje de error, incrementar la cantidad, etc.
      console.log('El producto ya está en el carrito');
      return;
    }

    // Si el producto no está en el carrito, agrégalo normalmente
    setCartItems([...cartItems, item]);

    if (isLoggedIn) {
      // Si el usuario está autenticado, guardar el carrito en las cookies
      saveCartToCookie([...cartItems, item]);
    }

    // Calcula el costo total después de agregar un nuevo producto
    const newTotalPrice = cartItems.reduce((total, cartItem) => total + cartItem.product.precio * cartItem.quantity, 0) + item.product.precio * item.quantity;
    setTotalPrice(newTotalPrice);
  };

  const removeItemFromCart = (id_producto) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.product.id_producto !== id_producto);
    setCartItems(updatedCart);
    if (isLoggedIn) {
      // Actualiza el carrito en las cookies si el usuario está autenticado
      saveCartToCookie(updatedCart);
    }

    // Calcula el costo total después de eliminar un producto
    const newTotalPrice = updatedCart.reduce((total, cartItem) => total + cartItem.product.precio * cartItem.quantity, 0);
    setTotalPrice(newTotalPrice);
  };

  const getCartItemCount = () => {
    return cartItems.length;
  };

  // Función para actualizar la cantidad de un producto en el carrito
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
      // Si el usuario está autenticado, actualizar el carrito en las cookies
      saveCartToCookie(updatedCart);
    }

    // Calcula el costo total después de actualizar la cantidad
    const newTotalPrice = updatedCart.reduce((total, cartItem) => total + cartItem.product.precio * cartItem.quantity, 0);
    setTotalPrice(newTotalPrice);
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
        totalPrice, // Agregamos totalPrice al contexto
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
