import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../css/Actualizar_productos_admin.css";


export const Actualizar_productos_admin = () => {
  const { id_producto } = useParams();

  const [producto, setProducto] = useState({
    nombre_producto: "",
    descripcion_producto: "",
    stock_disponible: "",
    tipo: "",
    color: "",
    precio: ""
  });

  useEffect(() => {
    // Realizar una solicitud HTTP GET para obtener los datos del producto
    fetch(`http://localhost:3060/obtener_producto/${id_producto}`)
      .then(response => response.json())
      .then(data => {
        setProducto(data); // Establecer los datos del producto en el estado
      })
      .catch(error => {
        console.error('Error al obtener el producto:', error);
      });
  }, [id_producto]);

  const handleGuardarCambios = () => {
    // Realizar una solicitud HTTP PUT para actualizar el producto
    fetch(`http://localhost:3060/actualizar_producto/${id_producto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Producto actualizado:', data);
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value
    });
  };

  return (
    <div className='pa_one'>
      <div className='img_p'>
        <div className='entrante_img'></div>
      </div>
      <div className='info_padre'>
        <form action="" className='info_p'>
          <div className='titulo_p'>
            <h2>Actualizar</h2>
          </div>
          <div className='formu_p'>
            {/* Agregar campos de entrada para cada propiedad del producto */}
            <div className='p_1'>
              <input
                name="nombre_producto"
                className='p_2'
                type="text"
                value={producto.nombre_producto}
                onChange={handleInputChange}
              />
            </div>
            <div className='p_1'>
              <input
                name="tipo"
                className='p_2'
                type="text"
                value={producto.tipo}
                onChange={handleInputChange}
              />
            </div>
            <div className='p_1'>
              <input
                name="color"
                className='p_2'
                type="text"
                value={producto.color}
                onChange={handleInputChange}
              />
            </div>
            <div className='p_1'>
              <input
                name="precio"
                className='p_2'
                type="text"
                value={producto.precio}
                onChange={handleInputChange}
              />
            </div>
            <div className='p_1'>
              <input
                name="descripcion_producto"
                className='p_3'
                type="text"
                value={producto.descripcion_producto}
                onChange={handleInputChange}
              />
            </div>
            <div className='p_1'>
              <input
                name="stock_disponible"
                className='p_2'
                type="text"
                value={producto.stock_disponible}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
        <div className='boton_actualizar'>
          <button className='actualizar_p' onClick={handleGuardarCambios}>
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
};
