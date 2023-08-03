const { pool } = require('../config/db');

const getImages = (req, res) => {
  pool.query('SELECT * FROM imagen_producto', (error, result) => {
    if (error) {
      console.error('Error al obtener datos', error.message);
      res.status(500).json({ error: 'Error al obtener datos' });
    } else {
      res.json({ images: result.rows });
    }
  });
};

const getProducts = (req, res) => {
  pool.query('SELECT * FROM producto', (error, result) => {
    if (error) {
      console.error('Error al obtener datos', error.message);
      res.status(500).json({ error: 'Error al obtener datos' });
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  getImages,
  getProducts,
};

