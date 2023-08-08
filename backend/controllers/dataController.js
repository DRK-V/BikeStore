const { pool } = require('../config/db');

const registerUser = (userData) => {
  const insertUserQuery = 'INSERT INTO cliente (nombre_usuario, correo, contrasena, telefono, pais, ciudad) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [userData.nombre, userData.email, userData.password, userData.telefono, userData.pais, userData.ciudad];

  return pool.query(insertUserQuery, values);
};

const getImages = (req, res) => {
  pool.query('SELECT * FROM imagen_producto', (error, result) => {
    if (error) {
      console.error('Error al obtener datos', error.message);
      res.status(500).json({ error: 'Error al obtener datos' });
    } else {
      res.json({ images: result.rows });
    }
  });
};

const getAllClientes = (req, res) => {
  const selectAllClientesQuery = 'SELECT * FROM cliente';

  pool.query(selectAllClientesQuery)
    .then((result) => {
      const clientes = result.rows;
      res.status(200).json(clientes);
    })
    .catch((error) => {
      console.error('Error al consultar en la base de datos:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const selectUserQuery = 'SELECT * FROM cliente WHERE correo = $1 AND contrasena = $2';
  const values = [email, password];

  pool.query(selectUserQuery, values)
    .then((result) => {
      if (result.rowCount === 1) {
        // Inicio de sesión exitoso
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        // Inicio de sesión fallido
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
    })
    .catch((error) => {
      console.error('Error al consultar en la base de datos:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    });
};

module.exports = {
  registerUser,
  getImages,
  getAllClientes,
  loginUser,
};


