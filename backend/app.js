const express = require('express');
const app = express();
const { Pool } = require('pg');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');


const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.set('view engine', 'ejs');
app.set('views', './views');


app.use('/images', express.static(__dirname + '/images'));

const dataRoutes = require('./routes/dataRoutes');

app.use('/', dataRoutes);

const puerto = 3060;
app.listen(puerto, () => {
    console.log(`Server listen to http://localhost:${puerto}`)
});
