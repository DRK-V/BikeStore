import { Footer } from "../components/Footer";
import "../css/Usuario_config.css";
import "../css/menu_profile.css";
import { Menu_profile } from "../components/Menu_profile";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
export const Usuario_usu = () => {
  return (
    <>
      <div className="pa_usu">
        <div className="usu_ini">
          <Menu_profile is_link_active={true} />
        </div>
        <div className="usu_detall">
          <div className="container_my_usu">
            <div className="titulo1">
              <h2>Mi perfil</h2>

              <button className="exit_button">
                {" "}
                <Link className="exit_image" to="/">
                  <FiX className="exit_image" />
                </Link>{" "}
              </button>
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
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="container_my_config">
            <div className="titulo1">
              <h2>Mi perfil</h2>

              <button className="exit_button">
                <Link className="exit_image" to="/">
                  <FiX className="exit_image" />
                </Link>{" "}
              </button>
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
                      placeholder="Nombre"
                      type="text"
                    />
                  </div>

                  <div className="fila">
                    <label htmlFor="">
                      <b>Correo</b>
                    </label>
                    <input
                      className="input1"
                      placeholder="Correo"
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
                      placeholder="Numero de Documento"
                      type="text"
                    />
                  </div>

                  <div className="fila">
                    <label htmlFor="">
                      <b>Ciudad</b>
                    </label>
                    <input
                      className="input1"
                      placeholder="Ciudad"
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
                      className="input2"
                      placeholder="Telefono"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="container_my_order">
            <h2>Orders</h2>
            <div className="header_columns_orders">
              <b>ID pedido</b>
              <b>Fecha pedido</b>
              <b>Total</b>
            </div>
            <div className="container_list_section_orders">
              <div className="section_order">
                <div className="section_order_preview">
                  <b>#123412</b>
                  <b>10/08/2023</b>
                  <b>$ 4.500.000</b>
                  <span class="material-symbols-outlined icon-open-section">
                    arrow_forward_ios
                  </span>
                </div>

                {/* aqui debe de ir la tabla que aparece y desaparece 
                esta tabla debe de tener la informacion del pedido */}
                <table>
                  <thead>
                    <tr>
                      <th>ID Producto</th>
                      <th>Nombre Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                    </tr>
                  </thead>
                  <tbody class="tableBody">
                    {/* <!-- Filas de productos se agregarán aquí --> */}
                    <td>#1</td>
                    <td>Cicla beneli</td>
                    <td>3</td>
                    <td>$ 800.000</td>
                  </tbody>


                </table>
              </div>
              <div className="section_order">
                <div className="section_order_preview">
                  <b>#123412</b>
                  <b>10/08/2023</b>
                  <b>$ 4.500.000</b>
                  <span class="material-symbols-outlined icon-open-section">
                    arrow_forward_ios
                  </span>
                </div>

                {/* aqui debe de ir la tabla que aparece y desaparece 
                esta tabla debe de tener la informacion del pedido */}
                {/* <table>
                  <thead>
                    <tr>
                      <th>ID Producto</th>
                      <th>Nombre Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                    </tr>
                  </thead>
                  <tbody class="tableBody">
                    <td>#1</td>
                    <td>Cicla beneli</td>
                    <td>3</td>
                    <td>$ 800.000</td>
                  </tbody>


                </table> */}
              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
