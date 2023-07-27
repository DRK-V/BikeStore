const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

//configuracion de swagger
const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//confirgurar las rutas 

const dataRoutes = require('./routes/dataRoutes');
app.use('/', dataRoutes);
//employ

const puerto = 3060;
app.listen(puerto, () => {
    console.log(`server listen to http://localhost:${puerto}`)
})