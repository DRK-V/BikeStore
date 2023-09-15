import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import "../css/cart_shopping.css";
import { Footer } from "../components/Footer";
import { useAuth } from "../components/AuthContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

export const Payment = () => {
  const location = useLocation();
  const { user, idCliente } = useAuth();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [formValues, setFormValues] = useState({
    nombreTitular: user.nombre_usuario || "",
    tipoDocumento: user.tipo_de_documento || "",
    numeroDocumento: user.numero_de_documento || "",
    correoElectronico: user.correo || "",
    confirmacionCorreo: user.correo,
    valorPagar: location.state ? location.state.valorPagar : "",
    tipo_de_cuenta: "",
    banco: "",
    numero_de_cuenta: "",
    codigo_cliente: idCliente,
  });

  const [ventaExitosa, setVentaExitosa] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const limpiarCampos = () => {
    // Reinicia todos los campos del formulario
    setFormValues({
      nombreTitular: "",
      tipoDocumento: "",
      numeroDocumento: "",
      correoElectronico: "",
      confirmacionCorreo: "",
      valorPagar: "",
      tipo_de_cuenta: "",
      banco: "",
      numero_de_cuenta: "",
      codigo_cliente: idCliente,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ventaData = {
      tipo_de_cuenta: formValues.tipo_de_cuenta,
      banco: formValues.banco,
      numero_de_cuenta: formValues.numero_de_cuenta,
      monto_final: formValues.valorPagar,
      codigo_cliente: formValues.codigo_cliente,
    };

    try {
      const response = await fetch("http://localhost:3060/crear-venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaData),
      });

      if (response.ok) {
        console.log("Venta creada con éxito.");
        setVentaExitosa(true);

        // Limpia el carrito después de una venta exitosa
        clearCart();

        // Utiliza navigate para redirigir al usuario a la página de inicio después de 2 segundos
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.error("Error al crear la venta.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  return (
    <>
      <Navbar />
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="nombreTitular">
            Nombre del titular de la cuenta:
          </label>
          <div className="input-icon-container">
            <i className="fas fa-user"></i> {/* Icono de nombre */}
            <input
              type="text"
              id="nombreTitular"
              name="nombreTitular"
              value={formValues.nombreTitular}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="tipoDocumento">Tipo de documento:</label>
          <div className="input-icon-container">
            <i className="fas fa-id-card"></i>{" "}
            {/* Icono de tipo de documento */}
            <input
              type="text"
              id="tipoDocumento"
              name="tipoDocumento"
              value={formValues.tipoDocumento}
              onChange={handleChange}
              readOnly // Agregar el atributo readOnly
              required
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="numeroDocumento">Número de documento:</label>
          <div className="input-icon-container">
            <i className="fas fa-address-card"></i>{" "}
            {/* Icono de número de documento */}
            <input
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"
              value={formValues.numeroDocumento}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="tipo_de_cuenta">Tipo de cuenta:</label>
          <div className="input-icon-container">
            <i className="fas fa-university"></i>
            <select
              id="tipo_de_cuenta"
              name="tipo_de_cuenta"
              value={formValues.tipo_de_cuenta}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un tipo de cuenta</option>
              <option value="Cuenta Corriente">Cuenta Corriente</option>
              <option value="Cuenta de Ahorro">Cuenta de Ahorro</option>
              <option value="Cuenta de Mercado Monetario">
                Cuenta de Mercado Monetario
              </option>
              <option value="Certificado de Depósito (CD)">
                Certificado de Depósito (CD)
              </option>
            </select>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="banco">Banco:</label>
          <div className="input-icon-container">
            <i className="fas fa-piggy-bank"></i> {/* Icono de banco */}
            <select
              id="banco"
              name="banco"
              value={formValues.banco}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un banco</option>
              <option value="Bancolombia">Bancolombia</option>
              <option value="Davivienda">Davivienda</option>
              <option value="Banco de Bogotá">Banco de Bogotá</option>
              <option value="Banco Popular">Banco Popular</option>
              {/* Agrega más bancos aquí según sea necesario */}
            </select>
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="numero_de_cuenta">Número de cuenta:</label>
          <div className="input-icon-container">
            <i className="fas fa-credit-card"></i>
            <input
              type="text"
              id="numero_de_cuenta"
              name="numero_de_cuenta"
              value={formValues.numero_de_cuenta}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="correoElectronico">Correo electrónico:</label>
          <div className="input-icon-container">
            <i className="fas fa-envelope"></i>{" "}
            {/* Icono de correo electrónico */}
            <input
              type="email"
              id="correoElectronico"
              name="correoElectronico"
              value={formValues.correoElectronico}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="confirmacionCorreo">
            Confirmación de correo electrónico:
          </label>
          <div className="input-icon-container">
            <i className="fas fa-envelope"></i>{" "}
            {/* Icono de correo electrónico */}
            <input
              type="email"
              id="confirmacionCorreo"
              name="confirmacionCorreo"
              value={formValues.confirmacionCorreo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="valorPagar">Valor a pagar:</label>
          <div className="input-icon-container">
            <i className="fas fa-dollar-sign"></i>{" "}
            {/* Icono de valor a pagar */}
            <input
              disabled
              type="number"
              id="valorPagar"
              name="valorPagar"
              value={formValues.valorPagar}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {ventaExitosa && (
          <div className="success-message">
            <div className="success-message-content">
              Compra completada. Serás redirigido a la página de inicio.
            </div>
          </div>
        )}
        <button type="submit">Enviar</button>
      </form>
      <Footer />
    </>
  );
};

export default Payment;
