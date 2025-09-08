const express = require('express');
const app = express();
const productosRouter = require('./routes/productos');

app.use(express.json());
app.use('/productos', productosRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = app;

/* istanbul ignore next */
if (require.main === module) {
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Servidor iniciado`)
  );
}
