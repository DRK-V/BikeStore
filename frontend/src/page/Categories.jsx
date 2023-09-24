import React, { useState } from 'react';
import '../css/Categories/Categories.css';
import { Navbar } from '../components/Navbar';
import { Card_container } from '../components/Card_container';
import { Footer } from '../components/Footer';

const Categories = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setSelectedColor(''); // Limpiar la selección de color al seleccionar un tipo
    console.log('Tipo seleccionado:', type);
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    setSelectedType(''); // Limpiar la selección de tipo al seleccionar un color
    console.log('Color seleccionado:', color);
  };

  return (
    <>
      <Navbar />
      <div className="container_categories">
        <div className="menu_categories">
          <ul>
            <h1>Tipo</h1>
            <a href="#" onClick={() => handleTypeSelection('bicicleta de carretera')}>
              <li>Bicicletas de carretera</li>
            </a>
            <a href="#" onClick={() => handleTypeSelection('bicicleta de montaña')}>
              <li>Bicicletas de montaña</li>
            </a>
            <a href="#" onClick={() => handleTypeSelection('bicicleta de gravel')}>
              <li>Bicicletas de gravel</li>
            </a>
            <a href="#" onClick={() => handleTypeSelection('bicicleta de urbanas')}>
              <li>Bicicletas de urbanas</li>
            </a>
            <a href="#" onClick={() => handleTypeSelection('bicicleta de electricas')}>
              <li>Bicicletas de electricas</li>
            </a>
            <a href="#" onClick={() => handleTypeSelection('bicicleta infantiles')}>
              <li>Bicicletas de infantiles</li>
            </a>
          </ul>
          <ul>
            <h1>Color</h1>
            <a href="#" onClick={() => handleColorSelection('Amarillo')}>
              <li>Amarillo</li>
            </a>
            <a href="#" onClick={() => handleColorSelection('Azul')}>
              <li>Azul</li>
            </a>
            <a href="#" onClick={() => handleColorSelection('Rojo')}>
              <li>Rojo</li>
            </a>
          </ul>
        </div>
        <Card_container
          tipo={selectedType}
          color={selectedColor} // Pasa el color seleccionado como prop
          is_categories="true"
          is_similar="false"
        />
      </div>
      <Footer />
    </>
  );
};

export default Categories;
