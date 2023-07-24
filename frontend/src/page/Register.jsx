import { useNavigate } from 'react-router-dom';
import '../css/register.css';

// Import the image you want to display on the left
const leftImage = 'https://i.blogs.es/b00143/img_1513/840_560.jpeg';

export const Register = () => {
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
      <button className="close-button" onClick={handleRedirect}>
          <i className="fas fa-times"></i>
          </button>
        <div className="left-side2">
          <img src={leftImage} alt="Image on the left" />
        </div>
        <div className="right-side2">
          <div className="form-container">
            <h1>Registrate</h1>
            <form id="form1" onSubmit={handleSubmit}>
              <div className="form-row">
                <i className="fas fa-user"></i>
                <input type="text" placeholder='Nombre' name="username" required onInput={handleAlphaInput} />
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
                <input type="tel" placeholder='Teléfono:' name="phone" required onInput={handleNumericInput} />
                <i className="fas fa-globe"></i>
                <input type="text" placeholder='País:' name="country" required />
              </div>
              <div className="form-row">
                <i className="fas fa-map-marker-alt"></i>
                <input type="text" placeholder='Ciudad:' name="city" required />
              </div>
              <button className='regis-button' type="submit">Registrarse</button>
            </form>
          </div>
         
        </div>
      </div>
    </div>
  );
};



