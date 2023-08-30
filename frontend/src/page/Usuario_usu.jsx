import { useEffect, useState } from 'react';
import { Footer } from "../components/Footer";
import "../css/Usuario_config.css";
import "../css/menu_profile.css";
import { Menu_profile } from "../components/Menu_profile";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from '../components/AuthContext';
import { useLocation } from 'react-router-dom';

export const Usuario_usu = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const activeSection = queryParams.get('section');//para obtener la seccion que se deberia mostrar
  const { user } = useAuth();


  useEffect(() => {
    if (activeSection === 'profile') {
      activateMyUsu();
    } else if (activeSection === 'settings') {
      activateMyConfig();
    } else if (activeSection === 'orders') {
      activateMyOrder();
    }
  }, [activeSection]);

  //estado para cambiar la orientacion del boton 180 grados
  const [isTableExpanded, setIsTableExpanded] = useState(false);

  //para mostrar y ocultar las tablas hijas
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState([]);//para rastrear el estado de expansión de cada pedido

  const isOrderExpanded = (orderId) => {
    return expandedOrders.includes(orderId);
  };

  // Función para manejar el clic en el botón de expansión
  const handleExpandOrder = (orderId) => {
    if (expandedOrders.includes(orderId)) {
      setExpandedOrders(expandedOrders.filter(id => id !== orderId));
    } else {
      setExpandedOrders([...expandedOrders, orderId]);
    }
  };

  const [viewMenu, setViewMenu] = useState(true);
  const [isMyUsuActive, setIsMyUsuActive] = useState(true);
  const [isMyConfigActive, setIsMyConfigActive] = useState(false);
  const [isMyOrderActive, setIsMyOrderActive] = useState(false);
  const [formulario, setformulario] = useState({
    nombre_usuario: "",
  });

  const [orders, setOrders] = useState([]); // Estado para almacenar los pedidos y productos

  const activateMyUsu = () => {
    setIsMyUsuActive(true);
    setIsMyConfigActive(false);
    setIsMyOrderActive(false);
  };

  const activateMyConfig = () => {
    setIsMyUsuActive(false);
    setIsMyConfigActive(true);
    setIsMyOrderActive(false);
  };

  const activateMyOrder = () => {
    setIsMyUsuActive(false);
    setIsMyConfigActive(false);
    setIsMyOrderActive(true);
  };

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:3060/user/${user.id_cliente}/detalle_compra`) // Hacer la petición GET al servidor
        .then(response => response.json())
        .then(data => {
          setOrders(data); // Actualizar el estado con los datos recibidos
        })
        .catch(error => {
          console.error('Error al obtener los detalles de compra:', error);
        });
    }
  }, [user]);

  // console.log(viewMenu);



  /*esto es para poder editar los input  */
  const [nombreUsuario, setNombreUsuario] = useState(user ? user.nombre_usuario : "");
  const [correo, setCorreo] = useState(user ? user.correo : "");
  const [numeroDocumento, setNumeroDocumento] = useState(user ? user.numero_de_documento : "");
  const [ciudad, setCiudad] = useState(user ? user.ciudad : "");
  const [telefono, setTelefono] = useState(user ? user.telefono : "");

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  };
  const handleCiudadChange = (e) => {
    setCiudad(e.target.value);
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
/*a qui termina los estados para poder editar los input */

  return (
    <>
      <div className="pa_usu">
        <div className="usu_ini">
          <Menu_profile
            is_link_active={true}
            activateMyUsu={activateMyUsu}
            activateMyConfig={activateMyConfig}
            activateMyOrder={activateMyOrder}
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
                      <b>Ciudad</b>
                    </label>
                    <input
                      disabled
                      className="input1"
                      placeholder="Ciudad"
                      type="text"
                      value={user ? user.ciudad : ""}
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
                      <b>Ciudad</b>
                    </label>
                    <input
                      className="input1"
                      placeholder={user ? user.ciudad : ""}
                      value={ciudad}
                      type="text"
                      onChange={handleCiudadChange}
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
                  <button className="boton_cambiar">Guardar cambios</button>
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
              {orders.map(detalle => {
                const orderTotal = detalle.productos.reduce(
                  (total, producto) => total + producto.precio * producto.cantidad_producto,
                  0
                );

                const formattedFechaPedido = detalle.fecha_pedido.substring(0, 10);

                return (
                  <div className="section_order" key={detalle.id_detalle}>
                    <div
                      className="section_order_preview"
                      onClick={() => handleExpandOrder(detalle.id_detalle)}
                    >
                      <b>#{detalle.id_detalle}</b>
                      <b>{formattedFechaPedido}</b>
                      <b>$ {detalle.precio}</b>
                      <span
                        className="material-symbols-outlined icon-open-section" id={expandedOrders.includes(detalle.id_detalle) ? "rotate-icon" : ""}
                        onClick={() => handleExpandOrder(detalle.id_detalle)}
                      >
                        arrow_forward_ios
                      </span>
                    </div>
                    <table
                      className={isOrderExpanded(detalle.id_detalle) ? "" : "hidden-table"}
                    >
                      <thead>
                        <tr>
                          <th>ID Producto</th>
                          <th>Nombre Producto</th>
                          <th>Cantidad</th>
                          <th>Precio Unitario</th>
                        </tr>
                      </thead>
                      <tbody className="tableBody">
                        {detalle.productos.map(producto => (
                          <tr key={producto.id_producto}>
                            <td>#{producto.id_producto}</td>
                            <td>{producto.nombre_producto}</td>
                            <td>{producto.cantidad_producto}</td>
                            <td>${producto.precio}</td>
                          </tr>
                        ))}
                        <tr>
                          <td colSpan="3"></td>
                          <td><b>Total: ${orderTotal.toLocaleString("es-ES", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}</b></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
