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
import { CartProvider } from '../components/CartContext'; // Import CartProvider

import '../css/animation.css'
import '../css/main.css'


function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulates an asynchronous task that takes 3 seconds to load the application
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthProvider>
      <CartProvider> {/* Add the CartProvider here */}
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
