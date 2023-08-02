const { Pool } = require('pg');

<<<<<<< HEAD

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'bikestore',
    password: 'admin',
    port: 5432
=======
// Replace the following values with your actual PostgreSQL database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'bikestore',
  password: 'admin',
  port: 5432,
>>>>>>> Daniel
});

module.exports = {
  pool,
};
