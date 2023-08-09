// Card.jsx
import React from 'react';
import '../css/card.css';
import { Link } from 'react-router-dom';

export const Card = (props) => {
    const nombre = props.imagen;
    let clase = props.card_clase === "card_similar" ? "card_similar" : props.card_clase === "card_discount" ? "card_discount" : "card";
    console.log(clase)
    const rutaRedireccion = "/details";
    return (
        <Link to={rutaRedireccion} className={clase}>
            <div className="text_discount">{props.discount}</div>
            <img src={nombre} alt={props.imagen} />
            <p className="texto_descuento">{props.descuento}</p>
            <p className="texto_nombre">{props.nombre}</p>
            <p className="texto_precio">{props.precio}</p>
            <p className="texto_cuotas">{props.cuotas}</p>
        </Link>
    );
};
