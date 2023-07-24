import '../css/card.css';
import { Card } from './Card'
import React from 'react';
export const Card_container = (props) => {
    let add_class_categories = ""
    // if (props.is_categories == "true") {
    //     add_class_categories = "card_container_categories"
    // } else {
    //     add_class_categories = ""
    // }

    add_class_categories = props.is_categories == "true" ? "card_container_categories" : "card_container"
    // si el props no es true o false quiere decir que puede ser "similar" 
    // el cual es para mostrar el contenedor de tarjetas pero version slider 
    if (props.is_categories !== "true" && props.is_categories !== "false") {
        add_class_categories = props.is_categories == "similar" ? "card_container_similar" : "card_container"
        console.log('ingreso: ' + add_class_categories)
    }
    let card_clase = add_class_categories == "card_container_similar" ? "similar" : ""
    return (
        <article className={add_class_categories}>
            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />
            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />
            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />
            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

            <Card
                card_clase={card_clase}
                imagen='../src/assets/beneli.png'
                descuento='9.300.000'
                nombre='Cicla beneli - marco fibra de vidrio'
                precio='9.000.000'
                cuotas='35 cuotas en 250.000'
            />

        </article>
    )
}