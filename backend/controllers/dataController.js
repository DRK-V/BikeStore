//datacontroller
const { pool } = require("../config/db");

//registro de clients
const registerUser = async (userData) => {
  const insertUserQuery =
    "INSERT INTO cliente (nombre_usuario, correo, contrasena, telefono, tipo_de_documento, numero_de_documento) VALUES ($1, $2, $3, $4, $5, $6)";
  const selectUserQuery =
    "SELECT COUNT(*) FROM cliente WHERE correo = $1 OR numero_de_documento = $2";
  const values = [
    userData.nombre,
    userData.email,
    userData.password,
    userData.telefono,
    userData.tipo_de_documento,
    userData.numero_de_documento,
  ];

  try {
    const existingUserCount = await pool.query(selectUserQuery, [
      userData.email,
      userData.numero_de_documento,
    ]);
    const count = parseInt(existingUserCount.rows[0].count);

    if (count > 0) {
      throw new Error("Este usuario ya está registrado.");
    }

    return pool.query(insertUserQuery, values);
  } catch (error) {
    throw error;
  }
};
//fin registro

//comienzo login
const loginUser = (req, res) => {
  const { email, password } = req.body;

  const selectUserQuery =
    "SELECT * FROM cliente WHERE correo = $1 AND contrasena = $2";
  const values = [email, password];

  pool
    .query(selectUserQuery, values)
    .then((result) => {
      if (result.rowCount === 1) {
        res.status(200).json({ message: "Inicio de sesión exitoso" });
      } else {
        res.status(401).json({ message: "Credenciales inválidas" });
      }
    })
    .catch((error) => {
      console.error("Error al consultar en la base de datos:", error);
      res.status(500).json({ message: "Error en el servidor" });
    });
};
//fin login

//api clientes
const getAllClientes = (req, res) => {
  const selectAllClientesQuery = "SELECT * FROM cliente";

  pool
    .query(selectAllClientesQuery)
    .then((result) => {
      const clientes = result.rows;
      res.status(200).json(clientes);
    })
    .catch((error) => {
      console.error("Error al consultar en la base de datos:", error);
      res.status(500).json({ message: "Error en el servidor" });
    });
};
//fin clientes

//api imagenes
const getImages = (req, res) => {
  const { id_imagen, nombre, ruta } = req.params;

  if (!id_imagen && !nombre && !ruta) {
    const selectAllImagesQuery = "SELECT * FROM imagen_producto";

    pool
      .query(selectAllImagesQuery)
      .then((result) => {
        res.json({ images: result.rows });
      })
      .catch((error) => {
        console.error("Error al obtener imágenes:", error.message);
        res.status(500).json({ error: "Error al obtener imágenes" });
      });
  } else if (id_imagen) {
    const selectImageQuery =
      "SELECT * FROM imagen_producto WHERE id_imagen = $1";
    const values = [id_imagen];

    pool
      .query(selectImageQuery, values)
      .then((result) => {
        if (result.rows.length > 0) {
          const rutaImagen = result.rows[0].ruta_imagen;
          const decodedRutaImagen = decodeURIComponent(rutaImagen);

          res.redirect(decodedRutaImagen);
        } else {
          res.status(404).json({ message: "Imagen no encontrada" });
        }
      })
      .catch((error) => {
        console.error("Error al obtener imagen:", error.message);
        res.status(500).json({ error: "Error al obtener imagen" });
      });
  } else if (ruta) {
    const selectImageQuery = "SELECT * FROM imagen_producto WHERE ruta = $1";
    const values = [decodeURIComponent(ruta)];

    pool
      .query(selectImageQuery, values)
      .then((result) => {
        if (result.rows.length > 0) {
          const idToRedirect = result.rows[0].id_imagen;
          res.redirect(`/images/${idToRedirect}`);
        } else {
          res.status(404).json({ message: "Imagen no encontrada" });
        }
      })
      .catch((error) => {
        console.error("Error al obtener imágenes:", error.message);
        res.status(500).json({ error: "Error al obtener imágenes" });
      });
  } else {
  }
};
//fin imagenes

