import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import '../css/Register_products.css'; // Asegúrate de que esta sea la ruta correcta a tu archivo CSS
import { Link } from "react-router-dom";

export const Register_products = () => {
  const [product, setProduct] = useState({
    nombre: '',
    tipoBicicleta: '',
    color: '',
    precio: '',
    stock: '',
    descripcion: '',
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const generateFormData = () => {
    const formData = new FormData();

    formData.append('nombre_producto', product.nombre);
    formData.append('descripcion_producto', product.descripcion);
    formData.append('stock_disponible', product.stock);
    formData.append('tipo', product.tipoBicicleta);
    formData.append('color', product.color);
    formData.append('precio', product.precio);

    // Agregar cada archivo de imagen al FormData
    images.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Handle submit called');
    // Validar que se ingresen todos los campos obligatorios
    if (!product.nombre || !product.tipoBicicleta || !product.color || !product.precio || !product.stock || !product.descripcion) {
      alert('Todos los campos son obligatorios');
      return;
    }
    const formData = generateFormData();

    // Realiza una solicitud POST al servidor con los datos y las imágenes
    try {
      const response = await fetch('http://localhost:3060/insertarProducto', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        // Producto insertado con éxito, puedes redirigir o mostrar un mensaje de éxito
        console.log('Producto insertado con éxito');
      } else {
        // Maneja el error de alguna manera
        console.error('Error al insertar el producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al insertar el producto:', error);
    }
  };

  const handleImageUpload = ({ file }) => {
    setImages([...images, file]);
  };

  const handleImageDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="container">
      <Link to="/" className="close_register_products">
        <button></button>
      </Link>
      <div className="image-section">
        <Dropzone
          getUploadParams={() => ({})}
          onChangeStatus={handleImageUpload}
          accept="image/*"
          inputContent={(files, extra) =>
            extra.reject ? 'Solo imágenes' : ''
          }
        />
        <div className="uploaded-images">
          {images.map((image, index) => (
            <div key={index} className="image-preview-container">
              <img src={image.dataURL} alt={`Imagen ${index}`} className="image-preview" />
              <button onClick={() => handleImageDelete(index)} className="delete-button">Borrar</button>
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
