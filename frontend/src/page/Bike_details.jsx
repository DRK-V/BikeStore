//BIKE_DETAILS
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/Bike_details.css';
import { useCart } from '../components/CartContext';
import { Navbar } from '../components/Navbar';
import Container_comments from '../components/Comments/Container_comments';
import Similar_container from '../components/Similar_container';
import { Footer } from '../components/Footer';
import icon_brand from '../assets/icons/bbike-red-logo.png';

const Bike_details = () => {
  const { addItemToCart, setSelectedProductId } = useCart();
  const { id_producto } = useParams();

  const handleAddToCart = (event) => {
    event.preventDefault();
    if (additionalProductDetails) {
      const productPrice = parseFloat(additionalProductDetails.product.precio);
      if (!isNaN(productPrice)) {
        const cartItem = {
          product: {
            id_producto: additionalProductDetails.product.id_producto,
            precio: productPrice,
            nombre: additionalProductDetails.product.nombre_producto,
            tipo: additionalProductDetails.product.tipo, // Agrega el tipo del producto
          },
          image: mainImageURL,
        };
        addItemToCart(cartItem);
        setSelectedProductId(id_producto);
      } else {
        console.error('Precio no válido para el producto.');
      }
    }
  };
  
  

  const [productDetails, setProductDetails] = useState(null);
  const [additionalProductDetails, setAdditionalProductDetails] = useState(null);
  const [mainImageURL, setMainImageURL] = useState('');

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
        setAdditionalProductDetails(data);
        if (data.images && data.images.length > 0) {
          // Establecer la imagen de portada como la imagen principal
          const imagenPortada = data.images.find(image => image.nombre_imagen === 'imagen portada');
          if (imagenPortada) {
            setMainImageURL(`http://localhost:3060/images/${imagenPortada.id_imagen}`);
          }
        }
      } catch (error) {
        console.error('Error fetching additional product details:', error);
      }
    };

    if (id_producto) {
      fetchAdditionalProductDetails();
    }
  }, [id_producto]);

  // Función para cambiar la imagen principal cuando se hace clic en una vista
  const handleSubImageClick = (subImageURL) => {
    setMainImageURL(subImageURL);
  };

    return (
    <>
      <Navbar />
      <div className="container_view_details">
        {productDetails && additionalProductDetails && additionalProductDetails.product && (
          <>
            <div className="container_images">
            {additionalProductDetails.images.map((image) => (
                <img
                  key={image.id_imagen}
                  className="sub_images"
                  src={`http://localhost:3060/images/${image.id_imagen}`}
                  alt={image.nombre_imagen}
                  onClick={() => handleSubImageClick(`http://localhost:3060/images/${image.id_imagen}`)}
                />
              ))}
            </div>
            <img className="main_image" src={mainImageURL} alt="Imagen Principal" />
           
            <form onSubmit={handleAddToCart} action="dialog" className="form_add_item_cart">
              <label className='bike_name'>{additionalProductDetails.product.nombre_producto}</label>
              <label htmlFor="" className="price_text">
  <p>Precio:</p> ${additionalProductDetails.product.precio.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
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
              <button className="btn_add_item_cart" type="submit">
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

