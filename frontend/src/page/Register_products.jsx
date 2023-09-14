import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import '../css/Register_products.css';
import { Link } from "react-router-dom";

export const Register_products = () => {
  const [product, setProduct] = useState({
    nombre_producto: '',
    tipo: '',
    color: '',
    precio: '',
    stock_disponible: '',
    descripcion_producto: '',
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos del producto como JSON
      const productResponse = await fetch('http://localhost:3060/insertarProducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (productResponse.status === 200) {
        const { productId } = await productResponse.json();

        // Construir un FormData para enviar imágenes
        const formData = new FormData();
        formData.append('productId', productId);

        // Agregar las imágenes al FormData
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i].file);
        }

        // Enviar las imágenes como FormData
        const imageResponse = await fetch('http://localhost:3060/insertarImagenesProducto', {
          method: 'POST',
          body: formData,
        });

        if (imageResponse.status === 200) {
          console.log('Imágenes insertadas con éxito');
        } else {
          console.error('Error al insertar las imágenes:', imageResponse.statusText);
        }
      } else {
        console.error('Error al insertar el producto:', productResponse.statusText);
      }
    } catch (error) {
      console.error('Error al insertar el producto o las imágenes:', error);
    }
  };

  const handleImageUpload = ({ file, meta }) => {
    // Crear un objeto con la imagen y su URL
    const imageObject = { file, dataURL: meta.previewUrl };

    // Mostrar información de la imagen en la consola
    console.log('Imagen cargada:', imageObject);

    // Agregar el objeto de imagen al estado 'images'
    setImages([...images, imageObject]);
  };

  return (
    <div className="container">
      <Link to="/" className="close_register_products">
        <button></button>
      </Link>
      <div className="image-section">
        <Dropzone
          getUploadParams={null} // Esto deshabilitará el envío automático de imágenes
          onChangeStatus={handleImageUpload}
          accept="image/*"
          inputContent={(files, extra) =>
            extra.reject ? 'Solo imágenes' : ''
          }
        />

        <div className="uploaded-images">
          {images.map((image, index) => (
            <div key={index} className="image-preview-container">
              {/* Visualizar la imagen si es necesario */}
              <img src={image.dataURL} alt={`Imagen ${index}`} className="image-preview" />
              <button onClick={() => setImages(images.filter((_, i) => i !== index))} className="delete-button">Borrar</button>
            </div>
          ))}
        </div>
      </div>
      <div className="form-section">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label className="form-label">Nombre de Producto:</label>
            <input
              type="text"
              name="nombre_producto"
              value={product.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de Bicicleta:</label>
            <input
              type="text"
              name="tipo"
              value={product.tipoBicicleta}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Color:</label>
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Precio:</label>
            <input
              type="number"
              name="precio"
              value={product.precio}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Stock Disponible:</label>
            <input
              type="number"
              name="stock_disponible"
              value={product.stock}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción:</label>
            <textarea
              name="descripcion_producto"
              value={product.descripcion}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};
