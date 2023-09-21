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
    nombre_producto: location.state ? location.state.nombre_producto : "",
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

        const productosAgregados = {};

        // Verifica si los campos del formulario son válidos
        if (
          formValues.id_producto &&
          formValues.quantity &&
          formValues.id_producto !== "" &&
          formValues.quantity !== ""
        ) {
          // Agrega los productos del formulario a productosVenta
          productosVenta.push({
            nombre_producto: formValues.nombre_producto,
   

    precio_producto: formValues.precio_producto,
            codigo_venta: idVenta,
            codigo_producto: formValues.id_producto,
            cantidad_producto: formValues.quantity,
          });
        }
        
        // Ahora, agrega los productos de cartItems
        cartItems.forEach((cartItem) => {
          // Verifica si el producto ya se ha agregado
          if (!productosAgregados[cartItem.product.id_producto]) {
            productosVenta.push({
              codigo_venta: idVenta,
              codigo_producto: cartItem.product.id_producto,
              cantidad_producto: cartItem.quantity,
              nombre_producto:cartItem.product.nombre,
              precio_producto:cartItem.product.precio,
            });
        
            // Marca el producto como agregado en el objeto de registro
            productosAgregados[cartItem.product.id_producto] = true;
          }
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

    

          

          // Crear un nuevo documento
          const doc = new jsPDF();
          doc.setFontSize(14);
          doc.setTextColor(0, 0, 0);
          
          // Título de la factura
          doc.setFont("helvetica", "bold");
          doc.setFontSize(20);
          doc.text("BikeStore", 105, 15, { align: "center" });
          
          // Datos de la factura
          doc.setFont("helvetica", "normal");
          doc.setFontSize(12);
          doc.text(`Número: ${Math.floor(Math.random() * 1000000)}`, 10, 30);
          doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, 40);
          doc.text(`Identificación del Emisor: BikeStore`, 10, 50);
          doc.text(`Identificación del Receptor: ${formValues.numeroDocumento}`, 10, 60);
          
          // Encabezados de la tabla
          doc.setFillColor(211, 211, 211); 
          doc.rect(10, 70, 190, 10, "F"); 
          doc.setTextColor(255, 255, 255); 
          doc.setFontSize(12);
          doc.text("Descripción del Concepto", 15, 75);
          doc.text("Base Imponible", 80, 75);
          doc.text("Tipo de IVA Aplicado", 120, 75);
          doc.text("Total", 165, 75);
          
          // Datos de la factura en la tabla
          doc.setDrawColor(0); 
          doc.rect(10, 80, 190, 10); 
          doc.setTextColor(0, 0, 0); 
          doc.setFontSize(12);
          doc.text(`Compra de productos`, 15, 85);
          doc.text(`${formValues.valorPagar}`, 80, 85); 
          doc.text("19%", 120, 85);
          doc.text(`${formValues.valorPagar}`, 165, 85); 
          
          let yOffset = 95;
          
          // Datos de los productos en la tabla
          productosVenta.forEach((producto, index) => {
            doc.setDrawColor(0); 
            doc.rect(10, yOffset, 190, 30); 
            doc.setTextColor(0, 0, 0); 
            doc.setFontSize(12);
          
            doc.text(`Producto ${index + 1}`, 15, yOffset + 5);
            doc.text(`Nombre: ${producto.nombre_producto}`, 15, yOffset + 15);
            doc.text(`ID del Producto: ${producto.codigo_producto}`, 15, yOffset + 25);
            doc.text(`Cantidad: ${producto.cantidad_producto}`, 120, yOffset + 15);
            doc.text(`Precio: ${producto.precio_producto}`, 120, yOffset + 25);
          
            yOffset += 35;
          });
          
          // Total final igual al costo total
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
          doc.text("Total:", 120, yOffset + 10);
          doc.text(`${formValues.valorPagar}`, 165, yOffset + 10); 
          // Guardar el archivo PDF
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