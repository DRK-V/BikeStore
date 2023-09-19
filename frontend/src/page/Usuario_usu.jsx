import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from "../components/Footer";
import "../css/Usuario_config.css";
import "../css/menu_profile.css";
import { Menu_profile } from "../components/Menu_profile";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from '../components/AuthContext';
import { useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

export const Usuario_usu = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeSection = queryParams.get('section');
  const { user } = useAuth();
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);


  const handleEditarProducto = (productoId) => {
    // Acceder al ID del producto desde el botón
    const idProducto = productoId;
    // Redirigir a la página de edición con el ID del producto
    navigate(`/Actualizar_productos_admin/${idProducto}`);
  };
  useEffect(() => {
    // Realiza la solicitud GET al servidor para obtener productos
    fetch('http://localhost:3060/getproductsadmin') // Asegúrate de que la URL sea correcta
      .then(response => response.json())
      .then(data => {
        setProductos(data); // Actualiza el estado con los datos de productos
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []); // El segundo argumento es un array vacío para asegurarte de que esta solicitud solo se realice una vez al montar el componente.


  useEffect(() => {
    if (activeSection === 'profile') {
      activateMyUsu();
    } else if (activeSection === 'settings') {
      activateMyConfig();
    } else if (activeSection === 'orders') {
      activateMyOrder();
    } else if (activeSection === 'manage') {
      activateManage();
    }
  }, [activeSection]);

  const [isTableExpanded, setIsTableExpanded] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState([]);

  const isOrderExpanded = (orderId) => {
    return expandedOrders.includes(orderId);
  };

  const handleExpandOrder = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter(id => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  const [isMyUsuActive, setIsMyUsuActive] = useState(true);
  const [isMyConfigActive, setIsMyConfigActive] = useState(false);
  const [isMyOrderActive, setIsMyOrderActive] = useState(false);
  const [isManageActive, setIsManageActive] = useState(false);

  const [ventas, setVentas] = useState([]);

  const activateMyUsu = () => {
    setIsMyUsuActive(true);
    setIsMyConfigActive(false);
    setIsMyOrderActive(false);
    setIsManageActive(false)
  };

  const activateMyConfig = () => {
    setIsMyUsuActive(false);
    setIsMyConfigActive(true);
    setIsMyOrderActive(false);
    setIsManageActive(false);
  };

  const activateMyOrder = () => {
    setIsMyUsuActive(false);
    setIsMyConfigActive(false);
    setIsMyOrderActive(true);
    setIsManageActive(false)
  };
  const activateManage = () => {
    setIsMyUsuActive(false);
    setIsMyConfigActive(false);
    setIsMyOrderActive(false);
    setIsManageActive(true)
  };
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3060/user/${user.id_cliente}/ventas`) // Cambiar la URL de la petición
        .then(response => response.json())
        .then(data => {
          console.log('Datos de ventas:', data);
          setVentas(data); // Actualizar el estado con los datos de ventas
        })
        .catch(error => {
          console.error('Error al obtener las ventas:', error);
        });
    }
  }, [user]);

  const [nombreUsuario, setNombreUsuario] = useState(user ? user.nombre_usuario : "");
  const [correo, setCorreo] = useState(user ? user.correo : "");
  const [numeroDocumento, setNumeroDocumento] = useState(user ? user.numero_de_documento : "");
  const [direccion, setDireccion] = useState(user ? user.direccion : "");
  const [telefono, setTelefono] = useState(user ? user.telefono : "");

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };

  const handleDireccionChange = (e) => {
    setDireccion(e.target.value);
  };

  const handleNumeroDocumentoChange = (e) => {
    setNumeroDocumento(e.target.value);
  };

  const handleNombreUsuarioChange = (e) => {
    setNombreUsuario(e.target.value);
  };

  const handleCorreoChange = (e) => {
    setCorreo(e.target.value);
  };

  const handleGuardarCambios = () => {
    const updatedUser = {
      id_cliente: user.id_cliente,
      nombre_usuario: nombreUsuario,
      correo: correo,
      numero_de_documento: numeroDocumento,
      direccion: direccion,
      telefono: telefono
    };

    fetch('http://localhost:3060/api/update_user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Usuario actualizado:', data);
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });
  };
  const handleEliminarProducto = async (productoId) => {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.');

    if (!confirmacion) {
      // El usuario canceló la eliminación
      return;
    }

    try {
      const response = await fetch(`http://localhost:3060/deleteProduct/${productoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Producto eliminado con éxito');
        // Aquí puedes agregar lógica adicional si es necesario, como actualizar la lista de productos
      } else {
        const errorResponse = await response.json();
        console.error('Error al eliminar el producto', errorResponse.error);
        alert(errorResponse.error);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la solicitud. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
      <div className="pa_usu">
        <div className="usu_ini">
          <Menu_profile
            is_link_active={true}
            activateMyUsu={activateMyUsu}
            activateMyConfig={activateMyConfig}
            activateMyOrder={activateMyOrder}
            activateManage={activateManage}
          />
        </div>
        <div className="usu_detall">
          <button className="exit_button">
            {" "}
            <Link className="exit_image" to="/">
              <FiX className="exit_image" />
            </Link>{" "}
          </button>

          <div className={`container_my_usu ${isMyUsuActive ? "container_active" : ""}`}>
            <div className="titulo1">
              <h2>Mi perfil</h2>
            </div>
            <form action="" className="formulario_usu">
              <div className="formu_usu">
                <div className="fila1">
                  <div className="fila">
                    <label htmlFor="">
                      <b>Nombre</b>
                    </label>
                    <input
                      disabled
                      className="input1"
                      placeholder="Nombre"
                      type="text"
                      value={user ? user.nombre_usuario : ""}
                    />
                  </div>

                  <div className="fila">
                    <label htmlFor="">
                      <b>Correo</b>
                    </label>
                    <input
                      disabled
                      className="input1"
                      placeholder="Correo"
                      type="text"
                      value={user ? user.correo : ""}
                    />
                  </div>
                </div>

                <div className="fila1">
                  <div className="fila">
                    <label htmlFor="">
                      <b>Numero de Documento</b>
                    </label>
                    <input
                      disabled
                      className="input1"
                      placeholder="Numero de Documento"
                      type="text"
                      value={user ? user.numero_de_documento : ""}
                    />
                  </div>

                  <div className="fila">
                    <label htmlFor="">
                      <b>Direccion</b>
                    </label>
                    <input
                      disabled
                      className="input1"
                      placeholder="Direccion"
                      type="text"
                      value={user ? user.direccion : ""}
                    />
                  </div>
                </div>

                <div className="fila1">
                  <div className="fila">
                    <label htmlFor="">
                      <b>Telefono</b>
                    </label>
                    <input
                      disabled
                      className="input2"
                      placeholder="Telefono"
                      type="text"
                      value={user ? user.telefono : ""}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className={`container_my_config ${isMyConfigActive ? "container_active" : ""}`}>
            <div className="titulo1">
              <h2>Configurar perfil</h2>
            </div>
            <form action="" className="formulario_usu">
              <div className="formu_usu">
                <div className="fila1">
                  <div className="fila">
                    <label htmlFor="">
                      <b>Nombre</b>
                    </label>
                    <input
                      className="input1"
                      placeholder={user ? user.nombre_usuario : ""}
                      type="text"
                      value={nombreUsuario}
                      onChange={handleNombreUsuarioChange}
                    />
                  </div>
                  <div className="fila">
                    <label htmlFor="">
                      <b>Correo</b>
                    </label>
                    <input
                      className="input1"
                      placeholder={user ? user.correo : ""}
                      value={correo}
                      type="text"
                      onChange={handleCorreoChange}
                    />
                  </div>
                </div>

                <div className="fila1">
                  <div className="fila">
                    <label htmlFor="">
                      <b>Numero de Documento</b>
                    </label>
                    <input
                      className="input1"
                      placeholder={user ? user.numero_de_documento : ""}
                      value={numeroDocumento}
                      type="text"
                      onChange={handleNumeroDocumentoChange}
                    />
                  </div>

                  <div className="fila">
                    <label htmlFor="">
                      <b>Direccion</b>
                    </label>
                    <input
                      className="input1"
                      placeholder={user ? user.direccion : ""}
                      value={direccion}
                      type="text"
                      onChange={handleDireccionChange}
                    />
                  </div>
                </div>

                <div className="fila1">
                  <div className="fila">
                    <label htmlFor="">
                      <b>Telefono</b>
                    </label>
                    <input
                      className="input22"
                      placeholder={user ? user.telefono : ""}
                      value={telefono}
                      type="text"
                      onChange={handleTelefonoChange}
                    />
                  </div>
                  <button type="button" className="boton_cambiar" onClick={handleGuardarCambios}>Guardar cambios</button>
                </div>
              </div>
            </form>
          </div>

          <div className={`container_my_order ${isMyOrderActive ? "container_active" : ""}`}>
            <h2>Orders</h2>
            <div className="header_columns_orders">
              <b>ID pedido</b>
              <b>Fecha pedido</b>
              <b>Total</b>
            </div>
            <div className="container_list_section_orders">
              {ventas.map(venta => { // Cambiar "ventas" aquí
                const formattedFechaPedido = venta.fecha_venta.substring(0, 10);

                return (
                  <div className="section_order" key={venta.id_venta}>
                    <div
                      className="section_order_preview"
                      onClick={() => handleExpandOrder(venta.id_venta)}
                    >
                      <b>#{venta.id_venta}</b>
                      <b>{formattedFechaPedido}</b>
                      <b>$ {venta.monto_final}</b>
                      <span
                        className="material-symbols-outlined icon-open-section" id={expandedOrders.includes(venta.id_venta) ? "rotate-icon" : ""}
                        onClick={() => handleExpandOrder(venta.id_venta)}
                      >
                        arrow_forward_ios
                      </span>
                    </div>
                    <table
                      className={isOrderExpanded(venta.id_venta) ? "" : "hidden-table"}
                    >
                      <thead className='venta_thead'>
                        <tr>
                          <th>ID Producto</th>
                          <th>Nombre Producto</th>
                          <th>Cantidad</th>
                          <th>Precio Unitario</th>
                        </tr>
                      </thead>
                      <tbody className="tableBody">
                        {venta.productos.map(producto => ( // Iterar sobre los productos de la venta actual
                          <tr key={producto.id_producto}>
                            <td>{producto.id_producto}</td>
                            <td>{producto.nombre_producto}</td>
                            <td>{producto.cantidad_producto}</td>
                            <td>${producto.precio}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="3"></td>
                          <td><b>Total: ${venta.monto_final}</b></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`container_manage_products ${isManageActive ? "container_active" : ""}`}>
            <header className="cabecera_administrar">
              <h1>Administrar productos</h1>
              <div className="search-container">
                <input type="text" placeholder="Buscar por ID o nombre" />
                <button className="search-button">

                </button>
              </div>
              <Link className="agregar-button" to="/Register_products">
                Agregar producto
              </Link>
            </header>
            {/* aqui va la tabla */}
            <table className="table_manage_products">
              <thead>
                <tr>
                  <th>id</th>
                  <th>nombre</th>
                  <th>color</th>
                  <th>tipo</th>
                  <th>precio</th>
                  <th>stock_disponible</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id_producto}>
                    <td className='columna_nombre'>{producto.id_producto}</td>
                    <td className='columna_nombre'>{producto.nombre_producto}</td>
                    <td className='columna_nombre'>{producto.color}</td>
                    <td className='columna_nombre'>{producto.tipo}</td>
                    <td className='columna_nombre'><span style={{ color: 'green', fontSize: '1em' }}>$</span>{producto.precio}</td>
                    <td className='columna_nombre'>{producto.stock_disponible}</td>
                    <td className='icon_container'>

                      <Link to={`/Actualizar_productos_admin/${producto.id_producto}`}>
                        <button
                          className='boton_editar_producto'
                          onClick={() => handleEditarProducto(producto.id_producto)}
                          data-producto-id={producto.id_producto}
                        ></button>
                      </Link>

                      <button
                        className='boton_eliminar_producto'
                        onClick={() => handleEliminarProducto(producto.id_producto)}
                        data-producto-id={producto.id_producto}
                      ></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>


          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};
