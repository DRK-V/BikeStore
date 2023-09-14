import React, { useState } from 'react';
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
  const [imageInput, setImageInput] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const selectedImages = Array.from(e.target.files);

    // Create an array of image objects with dataURL and file
    const imageObjects = selectedImages.map((image) => ({
      file: image,
      dataURL: URL.createObjectURL(image),
    }));

    // Update the images state with the new images
    setImages([...images, ...imageObjects]);
  };

  const handleImageDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send product data as JSON
      const productResponse = await fetch('http://localhost:3060/insertarProducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (productResponse.status === 200) {
        const { productId } = await productResponse.json();

        // Create a FormData to send images
        const formData = new FormData();
        formData.append('productId', productId);

        // Add the images to the FormData
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i].file);
        }

        // Send images as FormData
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

  return (
    <div className="container">
      <Link to="/" className="close_register_products">
        <button></button>
      </Link>
      <div className="image-section">

        <div className="uploaded-images">
          {images.map((image, index) => (
            <div key={index} className="image-preview-container">
              <img src={image.dataURL} alt={`Imagen ${index}`} className="image-preview" />
              <button onClick={() => handleImageDelete(index)} className="delete-button">X</button>
            </div>
          ))}
          <input
            type="file"
            accept="image/*"
            multiple
            ref={(input) => setImageInput(input)}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <button onClick={() => imageInput && imageInput.click()}>Seleccionar Imágenes</button>
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
