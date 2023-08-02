<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Register } from './Register';
import Categories from './Categories';
import Bike_details from './Bike_details';
import { Login } from './Login';
import {Loading} from '../components/loading';

import '../css/main.css'
import '../css/animation.css'
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una tarea asincrónica que tarda 3 segundos en cargar la aplicación
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (// si esta cargando
        <Loading />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/filters" element={<Categories />} />
            <Route path="/details" element={<Bike_details />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
=======
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { Register } from './Register';
import Categories from './Categories';
import Bike_details from './Bike_details';
import { Login } from './Login';
import {Loading} from '../components/loading';

import '../css/main.css'
import '../css/animation.css'
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una tarea asincrónica que tarda 3 segundos en cargar la aplicación
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (// si esta cargando
        <Loading />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/filters" element={<Categories />} />
            <Route path="/details" element={<Bike_details />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
>>>>>>> Daniel
