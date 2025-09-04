const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

router.get('/', async (req, res) => {
  const productos = await Producto.getAll();
  res.json(productos);
});

router.post('/', async (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Faltan campos' });
  }
  const nuevo = await Producto.create(nombre, precio);
  res.status(201).json(nuevo);
});

module.exports = router;
