//routes

const express = require('express');
const dataController = require('../controllers/dataController');
const router = express.Router();

router.get('/images', dataController.getImages);
router.get('/images/:id_imagen', dataController.getImages);
router.get('/products', dataController.getAllProducts);
router.get('/products/:id_producto', dataController.getAllProducts);
router.get('/cliente', dataController.getAllClientes);
router.post('/api/register', (req, res) => {
  const userData = req.body;

  // Validación de datos (Agrega aquí la validación si es necesario)

  dataController.registerUser(userData)
    .then(() => {
      res.status(201).json({ message: 'Registro exitoso' });
    })
    .catch((error) => {
      console.error('Error al insertar en la base de datos:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    });
});

router.post('/api/login', dataController.loginUser);

module.exports = router;

