// Card.jsx

import '../css/card.css';
import { Link } from 'react-router-dom';

import React, { useContext } from 'react';
import { useComenContext } from '../components/comencontex'; 

export const Card = (props) => {
  const { id_producto, imagen, card_clase, discount, descuento, nombre, precio, cuotas } = props;
  const { setSelectedProductId } = useComenContext(); 

  let clase = card_clase === "card_similar" ? "card_similar" : card_clase === "card_discount" ? "card_discount" : "card";
  const rutaRedireccion = `/details/${id_producto}`;

  const handleCardClick = () => {
    setSelectedProductId(id_producto); 
  };

  return (
    <Link to={rutaRedireccion} className={clase} onClick={handleCardClick}>
      <div className="text_discount">{discount}</div>
      <img src={imagen} alt={imagen} />
      <p className="texto_descuento">{descuento}</p>
      <p className="texto_nombre">{nombre}</p>
      <p className="texto_precio">{precio}</p>
      <p className="texto_cuotas">{cuotas}</p>
    </Link>
  );
};
