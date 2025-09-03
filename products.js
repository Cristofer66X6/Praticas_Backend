const express = require("express");
const { authenticate, authorize } = require("./middleware");
const router = express.Router();

let products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mouse" }
];

// Ver productos (cualquiera autenticado)
router.get("/", authenticate, (req, res) => {
  res.json(products);
});

// Crear producto (admin y user pueden)
router.post("/", authenticate, authorize(["admin", "user"]), (req, res) => {
  const { name } = req.body;
  const newProduct = { id: products.length + 1, name };
  products.push(newProduct);
  res.json(newProduct);
});

// Borrar producto (solo admin)
router.delete("/:id", authenticate, authorize(["admin"]), (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id != id);
  res.json({ message: "Producto eliminado" });
});

module.exports = router;
