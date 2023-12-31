const fs = require("fs");
const path = require("path");
const multer = require("multer");
//datacontroller
const { pool } = require("../config/db");
const crypto = require("crypto");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.params.userId;
    const destinationPath = path.join(
      __dirname,
      `../images_profile/user_${userId}`
    );
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
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
    updatedUserData.id_cliente,
  ];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error al actualizar el usuario en la base de datos:", err);
      res.status(500).json({ message: "Error al actualizar el usuario" });
    } else {
      console.log("Usuario actualizado en la base de datos");
      res.json({ message: "Usuario actualizado exitosamente" });
    }
  });
};

//fin de acutalizacion de datos del cliente

//fin de actualizacion de productos

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
    userData.rol_usuario,
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
    console.error("Error al registrar usuario:", error);
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
    const selectClientePorIdQuery =
      "SELECT * FROM cliente WHERE id_cliente = $1";
    const result = await pool.query(selectClientePorIdQuery, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    const cliente = result.rows[0];
    res.status(200).json(cliente);
  } catch (error) {
    console.error("Error al buscar cliente por id:", error);
    res.status(500).json({ message: "Error en el servidor" });
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
    const selectUserQuery = "SELECT * FROM cliente WHERE correo = $1";
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
      console.log("Usuario no encontrado para el correo:", email);
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al consultar en la base de datos:", error);
    res.status(500).json({ message: "Error en el servidor" });
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

    const detallesCompraResult = await pool.query(
      detallesCompraQuery,
      detallesCompraValues
    );
    const detallesCompra = detallesCompraResult.rows;

    // Organiza los detalles de la compra en un objeto que agrupe las ventas y sus productos
    const ventasConProductos = {};
    detallesCompra.forEach((detalle) => {
      const {
        id_venta,
        fecha_venta,
        monto_final,
        cantidad_producto,
        ...producto
      } = detalle;
      if (!ventasConProductos[id_venta]) {
        ventasConProductos[id_venta] = {
          id_venta,
          fecha_venta,
          monto_final,
          productos: [{ ...producto, cantidad_producto }],
        };
      } else {
        ventasConProductos[id_venta].productos.push({
          ...producto,
          cantidad_producto,
        });
      }
    });

    // Convierte el objeto en un array de ventas
    const ventasArray = Object.values(ventasConProductos);

    res.status(200).json(ventasArray);
  } catch (error) {
    console.error("Error al obtener los detalles de compra:", error.message);
    res.status(500).json({ error: "Error al obtener los detalles de compra" });
  }
};

const updateUserImage = async (req, res) => {
  const userId = req.params.userId;

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No se proporcionó ninguna imagen" });
    }

    const imageName = req.file.originalname;
    const frontendPublicPath = path.join(__dirname, "../../frontend/public");
    const userImagePath = `profile_images/user_${userId}`;
    const destinationPath = path.join(frontendPublicPath, userImagePath);
    const imagePath = path.join(destinationPath, imageName);

    // Verificar si la carpeta de destino existe, si no, crearla
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    // Eliminar la imagen anterior si existe
    const existingImage = await pool.query(
      "SELECT imagen_usuario FROM cliente WHERE id_cliente = $1",
      [userId]
    );
    if (existingImage.rows.length > 0 && existingImage.rows[0].imagen_usuario) {
      const previousImagePath = path.join(
        frontendPublicPath,
        existingImage.rows[0].imagen_usuario
      );
      if (fs.existsSync(previousImagePath)) {
        fs.unlinkSync(previousImagePath);
      }
    }

    // Mover el archivo a la carpeta de destino
    fs.renameSync(req.file.path, imagePath);

    // Construir la ruta relativa para almacenar en la base de datos
    const relativeImagePath = path
      .join(userImagePath, imageName)
      .replace(/\\/g, "/");

    const updateImageQuery =
      "UPDATE cliente SET imagen_usuario = $1 WHERE id_cliente = $2";
    const values = [relativeImagePath, userId];

    await pool.query(updateImageQuery, values);

    res
      .status(200)
      .json({ message: "Imagen de usuario actualizada exitosamente" });
  } catch (error) {
    console.error("Error al mover la imagen de usuario:", error.message);
    res.status(500).json({
      error: "Error al mover la imagen de usuario",
      details: error.message,
    });
  }
};
//comentarios
const añadirComentario = async (req, res) => {
  const { codigo_cliente, codigo_producto, texto } = req.body;

  const insertQuery =
    "INSERT INTO comentario (codigo_cliente, codigo_producto, texto) VALUES ($1, $2, $3) RETURNING id_comentario";
  const values = [codigo_cliente, codigo_producto, texto];

  try {
    const result = await pool.query(insertQuery, values);
    const comentarioId = result.rows[0].id_comentario;
    res.status(201).json({
      message: "Comentario añadido con éxito",
      ID_COMENTARIO: comentarioId,
    });
  } catch (error) {
    console.error("Error al añadir el comentario:", error);
    res.status(500).json({ error: "Error al añadir el comentario" });
  }
};

