import React, { useState } from "react";
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
    id_producto: location.state ? location.state.id_producto : "",
    quantity: location.state ? location.state.quantity : "",
    precio_producto: location.state ? location.state.precio_producto : "",
  });


  const [ventaExitosa, setVentaExitosa] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  // Nuevo estado para controlar el envío

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      // Si ya se está enviando el formulario, no hagas nada
      return;
    }

    setIsSubmitting(true);

    try {
      const ventaData = {
        tipo_de_cuenta: formValues.tipo_de_cuenta,
        banco: formValues.banco,
        numero_de_cuenta: formValues.numero_de_cuenta,
        monto_final: formValues.valorPagar,
        codigo_cliente: formValues.codigo_cliente,
        productos: [
          {
            codigo_producto: formValues.id_producto,
            cantidad_producto: formValues.quantity,
          },
        ],
      };

      console.log("Datos a enviar a la creación de venta:", JSON.stringify(ventaData));

      // Realiza la solicitud POST para crear la venta en http://localhost:3060/crear-venta
      const response = await fetch("http://localhost:3060/crear-venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaData),
      });

      if (response.ok) {
        console.log("Venta creada con éxito.");

        const responseData = await response.json();
        const idVenta = responseData.idVenta;

        const productosVenta = [];

      // Agregar el producto de formValues a productosVenta
      productosVenta.push({
        codigo_venta: idVenta,
        codigo_producto: formValues.id_producto,
        cantidad_producto: formValues.quantity,
      });

      // Agregar los productos de cartItems a productosVenta
      cartItems.forEach((cartItem) => {
        productosVenta.push({
          codigo_venta: idVenta,
          codigo_producto: cartItem.product.id_producto,
          cantidad_producto: cartItem.quantity,
        });
      });

        console.log(
          "Datos a enviar a la creación de venta de producto:",
          JSON.stringify({ codigo_venta: idVenta, productos: productosVenta })
        );

        const productosResponse = await fetch(
          "http://localhost:3060/crear-venta-producto",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ codigo_venta: idVenta, productos: productosVenta }),
          }
        );

        if (productosResponse.ok) {
          console.log("Venta de productos creada con éxito.");
          clearCart();

          const doc = new jsPDF();
          doc.setFontSize(14); // Establecer el tamaño de fuente predeterminado
          doc.setTextColor(0, 0, 0); // Establecer el color del texto (negro)
      
          doc.text("FACTURA", 10, 10);
          doc.setFontSize(10); // Cambiar el tamaño de fuente para las siguientes líneas
          doc.text(`Número: ${Math.floor(Math.random() * 1000000)}`, 10, 20);
          doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 30);
          doc.text(`Identificación del Emisor: BikeStore`, 10, 40);
          doc.text(
            `Identificación del Receptor: ${formValues.numeroDocumento}`,
            10,
            50
          );
      
          doc.setFont("helvetica"); // Cambiar el estilo de fuente para las siguientes líneas
          doc.setFontSize(12); // Cambiar el tamaño de fuente
          doc.text(`Descripción del Concepto: Compra de productos`, 10, 60);
          doc.text(`Base Imponible: ${formValues.valorPagar}`, 10, 70);
          doc.text(`Tipo de IVA Aplicado: 19%`, 10, 80);
          doc.text(`Total: ${formValues.valorPagar}`, 10, 90);
      
          let yOffset = 100;
      
          productosVenta.forEach((producto) => {
            doc.setFont("times"); // Cambiar la fuente para los detalles del producto
            doc.setFontSize(10); // Cambiar el tamaño de fuente para los detalles del producto
            doc.text(`ID del Producto: ${producto.codigo_producto}`, 10, yOffset);
            // Agrega más detalles del producto según sea necesario
            yOffset += 10;
          });
      
          // Guardar el PDF con un nombre único basado en la fecha y hora actual
          const pdfFileName = `factura_${new Date().toISOString()}.pdf`;
          doc.save(pdfFileName);

          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          console.error("Error al crear la venta de productos.");
        }
      } else {
        console.error("Error al crear la venta.");
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setIsSubmitting(false);
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
              Compra completada. La factura se ha generado y descargado como
              PDF.
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