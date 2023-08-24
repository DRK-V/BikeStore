import { Footer } from "../components/Footer";
import "../css/Usuario_config.css";
import "../css/menu_profile.css";
import { Menu_profile } from "../components/Menu_profile"

export const Usuario_usu = () => {
  return (
    <>
      <div className="pa_usu">
        <div className="usu_ini">
          <Menu_profile is_link_active={true}/>
        </div>
        <div className="usu_detall">
          <div className="titulo1">
            <h2>Mi perfil</h2>
          </div>
          <form action="" className="formulario_usu">
            <div className="formu_usu">
              <div className="fila1">
                <div className="fila">
                  <label htmlFor=""><b>Nombre</b></label>
                  <input className="input1" placeholder="Nombre" type="text" />
                </div>

                <div className="fila">
                  <label htmlFor=""><b>Correo</b></label>
                  <input className="input1" placeholder="Correo" type="text" />
                </div>
              </div>

              <div className="fila1">
                <div className="fila">
                  <label htmlFor=""><b>Numero de Documento</b></label>
                  <input className="input1" placeholder="Numero de Documento" type="text" />
                </div>

                <div className="fila">
                  <label htmlFor=""><b>Ciudad</b></label>
                  <input className="input1" placeholder="Ciudad" type="text" />
                </div>
              </div>

              <div className="fila1">
                <div className="fila">
                  <label htmlFor=""><b>Telefono</b></label>
                  <input className="input2" placeholder="Telefono" type="text" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};
