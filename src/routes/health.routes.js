const { Router } = require('express');
const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Revisa el estado del servicio
 *     description: "Retorna { ok: true } para indicar que el servicio responde."
 *     responses:
 *       200:
 *         description: Servicio operativo
 *         content:
 *           application/json:
 *             example:
 *               ok: true
 */

router.get('/', (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
