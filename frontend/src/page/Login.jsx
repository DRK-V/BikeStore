import { useNavigate } from 'react-router-dom';
import '../css/login.css';

// Import the image you want to display on the left
const leftImage = 'https://i.blogs.es/b00143/img_1513/840_560.jpeg';

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });
    console.log(userData);
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
          </div>
         
        </div>
      </div>
    </div>
  );
};



