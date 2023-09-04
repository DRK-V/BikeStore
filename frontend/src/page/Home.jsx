import React, { useState, useEffect } from 'react';
import { Card_container } from '../components/Card_container';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import Carousel from '../components/carousel';
import { Container_button_comprados } from '../components/Container_button_comprados';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFiltering, setIsFiltering] = useState(false); // Nuevo estado para controlar si se está aplicando un filtro

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.elements.searchInput.value);
    setSelectedCategory('');
    setIsFiltering(false); // Al buscar, establecer isFiltering en false para mostrar el Carousel y Container_button_comprados
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsFiltering(true); // Al seleccionar una categoría, establecer isFiltering en true para ocultar el Carousel y Container_button_comprados
  };

  const renderCarouselAndContainer = () => {
    if (!searchQuery && !isFiltering) {
      return (
        <>
          <Carousel></Carousel>
          <Container_button_comprados />
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Navbar
        onFormSubmit={handleFormSubmit}
        setSelectedCategory={handleCategoryClick}
        selectedCategory={selectedCategory}
      />
      {renderCarouselAndContainer()}
      <Card_container
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        is_categories={false}
        is_similar={false}
      />
      <Footer />
    </>
  );
};