const verComentariosPorCodigoProducto = async (req, res) => {
  const { codigo_producto } = req.params;
  const selectQuery = "SELECT * FROM comentario WHERE codigo_producto = $1";
  const values = [codigo_producto];

  try {
    const result = await pool.query(selectQuery, values);
    const comentarios = result.rows;
    res.status(200).json(comentarios);
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    res.status(500).json({ error: "Error al obtener los comentarios" });
  }
};

const verComentarioPorId = async (req, res) => {
  const { id_comentario } = req.params;

  const selectQuery = "SELECT * FROM comentario WHERE id_comentario = $1";
  const values = [id_comentario];

  try {
    const result = await pool.query(selectQuery, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Comentario no encontrado" });
    } else {
      const comentario = result.rows[0];
      res.status(200).json(comentario);
    }
  } catch (error) {
    console.error("Error al obtener el comentario:", error);
    res.status(500).json({ error: "Error al obtener el comentario" });
  }
};

const editarComentario = async (req, res) => {
  const { texto } = req.body;
  const { id_comentario } = req.params;

  try {
    // Query SQL para actualizar el comentario con el nuevo texto
    const updateQuery =
      "UPDATE comentario SET texto = $1 WHERE id_comentario = $2";
    const values = [texto, id_comentario];

    // Ejecutar la consulta SQL para editar el comentario
    await pool.query(updateQuery, values);

    res.status(200).json({ message: "Comentario editado con éxito" });
  } catch (error) {
    console.error("Error al editar el comentario:", error);
    res.status(500).json({ error: "Error al editar el comentario" });
  }
};

const eliminarComentario = async (req, res) => {
  const { id_comentario } = req.params;

  try {
    // Query SQL para eliminar el comentario
    const deleteQuery = "DELETE FROM comentario WHERE id_comentario = $1";
    const values = [id_comentario];

    // Ejecutar la consulta SQL para eliminar el comentario
    await pool.query(deleteQuery, values);

    res.status(200).json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el comentario:", error);
    res.status(500).json({ error: "Error al eliminar el comentario" });
  }
};
// Asignar las funciones a las rutas

//fin comentarios
//ensayo
const createVenta = async (ventaData) => {
  const insertVentaQuery =
    "INSERT INTO venta (codigo_cliente, monto_final, tipo_de_cuenta, banco, numero_de_cuenta, estado_venta) VALUES ($1, $2, $3, $4, $5, 'finalizado') RETURNING id_venta";

  const values = [
    ventaData.codigo_cliente,
    ventaData.monto_final,
    ventaData.tipo_de_cuenta,
    ventaData.banco,
    ventaData.numero_de_cuenta,
  ];

  const client = await pool.connect(); // Iniciar una transacción

  try {
    await client.query("BEGIN"); // Comenzar la transacción

    const resultVenta = await client.query(insertVentaQuery, values);
    const idVenta = resultVenta.rows[0].id_venta; // Obtener el ID de la venta

    await client.query("COMMIT"); // Confirmar la transacción

    return idVenta;
  } catch (error) {
    await client.query("ROLLBACK"); // Revertir la transacción en caso de error
    console.error("Error al crear venta:", error);
    throw error;
  } finally {
    client.release(); // Liberar el cliente de la pool
  }
};

