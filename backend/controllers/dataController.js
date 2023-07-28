const { Pool } = require('pg');
const { CONFIG_BD } = require('../config/db');

const pool = new Pool(CONFIG_BD);
console.log(pool)

const getProducts = (req, res) => {
    pool.query('SELECT * FROM producto', (error, result) => {
        if (error) {
            // Imprimir el mensaje de error en la consola
            console.error('Error al obtener datos', error.message);

            // Responder con un mensaje de error en la respuesta HTTP
            res.status(500).send('Error al obtener datos');
        } else {
            res.json(result.rows);
        }
    });
}

module.exports = {
    getProducts,
};
