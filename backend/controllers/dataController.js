const { pool } = require('../config/db');

const getImages = (req, res) => {
  pool.query('SELECT * FROM images', (error, result) => {
    if (error) {
      console.error('Error al obtener datos', error.message);
      res.status(500).json({ error: 'Error al obtener datos' });
    } else {
      res.json({ images: result.rows });
    }
  });
};

module.exports = {
  getImages,
};


