import '../css/card.css';
import { Card } from './Card'
import React from 'react';

export const Card_container = (props) => {
    const numCards = 4; // The number of cards to display
    const card_clase = getCardClase(props.is_categories); // Helper function to get the card_clase

    // Generate an array of objects containing random card details
    const cardsData = Array.from({ length: numCards }, (_, index) => ({
        id: index,
        discount: `${getRandomNumber(1, 50)}%`,
        imagen: `http://localhost:3060/images/cicle${getRandomNumber(1, 4)}.png`,
        descuento: `${getRandomNumber(7, 15)}.000.000`,
        nombre: 'Cicla beneli - marco fibra de vidrio',
        precio: '9.000.000',
        cuotas: '35 cuotas en 250.000',
    }));

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
    )
}

// Helper function to get the card_clase
const getCardClase = (isCategories) => {
    if (isCategories === "true") {
        return "card_discount";
    } else if (isCategories === "similar") {
        return "similar";
    } else {
        return "";
    }
}

// Helper function to generate a random number within a range
const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Helper function to get the appropriate container class
const getCardContainerClass = (isCategories) => {
    return isCategories === "true" ? "card_container_categories" : "card_container";
}
