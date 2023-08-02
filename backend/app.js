const express = require('express');
const app = express();
<<<<<<< HEAD
=======
const { Pool } = require('pg');
>>>>>>> Daniel
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

<<<<<<< HEAD
=======

>>>>>>> Daniel
const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


<<<<<<< HEAD
const dataRoutes = require('./routes/dataRoutes');

app.use('/', dataRoutes);

=======
>>>>>>> Daniel
app.set('view engine', 'ejs');
app.set('views', './views');


<<<<<<< HEAD
=======
app.use('/images', express.static(__dirname + '/images'));

const dataRoutes = require('./routes/dataRoutes');

app.use('/', dataRoutes);

>>>>>>> Daniel
const puerto = 3060;
app.listen(puerto, () => {
    console.log(`Server listen to http://localhost:${puerto}`)
});
