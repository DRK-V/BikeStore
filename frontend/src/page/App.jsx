import Categories from './Categories';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Home } from './Home';
import { Register } from './Register';
import Bike_details from './Bike_details';
import { Login } from './Login';
import { AuthProvider } from '../components/AuthContext';
import { Loading } from '../components/Loading';
import { Payment } from './Payment';
import { Carrito_compras } from './Carrito_compras';
import { Usuario_usu } from './Usuario_usu';
import { CartProvider } from '../components/CartContext';
import {Navbar} from '../components/Navbar'; 
import {Footer} from '../components/Footer';
import '../css/animation.css'
import '../css/main.css'
import { Card_container } from "../components/Card_container";
import { ComenProvider } from '../components/comencontex';


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); 
  const isSearchRoute = location.pathname.includes('/search'); 
  const isCategoryRoute = location.pathname.includes('/categoria/');
  useEffect(() => {
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthProvider> 
    <CartProvider>
    <ComenProvider>
      {isLoading ? (
        // si esta cargando
        <Loading />
      ) : (
        <>
        {isSearchRoute && <Navbar />}
        {isCategoryRoute  && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categoria/:tipo" element={<Card_container />} />
            <Route path="/register" element={<Register />} />
            <Route path="/filters" element={<Categories />} />
            <Route path="/details/:id_producto" element={<Bike_details />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/Usuario_usu" element={<Usuario_usu />} />
            <Route path="/Carrito_compras" element={<Carrito_compras />} />
            <Route path="/search" element={<Card_container />} />
          </Routes>
          {isSearchRoute && <Footer />}
          {isCategoryRoute && <Footer />}
        </>
      )}
       </ComenProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;