import '../css/card.css';
import { Card } from './Card'


export const Card_container = (props) => {
    const numCards = 4; 
    const card_clase = getCardClase(props.is_categories); 

 
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


const getCardClase = (isCategories) => {
    if (isCategories === "true") {
        return "card_discount";
    } else if (isCategories === "similar") {
        return "similar";
    } else {
        return "";
    }
}


const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


const getCardContainerClass = (isCategories) => {
    return isCategories === "true" ? "card_container_categories" : "card_container";
}
