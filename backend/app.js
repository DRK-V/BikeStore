const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const dataRoutes = require('./routes/dataRoutes');

app.use('/', dataRoutes);

app.set('view engine', 'ejs');
app.set('views', './views');


const puerto = 3060;
app.listen(puerto, () => {
    console.log(`Server listen to http://localhost:${puerto}`)
});
