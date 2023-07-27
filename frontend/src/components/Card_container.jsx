import '../css/card.css';
import { Card } from './Card'
import React from 'react';
export const Card_container = (props) => {
    let add_class_categories = ""

    add_class_categories = props.is_categories == "true" ? "card_container_categories" : "card_container"
    // el cual es para mostrar el contenedor de tarjetas pero version slider 
    let card_clase = ""
    if (props.is_categories !== "true" && props.is_categories !== "false") {
        add_class_categories = props.is_categories == "similar" ? "card_container_similar" : "card_container"
        console.log('ingreso: ' + add_class_categories)
    }

    card_clase = add_class_categories == "card_container_similar" ? "similar" : ""
    if (add_class_categories == "card_container_categories") {
        card_clase = "card_discount"
    }
    console.log(add_class_categories)
    console.log(card_clase)
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