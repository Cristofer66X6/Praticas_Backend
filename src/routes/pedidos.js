const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const router = express.Router();

// GET /pedidos?clienteId=1&estado=pendiente&sort=fecha,desc&page=1&limit=5
router.get('/', async (req, res) => {
  const { clienteId, estado, sort, page = 1, limit = 10 } = req.query;

  const where = {};
  if (clienteId) where.clienteId = Number(clienteId);
  if (estado) where.estado = estado;

  let orderBy = {};
  if (sort) {
    const [campo, direccion] = sort.split(',');
    orderBy[campo] = direccion === 'desc' ? 'desc' : 'asc';
  }

  const skip = (page - 1) * limit;
  const take = Number(limit);

  const pedidos = await prisma.pedido.findMany({
    where,
    orderBy,
    skip,
    take,
    include: { cliente: true },
  });

  res.json(pedidos);
});

module.exports = router;
