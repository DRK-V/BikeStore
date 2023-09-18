const express = require("express");
const dataController = require("../controllers/dataController");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * @openapi
 * tags:
 *   name: Images
 *   description: API endpoints for images
 */

// Define la instancia de multer con el almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.params.userId;
    const frontendPublicPath = path.join(__dirname, "../../frontend/public");
    const userImagePath = `profile_images/user_${userId}`;
    const destinationPath = path.join(frontendPublicPath, userImagePath);

    // Verificar si la carpeta de destino existe, si no, crearla
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

/**
 * @openapi
 * /images:
 *   get:
 *     summary: Get images
 *     description: Get a list of images.
 *     tags: [Images]
 *     parameters:
 *       - in: query
 *         name: id_imagen
 *         description: ID of the image to retrieve.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: nombre
 *         description: Name of the image to retrieve.
 *         schema:
 *           type: string
 *       - in: query
 *         name: ruta
 *         description: URL-encoded path of the image to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of images.
 *       404:
 *         description: Image not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/images", dataController.getImages);
router.get("/images/:id_imagen", dataController.getImages);
/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products from the database.
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: Bike
 *                 price: 500
 *                 description: this is an example
 *                 stock: 2
 *                 type: Mountain
 *                 color: red
 *                 image_code: 2
 *               - id: 2
 *                 name: Helmet
 *                 price: 50
 *                 description: this is an example
 *                 stock: 2
 *                 type: Mountain
 *                 color: red
 *                 image_code: 2
 *               - id: 3
 *                 name: Bike
 *                 price: 500
 *                 description: this is an example
 *                 stock: 2
 *                 type: Mountain
 *                 color: red
 *                 image_code: 3
 *               - id: 4
 *                 name: Helmet
 *                 price: 50
 *                 description: this is an example
 *                 stock: 2
 *                 type: Mountain
 *                 color: red
 *                 image_code: 2
 *       500:
 *         description: Internal server error.
 */
router.get("/products/:id_producto", dataController.getProductsWithImages);
router.get("/products-with-images", dataController.getAllProductsWithImages);
router.get("/products", dataController.getAllProducts);
router.get("/products/:id_producto", dataController.getAllProducts);

router.get(
  "/products-with-images/:id_producto",
  dataController.getProductsWithImages
);
/**
 * @openapi
 * /api/cliente:
 *   get:
 *     summary: Get all clients
 *     description: Retrieve a list of all clients from the database.
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: A list of clients.
 *       500:
 *         description: Internal server error.
 */
router.get("/cliente", dataController.getAllClientes);
router.get("/cliente/:id", dataController.getClientePorId);
router.post("/api/register", async (req, res) => {
  const userData = req.body;

  try {
    await dataController.registerUser(userData);
    res.status(201).json({ message: "Registro exitoso" });
  } catch (error) {
    if (error.message === "Este usuario ya está registrado.") {
      res.status(409).json({ error: "duplicate" });
    } else {
      console.error("Error al insertar en la base de datos:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
});

/**
 * @openapi
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user with provided credentials.
 *     tags: [User]
 *     parameters:
 *       - in: body
 *         name: userCredentials
 *         description: User credentials for authentication.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Successful login.
 *       401:
 *         description: Unauthorized - invalid credentials.
 *       500:
 *         description: Internal server error.
 */
router.post("/api/login", dataController.loginUser);

router.get("/api/user/:email", dataController.getUserByEmail);
//esta ruta es para traer la informacion de pedidos del usuario

router.get("/user/:userId/ventas", dataController.getUserDetalleCompra);

router.put("/api/update_user", dataController.updateUser);

// router.post('/user/:userId/updateImage', upload.single('image'), dataController.updateUserImage);
router.post(
  "/user/:userId/updateImage",
  upload.single("image"),
  dataController.updateUserImage
);

router.post("/comentarios", dataController.añadirComentario);


router.get("/ver-comentario/:id_comentario", dataController.verComentarioPorId); // Ruta actualizada

router.get(
  "/coments/:codigo_producto",
  dataController.verComentariosPorCodigoProducto
);
router.post("/crear-venta", async (req, res) => {
  try {
    const ventaData = req.body; // Asume que los datos se envían en el cuerpo de la solicitud
    const result = await dataController.createVenta(ventaData);
    res.status(201).json({ message: "Venta creada con éxito", result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear venta", message: error.message });
  }
});
router.get("/ventas", async (req, res) => {
  try {
    const ventas = await dataController.getVentas();
    res.status(200).json(ventas);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener ventas", message: error.message });
  }
});

router.post('/insertarProducto', dataController.insertarProducto);

const storage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    const productId = req.body.productId; // ID del producto al que se asocian las imágenes
    const frontendPublicPath = path.join(__dirname, '../../frontend/public');
    const productImagePath = `product_images/product_${productId}`;
    const destinationPath = path.join(frontendPublicPath, productImagePath);

    // Verificar si la carpeta de destino existe, si no, crearla
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload2 = multer({ storage: storage2 });
router.post('/insertarImagenesProducto', upload2.array('images'), dataController.insertarImagenesProducto);


// router.get("/products/:id_imagen", dataController.getImages);
router.get("/getproductsadmin", dataController.getProductsAdmin);
router.post("/validatePassword",dataController.validatePassword)


router.post("/getImagesUpdateProduct/:id", dataController.getImagesUpdateProduct);

//esta es para actualizar los productos con el rol de administrador
router.post("/actualizar_producto/:id_producto", dataController.traerproducto)


module.exports = router;


