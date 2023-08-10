//datacontroller

const { pool } = require('../config/db');

const registerUser = (userData) => {
  const insertUserQuery = 'INSERT INTO cliente (nombre_usuario, correo, contrasena, telefono, pais, ciudad) VALUES ($1, $2, $3, $4, $5, $6)';
  const values = [userData.nombre, userData.email, userData.password, userData.telefono, userData.pais, userData.ciudad];

  return pool.query(insertUserQuery, values);
};

const getImages = (req, res) => {
  const { id_imagen, nombre, ruta } = req.params;

  if (!id_imagen && !nombre && !ruta) {
    const selectAllImagesQuery = 'SELECT * FROM imagen_producto';

    pool.query(selectAllImagesQuery)
      .then((result) => {
        res.json({ images: result.rows });
      })
      .catch((error) => {
        console.error('Error al obtener imágenes:', error.message);
        res.status(500).json({ error: 'Error al obtener imágenes' });
      });
  } else if (id_imagen) {
    const selectImageQuery = 'SELECT * FROM imagen_producto WHERE id_imagen = $1';
    const values = [id_imagen];

    pool.query(selectImageQuery, values)
      .then((result) => {
        if (result.rows.length > 0) {
          const rutaImagen = result.rows[0].ruta_imagen;
          const decodedRutaImagen = decodeURIComponent(rutaImagen);

          // Redirect to the ruta_imagen
          res.redirect(decodedRutaImagen);
        } else {
          res.status(404).json({ message: 'Imagen no encontrada' });
        }
      })
      .catch((error) => {
        console.error('Error al obtener imagen:', error.message);
        res.status(500).json({ error: 'Error al obtener imagen' });
      });
  } else if (nombre) {
    const selectImageQuery = 'SELECT * FROM imagen_producto WHERE nombre_imagen = $1';
    const values = [decodeURIComponent(nombre)];

    pool.query(selectImageQuery, values)
      .then((result) => {
        res.json({ images: result.rows });
      })
      .catch((error) => {
        console.error('Error al obtener imágenes:', error.message);
        res.status(500).json({ error: 'Error al obtener imágenes' });
      });
  } else if (ruta) {
    const selectImageQuery = 'SELECT * FROM imagen_producto WHERE ruta = $1';
    const values = [decodeURIComponent(ruta)];

    pool.query(selectImageQuery, values)
      .then((result) => {
        if (result.rows.length > 0) {
          const idToRedirect = result.rows[0].id_imagen;
          res.redirect(`/images/${idToRedirect}`);
        } else {
          res.status(404).json({ message: 'Imagen no encontrada' });
        }
      })
      .catch((error) => {
        console.error('Error al obtener imágenes:', error.message);
        res.status(500).json({ error: 'Error al obtener imágenes' });
      });
  } else {
    // Rest of the code to handle other searches
  }
};

// Rest of your code

const getAllProducts = (req, res) => {
  const { id_producto } = req.params;
  const { nombre_producto } = req.query;

  if (id_producto) {
    const selectProductQuery = 'SELECT * FROM producto WHERE id_producto = $1';
    const values = [id_producto];

    pool.query(selectProductQuery, values)
      .then((result) => {
        if (result.rows.length > 0) {
          res.json({ product: result.rows[0] });
        } else {
          res.status(404).json({ message: 'Producto no encontrado' });
        }
      })
      .catch((error) => {
        console.error('Error al obtener producto:', error.message);
        res.status(500).json({ error: 'Error al obtener producto' });
      });
  } else if (nombre_producto) {
    const selectProductQuery = 'SELECT * FROM producto WHERE nombre_producto = $1';
    const values = [nombre_producto];

    pool.query(selectProductQuery, values)
      .then((result) => {
        res.json({ products: result.rows });
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error.message);
        res.status(500).json({ error: 'Error al obtener productos' });
      });
  } else {
    const selectAllProductsQuery = 'SELECT * FROM producto';

    pool.query(selectAllProductsQuery)
      .then((result) => {
        res.json({ products: result.rows });
      })
      .catch((error) => {
        console.error('Error al obtener productos:', error.message);
        res.status(500).json({ error: 'Error al obtener productos' });
      });
  }
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
  getAllProducts,
};


