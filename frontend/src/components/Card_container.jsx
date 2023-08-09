// Card_container.jsx
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

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
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

export const Card_container = (props) => {
    const numCards = 4;
    const [cardsData, setCardsData] = useState([]);

    const fetchRandomCards = async () => {
        const imagesBaseUrl = 'http://localhost:3060/images/';
        try {
            const responses = await Promise.all(
                Array.from({ length: numCards }, (_, index) =>
                    fetch(imagesBaseUrl + `cicle${getRandomNumber(1, 4)}.png`)
                )
            );
            const cardsData = responses.map((response, index) => {
                return {
                    id: index,
                    discount: `${getRandomNumber(1, 50)}%`,
                    imagen: response.url,
                    descuento: `${getRandomNumber(7, 15)}.000.000`,
                    nombre: 'Cicla beneli - marco fibra de vidrio',
                    precio: '9.000.000',
                    cuotas: '35 cuotas en 250.000',
                };
            });
            setCardsData(cardsData);
        } catch (error) {
            console.error('Error fetching random cards:', error);
        }
    };

    useEffect(() => {
        fetchRandomCards();
    }, []);

    return (
        <article className={getCardContainerClass(props.is_categories, props.is_similar)}>
            {cardsData.map((card) => (
                <Card
                    key={card.id}
                    card_clase={getCardClase(props.is_categories, props.is_similar)}
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
