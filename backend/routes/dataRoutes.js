//routes

const express = require("express");
const dataController = require("../controllers/dataController");
const router = express.Router();
/**
 * @openapi
 * tags:
 *   name: Images
 *   description: API endpoints for images
 */

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

router.get('/api/user/:email', dataController.getUserByEmail);


module.exports = router;
