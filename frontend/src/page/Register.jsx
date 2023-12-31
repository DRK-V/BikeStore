import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";
import { Link } from "react-router-dom";
import leftImage from "../assets/bici_login.png";

export const Register = () => {
  const navigate = useNavigate();
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [passwordValidation, setPasswordValidation] = useState(false);
  const [missingParams, setMissingParams] = useState([]);
  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });
    userData.rol_usuario = "usuario"; // Agregar la constante "usuario" al objeto userData

    const missing = [];
    if (!userData.nombre) missing.push("nombre");
    if (!userData.email) missing.push("email");
    if (!userData.password) missing.push("password");
    if (!userData.confirmPassword) missing.push("confirmPassword");
    if (!userData.telefono) missing.push("telefono");
    if (!userData.tipo_de_documento) missing.push("tipo_de_documento");
    if (!userData.numero_de_documento) missing.push("numero_de_documento");

    if (missing.length > 0) {
      setMissingParams(missing);
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setRegistrationStatus("Revise la contraseña.");
      return;
    }

    if (
      userData.numero_de_documento.length < 8 ||
      userData.numero_de_documento.length > 10
    ) {
      setRegistrationStatus(
        "El número de documento debe tener entre 8 y 10 dígitos."
      );
      return;
    }

    if (!isPasswordValid(userData.password)) {
      setRegistrationStatus(
        "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número."
      );
      return;
    }

    if (userData.telefono.length !== 10) {
      setRegistrationStatus(
        "El número de teléfono debe tener exactamente 10 dígitos."
      );
      return;
    }
    console.log(userData);
    try {
      const response = await fetch("http://localhost:3060/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        setShowRegistrationMessage(true);
        setTimeout(() => {
          setShowRegistrationMessage(false);
        }, 1000); // Ocultar el mensaje de registro exitoso después de 1 segundo

        const countdownInterval = setInterval(() => {
          setRedirectCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
          navigate("/login");
        }, 3000);
      } else {
        const responseData = await response.json();
        if (response.status === 409 && responseData.error === "duplicate") {
          setRegistrationStatus(
            "El correo electrónico o el número de cédula ya están registrados."
          );
        } else {
          setRegistrationStatus("error en el servidor");
        }

        setTimeout(() => {
          setRegistrationStatus("");
        }, 1000); // Ocultar el mensaje de error después de 1 segundo
      }
    } catch (error) {
      console.error("Error en la solicitud al backend:", error);
      setRegistrationStatus(
        "Error en el servidor. Intente nuevamente más tarde."
      );

      setTimeout(() => {
        setRegistrationStatus("");
      }, 1000); // Ocultar el mensaje de error después de 1 segundo
    }
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordInput = (password) => {
    setPasswordValidation(isPasswordValid(password));
  };

  const handleAlphaInput = (event) => {
    const input = event.target;
    const regex = /^[A-Za-z ]*$/;
    let previousValue = input.dataset.previousValue || '';
  
    if (!regex.test(input.value) || (input.value.split(' ').length - 1) > 1) {
      input.value = previousValue;
    } else {
      input.dataset.previousValue = input.value;
    }
  };
  

  const handleNumericInput = (event) => {
    const input = event.target;
    const regex = /^[0-9]*$/;
    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^0-9]/g, "");
    }
  };

  useEffect(() => {
    // Función para ocultar el mensaje de registro exitoso después de 1 segundo
    const hideRegistrationMessage = setTimeout(() => {
      setShowRegistrationMessage(false);
    }, 1000);

    // Función para ocultar el mensaje de error después de 1 segundo
    const hideErrorStatus = setTimeout(() => {
      setRegistrationStatus("");
    }, 1000);

    return () => {
      clearTimeout(hideRegistrationMessage);
      clearTimeout(hideErrorStatus);
    };
  }, [showRegistrationMessage, registrationStatus]);

  return (
    <div className="App">
      <div className="split-container1">
        <button className="close-button" onClick={() => navigate("/")}>
          <span className="material-icons">close</span>
        </button>
        <div className="left-side">
          <img src={leftImage} alt="Image on the left" />
        </div>
        <div className="right-side">
          <div className="form-container">
            <h1>Registrate</h1>
            <form id="form1" onSubmit={handleSubmit}>
              <div className="form-row1">
                <div className="form-row">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    name="nombre"
                    required
                    onInput={handleAlphaInput}
                  />
                </div>
                <div className="form-row">
                  <i className="fas fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Correo electrónico:"
                    name="email"
                    required
                  />
                </div>
              </div>
              <div className="form-row1">
                <div className="form-row">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Contraseña:"
                    name="password"
                    required
                    minLength="8"
                    onChange={(e) => handlePasswordInput(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Confirmar contraseña:"
                    name="confirmPassword"
                    required
                  />
                </div>
              </div>
              <div className="form-row1">
                <div className="form-row">
                  <i className="fas fa-phone"></i>
                  <input
                    type="tel"
                    placeholder="Teléfono:"
                    name="telefono"
                    required
                    onInput={handleNumericInput}
                  />
                </div>
                <div className="form-row">
                  <i className="fas fa-id-card"></i>
                  <select
                    className="form-row"
                    name="tipo_de_documento"
                    required
                  >
                    <option value="" disabled selected>
                      Tipo de documento
                    </option>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="CE">Cédula extranjera</option>
                  </select>
                </div>
              </div>
              <div className="form-row1">
                <div className="form-row">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Número de documento"
                    name="numero_de_documento"
                    required
                    minLength="8"
                    maxLength="10"
                    onInput={handleNumericInput}
                  />
                </div>
              </div>
              {showRegistrationMessage && (
                <div className="registration-message-overlay">
                  Te has registrado.
                </div>
              )}
              {registrationStatus && (
                <div className="error-message">{registrationStatus}</div>
              )}
              {missingParams.length > 0 && (
                <div className="missing-params">
                  Faltan los siguientes parámetros: {missingParams.join(", ")}
                </div>
              )}
              <button className="regis-button" type="submit">
                Registrarse
              </button>
              <Link className="forgot_password" to="/login">
               Iniciar 
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
