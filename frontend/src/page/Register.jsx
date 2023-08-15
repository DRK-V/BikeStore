import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/register.css';

const leftImage = 'https://i.blogs.es/b00143/img_1513/840_560.jpeg';

export const Register = () => {
  const navigate = useNavigate();
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    if (userData.password !== userData.confirmPassword) {
      alert('Revise la contraseña.');
      return;
    }
console.log(userData)
    try {
      // Enviar los datos del formulario al backend utilizando fetch
      const response = await fetch('http://localhost:3060/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        // Registro exitoso
        setRegistrationStatus('¡Registro exitoso!');
        // Redirigirse a '/'
        navigate('/');
      } else {
        // Registro fallido
        setRegistrationStatus('Error al registrarse. Intente nuevamente.');
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error en la solicitud al backend:', error);
      setRegistrationStatus('Error en el servidor. Intente nuevamente más tarde.');
    }
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
                <input type="password" placeholder='Contraseña:' name="password" required />
                <i className="fas fa-lock"></i>
                <input type="password" placeholder='Confirmar contraseña:' name="confirmPassword" required />
              </div>
              <div className="form-row">
                <i className="fas fa-phone"></i>
                <input type="tel" placeholder='Teléfono:' name="telefono" required onInput={handleNumericInput} />
                <i className="fas fa-globe"></i>
                <input type="text" placeholder='País:' name="pais" required />
              </div>
              <div className="form-row">
                <i className="fas fa-map-marker-alt"></i>
                <input type="text" placeholder='Ciudad:' name="ciudad" required />
              </div>
              <button className='regis-button' type="submit">Registrarse</button>
            </form>
            <div className="registration-status">{registrationStatus}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


