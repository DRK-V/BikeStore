const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Bikestore API",
            version: "1.0.0",
            description: "API documentation for the Bikestore application."
        },
        servers: [
            {
                url: "http://localhost:3060/api/v1/docs", // Cambia esto a la URL base de tu API
                description: "si"
            }
            // Puedes agregar más servidores aquí si es necesario
        ]
    },
    apis: ['./routes/dataRoutes.js'], // Cambia esto para incluir todas las rutas de tus controladores
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`v1 docs are available at http://localhost:${port}/api/v1/docs`);
};



module.exports = {
    swaggerDocs,
};
