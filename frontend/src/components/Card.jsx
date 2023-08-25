import React from 'react';
import '../css/card.css';
import { Link } from 'react-router-dom';

export const Card = (props) => {
    const { id_producto, imagen, card_clase, discount, descuento, nombre, precio, cuotas } = props;
    let clase = card_clase === "card_similar" ? "card_similar" : card_clase === "card_discount" ? "card_discount" : "card";
    const rutaRedireccion = `/details/${id_producto}`; // Corregido para incluir el id_producto
    return (
        <Link to={rutaRedireccion} className={clase}>
            <div className="text_discount">{discount}</div>
            <img src={imagen} alt={imagen} />
            <p className="texto_descuento">{descuento}</p>
            <p className="texto_nombre">{nombre}</p>
            <p className="texto_precio">{precio}</p>
            <p className="texto_cuotas">{cuotas}</p>
        </Link>
    );
};
