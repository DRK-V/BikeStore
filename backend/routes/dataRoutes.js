const express = require('express');
const dataController = require('../controllers/dataController');
const router = express.Router();

router.get('/images', dataController.getImages);
router.get('/products', dataController.getProducts);

module.exports = router;
