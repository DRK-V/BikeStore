import Categories from './Categories';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Register } from './Register';
import Bike_details from './Bike_details';
import { Login } from './Login';
import { AuthProvider } from '../components/AuthContext';
import { Loading } from '../components/Loading';
import { Payment } from './Payment';
import { Carrito_compras } from './Carrito_compras';
import { Usuario_usu } from './Usuario_usu';

import '../css/animation.css'
import '../css/main.css'


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una tarea asincrónica que tarda 3 segundos en cargar la aplicación
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthProvider> {/* Agrega el AuthProvider aquí para envolver la aplicación */}
      {isLoading ? (
        // si esta cargando
        <Loading />
      ) : (
        <>
          {/* No es necesario pasar ninguna prop al Navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/filters" element={<Categories />} />
            <Route path="/details/:id_producto" element={<Bike_details />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/Usuario_usu" element={<Usuario_usu />} />
            <Route path="/Carrito_compras" element={<Carrito_compras />} />
          </Routes>
        </>
      )}
    </AuthProvider>
  );
}

export default App;