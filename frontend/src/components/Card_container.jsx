import { useState, useEffect } from 'react';
import { Card } from './Card';

export const Card_container = (props) => {
    const numCards = 4; // The number of cards to display
    const [cardsData, setCardsData] = useState([]);

    const card_clase = getCardClase(props.is_categories); // Helper function to get the card_clase

    // Fetch random card details from the server
    const fetchRandomCards = async () => {
        const imagesBaseUrl = 'http://localhost:3060/images/';
        try {
            const responses = await Promise.all(
                Array.from({ length: numCards }, (_, index) =>
                    fetch(imagesBaseUrl + `${getRandomNumber(1, 4)}.png`)
                )
            );
            const cardsData = await Promise.all(
                responses.map((response, index) => {
                    return {
                        id: index,
                        discount: `${getRandomNumber(1, 50)}%`,
                        imagen: response.url,
                        descuento: `${getRandomNumber(7, 15)}.000.000`,
                        nombre: 'Cicla beneli - marco fibra de vidrio',
                        precio: '9.000.000',
                        cuotas: '35 cuotas en 250.000',
                    };
                })
            );
            setCardsData(cardsData);
        } catch (error) {
            console.error('Error fetching random cards:', error);
        }
    };

    useEffect(() => {
        fetchRandomCards();
    }, []);

    return (
        <article className={getCardContainerClass(props.is_categories)}>
            {cardsData.map((card) => (
                <Card
                    key={card.id}
                    card_clase={card_clase}
                    discount={card.discount}
                    imagen={card.imagen}
                    descuento={card.descuento}
                    nombre={card.nombre}
                    precio={card.precio}
                    cuotas={card.cuotas}
                />
            ))}
        </article>
    );
};

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
