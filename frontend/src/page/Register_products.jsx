import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import '../css/Register_products.css'; // Asegúrate de que esta sea la ruta correcta a tu archivo CSS

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del producto y las imágenes a tu servidor o hacer lo que necesites con ellos
    console.log(product, images);
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
      {/* <Link to="/Register_products" className="close_register_products"></Link>
       */}
      <div className="image-section">
        <Dropzone
          getUploadParams={() => ({ url: 'https://example.com/upload' })}
          onChangeStatus={handleImageUpload}
          accept="image/*"
          inputContent={(files, extra) =>
            extra.reject ? 'Solo imágenes' : ''
          }
        />
        <div className="uploaded-images">
          {images.map((image, index) => (
            <div key={index} className="image-preview-container">
              {/* <img src={image} alt={`Imagen ${index}`} className="image-preview" />
              <button onClick={() => handleImageDelete(index)} className="delete-button">Borrar</button> */}
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
              name="nombre"
              value={product.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de Bicicleta:</label>
            <input
              type="text"
              name="tipoBicicleta"
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
              name="stock"
              value={product.stock}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción:</label>
            <textarea
              name="descripcion"
              value={product.descripcion}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};
