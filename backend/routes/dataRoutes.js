const express = require('express');
const dataController = require('../controllers/dataController');
const router = express.Router();

router.get('/images', dataController.getImages);

module.exports = router;
