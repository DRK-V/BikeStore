// app.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3060;
const { swaggerDocs } = require('./routes/swagger')
app.use(express.json());
app.use(cors());

const dataController = require('./controllers/dataController');

const dataRoutes = require('./routes/dataRoutes');
swaggerDocs(app, port);

app.use('/images', express.static(__dirname + '/images'));
app.use('/', dataRoutes);

app.get('/images', dataController.getImages);
app.get('/images/:id_imagen', dataController.getImages);
app.get('/products', dataController.getAllProducts);
app.get('/products/:id_producto', dataController.getAllProducts);
const obtenerDetallesDelProducto = (id_producto) => {
  // Aquí realiza la lógica para obtener los detalles del producto con el id_producto
  // Por ejemplo, consulta una base de datos o realiza alguna operación
  // para obtener los detalles del producto correspondiente al id_producto
  // Devuelve un objeto con los detalles del producto
  return {
    id: id_producto,
    nombre: 'Producto ejemplo',
    precio: 100,
    descripcion: 'Descripción del producto',
    // Otros detalles del producto
  };
};

// Definir la ruta para obtener los detalles del producto
app.get('/product-details/:id_producto', (req, res) => {
  const id_producto = req.params.id_producto;
  const productDetails = obtenerDetallesDelProducto(id_producto);
  res.json(productDetails); // Responde con JSON válido
});

// Ruta para ver todos los clientes
app.get('/api/cliente', (req, res) => {
  const { pool } = require('./config/db');

  const selectAllClientesQuery = 'SELECT * FROM cliente';

  pool.query(selectAllClientesQuery)
    .then((result) => {
      const clientes = result.rows;
      res.status(200).json(clientes);
    })
    .catch((error) => {
      console.error('Error al consultar en la base de datos:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

