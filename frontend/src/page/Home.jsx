import React, { useState } from 'react';
import { Card_container } from '../components/Card_container';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import Carousel from '../components/carousel';
import { Container_button_comprados } from '../components/Container_button_comprados';

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.elements.searchInput.value);
    setSelectedCategory('');
    setIsFiltering(false);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsFiltering(true);
  };

  const handleCategoryClose = () => {
    setSelectedCategory('');
    setIsFiltering(false);
  };

  const renderCategoryHeader = () => {
    if (selectedCategory) {
      return (
        <div>
          <h2 className="category-title">{selectedCategory}</h2>
          <button className="arrow-button" onClick={handleCategoryClose}>
            <i className="fas fa-arrow-left arrow-icon"></i>inicio
          </button>
        </div>
      );
    }
    return null;
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
      {renderCategoryHeader()} {/* Renderizar el encabezado de categoría y el botón */}
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
