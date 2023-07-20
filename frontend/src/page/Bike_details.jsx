import React from 'react'
import '../css/Bike_details.css'
import imagen_ejemplo from '../assets/beneli.png'
import { Navbar } from '../components/Navbar'
const Bike_details = () => {
    return (
        <>
            <Navbar />
            <div className="container_view_details">
                <div className="container_images">
                    <img className="sub_images" src={imagen_ejemplo}></img>
                    <img className="sub_images" src={imagen_ejemplo}></img>
                    <img className="sub_images" src={imagen_ejemplo}></img>
                </div>
                <img className="main_image" src={imagen_ejemplo}>
                </img>

                <form action="dialog" className="form_add_item_cart">
                    <label className='bike_name'>Cicla beneli - Marco fibra de vidrio</label>
                    <label htmlFor="" className="price_text"><p>Precio:</p> $9000000 <small className='descuento_text'>9500000</small></label>
                    <div className="container_color_details">
                        <label htmlFor="" className="color_text">Color:<strong>Azul Aguamarina</strong></label>
                        <input type="color" name="color_bike" id="" value="#7ABBDC" />
                    </div>
                    <label htmlFor="" className="text_tamano">Tamaño:</label>
                    <select name="size_bike" id="">
                        <option value="">seleccionar</option>
                        <option value="L">long</option>
                        <option value="M">Medium</option>
                        <option value="s">Small</option>
                    </select>
                    <label htmlFor="" className="text_bike_type">Tipo de bicleta: Ruta</label>
                    <div className="container_count">
                        <label htmlFor="">Cantidad:</label>
                        <input type="number" name="count_bike" min="1" max="5" id="" />
                    </div>
                    <p className="text_descripcion_details">
                        Descripcion:bicicleta fabricada en 60501 aluminio, modelo 2016,Unisex
                    </p>
                </form>
            </div>
        </>
    )
}

export default Bike_details
