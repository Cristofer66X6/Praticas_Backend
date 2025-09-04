const express = require('express');
const app = express();
app.use(express.json());

const { swaggerSpec } = require('./docs/swagger');
const swaggerUi = require('swagger-ui-express');
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // <-- /docs expone Swagger UI

// Rutas reales
app.use('/health', require('./routes/health.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/users.routes'));

module.exports = app;
