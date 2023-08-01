const { pool } = require('../config/db');

const getProducts = (req, res) => {
  pool.query('SELECT * FROM images', (error, result) => {
    if (error) {
      console.error('Error al obtener datos', error.message);
      res.status(500).send('Error al obtener datos');
    } else {
      res.render('images', { images: result.rows });
    }
  });
};

module.exports = {
  getProducts,
};

