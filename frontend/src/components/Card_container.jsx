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


    return (
        <article className={getCardContainerClass(props.is_categories, props.is_similar)}>
            {cardsData.map((card) => {
                const imagenPortada = card.images.find(image => image.nombre_imagen === 'imagen portada');
                const imagenURL = imagenPortada ? `http://localhost:3060/images/${imagenPortada.id_imagen}` : '';

                return (
                    <Card
                        key={card.id} // Agregar una prop "key" única
                        card_clase={getCardClase(props.is_categories, props.is_similar)}
                        discount={`${getRandomNumber(1, 50)}%`} // Aquí puedes cambiarlo como lo necesites
                        imagen={imagenURL}
                        descuento={`${getRandomNumber(7, 15)}.000.000`} // Aquí puedes cambiarlo como lo necesites
                        nombre={card.product.nombre_producto}
                        precio={card.product.precio}
                        cuotas="35 cuotas en 250.000" // Aquí puedes cambiarlo como lo necesites
                    />
                );
            })}
        </article>
    );

};

