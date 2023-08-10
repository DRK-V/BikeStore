import { useState, useEffect } from 'react';
import { Card } from './Card';

export const Card_container = (props) => {
  const numCards = 4; // The number of cards to display
  const [cardsData, setCardsData] = useState([]);

  // Fetch images from the server based on IDs
  const fetchImagesByIds = async () => {
    const imagesBaseUrl = 'http://localhost:3060/images/';
    try {
      const responses = await Promise.all(
        Array.from({ length: numCards }, (_, index) =>
          fetch(imagesBaseUrl + (index + 1))
        )
      );
      const cardsData = await Promise.all(
        responses.map(async (response, index) => {
          const rutaResponse = await fetch(imagesBaseUrl + 'ruta/' + (index + 1));
          const rutaData = await rutaResponse.json();

          return {
            id: index,
            imagen: response.url,
            ruta: rutaData.ruta, // Assuming rutaData has 'ruta' property
          };
        })
      );
      setCardsData(cardsData);
    } catch (error) {
      console.error('Error fetching images and routes:', error);
    }
  };

  useEffect(() => {
    fetchImagesByIds();
  }, []);

  return (
    <article className={getCardContainerClass(props.is_categories)}>
      {cardsData.map((card) => (
        <Card
          key={card.id}
          imagen={card.imagen}
          ruta={card.ruta}
        />
      ))}
    </article>
  );
};

// ... Resto de las funciones auxiliares sin cambios ...


// Helper function to get the card_clase
const getCardClase = (isCategories) => {
    if (isCategories === 'true') {
        return 'card_discount';
    } else if (isCategories === 'similar') {
        return 'similar';
    } else {
        return '';
    }
};

// Helper function to generate a random number within a range
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

// Helper function to get the appropriate container class
const getCardContainerClass = (isCategories) => {
    return isCategories === 'true' ? 'card_container_categories' : 'card_container';
};
