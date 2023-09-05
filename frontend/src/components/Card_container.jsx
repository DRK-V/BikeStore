import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { useParams, Link } from 'react-router-dom';

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

export const Card_container = () => {
  const { tipo } = useParams();
  const [cardsData, setCardsData] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  const fetchProductsWithImages = async () => {
    const baseUrl = 'http://localhost:3060/';
    try {
      const response = await fetch(baseUrl + `products-with-images?tipo=${tipo}`);
      const data = await response.json();
      setCardsData(data);
    } catch (error) {
      console.error('Error fetching products with images:', error);
    }
  };

  useEffect(() => {
    fetchProductsWithImages();
  }, [tipo]);

  useEffect(() => {
    // Filter cards based on the search query
    if (tipo && cardsData.length > 0) {
      const filtered = cardsData.filter((card) => card.product.tipo.toLowerCase() === tipo.toLowerCase());
      setFilteredCards(filtered);
    } else {
      setFilteredCards(cardsData);
    }
  }, [tipo, cardsData]);

  return (
    <div>
      {tipo && (
        <div>
          <h1>{tipo}</h1>
          <Link to="/">Ir al inicio</Link>
        </div>
      )}
      <article className={getCardContainerClass(false, false)}>
        {filteredCards.slice(0, 24).map((card) => {
          const imagenPortada = card.images.find((image) => image.nombre_imagen === 'imagen portada');
          const imagenURL = imagenPortada ? `http://localhost:3060/images/${imagenPortada.id_imagen}` : '';

          return (
            <Card
              key={card.product.id_producto}
              id_producto={card.product.id_producto}
              card_clase={getCardClase(false, false)}
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
    </div>
  );
};