
import { useNavigate } from 'react-router-dom';
import '../css/register.css';

// Importa la imagen que deseas mostrar a la izquierda
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
    // Reemplaza '/' con la ruta de tu componente Home
    navigate('/');
  };

  // Función para validar que solo se ingresen letras
  const handleAlphaInput = (event) => {
    const input = event.target;
    const regex = /^[A-Za-z]*$/; // Expresión regular para solo permitir letras (mayúsculas y minúsculas)
    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^A-Za-z]/g, ''); // Eliminar caracteres no alfabéticos
    }
  };

  // Función para validar que solo se ingresen números
  const handleNumericInput = (event) => {
    const input = event.target;
    const regex = /^[0-9]*$/; // Expresión regular para solo permitir números
    if (!regex.test(input.value)) {
      input.value = input.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
    }
  };

  return (
    <div className="App">
      <div className="split-container">
        <div className="left-side">
          <img src={leftImage} alt="Imagen a la izquierda" />
        </div>
        <div className="right-side">
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
              <button type="submit">Registrarse</button>
            </form>
          </div>
          <div className="close-button" onClick={handleRedirect}>
            <i className="fas fa-arrow-left"></i> Ir a inicio
          </div>
        </div>
      </div>
    </div>
  );
};


