//aqui esta el jogo bonito
const { Pool } = require('pg');
const { CONFIG_BD } = require('../config/db');

const pool = new Pool(CONFIG_BD);

const getProducts = (req, res) => {
    pool.query('SELECT * FROM persona', (error, result) => {
        if (error) {
            //se controla el error
            console.error('Error al obtener datos', Error);
            res.status(500).send('Error al obtener datos');
        } else {
            res.json(result.rows)
        }
    });
}

module.exports = {
    getProducts,
};