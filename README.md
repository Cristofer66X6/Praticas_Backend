Inicializamos e instalamos dependencias de Swagger
"npm init -y"
"npm i express"
"npm i swagger-jsdoc swagger-ui-express"

Documente parámetros (query/path), requestBody, responses con códigos de estado y ejemplos.

security: [{ BearerAuth: [] }] marca que el endpoint requiere JWT.

Swagger UI mostrará el botón Authorize para probar con Bearer <token>.

npm run dev → levanta la API en http://localhost:3000 y docs en http://localhost:3000/docs
npm run build-spec → genera swagger.json (para el entregable del repo).
npm run validate:swagger-cli → valida el spec con swagger-cli (opcional).
