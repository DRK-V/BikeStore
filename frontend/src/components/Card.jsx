import '../css/card.css';
export const Card = (props) => {
    const nombre = props.imagen
    return (
        <div className="card">
            <img src={nombre} alt={props.imagen} />
            <p className="texto_descuento">{props.descuento}</p>
            <p className="texto_nombre">{props.nombre}</p>
            <p className="texto_precio">{props.precio}</p>
            <p className="texto_cuotas">{props.cuotas}</p>
        </div>
    )
}