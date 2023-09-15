import React from 'react'
import "../css/Actualizar_productos_admin.css"
import { useParams } from 'react-router-dom';

export const Actualizar_productos_admin = () => {
  // fetch()
  const [nombreProducto, setNombreProducto] = useState(user ? user.nombre_producto : "");
  const [descripciondelproducto, setdescripciondelproducto] = useState(user ? user.descripcion_producto : "");
  const [stock, setstock] = useState(user ? user.stock_disponible : "");
  const [direccion, setDireccion] = useState(user ? user.direccion : "");
  const [telefono, setTelefono] = useState(user ? user.telefono : "");

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  const handleDireccionChange = (e) => {
    setDireccion(e.target.value);
  };

  const handlestockChange = (e) => {
    setstock(e.target.value);
  };

  const handleNombreProductoChange = (e) => {
    setNombreProducto(e.target.value);
  };

  const handledescripciondelproductoChange = (e) => {
    setdescripciondelproducto(e.target.value);
  };

  const handleGuardarCambios = () => {
    const updatedUser = {
      id_cliente: user.id_producto,
      nombre_producto: nombreProducto,
      descripcion_producto: descripciondelproducto,
      stock_disponible: stock,
      direccion: direccion,
      telefono: telefono
    };

    fetch(`/actualizar_producto/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Producto actualizado:', data);
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
      });
  };
    return (
        <>
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
                            <div className='p_1'>
                                <input
                                    placeholder={user ? user.nombre_producto : ""}
                                    className='p_2'
                                    type="text"
                                    value={nombreProducto} // Establece el valor del campo
                                    onChange={handleNombreProductoChange}
                                />
                            </div>
                            <div className='p_1'>
                                <input
                                    placeholder='Tipo de Bicicleta'
                                    className='p_2'
                                    type="text"
                                    value={producto.tipo} // Establece el valor del campo
                                />
                            </div>
                            <div className='p_1'>
                                <input
                                    placeholder='Color'
                                    className='p_2'
                                    type="text"
                                    value={producto.color} // Establece el valor del campo
                                />
                            </div>
                            <div className='p_1'>
                                <input
                                    placeholder='Precio'
                                    className='p_2'
                                    type="text"
                                    value={producto.precio} // Establece el valor del campo
                                />
                                <div className='p_1'>
                                    <input
                                        placeholder={user ? user.descripcion_producto : ""}
                                        className='p_3'
                                        type="text"
                                        value={descripciondelproducto} // Establece el valor del campo
                                        onChange={handledescripciondelproductoChange}
                                    />
                                </div>
                                <div className='p_1'>
                                    <input
                                        placeholder={user ? user.stock_disponible : ""}
                                        className='p_2'
                                        type="text"
                                        value={stock} // Establece el valor del campo
                                        onChange={handlestockChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='boton_actualizar'>
                        <button className='actualizar_p'>Actualizar</button>
                    </div>
                </div>

            </div>

        </>
    )
}