const createVentaProducto = async (productos) => {
  const insertVentaProductoQuery =
    "INSERT INTO venta_producto (codigo_venta, codigo_producto, cantidad_producto) VALUES ($1, $2, $3)";
  const updateStockQuery =
    "UPDATE stock SET salida = salida + $1, codigo_salida = $2 WHERE codigo_producto = $3";

  const client = await pool.connect(); // Iniciar una transacción

  try {
    await client.query("BEGIN"); // Comenzar la transacción

    for (const producto of productos) {
      const { codigo_venta, codigo_producto, cantidad_producto } = producto;
      const values = [codigo_venta, codigo_producto, cantidad_producto];
      console.log("Insertando producto:", values);
      await client.query(insertVentaProductoQuery, values);

      // Actualizar la tabla "stock"
      const stockUpdateValues = [cantidad_producto, codigo_venta, codigo_producto];
      await client.query(updateStockQuery, stockUpdateValues);
    }

    await client.query("COMMIT"); // Confirmar la transacción
  } catch (error) {
    await client.query("ROLLBACK"); // Revertir la transacción en caso de error
    console.error("Error al crear productos de venta:", error);
    throw error;
  } finally {
    client.release(); // Liberar el cliente de la pool
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
    console.error("Error al obtener ventas:", error);
    throw error; // Asegúrate de volver a lanzar el error para que el servidor lo maneje adecuadamente
  }
};

//intento insertar datos a tabla stock
const insertarStock = async (req, res) => {
  const stockData = req.body;
  try {
    // Validar que se proporcionen datos obligatorios
    if (
      !stockData.codigo_producto ||
      !stockData.entrada ||
      !stockData.codigo_entrada
    ) {
      const camposFaltantes = [];
      if (!stockData.codigo_producto) camposFaltantes.push("Código de Producto");
      if (!stockData.entrada) camposFaltantes.push("Entrada");
      if (!stockData.codigo_entrada) camposFaltantes.push("Código de Entrada");

      const mensajeError = `Los siguientes campos son obligatorios: ${camposFaltantes.join(", ")}`;
      throw new Error(mensajeError);
    }

    // Asignar un valor fijo de 0 a los campos inventario_inicial, salida y codigo_salida
    stockData.inventario_inicial = 0;
    stockData.salida = 0;
    stockData.codigo_salida = 0;

    // Insertar la información del stock en la base de datos
    const insertStockQuery = `
      INSERT INTO stock (codigo_producto, inventario_inicial, entrada, codigo_entrada, salida, codigo_salida)
      VALUES ($1, $2, $3, $4, $5, $6);
    `;

    const stockValues = [
      stockData.codigo_producto,
      stockData.inventario_inicial,
      stockData.entrada,
      stockData.codigo_entrada,
      stockData.salida, // Se agrega el campo salida con valor 0
      stockData.codigo_salida, // Se agrega el campo codigo_salida con valor 0
    ];

    await pool.query(insertStockQuery, stockValues);

    res.status(200).json({ message: "Datos de stock insertados con éxito" });
  } catch (error) {
    console.error("Error al insertar los datos de stock:", error);
    res.status(500).json({ error: "Error al insertar los datos de stock" });
  }
};



const obtenerStock = async (req, res) => {
  try {
    // Realiza la consulta SQL para obtener todos los datos de stock
    const consultaStock = 'SELECT * FROM stock';
    const resultados = await pool.query(consultaStock);

    // Enviar los resultados como respuesta JSON
    res.status(200).json(resultados.rows);
  } catch (error) {
    console.error('Error al obtener los datos de stock:', error);
    res.status(500).json({ error: 'Error al obtener los datos de stock' });
  }
};
const obtenerDatosDeStockPorCodigoProducto = async (req, res) => {
  const { codigo_producto } = req.params;
  try {
    // Realiza la consulta SQL para obtener los datos de stock por codigo_producto
    const consultaStock = 'SELECT * FROM stock WHERE codigo_producto = $1';
    const resultados = await pool.query(consultaStock, [codigo_producto]);

    // Enviar los resultados como respuesta JSON
    if (resultados.rowCount === 0) {
      res.status(404).json({ error: 'No se encontraron datos de stock para el código de producto especificado' });
    } else {
      res.status(200).json(resultados.rows);
    }
  } catch (error) {
    console.error('Error al obtener los datos de stock por codigo_producto:', error);
    res.status(500).json({ error: 'Error al obtener los datos de stock por codigo_producto' });
  }
};

