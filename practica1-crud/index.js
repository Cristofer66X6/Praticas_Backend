import express from "express";
import dotenv from "dotenv";
import productosRoutes from "./src/routes/producto.js";

dotenv.config(); // lee .env

const app = express();
app.use(express.json());

app.use("/productos", productosRoutes);

// Middleware de errores genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});



