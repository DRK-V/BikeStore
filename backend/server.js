const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación de registro!');
});

// Ruta para el registro
app.post('/api/register', (req, res) => {
  const userData = req.body;

  // Validación de datos 

  // Conexión a la base de datos y operación de inserción
  const pool = new Pool({
    user: 'postgres', // Usuario de PostgreSQL
    host: 'localhost',
    database: 'bikestore', // Nombre de la base de datos
    password: 'admin', // Contraseña de PostgreSQL
    port: 5432, // Puerto de PostgreSQL 
  });

  const insertUserQuery = 'INSERT INTO cliente (nombre_usuario, correo, contrasena, telefono, pais, ciudad) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [userData.nombre, userData.email, userData.password, userData.telefono, userData.pais, userData.ciudad];

  pool.query(insertUserQuery, values)
    .then(() => {
      res.status(201).json({ message: 'Registro exitoso' });
    })
    .catch((error) => {
      console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    })
    .finally(() => {
      pool.end();
    });
});

// Ruta para el inicio de sesión
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Conexión a la base de datos y operación de consulta
  const pool = new Pool({
    user: 'postgres', // Usuario de PostgreSQL
    host: 'localhost',
    database: 'bikestore', // Nombre de la base de datos
    password: 'admin', // Contraseña de PostgreSQL
    port: 5432, // Puerto de PostgreSQL 
  });

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
    })
    .finally(() => {
      pool.end();
    });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

