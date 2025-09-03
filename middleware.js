const jwt = require("jsonwebtoken");

// Verifica JWT
function authenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ error: "Token requerido" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Formato de token inválido" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { sub, role, iat, exp }
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}

// Verifica rol
function authorize(roles = []) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "No tienes permisos" });
    }
    next();
  };
}

module.exports = { authenticate, authorize };