//api productos
const getAllProducts = (req, res) => {
  const { id_producto } = req.params;
  const { nombre_producto } = req.query;

  if (id_producto) {
    const selectProductQuery = "SELECT * FROM producto WHERE id_producto = $1";
    const values = [id_producto];

    pool
      .query(selectProductQuery, values)
      .then((result) => {
        if (result.rows.length > 0) {
          res.json({ product: result.rows[0] });
        } else {
          res.status(404).json({ message: "Producto no encontrado" });
        }
      })
      .catch((error) => {
        console.error("Error al obtener producto:", error.message);
        res.status(500).json({ error: "Error al obtener producto" });
      });
  } else if (nombre_producto) {
    const selectProductQuery =
      "SELECT * FROM producto WHERE nombre_producto = $1";
    const values = [nombre_producto];

    pool
      .query(selectProductQuery, values)
      .then((result) => {
        res.json({ products: result.rows });
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error.message);
        res.status(500).json({ error: "Error al obtener productos" });
      });
  } else {
    const selectAllProductsQuery = "SELECT * FROM producto";

    pool
      .query(selectAllProductsQuery)
      .then((result) => {
        res.json({ products: result.rows });
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error.message);
        res.status(500).json({ error: "Error al obtener productos" });
      });
  }
};
//fin productos
const getProductsWithImages = async (req, res) => {
  try {
    const { id_producto } = req.params;

    const selectProductQuery = "SELECT * FROM producto WHERE id_producto = $1";
    const productValues = [id_producto];

    const selectImagesQuery =
      "SELECT * FROM imagen_producto WHERE codigo_producto = $1";
    const imagesValues = [id_producto];

    const productResult = await pool.query(selectProductQuery, productValues);
    const imagesResult = await pool.query(selectImagesQuery, imagesValues);

    if (productResult.rows.length > 0) {
      const product = productResult.rows[0];
      const images = imagesResult.rows;

      res.json({ product, images });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener producto y sus imágenes:", error.message);
    res.status(500).json({ error: "Error al obtener producto y sus imágenes" });
  }
};

const getAllProductsWithImages = async (req, res) => {
  try {
    const selectProductsQuery = "SELECT * FROM producto";

    const productsResult = await pool.query(selectProductsQuery);
    const products = productsResult.rows;

    const productsWithImages = [];

    for (const product of products) {
      const selectImagesQuery =
        "SELECT * FROM imagen_producto WHERE codigo_producto = $1";
      const imagesValues = [product.id_producto];

      const imagesResult = await pool.query(selectImagesQuery, imagesValues);
      const images = imagesResult.rows;

      productsWithImages.push({ product, images });
    }

    res.json(productsWithImages);
  } catch (error) {
    console.error("Error al obtener productos y sus imágenes:", error.message);
    res
      .status(500)
      .json({ error: "Error al obtener productos y sus imágenes" });
  }
};
const getProductDetailsWithImages = async (req, res) => {
  try {
    const { id_producto } = req.params;

    const selectProductQuery = "SELECT * FROM producto WHERE id_producto = $1";
    const productValues = [id_producto];

    const selectImagesQuery =
      "SELECT * FROM imagen_producto WHERE codigo_producto = $1";
    const imagesValues = [id_producto];

    const productResult = await pool.query(selectProductQuery, productValues);
    const imagesResult = await pool.query(selectImagesQuery, imagesValues);

    if (productResult.rows.length > 0) {
      const product = productResult.rows[0];
      const images = imagesResult.rows;

      res.json({ product, images });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener producto y sus imágenes:", error.message);
    res.status(500).json({ error: "Error al obtener producto y sus imágenes" });
  }
};


//para obtener la informacion del usuario al iniciar sesion:
const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const selectUserQuery = 'SELECT * FROM cliente WHERE correo = $1';
    const values = [email];

    const result = await pool.query(selectUserQuery, values);

    if (result.rows.length > 0) {
      const userData = result.rows[0];
      console.log('Información del usuario:', userData); // Agrega esta línea para imprimir en la consola
      res.status(200).json(userData);
    } else {
      console.log('Usuario no encontrado para el correo:', email); // Agrega esta línea para imprimir en la consola
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al consultar en la base de datos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


module.exports = {
  registerUser,
  getImages,
  getAllClientes,
  getProductsWithImages,
  getAllProductsWithImages,
  loginUser,
  getAllProducts,
  getProductDetailsWithImages,
  getUserByEmail,
};
