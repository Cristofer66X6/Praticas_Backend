const { Router } = require('express');
const auth = require('../middleware/auth');
const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Lista paginada de usuarios (requiere auth)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *         description: Tamaño de página
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 page: { type: integer, example: 1 }
 *                 limit: { type: integer, example: 10 }
 *             examples:
 *               ejemplo:
 *                 value:
 *                   data:
 *                     - id: "a3f4e7c2-5af8-4b2b-a1b2-9c9f12345678"
 *                       email: "user@dominio.com"
 *                       name: "Ada Lovelace"
 *                   page: 1
 *                   limit: 10
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', auth, (req, res) => {
  res.json({
    data: [
      { id: 'a3f4e7c2-5af8-4b2b-a1b2-9c9f12345678', email: 'user@dominio.com', name: 'Ada Lovelace' }
    ],
    page: 1,
    limit: 10
  });
});

/**
 * @openapi
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Crea un usuario (requiere auth)
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado
 */
router.post('/', auth, (req, res) => {
  const { email, name } = req.body || {};
  res.status(201).json({ id: 'nuevo-id', email, name });
});

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Obtiene un usuario por id (requiere auth)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *         description: UUID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', auth, (req, res) => {
  const { id } = req.params;
  if (id === 'not-found') return res.status(404).json({ message: 'Usuario no encontrado' });
  res.json({ id, email: 'ejemplo@dominio.com', name: 'Grace Hopper' });
});

module.exports = router;
