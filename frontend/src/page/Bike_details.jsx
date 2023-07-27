import React from 'react'
import '../css/Bike_details.css'
import imagen_ejemplo from '../assets/beneli.png'
import icon_brand from '../assets/icons/bbike-red-logo.png'

import { Navbar } from '../components/Navbar'
import Container_comments from '../components/Comments/Container_comments'
import Similar_container from '../components/Similar_container'
import {Footer} from '../components/Footer'
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
                    <button className="btn_buy">
                        <i></i>
                        Comprar
                    </button>
                    <button className="btn_add_item_cart">
                        <i></i>
                        Agregar al carrito
                    </button>
                </form>
                <div className="container_comments">
                    <Container_comments />
                </div>
                <form className="assessment">
                    <h1>Valoracion del producto</h1>
                    <div className="container_stars">
                        <input className='option_star' id="radio1" type="radio" name="estrellas" value="5" />
                        <label for="radio1">★</label>
                        <input className='option_star' id="radio2" type="radio" name="estrellas" value="4" />
                        <label for="radio2">★</label>
                        <input className='option_star' id="radio3" type="radio" name="estrellas" value="3" />
                        <label for="radio3">★</label>
                        <input className='option_star' id="radio4" type="radio" name="estrellas" value="2" />
                        <label for="radio4">★</label>
                        <input className='option_star' id="radio5" type="radio" name="estrellas" value="1" />
                        <label for="radio5">★</label>
                    </div>
                    <div className="brand">
                        <h1>Marca del producto</h1>
                        <img src={icon_brand} alt="" className="icon_bike_brand" />
                    </div>
                </form>
                <Similar_container/>
                <Footer/>
            </div>
        </>
    )
}

export default Bike_details
