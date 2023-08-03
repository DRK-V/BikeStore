import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';


const leftImage = 'https://i.blogs.es/b00143/img_1513/840_560.jpeg';

export const Login = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    try {
      // Enviar los datos del formulario al backend utilizando fetch
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        // Inicio de sesión exitoso
        setLoginStatus('¡Inicio de sesión exitoso!');
        // Redirigirse a '/'
        navigate('/');
      } else {
        // Inicio de sesión fallido
        setLoginStatus('Credenciales inválidas. Intente nuevamente.');
      }
    } catch (error) {
      // Manejo de errores
      console.error('Error en la solicitud al backend:', error);
      setLoginStatus('Error en el servidor. Intente nuevamente más tarde.');
    }
  };

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <div className="split-container">
        <button className="close-button" onClick={handleRedirect}>
          <i className="fas fa-times"></i>
        </button>
        <div className="left-side">
          <img src={leftImage} alt="Image on the left" />
        </div>
        <div className="right-side">
          <div className="form-container">
            <h1>Iniciar Sesión</h1>
            <form id="form12" onSubmit={handleSubmit}>
              <div className="form-row">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder='Correo electrónico:' name="email" required />
              </div>
              <div className="form-row">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder='Contraseña:' name="password" required />
              </div>
              <button className='button-ini' type="submit">Iniciar</button>
            </form>
            <div className="login-status">{loginStatus}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