//tabla compra
const insertarProducto = async (req, res) => {
  const productoData = req.body;
  try {
    // Validar que se proporcionen datos obligatorios
    if (
      !productoData.nombre_producto ||
      !productoData.tipo ||
      !productoData.color ||
      !productoData.precio ||
      !productoData.stock_disponible ||
      !productoData.descripcion_producto
    ) {
      const camposFaltantes = [];
      if (!productoData.nombre_producto) camposFaltantes.push("Nombre");
      if (!productoData.tipo) camposFaltantes.push("Tipo de Bicicleta");
      if (!productoData.color) camposFaltantes.push("Color");
      if (!productoData.precio) camposFaltantes.push("Precio");
      if (!productoData.stock_disponible)
        camposFaltantes.push("Stock Disponible");
      if (!productoData.descripcion_producto)
        camposFaltantes.push("Descripción");

      const mensajeError = `Los siguientes campos son obligatorios: ${camposFaltantes.join(
        ", "
      )}`;
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

    res
      .status(200)
      .json({ productId, message: "Producto insertado con éxito" });
  } catch (error) {
    console.error("Error al insertar el producto:", error);
    res.status(500).json({ error: "Error al insertar el producto" });
  }
};





const insertarCompra = async (req, res) => {
  const compraData = req.body;
  try {
    // Validar que se proporcionen datos obligatorios
    if (
      !compraData.monto_final ||
      !compraData.estado ||
      !compraData.direccion
    ) {
      const camposFaltantes = [];
      if (!compraData.monto_final) camposFaltantes.push("Monto Final");
      if (!compraData.estado) camposFaltantes.push("Estado");
      if (!compraData.direccion) camposFaltantes.push("Dirección");

      const mensajeError = `Los siguientes campos son obligatorios: ${camposFaltantes.join(
        ", "
      )}`;
      throw new Error(mensajeError);
    }

    // Insertar la información de la compra en la base de datos
    const insertCompraQuery = `
      INSERT INTO compra (monto_final, estado, direccion, codigo_administrador)
      VALUES ($1, $2, $3, $4)
      RETURNING id_compra;
    `;

    const compraValues = [
      compraData.monto_final,
      compraData.estado,
      compraData.direccion,
      compraData.codigo_administrador, // Utilizamos el codigo_administrador proporcionado en la solicitud
    ];

    const compraResult = await pool.query(insertCompraQuery, compraValues);

    // Obtener el ID de la compra recién insertada
    const compraId = compraResult.rows[0].id_compra;

    res.status(200).json({ compraId, message: "Compra insertada con éxito" });
  } catch (error) {
    console.error("Error al insertar la compra:", error);
    res.status(500).json({ error: "Error al insertar la compra" });
  }
};


const insertarCompraProducto = async (req, res) => {
  const { id_producto, id_compra } = req.body; // Obtener id_producto e id_compra del cuerpo de la solicitud
  try {
    // Validar que se proporcionen los datos obligatorios (id_producto e id_compra)
    if (!id_producto || !id_compra) {
      const camposFaltantes = [];
      if (!id_producto) camposFaltantes.push("ID de Producto");
      if (!id_compra) camposFaltantes.push("ID de Compra");

      const mensajeError = `Los siguientes campos son obligatorios: ${camposFaltantes.join(", ")}`;
      throw new Error(mensajeError);
    }

    // Insertar la relación compra-producto en la tabla compra_producto
    const insertCompraProductoQuery = `
      INSERT INTO compra_producto (codigo_producto, codigo_compra)
      VALUES ($1, $2);
    `;

    const compraProductoValues = [
      id_producto,
      id_compra,
    ];

    await pool.query(insertCompraProductoQuery, compraProductoValues);

    res.status(200).json({ message: "Relación compra-producto insertada con éxito" });
  } catch (error) {
    console.error("Error al insertar la relación compra-producto:", error);
    res.status(500).json({ error: "Error al insertar la relación compra-producto" });
  }
};



const insertarImagenesProducto = async (req, res) => {
  const productId = req.body.productId; // El ID del producto al que se asocian las imágenes
  const nombre_producto = req.body.producto; // El nombre del producto
  const images = req.files;

  if (!Array.isArray(images) || images.length === 0) {
    return res.status(400).json({ error: "Error al recibir imágenes", images });
  }

  try {
    // Validar productId, nombre_producto y la existencia de imágenes
    if (!productId || !nombre_producto || !images || images.length === 0) {
      return res
        .status(400)
        .json({ error: "Error en el ID, nombre o al recibir imágenes" });
    }

    // Construir el nombre de la carpeta usando el nombre del producto (asegúrate de sanearlo para evitar problemas con caracteres inválidos)
    const sanitizedProductName = nombre_producto.replace(/[^\w\s]/gi, ""); // Elimina caracteres especiales
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
      const imageName = i === 0 ? "imagen portada" : originalImageName; // Cambiar el nombre de la primera imagen si es necesario
      const imagePath = path.join(imageFolderPath, originalImageName); // Usar el nombre original

      fs.renameSync(image.path, imagePath);

      const imageUrl =
        `http://localhost:3060/images/${sanitizedProductName}/${originalImageName}`.replace(
          /\\/g,
          "/"
        );

      const imageValues = [productId, imageName, imageUrl]; // Usar la URL completa en la ruta
      await pool.query(insertImageQuery, imageValues);
    }

    // Devolver una respuesta o mensaje de éxito
    res.status(200).json({ message: "Imágenes insertadas con éxito" });
  } catch (error) {
    console.error("Error al insertar las imágenes:", error);
    res.status(500).json({ error: "Error al insertar las imágenes" });
  }
};

