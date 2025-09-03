const express = require("express");
const authRoutes = require("./auth");
const productRoutes = require("./products");
require("dotenv").config();

const app = express();
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/productos", productRoutes);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
