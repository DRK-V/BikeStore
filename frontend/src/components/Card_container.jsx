import React, { useState, useEffect } from 'react';
import { Card } from './Card';

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
  const numCards = 6;
  const [cardsData, setCardsData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
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

    fetchProductsWithImages();
  }, []);

  useEffect(() => {
    // Filtrar las tarjetas solo si hay una consulta de búsqueda o se seleccionó una categoría
    if (props.searchQuery || props.selectedCategory) {
      let filtered = cardsData;
  
      if (props.selectedCategory === "Bicicleta de montaña") {
        // Filtrar las tarjetas por la propiedad "tipo" con el valor "Montaña"
        filtered = filtered.filter((card) => {
          const isMontaña = card.product?.tipo && card.product.tipo.toLowerCase() === "montaña";
          return isMontaña;
        });
      } else if (props.selectedCategory === "Bicicleta de gravel") {
        // Filtrar las tarjetas por la categoría "Bicicleta de GRAVEL" o el tipo "gravel"
        const selectedCategoryLowerCase = props.selectedCategory.toLowerCase();
        filtered = filtered.filter((card) => {
          const isMatchingCategory = card.product?.categoria &&
            card.product.categoria.toLowerCase() === selectedCategoryLowerCase;
          const isTipoGravel = card.product?.tipo && card.product.tipo.toLowerCase() === "gravel";
          return isMatchingCategory || isTipoGravel;
        });
      } else if (props.selectedCategory === "Bicicleta de carretera") {
        // Filtrar las tarjetas por la categoría "Bicicleta de carretera" o el tipo "carretera"
        const selectedCategoryLowerCase = props.selectedCategory.toLowerCase();
        filtered = filtered.filter((card) => {
          const isMatchingCategory = card.product?.categoria &&
            card.product.categoria.toLowerCase() === selectedCategoryLowerCase;
          const isTipoCarretera = card.product?.tipo && card.product.tipo.toLowerCase() === "carretera";
          return isMatchingCategory || isTipoCarretera;
        });
      } else if (props.selectedCategory === "Bicicleta de ciudad") {
        // Filtrar las tarjetas por la categoría "Bicicleta de ciudad" o el tipo "ciudad"
        const selectedCategoryLowerCase = props.selectedCategory.toLowerCase();
        filtered = filtered.filter((card) => {
          const isMatchingCategory = card.product?.categoria &&
            card.product.categoria.toLowerCase() === selectedCategoryLowerCase;
          const isTipoCiudad = card.product?.tipo && card.product.tipo.toLowerCase() === "ciudad";
          return isMatchingCategory || isTipoCiudad;
        });
      }
  
      if (props.searchQuery) {
        filtered = filtered.filter((card) => {
          const includesSearchQuery = card.product?.nombre_producto.toLowerCase().includes(props.searchQuery.toLowerCase());
          return includesSearchQuery;
        });
      }
  
      setFilteredCards(filtered);
  
      // Agregar el console.log si no hay tarjetas filtradas
      if (filtered.length === 0) {
        console.log("No se encontraron tarjetas que coincidan con los filtros.");
      }
    } else {
      // Si no hay consulta de búsqueda ni categoría seleccionada, mostrar todas las tarjetas sin filtrar
      setFilteredCards(cardsData);
    }
  }, [props.selectedCategory, props.searchQuery, cardsData]);
  
  
  
  

  return (
    <article className={getCardContainerClass(props.is_categories, props.is_similar)}>
      {/* Renderizar las tarjetas filtradas */}
      {filteredCards.slice(0, numCards).map((card) => {
        const imagenPortada = card.images.find((image) => image.nombre_imagen === 'imagen portada');
        const imagenURL = imagenPortada ? `http://localhost:3060/images/${imagenPortada.id_imagen}` : '';

        return (
          <Card
            key={card.product.id_producto}
            id_producto={card.product.id_producto}
            card_clase={getCardClase(props.is_categories, props.is_similar)}
            discount={`${getRandomNumber(1, 50)}%`}
            imagen={imagenURL}
            descuento={`${getRandomNumber(7, 15)}.000.000`}
            nombre={card.product.nombre_producto}
            precio={card.product.precio}
            cuotas="35 cuotas en 250.000"
          />
        );
      })}
    </article>
  );
};
