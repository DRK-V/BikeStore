import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';

const leftImage = 'https://i.blogs.es/b00143/img_1513/840_560.jpeg';

export const Register = () => {
  const navigate = useNavigate();
  const [registrationStatus, setRegistrationStatus] = useState('');
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

    const missing = [];
    if (!userData.nombre) missing.push('nombre');
    if (!userData.email) missing.push('email');
    if (!userData.password) missing.push('password');
    if (!userData.confirmPassword) missing.push('confirmPassword');
    if (!userData.telefono) missing.push('telefono');
    if (!userData.tipo_de_documento) missing.push('tipo_de_documento');
    if (!userData.numero_de_documento) missing.push('numero_de_documento');

    if (missing.length > 0) {
      setMissingParams(missing);
      return;
    }

    if (userData.password !== userData.confirmPassword) {
      setRegistrationStatus('Revise la contraseña.');
      return;
    }

    if (userData.numero_de_documento.length < 8 || userData.numero_de_documento.length > 10) {
      setRegistrationStatus('El número de documento debe tener entre 8 y 10 dígitos.');
      return;
    }

    if (!isPasswordValid(userData.password)) {
      setRegistrationStatus(
        'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula y un número.'
      );
      return;
    }

    if (userData.telefono.length !== 10) {
      setRegistrationStatus('El número de teléfono debe tener exactamente 10 dígitos.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3060/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        setShowRegistrationMessage(true);
        const countdownInterval = setInterval(() => {
          setRedirectCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
          clearInterval(countdownInterval);
          navigate('/login');
        }, 3000);
      } else {
        setRegistrationStatus('Error al registrarse. Intente nuevamente.');
      }
    } catch (error) {
      console.error('Error en la solicitud al backend:', error);
      setRegistrationStatus('Error en el servidor. Intente nuevamente más tarde.');
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
    const regex = /^[A-Za-z]*$/;
    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^A-Za-z]/g, '');
    }
  };

  const handleNumericInput = (event) => {
    const input = event.target;
    const regex = /^[0-9]*$/;
    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^0-9]/g, '');
    }
  };

  return (
    <div className="App">
      <div className="split-container">
        <button className="close-button" onClick={() => navigate('/')}>
          <i className="fas fa-times"></i>
        </button>
        <div className="left-side">
          <img src={leftImage} alt="Image on the left" />
        </div>
        <div className="right-side">
          <div className="form-container">
            <h1>Registrate</h1>
            <form id="form1" onSubmit={handleSubmit}>
              <div className="form-row">
                <i className="fas fa-user"></i>
                <input type="text" placeholder='Nombre' name="nombre" required onInput={handleAlphaInput} />
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder='Correo electrónico:' name="email" required />
              </div>
              <div className="form-row">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder='Contraseña:'
                  name="password"
                  required
                  minLength="8"
                  onChange={(e) => {
                    handlePasswordInput(e.target.value);
                    handleChange(e);
                  }}
                />
                <i className="fas fa-lock"></i>
                <input type="password" placeholder='Confirmar contraseña:' name="confirmPassword" required />
              </div>
              <div className="form-row">
                <i className="fas fa-phone"></i>
                <input type="tel" placeholder='Teléfono:' name="telefono" required onInput={handleNumericInput} />
                <i className="fas fa-id-card"></i>
                <select className="form-row" name="tipo_de_documento" required>
                  <option value="" disabled selected>
                    Tipo de documento
                  </option>
                  <option value="CC">Cédula de ciudadanía</option>
                  <option value="CE">Cédula extranjera</option>
                </select>
              </div>
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
              {missingParams.length > 0 && (
                <div className="missing-params">
                  Faltan los siguientes parámetros: {missingParams.join(', ')}
                </div>
              )}
              <button className='regis-button' type="submit">Registrarse</button>
            </form>
            <div className="registration-status">
              {showRegistrationMessage && (
                <div>
                  Te has registrado. Serás redirigido en {redirectCountdown} segundos...
                </div>
              )}
              {registrationStatus && <div>{registrationStatus}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