const getProductsAdmin = (req, res) => {
  // Realiza una consulta a la base de datos para obtener los datos de productos
  pool.query("SELECT * FROM producto", (error, results) => {
    if (error) {
      console.error("Error al consultar la base de datos:", error);
      res.status(500).json({ error: "Error al consultar la base de datos" });
      return;
    }

    // Si la consulta fue exitosa, envía los resultados como respuesta en formato JSON
    res.json(results.rows);
  });
};

const validatePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  const stringSimilarity = require("string-similarity");
  try {
    // Busca un cliente con el correo electrónico proporcionado
    const selectClienteQuery = "SELECT * FROM cliente WHERE correo = $1";
    const result = await pool.query(selectClienteQuery, [email]);

    if (result.rows.length === 0) {
      // Si no se encuentra el correo electrónico, envía una respuesta de error
      return res
        .status(401)
        .json({ message: "Correo electrónico no encontrado" });
    }

    const cliente = result.rows[0];

    // Compara la contraseña proporcionada con la almacenada
    const similarity = stringSimilarity.compareTwoStrings(
      newPassword,
      cliente.contrasena
    );

    // Define un umbral de similitud (ajústalo según tus necesidades)
    const similarityThreshold = 0.5;

    if (similarity >= similarityThreshold) {
      // Si la contraseña es lo suficientemente similar, genera una nueva contraseña aleatoria
      const randomPassword = generateRandomPassword();

      // Actualiza la contraseña en la base de datos
      const updatePasswordQuery =
        "UPDATE cliente SET contrasena = $1 WHERE id_cliente = $2";
      await pool.query(updatePasswordQuery, [
        randomPassword,
        cliente.id_cliente,
      ]);

      // Envía una respuesta exitosa con la nueva contraseña
      return res.status(200).json({
        message: "Contraseña cambiada exitosamente",
        newPassword: randomPassword,
      });
    } else {
      // Si la contraseña no es lo suficientemente similar, envía una respuesta de error
      return res.status(401).json({
        message:
          "La nueva contraseña no es suficientemente similar a la antigua",
      });
    }
  } catch (error) {
    console.error("Error al validar la contraseña: ", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Función para generar una contraseña aleatoria
function generateRandomPassword() {
  return crypto.randomBytes(8).toString("hex"); // Genera una contraseña aleatoria de 16 caracteres
}
// En tu archivo dataController.js

const getImagesUpdateProduct = async (req, res) => {
  const { id } = req.params; // Obtén el ID del producto desde los parámetros de la URL

  try {
    // Realiza una consulta a la base de datos para obtener las imágenes del producto con el ID proporcionado
    const query = "SELECT * FROM imagen_producto WHERE codigo_producto = $1";
    const result = await pool.query(query, [id]);

    // Envía la respuesta con las imágenes encontradas
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener imágenes del producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
//actualizacion de productos

const traerproducto = async (req, res) => {
  const updatedUserData = req.body;

  const sql = `UPDATE producto SET
  nombre_producto = $1,
  descripcion_producto = $2,
  stock_disponible = $3,
  tipo = $4,
  color = $5,
  precio = $6
  WHERE id_producto = $7`;

  const values = [
    updatedUserData.nombre_producto,
    updatedUserData.descripcion_producto,
    updatedUserData.stock_disponible,
    updatedUserData.tipo,
    updatedUserData.color,
    updatedUserData.precio,
    updatedUserData.id_producto,
  ];

  pool.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error al actualizar el usuario en la base de datos:", err);
      res.status(500).json({ message: "Error al actualizar el usuario" });
    } else {
      console.log("Usuario actualizado en la base de datos");
      res.json({ message: "Usuario actualizado exitosamente" });
    }
  });
};
const deleteImage = async (req, res) => {
  const { idImagen } = req.params; // Obtén el ID de la imagen a eliminar desde los parámetros de la URL

  try {
    // Realiza una consulta para obtener la ruta de la imagen a eliminar
    const getImagePathQuery =
      "SELECT ruta_imagen FROM imagen_producto WHERE id_imagen = $1";
    const imagePathResult = await pool.query(getImagePathQuery, [idImagen]);

    if (imagePathResult.rowCount === 0) {
      // Si no se encuentra la imagen con el ID proporcionado, responde con un error
      return res.status(404).json({ error: "La imagen no existe" });
    }

    const imagePath = imagePathResult.rows[0].ruta_imagen;

    // Realiza una consulta para obtener el código de producto de la imagen a eliminar
    const getCodeQuery =
      "SELECT codigo_producto FROM imagen_producto WHERE id_imagen = $1";
    const codeResult = await pool.query(getCodeQuery, [idImagen]);

    if (codeResult.rowCount === 0) {
      // Si no se encuentra la imagen con el ID proporcionado, responde con un error
      return res.status(404).json({ error: "La imagen no existe" });
    }

    const codigoProducto = codeResult.rows[0].codigo_producto;

    // Realiza una consulta para contar cuántas imágenes asociadas al mismo producto existen
    const countQuery =
      "SELECT COUNT(*) FROM imagen_producto WHERE codigo_producto = $1";
    const countResult = await pool.query(countQuery, [codigoProducto]);

    const imageCount = parseInt(countResult.rows[0].count); // Convierte el resultado en un número entero

    if (imageCount === 1) {
      // Si solo hay una imagen asociada al producto, envía un mensaje de error
      return res.status(400).json({
        error: `No puedes eliminar esta imagen para el producto con código ${codigoProducto}, debe existir al menos una imagen por producto`,
      });
    }

    if (imageCount > 1) {
      // Si hay más de una imagen asociada al producto, verifica si alguna tiene nombre 'imagen portada'
      const hasImagenPortadaQuery =
        "SELECT id_imagen FROM imagen_producto WHERE codigo_producto = $1 AND nombre_imagen = $2";
      const portadaResult = await pool.query(hasImagenPortadaQuery, [
        codigoProducto,
        "imagen portada",
      ]);

      if (
        portadaResult.rowCount === 1 &&
        portadaResult.rows[0].id_imagen === idImagen
      ) {
        // Si la imagen que se va a eliminar es la 'imagen portada', actualiza otra imagen como 'imagen portada'
        const updatePortadaQuery =
          "UPDATE imagen_producto SET nombre_imagen = $1 WHERE codigo_producto = $2 AND id_imagen != $3 LIMIT 1";
        await pool.query(updatePortadaQuery, [
          "imagen portada",
          codigoProducto,
          idImagen,
        ]);
      }
    }

    // Elimina la imagen con el ID proporcionado de la base de datos
    const deleteQuery = "DELETE FROM imagen_producto WHERE id_imagen = $1";
    await pool.query(deleteQuery, [idImagen]);

    // Construye la ruta completa al archivo en el sistema de archivos
    const fullPath = path.join(__dirname, "..", "images", imagePath);

    // Verifica si el archivo existe y, si es así, elimínalo
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);

      // Envia la ruta de la imagen eliminada en la respuesta JSON
      res.status(200).json({ success: true, imagePath: fullPath });
    } else {
      res.status(204).json({ success: true, imagePath: null }); // La imagen ya se había eliminado
    }
  } catch (error) {
    console.error("Error al eliminar la imagen", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

//////////////////////////////////////////////////////////
const getProductDetails = async (req, res) => {
  const { id } = req.params;

  try {
    // Realiza una consulta a la base de datos para obtener los detalles del producto con el ID proporcionado
    const query = "SELECT * FROM producto WHERE id_producto = $1"; // Reemplaza "tu_tabla_de_productos" por el nombre real de tu tabla
    const result = await pool.query(query, [id]);

    // Envía la respuesta con los detalles del producto encontrados
    res.json(result.rows[0]); // Supongo que solo se espera un resultado, por lo que tomo el primer elemento del array
  } catch (error) {
    console.error("Error al obtener detalles del producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const updateImageProducts = async (req, res) => {
  try {
    const productId = req.body.productId;
    const productName = req.body.producto;
    const images = req.files;

    if (!Array.isArray(images) || images.length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Error al recibir imágenes", images });
    }

    // Validar productId, productName y la existencia de imágenes
    if (!productId || !productName || !images || images.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Error en el ID, nombre o al recibir imágenes",
      });
    }

    // Construir el nombre de la carpeta usando el nombre del producto
    const sanitizedProductName = productName.replace(/[^\w\s]/gi, "");
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
      const originalImageName = image.originalname;
      const imageName = i === 0 ? "imagen portada" : originalImageName;
      const imagePath = path.join(imageFolderPath, originalImageName);

      fs.renameSync(image.path, imagePath);

      // Construir la URL completa de la imagen
      const imageUrl = `http://localhost:3060/images/${sanitizedProductName}/${originalImageName}`;

      const imageValues = [productId, imageName, imageUrl];
      await pool.query(insertImageQuery, imageValues);
    }

    return res
      .status(200)
      .json({ success: true, message: "Imágenes actualizadas con éxito" });
  } catch (error) {
    console.error("Error al actualizar las imágenes:", error);
    return res
      .status(500)
      .json({ success: false, error: "Error al actualizar las imágenes" });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    // Obtén la información del producto, incluyendo las rutas de las imágenes
    const getProductInfoQuery = `
      SELECT p.id_producto, p.nombre_producto, ip.ruta_imagen
      FROM producto AS p
      LEFT JOIN imagen_producto AS ip ON p.id_producto = ip.codigo_producto
      WHERE p.id_producto = $1;
    `;

    const productInfoResult = await pool.query(getProductInfoQuery, [
      productId,
    ]);

    if (productInfoResult.rowCount === 0) {
      return res.status(404).json({ error: "El producto no existe" });
    }

    // Elimina las imágenes de la carpeta de imágenes
    const imagesToDelete = productInfoResult.rows.map((row) => row.ruta_imagen);

    imagesToDelete.forEach((imagePath) => {
      const fullPath = path.join(__dirname, "..", "images", imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    });

    // Obtiene el nombre del producto
    const productName = productInfoResult.rows[0].nombre_producto;

    // Elimina las entradas de imagen_producto
    const deleteImageEntriesQuery =
      "DELETE FROM imagen_producto WHERE codigo_producto = $1";
    await pool.query(deleteImageEntriesQuery, [productId]);

    // Elimina la entrada de producto
    const deleteProductQuery = "DELETE FROM producto WHERE id_producto = $1";
    await pool.query(deleteProductQuery, [productId]);

    // Elimina la carpeta de imágenes del producto
    const productImagesDir = path.join(__dirname, "..", "images", productName);
    if (fs.existsSync(productImagesDir)) {
      fs.rmSync(productImagesDir, { recursive: true });
    }

    res.status(204).json({ success: true });
  } catch (error) {
    console.error("Error al eliminar el producto", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  insertarCompra,
  insertarCompraProducto,
  insertarStock,
  obtenerStock,
  obtenerDatosDeStockPorCodigoProducto,
  eliminarComentario,
  verComentarioPorId,
  editarComentario,
  getVentas,
  createVenta, 
  createVentaProducto,
  verComentariosPorCodigoProducto,
  getClientePorId,
  añadirComentario,
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
  validatePassword,
  getImagesUpdateProduct,
  traerproducto,
  deleteImage,
  updateImageProducts,
  getProductDetails,
  deleteProduct,
};