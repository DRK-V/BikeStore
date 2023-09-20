import React, { useState } from "react";
import "../css/Register_products.css";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export const Register_products = () => {
  const { idCliente } = useAuth();
  const [product, setProduct] = useState({
    nombre_producto: "",
    tipo: "",
    color: "",
    precio: "",
    stock_disponible: "",
    descripcion_producto: "",
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
      // Calcular monto_final
      const montoFinal = product.precio * product.stock_disponible;
  
      // Actualizar el objeto product con monto_final
      setProduct({
        ...product,
        monto_final: montoFinal,
      });
  
      // Enviar datos del producto como JSON
      const productResponse = await fetch("http://localhost:3060/insertarProducto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
  
      if (productResponse.status === 200) {
        const { productId, nombre_producto } = await productResponse.json();
  
        // Crear un FormData para enviar imágenes
        const formData = new FormData();
        formData.append("productId", productId);
        formData.append("producto", product.nombre_producto);
  
        // Subir las imágenes al servidor
        for (let i = 0; i < images.length; i++) {
          formData.append("images", images[i].file, images[i].file.name);
        }
  
        const imageResponse = await fetch("http://localhost:3060/insertarImagenesProducto", {
          method: "POST",
          body: formData,
        });
  
        if (imageResponse.status === 200) {
          console.log("Imágenes insertadas con éxito");
          alert("Imágenes insertadas con éxito");
          window.location.reload();
        } else {
          console.error("Error al insertar las imágenes:", imageResponse.statusText);
        }
  
        // Enviar datos de la compra como JSON, incluyendo el id_cliente como codigo_administrador
        const compraResponse = await fetch("http://localhost:3060/insertarCompra", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            monto_final: montoFinal,
            estado: "finalizado", // Cambiado a "finalizado" como se mencionó anteriormente
            direccion: "palmira", // Cambiado a "palmira" como se mencionó anteriormente
            codigo_administrador: idCliente, // Usar id_cliente como codigo_administrador
          }),
        });
  
        if (compraResponse.status === 200) {
          console.log("Compra insertada con éxito");
  
          // Obtener el ID de la compra recién insertada
          const { compraId } = await compraResponse.json();
  
          // Enviar datos a insertarCompraProducto
          const compraProductoResponse = await fetch("http://localhost:3060/insertarCompraProducto", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_producto: productId, // ID del producto generado
              id_compra: compraId,   // ID de la compra generada
            }),
          });
  
          if (compraProductoResponse.status === 200) {
            console.log("Relación compra-producto insertada con éxito");
          } else {
            console.error("Error al insertar la relación compra-producto:", compraProductoResponse.statusText);
          }
        } else {
          console.error("Error al insertar la compra:", compraResponse.statusText);
        }
      } else {
        console.error("Error al insertar el producto:", productResponse.statusText);
      }
    } catch (error) {
      console.error("Error al insertar el producto, las imágenes o la relación compra-producto:", error);
    }
  };
  

  return (
    <div className="container">
      <Link to="/Usuario_usu?section=manage" className="close_register_products">
        <button></button>
      </Link>
      <div className="image-section">
        <div className="uploaded-images">
          {images.map((image, index) => (
            <div key={index} className="image-preview-container">
              <img
                src={image.dataURL}
                alt={`Imagen ${index}`}
                className="image-preview"
              />
              <button
                onClick={() => handleImageDelete(index)}
                className="delete-button"
              >
                X
              </button>
            </div>
          ))}
          <input
            type="file"
            accept="image/*"
            multiple
            ref={(input) => setImageInput(input)}
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          <button onClick={() => imageInput && imageInput.click()}>
            Seleccionar Imágenes
          </button>
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
              value={product.nombre_producto}
              placeholder="Escribe nombre del producto"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de Bicicleta:</label>
            <select
              className="select"
              name="tipo"
              value={product.tipo}
              onChange={handleChange}
            >
              <option value="bicicleta de montaña">Bicicleta de Montaña</option>
              <option value="bicicleta de gravel">Bicicleta de Gravel</option>
              <option value="bicicleta de carretera">
                Bicicleta de Carretera
              </option>
              <option value="bicicleta de ciudad">Bicicleta de Ciudad</option>
              <option value="bicicleta electrica">Bicicleta Eléctrica</option>
              <option value="bicicleta plegable">Bicicleta Plegable</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Color:</label>
            <input
              type="text"
              name="color"
              value={product.color}
              placeholder="Escribe el color"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Precio:</label>
            <input
              type="number"
              name="precio"
              placeholder="Escribe el valor en pesos"
              value={product.precio}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Stock Disponible:</label>
            <input
              type="number"
              name="stock_disponible"
              placeholder="cantidad de producto"
              value={product.stock_disponible}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción:</label>
            <textarea
              name="descripcion_producto"
              value={product.descripcion_producto}
              placeholder="Breve descripcion con maximo 255 caracteres"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Agregar</button>
        </form>
      </div>
    </div>
  );
};