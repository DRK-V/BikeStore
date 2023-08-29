import { useEffect, useState } from 'react';
import { Footer } from "../components/Footer";
import "../css/Usuario_config.css";
import "../css/menu_profile.css";
import { Menu_profile } from "../components/Menu_profile";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from '../components/AuthContext';

export const Usuario_usu = () => {
  const { user } = useAuth();

  //para mostrar y ocultar las tablas hijas
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Función para manejar el clic en el botón de expansión
  const handleExpandOrder = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };



  const [viewMenu, setViewMenu] = useState(true);
  const [isMyUsuActive, setIsMyUsuActive] = useState(true);
  const [isMyConfigActive, setIsMyConfigActive] = useState(false);
  const [isMyOrderActive, setIsMyOrderActive] = useState(false);

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

  console.log(viewMenu);
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

          <div
            className={`container_my_config ${isMyConfigActive ? "container_active" : ""}`}
          >
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
                    />
                  </div>

                  <div className="fila">
                    <label htmlFor="">
                      <b>Correo</b>
                    </label>
                    <input
                      className="input1"
                      placeholder={user ? user.correo : ""}
                      type="text"
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
                      type="text"
                    />
                  </div>

                  <div className="fila">
                    <label htmlFor="">
                      <b>Ciudad</b>
                    </label>
                    <input
                      className="input1"
                      placeholder={user ? user.ciudad : ""}
                      type="text"
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
                      type="text"
                    />
                  </div>
                  <button className="boton_cambiar">Guardar cambios</button>
                </div>
              </div>
            </form>
          </div>


          <div
            className={`container_my_order ${isMyOrderActive ? "container_active" : ""}`}
          >
            <h2>Orders</h2>
            <div className="header_columns_orders">
              <b>ID pedido</b>
              <b>Fecha pedido</b>
              <b>Total</b>
            </div>
            <div className="container_list_section_orders">
              {orders.map(detalle => (
                <div className="section_order" key={detalle.id_detalle}>
                   <div
                    className="section_order_preview"
                    onClick={() => handleExpandOrder(detalle.id_detalle)} // Manejar el clic en la preview
                  >
                    <b>#{detalle.id_detalle}</b>
                    <b>{detalle.fecha_pedido}</b>
                    <b>$ {detalle.precio}</b>
                    <span className="material-symbols-outlined icon-open-section">
                      arrow_forward_ios
                    </span>
                  </div>
                  <table className={expandedOrderId === detalle.id_detalle ? '' : 'hidden-table'}>
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
                          <td>{producto.cantidad_producto}</td> {/* Agregar cantidad de producto */}
                          <td>${producto.precio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
};
