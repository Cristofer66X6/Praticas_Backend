module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace(/^Bearer\s+/, '');
  if (!token || token === 'FAKE') {
    return res.status(401).json({ message: 'No autorizado' });
  }
  // Aquí verificarías el JWT real con tu secret
  next();
};
