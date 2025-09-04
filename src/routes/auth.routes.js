const { Router } = require('express');
const router = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Inicia sesión y devuelve un JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           examples:
 *             ejemploValido:
 *               value:
 *                 email: user@dominio.com
 *                 password: Secreta123!
 *     responses:
 *       200:
 *         description: Login correcto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             examples:
 *               ok:
 *                 value:
 *                   accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciales inválidas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  // Demo (NO usar en prod)
  if (email === 'user@dominio.com' && password === 'Secreta123!') {
    return res.json({ accessToken: 'FAKE.JWT.TOKEN' });
  }
  return res.status(401).json({ message: 'Credenciales inválidas' });
});

module.exports = router;
