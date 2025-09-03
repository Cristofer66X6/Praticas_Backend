const express = require('express');
const pedidosRouter = require('./routes/pedidos');

const app = express();
app.use(express.json());

app.use('/pedidos', pedidosRouter);

module.exports = app;
