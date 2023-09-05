import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { useParams, Link, useLocation } from 'react-router-dom';

const getCardClase = (isCategories, isSimilar) => {
  if (isCategories === 'true' && isSimilar === 'false') {
    return 'card_discount';
  } else if (isSimilar === 'true' && isCategories === 'false') {
    return 'card_similar';
  } else {
    return '';
  }
};

const getCardContainerClass = (isCategories, isSimilar) => {
  if (isSimilar === 'true') {
    return 'card_container_similar';
  } else if (isCategories === 'true') {
    return 'card_container_categories';
  } else {
    return 'card_container';
  }
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const Card_container = (props) => {
  const { tipo } = useParams();
  const numCards = 24;
  const [cardsData, setCardsData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const location = useLocation();

  const fetchProductsWithImages = async () => {
    const baseUrl = 'http://localhost:3060/';
    try {
      const response = await fetch(baseUrl + 'products-with-images');
      const data = await response.json();
      setCardsData(data);
    } catch (error) {
      console.error('Error fetching products with images:', error);
    }
  };

  useEffect(() => {
    fetchProductsWithImages();
  }, []);

  useEffect(() => {
    // Filtra tarjetas según el parámetro de categoría (tipo)
    if (tipo) {
      const filtered = cardsData.filter(
        (card) => card.product.tipo.toLowerCase() === tipo.toLowerCase()
      );
      setFilteredCards(filtered);
    } else {
      setFilteredCards(cardsData);
    }
  }, [tipo, cardsData]);

  useEffect(() => {
    const searchQuery = new URLSearchParams(location.search).get('query');
    const filteredByCategory = tipo
      ? cardsData.filter((card) => card.product.tipo.toLowerCase() === tipo.toLowerCase())
      : cardsData;
  
    if (searchQuery) {
      const filteredBySearch = cardsData.filter((card) =>
        card.product.nombre_producto.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCards(filteredBySearch);
    } else {
      setFilteredCards(filteredByCategory);
    }
  }, [location.search, cardsData, tipo]);
  
  
  

  return (
    <div>
      {tipo && (
        <div>
          <h1>{tipo}</h1>
          
        </div>
      )}
      <article
        className={getCardContainerClass(props.is_categories, props.is_similar)}
      >
        {filteredCards.slice(0, numCards).map((card) => {
          const imagenPortada = card.images.find(
            (image) => image.nombre_imagen === 'imagen portada'
          );
          const imagenURL = imagenPortada
            ? `http://localhost:3060/images/${imagenPortada.id_imagen}`
            : '';

          return (
            <Card
              key={card.product.id_producto}
              id_producto={card.product.id_producto}
              card_clase={getCardClase(props.is_categories, props.is_similar)}
              discount={`${getRandomNumber(1, 50)}%`}
              imagen={imagenURL}
              descuento={'0'}
              nombre={card.product.nombre_producto}
              precio={card.product.precio}
              cuotas="35 cuotas en 250.000"
            />
          );
        })}
      </article>
    </div>
  );
};
