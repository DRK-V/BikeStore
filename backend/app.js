// app.js

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3060;
const { swaggerDocs } = require("./routes/swagger");
app.use(express.json());
app.use(cors());

const dataController = require("./controllers/dataController");

const dataRoutes = require("./routes/dataRoutes");
swaggerDocs(app, port);

app.use("/images", express.static(__dirname + "/images"));
app.use("/", dataRoutes);

app.get("/images", dataController.getImages);
app.get("/images/:id_imagen", dataController.getImages);
app.get("/products", dataController.getAllProducts);
app.get("/products/:id_producto", dataController.getAllProducts);
app.get(
  "/product-details/:id_producto",
  dataController.getProductDetailsWithImages
);

// Ruta para ver todos los clientes
app.get("/api/cliente", (req, res) => {
  const { pool } = require("./config/db");

  const selectAllClientesQuery = "SELECT * FROM cliente";

  pool
    .query(selectAllClientesQuery)
    .then((result) => {
      const clientes = result.rows;
      res.status(200).json(clientes);
    })
    .catch((error) => {
      console.error("Error al consultar en la base de datos:", error);
      res.status(500).json({ message: "Error en el servidor" });
    });
});
app.put("/editar-comentario/:id_comentario", dataController.editarComentario);
app.delete(
  "/eliminar-comentario/:id_comentario",
  dataController.eliminarComentario
);

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
