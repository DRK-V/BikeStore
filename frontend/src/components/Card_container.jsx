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
                    key={card.product.id_producto} // Utiliza el ID correcto para la key
                    id_producto={card.product.id_producto} // Pasa el id_producto como prop
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

