import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import "../css/cart_shopping.css";
import { Footer } from "../components/Footer";
import { useAuth } from "../components/AuthContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import jsPDF from "jspdf";

export const Payment = () => {
  const { cartItems } = useCart();

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
  const [formSubmitting, setFormSubmitting] = useState(false);

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

    if (formSubmitting) {
      return; // Evitar envíos duplicados
    }

    setFormSubmitting(true); // Marcar el formulario como enviado

    // Crea una matriz de productos con los mismos datos que se usan en el PDF
    const productosParaEnviarAlServidor = cartItems.map((cartItem) => ({
      id_producto: cartItem.product.id_producto,
      nombre_producto: cartItem.product.nombre,
      precio_producto: cartItem.product.precio,
      cantidad_producto: cartItem.quantity,
    }));

    const ventaData = {
      tipo_de_cuenta: formValues.tipo_de_cuenta,
      banco: formValues.banco,
      numero_de_cuenta: formValues.numero_de_cuenta,
      monto_final: formValues.valorPagar,
      codigo_cliente: formValues.codigo_cliente,
      productos: productosParaEnviarAlServidor, // Utiliza la nueva matriz de productos
    };

    try {
      // Crear la venta
      const responseVenta = await fetch("http://localhost:3060/crear-venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaData),
      });

      if (responseVenta.ok) {
        console.log("Venta creada con éxito.");
        setVentaExitosa(true);

        // Obtener el código de venta generado en la respuesta de crear venta
        const ventaResponseData = await responseVenta.json();
        const codigoVenta = ventaResponseData.codigo_venta;

        // Crear registros en venta_producto
        const responseVentaProducto = await fetch(
          "http://localhost:3060/crear-venta-producto",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              codigo_venta: codigoVenta,
              productos: cartItems.map((cartItem) => ({
                codigo_producto: cartItem.product.id_producto,
                cantidad_producto: cartItem.quantity,
              })),
            }),
          }
        );

        if (responseVentaProducto.ok) {
          console.log("Registros en venta_producto creados con éxito.");

          // Generar factura en PDF
          const doc = new jsPDF();
          doc.text("FACTURA", 10, 10);
          doc.text(`Número: ${Math.floor(Math.random() * 1000000)}`, 10, 20);
          doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 30);
          doc.text(`Identificación del Emisor: ${user.identificacion}`, 10, 40);
          doc.text(
            `Identificación del Receptor: ${formValues.numeroDocumento}`,
            10,
            50
          );
          doc.text(`Descripción del Concepto: Compra de productos`, 10, 60);
          doc.text(`Base Imponible: ${formValues.valorPagar}`, 10, 70);
          doc.text(`Tipo de IVA Aplicado: 19%`, 10, 80);
          doc.text(`Total: ${formValues.valorPagar}`, 10, 90);
          let yOffset = 100;

          ventaData.productos.forEach((producto) => {
            doc.text(`ID del Producto: ${producto.id_producto}`, 10, yOffset);
            doc.text(
              `Nombre del Producto: ${producto.nombre_producto}`,
              10,
              yOffset + 10
            );
            doc.text(
              `Precio del Producto: $${producto.precio_producto.toFixed(2)}`,
              10,
              yOffset + 20
            );
            doc.text(
              `Cantidad del Producto: ${producto.cantidad_producto}`,
              10,
              yOffset + 30
            ); // Agrega la cantidad
            yOffset += 40; // Ajusta el espaciado vertical entre productos
          });

          doc.save("factura.pdf");

          // Limpiar el carrito después de la compra
          clearCart();

          // Redirigir a la página principal después de 2 segundos
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          console.error("Error al crear registros en venta_producto.");
        }
      } else {
        console.error("Error al crear la venta.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setFormSubmitting(false); // Restablecer el estado del formulario después del envío
    }
  };

  useEffect(() => {
    // Limpia los campos del formulario cuando el componente se monta
    limpiarCampos();
  }, []);

  return (
    <>
      <Navbar />
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="nombreTitular">
            Nombre del titular de la cuenta:
          </label>
          <div className="input-icon-container">
            <i className="fas fa-user"></i>
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
            <input
              type="text"
              id="tipoDocumento"
              name="tipoDocumento"
              value={formValues.tipoDocumento}
              onChange={handleChange}
              readOnly
              required
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="numeroDocumento">Número de documento:</label>
          <div className="input-icon-container">
            <i className="fas fa-address-card"></i>{" "}
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

        <div className="input-container">
          <label htmlFor="banco">Banco:</label>
          <i className="fas fa-piggy-bank"></i>{" "}
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
        <button type="submit">Enviar</button>
      </form>
      {ventaExitosa && (
        <div className="success-message">
          <div className="success-message-content">
            Compra completada. La factura se ha generado y descargado como PDF.
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Payment;
