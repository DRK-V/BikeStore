import '../css/card.css';
import { Link } from 'react-router-dom'; // Asegúrate de haber instalado React Router

export const Card = (props) => {
    const nombre = props.imagen
    let clase = props.card_clase == "similar" ? "card_similar" : "card"
    const rutaRedireccion = "/details"; // Reemplaza "/ruta-a-la-que-quieres-redirigir" con tu dirección deseada

    return (
        <Link to={rutaRedireccion} className={clase}>
            <img src={nombre} alt={props.imagen} />
            <p className="texto_descuento">{props.descuento}</p>
            <p className="texto_nombre">{props.nombre}</p>
            <p className="texto_precio">{props.precio}</p>
            <p className="texto_cuotas">{props.cuotas}</p>
        </Link>
    )
}