import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/login.css';
import { useAuth } from '../components/AuthContext';
const leftImage = 'https://i.blogs.es/b00143/img_1513/840_560.jpeg';

export const Login = () => {
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState('');

  const { login } = useAuth(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  useEffect(() => {
    if (isLoggedIn) {
      const redirectTimeout = setTimeout(() => {
        navigate('/');
      }, 3000); 

      return () => {
        clearTimeout(redirectTimeout);
      };
    }
  }, [isLoggedIn, navigate]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    try {
    
      if (!userData.email || !userData.password) {
        setLoginStatus('Por favor, complete todos los campos.');
        return;
      }

     
      const response = await fetch('http://localhost:3060/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
      
        setLoginStatus('¡Inicio de sesión exitoso!');

       
        login();
        setIsLoggedIn(true); 

      } else {
     
        setLoginStatus('Credenciales inválidas. Intente nuevamente.');
      }
    } catch (error) {
      
      console.error('Error en la solicitud al backend:', error);
      setLoginStatus('Error en el servidor. Intente nuevamente más tarde.');
    }
  };

  return (
    <div className="App">
      <div className="split-container">
        <button className="close-button2" onClick={() => navigate('/')}>
          <i className="fas fa-times"></i>
        </button>
        <div className="left-side">
          <img src={leftImage} alt="Image on the left" />
        </div>
        <div className="right-side">
          <div className="form-container">
            <h1>Iniciar Sesión</h1>
            {isLoggedIn && (
              <div className="login-message-overlay">¡Has iniciado sesión exitosamente!</div>
            )}
            
            <form id="form12" onSubmit={handleSubmit}>
              <div className="form-row">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder='Correo electrónico' name="email" required />
              </div>
              <div className="form-row">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder='Contraseña' name="password" required></input>
               
                
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
