import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});

  // Asegúrate de que el id_cliente esté disponible en el objeto de usuario
  const idCliente = user.id_cliente || null;

  const login = (userData) => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setUser({});
    window.location.href = '/';
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (storedIsLoggedIn) {
      const storedUser = JSON.parse(localStorage.getItem('user')) || {};
      setUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, idCliente, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
