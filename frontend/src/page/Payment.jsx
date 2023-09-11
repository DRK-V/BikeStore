//payment
import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import '../css/cart_shopping.css';
import { Footer } from '../components/Footer';
import { useAuth } from "../components/AuthContext";

export const Payment = () => {
    const { user } = useAuth();
    // Estado para almacenar los valores de los campos
    const [formValues, setFormValues] = useState({
        nombreTitular: user.nombre_usuario || '', // Rellena con el nombre de usuario
        tipoDocumento: user.tipo_de_documento || '', // Rellena con el tipo de documento
        numeroDocumento: user.numero_de_documento || '', // Rellena con el número de documento
        correoElectronico: user.correo|| '', // Rellena con el correo electrónico
        confirmacionCorreo: user.correo,
        valorPagar: '',
      });

    // Función para manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes enviar los datos del formulario a través de una solicitud HTTP o realizar cualquier otra acción necesaria.
        console.log('Formulario enviado:', formValues);
    };

    return (
        <>
            <Navbar />
                <form className="payment-form" onSubmit={handleSubmit}>
                    <div className="input-container">
                        <label htmlFor="nombreTitular">Nombre del titular de la cuenta:</label>
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
                            <i className="fas fa-id-card"></i> {/* Icono de tipo de documento */}
                            <input
                                type="text"
                                id="tipoDocumento"
                                name="tipoDocumento"
                                value={formValues.tipoDocumento}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="numeroDocumento">Número de documento:</label>
                        <div className="input-icon-container">
                            <i className="fas fa-address-card"></i> {/* Icono de número de documento */}
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
                        <label htmlFor="tipoCuenta">Tipo de cuenta:</label>
                        <div className="input-icon-container">
                            <i className="fas fa-university"></i> {/* Icono de tipo de cuenta */}
                            <input
                                type="text"
                                id="tipoCuenta"
                                name="tipoCuenta"
                                value={formValues.tipoCuenta}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="banco">Banco:</label>
                        <div className="input-icon-container">
                            <i className="fas fa-piggy-bank"></i> {/* Icono de banco */}
                            <input
                                type="text"
                                id="banco"
                                name="banco"
                                value={formValues.banco}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="numeroCuenta">Número de cuenta:</label>
                        <div className="input-icon-container">
                            <i className="fas fa-credit-card"></i> {/* Icono de número de cuenta */}
                            <input
                                type="text"
                                id="numeroCuenta"
                                name="numeroCuenta"
                                value={formValues.numeroCuenta}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-container">
                        <label htmlFor="correoElectronico">Correo electrónico:</label>
                        <div className="input-icon-container">
                            <i className="fas fa-envelope"></i> {/* Icono de correo electrónico */}
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
                        <label htmlFor="confirmacionCorreo">Confirmación de correo electrónico:</label>
                        <div className="input-icon-container">
                            <i className="fas fa-envelope"></i> {/* Icono de correo electrónico */}
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
                            <i className="fas fa-dollar-sign"></i> {/* Icono de valor a pagar */}
                            <input
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
            <Footer />
        </>
    );
};

export default Payment;
