import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import Cookies from 'js-cookie'; 

const ComenContext = createContext();

export const useComenContext = () => {
  return useContext(ComenContext);
};

export const ComenProvider = ({ children }) => {
  const { isLoggedIn, user } = useAuth();
  const [selectedProductId, setSelectedProductId] = useState(null);

  // console.log('id_cliente:', user.id_cliente);
  // console.log('id_producto:', selectedProductId);

  
  useEffect(() => {
    const savedProductId = Cookies.get('id_producto');
    if (savedProductId) {
      setSelectedProductId(savedProductId);
    }
  }, []);


  useEffect(() => {
    if (selectedProductId) {
      Cookies.set('id_producto', selectedProductId, { expires: 365 }); 
    }
  }, [selectedProductId]);

  return (
    <ComenContext.Provider value={{ isLoggedIn, user, selectedProductId, setSelectedProductId }}>
      {children}
    </ComenContext.Provider>
  );
};