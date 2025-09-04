const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Mi API – Práctica 5',
      version: '1.0.0',
      description: 'Documentación automática con OpenAPI/Swagger',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Desarrollo' },
      // { url: 'https://api.tu-dominio.com', description: 'Producción' },
    ],
    tags: [
      { name: 'Health', description: 'Estado del servicio' },
      { name: 'Auth', description: 'Autenticación y JWT' },
      { name: 'Users', description: 'Operaciones con usuarios' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        // Schemas reutilizables
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: 'a3f4e7c2-5af8-4b2b-a1b2-9c9f12345678' },
            email: { type: 'string', format: 'email', example: 'user@dominio.com' },
            name: { type: 'string', example: 'Ada Lovelace' },
          },
          required: ['id', 'email', 'name'],
        },
        UserInput: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email', example: 'nuevo@dominio.com' },
            name: { type: 'string', example: 'Nueva Persona' },
            password: { type: 'string', minLength: 8, example: 'Secreta123!' },
          },
          required: ['email', 'name', 'password'],
        },
        LoginRequest: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email', example: 'user@dominio.com' },
            password: { type: 'string', example: 'Secreta123!' },
          },
          required: ['email', 'password'],
        },
        LoginResponse: {
          type: 'object',
          properties: {
            accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          },
          required: ['accessToken'],
        },
        Error: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Detalle del error' },
          },
          required: ['message'],
        },
      },
    },
  },
  // Archivos donde leerá anotaciones JSDoc con @openapi
  apis: [
    './src/routes/*.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };
