import React from 'react'
import '../css/carrito_compras.css'
import carritoo from "../assets/bolsa-de-la-compra.png";



export const Presio_compra = () => {
  return (
    <div className='info_pc'>
        <h2>Envio $0.0</h2>
        <h1>Costo Total 23.800.000</h1>
        <button className='pagar'><img src={carritoo} alt="carrito" className="carro_pagar" />Continuar compra</button>
    </div>
  )
}
