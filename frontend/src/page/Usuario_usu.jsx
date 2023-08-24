import { Footer } from "../components/Footer";
import "../css/Usuario_config.css";

export const Usuario_usu = () => {
  return (
    <>
      <div className="pa_usu">
        <div className="usu_ini"></div>
        <div className="usu_detall">
            <div className="titulo1.1">
          <h2>Mi perfil</h2>
            </div>
          <form action="" className="formulario_usu">
            <div className="formu_usu">
              <div className="fila1">
                <div className="fila">
                  <label htmlFor=""><b>Nombre</b></label>
                  <input className="input1" type="text" />
                </div>

                <div className="fila">
                  <label htmlFor=""><b>Correo</b></label>
                  <input className="input1" type="text" />
                </div>
              </div>

              <div className="fila1">
                <div className="fila">
                  <label htmlFor=""><b>Numero de Documento</b></label>
                  <input className="input1" type="text" />
                </div>

                <div className="fila">
                  <label htmlFor=""><b>Ciudad</b></label>
                  <input className="input1" type="text" />
                </div>
              </div>

              <div className="fila1">
                <div className="fila">
                  <label htmlFor=""><b>Telefono</b></label>
                  <input className="input1" type="text" />
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
