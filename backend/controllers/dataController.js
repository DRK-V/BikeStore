
const fs = require('fs');
const path = require('path');
const multer = require('multer');
//datacontroller
const { pool } = require("../config/db");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.params.userId;
    const destinationPath = path.join(__dirname, `../images_profile/user_${userId}`);
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });



const updateUser = async (req, res) => {
  const updatedUserData = req.body;

  const sql = `UPDATE cliente SET
    nombre_usuario = $1,
    correo = $2,
    numero_de_documento = $3,
    direccion = $4,
    telefono = $5
    WHERE id_cliente = $6`;

  const values = [
    updatedUserData.nombre_usuario,
    updatedUserData.correo,
    updatedUserData.numero_de_documento,
    updatedUserData.direccion,
    updatedUserData.telefono,
    updatedUserData.id_cliente
  ];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error al actualizar el usuario en la base de datos:', err);
      res.status(500).json({ message: 'Error al actualizar el usuario' });
    } else {
      console.log('Usuario actualizado en la base de datos');
      res.json({ message: 'Usuario actualizado exitosamente' });
    }
  });
};




//fin de acutalizacion de datos del cliente
//registro de clients
const registerUser = async (userData) => {
  const insertUserQuery =
    "INSERT INTO cliente (nombre_usuario, correo, contrasena, telefono, tipo_de_documento, numero_de_documento,rol_usuario) VALUES ($1, $2, $3, $4, $5, $6,$7)";
  const selectUserQuery =
    "SELECT COUNT(*) FROM cliente WHERE correo = $1 OR numero_de_documento = $2";
  const values = [
    userData.nombre,
    userData.email,
    userData.password,
    userData.telefono,
    userData.tipo_de_documento,
    userData.numero_de_documento,
    userData.rol_usuario
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
    console.error('Error al registrar usuario:', error);
    throw error; // Asegúrate de volver a lanzar el error para que el servidor lo maneje adecuadamente
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

// Función para buscar un cliente por id_cliente
const getClientePorId = async (req, res) => {
  const { id } = req.params; // Obtén el valor de id_cliente de los parámetros de la URL

  try {
    const selectClientePorIdQuery = 'SELECT * FROM cliente WHERE id_cliente = $1';
    const result = await pool.query(selectClientePorIdQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }

    const cliente = result.rows[0];
    res.status(200).json(cliente);
  } catch (error) {
    console.error('Error al buscar cliente por id:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
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

      // // Extraer los datos bytea de la columna imagen_usuario
      // const byteaData = userData.imagen_usuario;

      // // Convertir los datos bytea en una cadena Base64
      // const imageBase64 = byteaData.toString('base64');

      // // Agregar la cadena Base64 al objeto userData
      // userData.imageBase64 = imageBase64;

      // Enviar el objeto userData al cliente
      res.status(200).json(userData);
    } else {
      console.log('Usuario no encontrado para el correo:', email);
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al consultar en la base de datos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getUserDetalleCompra = async (req, res) => {
  const userId = req.params.userId;
  try {
    const detallesCompraQuery = `
      SELECT
        venta.id_venta,
        venta.fecha_venta,
        venta.monto_final,
        producto.id_producto,
        producto.nombre_producto,
        producto.precio,
        venta_producto.cantidad_producto
      FROM venta
      INNER JOIN venta_producto ON venta.id_venta = venta_producto.codigo_venta
      INNER JOIN producto ON venta_producto.codigo_producto = producto.id_producto
      WHERE venta.codigo_cliente = $1
      AND venta.estado_venta = 'finalizado';
    `;
    const detallesCompraValues = [userId];

    const detallesCompraResult = await pool.query(detallesCompraQuery, detallesCompraValues);
    const detallesCompra = detallesCompraResult.rows;

    // Organiza los detalles de la compra en un objeto que agrupe las ventas y sus productos
    const ventasConProductos = {};
    detallesCompra.forEach((detalle) => {
      const { id_venta, fecha_venta, monto_final, cantidad_producto, ...producto } = detalle;
      if (!ventasConProductos[id_venta]) {
        ventasConProductos[id_venta] = {
          id_venta,
          fecha_venta,
          monto_final,
          productos: [{ ...producto, cantidad_producto }],
        };
      } else {
        ventasConProductos[id_venta].productos.push({ ...producto, cantidad_producto });
      }
    });

    // Convierte el objeto en un array de ventas
    const ventasArray = Object.values(ventasConProductos);

    res.status(200).json(ventasArray);
  } catch (error) {
    console.error('Error al obtener los detalles de compra:', error.message);
    res.status(500).json({ error: 'Error al obtener los detalles de compra' });
  }
};




const updateUserImage = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se proporcionó ninguna imagen" });
    }

    const imageName = req.file.originalname;
    const frontendPublicPath = path.join(__dirname, '../../frontend/public');
    const userImagePath = `profile_images/user_${userId}`;
    const destinationPath = path.join(frontendPublicPath, userImagePath);
    const imagePath = path.join(destinationPath, imageName);

    // Verificar si la carpeta de destino existe, si no, crearla
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    // Eliminar la imagen anterior si existe
    const existingImage = await pool.query("SELECT imagen_usuario FROM cliente WHERE id_cliente = $1", [userId]);
    if (existingImage.rows.length > 0 && existingImage.rows[0].imagen_usuario) {
      const previousImagePath = path.join(frontendPublicPath, existingImage.rows[0].imagen_usuario);
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }
    }

    // Mover el archivo a la carpeta de destino
    fs.renameSync(req.file.path, imagePath);

    // Construir la ruta relativa para almacenar en la base de datos
    const relativeImagePath = path.join(userImagePath, imageName).replace(/\\/g, "/");

    const updateImageQuery = "UPDATE cliente SET imagen_usuario = $1 WHERE id_cliente = $2";
    const values = [relativeImagePath, userId];

    await pool.query(updateImageQuery, values);

    res.status(200).json({ message: "Imagen de usuario actualizada exitosamente" });
  } catch (error) {
    console.error("Error al mover la imagen de usuario:", error.message);
    res.status(500).json({ error: "Error al mover la imagen de usuario", details: error.message });
  }
};
//comentarios
const añadirComentario = async (req, res) => {
  const { codigo_cliente, codigo_producto, texto } = req.body;

  const insertQuery = 'INSERT INTO comentario (codigo_cliente, codigo_producto, texto) VALUES ($1, $2, $3)';
  const values = [codigo_cliente, codigo_producto, texto];

  try {
    await pool.query(insertQuery, values);
    res.status(201).json({ message: 'Comentario añadido con éxito' });
  } catch (error) {
    console.error('Error al añadir el comentario:', error);
    res.status(500).json({ error: 'Error al añadir el comentario' });
  }
};

const verComentarios = async (req, res) => {
  const selectQuery = 'SELECT * FROM comentario';

  try {
    const result = await pool.query(selectQuery);
    const comentarios = result.rows;
    res.status(200).json(comentarios);
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
};
const verComentariosPorCodigoProducto = async (req, res) => {
  const { codigo_producto } = req.params;
  let selectQuery = 'SELECT * FROM comentario';


  if (codigo_producto) {
    selectQuery = `SELECT * FROM comentario WHERE codigo_producto = ${codigo_producto}`;
  }

  try {
    const result = await pool.query(selectQuery);
    const comentarios = result.rows;
    res.status(200).json(comentarios);
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
};
//fin comentarios
//ensayo
const createVenta = async (ventaData) => {
  const insertVentaQuery =
    "INSERT INTO venta (codigo_cliente, monto_final, tipo_de_cuenta, banco, numero_de_cuenta) VALUES ($1, $2, $3, $4, $5)";

  const values = [
    ventaData.codigo_cliente,
    ventaData.monto_final,
    ventaData.tipo_de_cuenta,
    ventaData.banco,
    ventaData.numero_de_cuenta,
  ];

  try {
    console.log('Datos a insertar en la tabla venta:', values); // Agrega este console.log

    const result = await pool.query(insertVentaQuery, values);

    console.log('Resultado de la inserción:', result); // Agrega este console.log

    return result;
  } catch (error) {
    console.error('Error al crear venta:', error);
    throw error;
  }
};
const getVentas = async () => {
  const selectVentasQuery = "SELECT * FROM venta";

  try {
    // Ejecutar la consulta para obtener todas las ventas
    const result = await pool.query(selectVentasQuery);

    // Devolver el resultado de la consulta
    return result.rows;
  } catch (error) {
    console.error('Error al obtener ventas:', error);
    throw error; // Asegúrate de volver a lanzar el error para que el servidor lo maneje adecuadamente
  }
};
const insertarProducto = async (req, res) => {
  const productoData = req.body;
  try {
    // Validar que se proporcionen datos obligatorios
    if (!productoData.nombre_producto || !productoData.tipo || !productoData.color || !productoData.precio || !productoData.stock_disponible || !productoData.descripcion_producto) {
      const camposFaltantes = [];
      if (!productoData.nombre_producto) camposFaltantes.push('Nombre');
      if (!productoData.tipo) camposFaltantes.push('Tipo de Bicicleta');
      if (!productoData.color) camposFaltantes.push('Color');
      if (!productoData.precio) camposFaltantes.push('Precio');
      if (!productoData.stock_disponible) camposFaltantes.push('Stock Disponible');
      if (!productoData.descripcion_producto) camposFaltantes.push('Descripción');

      const mensajeError = `Los siguientes campos son obligatorios: ${camposFaltantes.join(', ')}`;
      throw new Error(mensajeError);
    }

    // Insertar la información del producto en la base de datos
    const insertProductQuery = `
      INSERT INTO producto (nombre_producto, descripcion_producto, stock_disponible, tipo, color, precio)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_producto;
    `;

    const productValues = [
      productoData.nombre_producto,
      productoData.descripcion_producto,
      productoData.stock_disponible,
      productoData.tipo,
      productoData.color,
      productoData.precio,
    ];

    const productResult = await pool.query(insertProductQuery, productValues);

    // Obtener el ID del producto recién insertado
    const productId = productResult.rows[0].id_producto;

    res.status(200).json({ productId, message: 'Producto insertado con éxito' });
  } catch (error) {
    console.error('Error al insertar el producto:', error);
    res.status(500).json({ error: 'Error al insertar el producto' });
  }
};

const insertarImagenesProducto = async (req, res) => {
  const productId = req.body.productId; // El ID del producto al que se asocian las imágenes
  const nombre_producto = req.body.producto; // El nombre del producto
  const images = req.files;

  if (!Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: 'Error al recibir imágenes', images });
  }

  try {
    // Validar productId, nombre_producto y la existencia de imágenes
    if (!productId || !nombre_producto || !images || images.length === 0) {
      return res.status(400).json({ error: 'Error en el ID, nombre o al recibir imágenes' });
    }

    // Construir el nombre de la carpeta usando el nombre del producto (asegúrate de sanearlo para evitar problemas con caracteres inválidos)
    const sanitizedProductName = nombre_producto.replace(/[^\w\s]/gi, ''); // Elimina caracteres especiales
    const productImageDir = `../images/${sanitizedProductName}`;

    // Verificar si la carpeta de destino existe, si no, crearla
    const imageFolderPath = path.join(__dirname, productImageDir);
    if (!fs.existsSync(imageFolderPath)) {
      fs.mkdirSync(imageFolderPath, { recursive: true });
    }

    // Insertar todas las imágenes relacionadas con el producto y renombrarlas
    const insertImageQuery = `
      INSERT INTO imagen_producto (codigo_producto, nombre_imagen, ruta_imagen)
      VALUES ($1, $2, $3);
    `;

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const originalImageName = image.originalname; // Obtener el nombre original de la imagen
      const imageName = i === 0 ? 'imagen portada' : originalImageName; // Cambiar el nombre de la primera imagen si es necesario
      const imagePath = path.join(imageFolderPath, originalImageName); // Usar el nombre original

      fs.renameSync(image.path, imagePath);

      const imageUrl = `http://localhost:3060/images/${sanitizedProductName}/${originalImageName}`.replace(/\\/g, '/');

      const imageValues = [productId, imageName, imageUrl]; // Usar la URL completa en la ruta
      await pool.query(insertImageQuery, imageValues);
    }

    // Devolver una respuesta o mensaje de éxito
    res.status(200).json({ message: 'Imágenes insertadas con éxito' });
  } catch (error) {
    console.error('Error al insertar las imágenes:', error);
    res.status(500).json({ error: 'Error al insertar las imágenes' });
  }
};

const getProductsAdmin = (req, res) => {
  // Realiza una consulta a la base de datos para obtener los datos de productos
  pool.query('SELECT * FROM producto', (error, results) => {
    if (error) {
      console.error('Error al consultar la base de datos:', error);
      res.status(500).json({ error: 'Error al consultar la base de datos' });
      return;
    }

    // Si la consulta fue exitosa, envía los resultados como respuesta en formato JSON
    res.json(results.rows);
  });
};


module.exports = {
  getVentas,
  createVenta,
  verComentariosPorCodigoProducto,
  getClientePorId,
  añadirComentario,
  verComentarios,
  registerUser,
  getImages,
  getAllClientes,
  getProductsWithImages,
  getAllProductsWithImages,
  loginUser,
  getAllProducts,
  getProductDetailsWithImages,
  getUserByEmail,
  getUserDetalleCompra,
  updateUserImage,
  updateUser,
  insertarProducto,
  insertarImagenesProducto,
  getProductsAdmin,
};
