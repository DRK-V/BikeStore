
//bike_details
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Bike_details.css'

import icon_brand from '../assets/icons/bbike-red-logo.png'
import SimilarContainer from '../components/Similar_container';

import { Navbar } from '../components/Navbar'
import Container_comments from '../components/Comments/Container_comments'

import { Footer } from '../components/Footer'
const Bike_details = () => {
    const { id_producto } = useParams();
    const [productDetails, setProductDetails] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3060/product-details/${id_producto}`);
                const data = await response.json();
                setProductDetails(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id_producto]);
    return (
    <>
      <Navbar />
      <div className="container_view_details">
        {productDetails && (
          <>
            <div className="container_images">
              <img className="sub_images" src={productDetails.imagen}></img>
              <img className="sub_images" src={productDetails.imagen}></img>
              <img className="sub_images" src={productDetails.imagen}></img>
            </div>
            <img className="main_image" src={productDetails.imagen}></img>

            <form action="dialog" className="form_add_item_cart">
              <label className='bike_name'>{productDetails.nombre_producto}</label>
              <label htmlFor="" className="price_text">
                <p>Precio:</p> ${productDetails.precio}
                {productDetails.descuento && (
                  <small className="descuento_text">${productDetails.descuento}</small>
                )}
              </label>
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
                {productDetails.descripcion}
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
          </>
        )}
      </div>
      <SimilarContainer />
      <Footer />
    </>
  );
}

export default Bike_details

