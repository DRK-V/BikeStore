
//bike_details
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Bike_details.css'

import icon_brand from '../assets/icons/bbike-red-logo.png'

import { Navbar } from '../components/Navbar'
import Container_comments from '../components/Comments/Container_comments'
import Similar_container from '../components/Similar_container'

import { Footer } from '../components/Footer'
const Bike_details = () => {
  const { id_producto } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [additionalProductDetails, setAdditionalProductDetails] = useState(null); // Asegúrate de haber declarado esta línea


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

  useEffect(() => {
      const fetchAdditionalProductDetails = async () => {
          try {
              const response = await fetch(`http://localhost:3060/products-with-images/${id_producto}`);
              const data = await response.json();
              setAdditionalProductDetails(data); // Asegúrate de que la estructura de data coincida con lo que se espera
          } catch (error) {
              console.error('Error fetching additional product details:', error);
          }
      };

      if (id_producto) {
          fetchAdditionalProductDetails();
      }
  }, [id_producto]);

  const imagenPortada = productDetails?.images?.find(image => image.nombre_imagen === 'imagen portada');
  const imagenVista1 = productDetails?.images?.find(image => image.nombre_imagen === 'vista 1');
  const imagenVista2 = productDetails?.images?.find(image => image.nombre_imagen === 'vista 2');
  const imagenVista3 = productDetails?.images?.find(image => image.nombre_imagen === 'vista 3');
  const imagenURL = imagenPortada ? `http://localhost:3060/images/${imagenPortada.id_imagen}` : '';
  const imagenVista1URL = imagenVista1 ? `http://localhost:3060/images/${imagenVista1.id_imagen}` : '';
  const imagenVista2URL = imagenVista2 ? `http://localhost:3060/images/${imagenVista2.id_imagen}` : '';
  const imagenVista3URL = imagenVista3 ? `http://localhost:3060/images/${imagenVista3.id_imagen}` : '';

  console.log('additionalProductDetails:', additionalProductDetails);
  const handleAddToCart = (event) => {
    event.preventDefault();
    addToCart(id_producto);
    console.log('Item added to cart');
  };
    return (
    <>
      <Navbar />
      <div className="container_view_details">
      {productDetails && additionalProductDetails &&  (
          <>
            <div className="container_images">
            <img className="sub_images1" src={imagenVista1URL} alt="Vista 1" />
                        <img className="sub_images2" src={imagenVista2URL} alt="Vista 2" />
                        <img className="sub_images3" src={imagenVista3URL} alt="Vista 3" />
                    
            </div>
            <img className="main_image" src={imagenURL} alt="Imagen Principal" />


            <form action="dialog" className="form_add_item_cart">
            <label className='bike_name'>{additionalProductDetails?.product?.nombre_producto}</label>
    <label htmlFor="" className="price_text">
        <p>Precio:</p> ${additionalProductDetails?.product?.precio}
    </label>
              <div className="container_color_details">
              <label htmlFor="" className="color_text">Color:<strong>{additionalProductDetails?.product?.color}</strong></label>
        <input type="color" name="color_bike" id="" value="#7ABBDC" />
      </div>
              <label htmlFor="" className="text_tamano">Tamaño:</label>
              <select name="size_bike" id="">
                <option value="">seleccionar</option>
                <option value="L">long</option>
                <option value="M">Medium</option>
                <option value="s">Small</option>
              </select>
              <label htmlFor="" className="text_bike_type">Tipo de bicleta:{ additionalProductDetails?.product?.tipo}</label>
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
              <button className="btn_add_item_cart" onClick={handleAddToCart}>
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
                        <label htmlFor="radio1">★</label>
                        <input className='option_star' id="radio2" type="radio" name="estrellas" value="4" />
                        <label htmlFor="radio2">★</label>
                        <input className='option_star' id="radio3" type="radio" name="estrellas" value="3" />
                        <label htmlFor="radio3">★</label>
                        <input className='option_star' id="radio4" type="radio" name="estrellas" value="2" />
                        <label htmlFor="radio4">★</label>
                        <input className='option_star' id="radio5" type="radio" name="estrellas" value="1" />
                        <label htmlFor="radio5">★</label>
                    </div>
                    <div className="brand">
                        <h1>Marca del producto</h1>
                        <img src={icon_brand} alt="" className="icon_bike_brand" />
                    </div>

            </form>
            <Similar_container />
      <Footer />
          </>
        )}
      </div>
     
    </>
  );
}

export default Bike_details

