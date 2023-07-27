const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController')

router.get('/products',dataController.getProducts); // el primer servicio get (simple)

module.exports = router;