// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Guarda el estado en localStorage
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Elimina el estado de localStorage
    window.location.reload();
  };

  // Verifica si la sesión expiró al cargar la página
  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (storedIsLoggedIn) {
      // Realiza aquí la verificación del tiempo de expiración si lo deseas
      // Por ejemplo, si la sesión debería expirar después de cierto tiempo,
      // puedes comparar la hora actual con la hora de inicio de sesión almacenada.
      // Si ha expirado, llama a logout().
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
