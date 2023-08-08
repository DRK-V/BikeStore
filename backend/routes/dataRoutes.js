const express = require('express');
const dataController = require('../controllers/dataController');
const router = express.Router();

router.get('/api/images', dataController.getImages);
router.get('/cliente', dataController.getAllClientes);
router.post('/api/register', (req, res) => {
  const userData = req.body;

 

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
