<<<<<<< HEAD
import '../css/card.css';
import { Card } from './Card'
import React from 'react';
export const Card_container = (props) => {
    let add_class_categories = ""

    add_class_categories = props.is_categories == "true" ? "card_container_categories" : "card_container"
    // si el props no es true o false quiere decir que puede ser "similar" 
    // el cual es para mostrar el contenedor de tarjetas pero version slider 
    let card_clase = ""
    if (props.is_categories !== "true" && props.is_categories !== "false") {
        add_class_categories = props.is_categories == "similar" ? "card_container_similar" : "card_container"
        // console.log('ingreso: ' + add_class_categories)
    }

    card_clase = add_class_categories == "card_container_similar" ? "similar" : ""
    if (add_class_categories == "card_container_categories") {
        card_clase = "card_discount"
    }
    // console.log(add_class_categories)
    // console.log(card_clase)
    return (
        <article className={add_class_categories}>
            <Card
                card_clase={card_clase}
                discount="5%"
                imagen='../src/assets/beneli.png'
                descuento='10.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="20%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="15%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="22%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="35%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />
            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />
            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />
            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                discount="40%"
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

        </article>
    )
}
=======
import '../css/card.css';
import { Card } from './Card'
import React from 'react';

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
>>>>>>> Daniel
