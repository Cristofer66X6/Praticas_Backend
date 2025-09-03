const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = []; // Aquí guardamos usuarios { username, passwordHash, role }

// Registro
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  // 1. Validar contraseña fuerte (ejemplo simple)
  if (password.length < 6) {
    return res.status(400).json({ error: "Contraseña muy débil (mínimo 6 caracteres)" });
  }

  // 2. Hashear contraseña
  const passwordHash = await bcrypt.hash(password, 10);

  // 3. Guardar usuario
  users.push({ username, passwordHash, role: role || "user" });

  res.json({ message: "Usuario registrado con éxito" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "Credenciales inválidas" });

  // Crear JWT con sub (id/nombre), role y expiración
  const token = jwt.sign(
    { sub: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } // expira en 15 minutos
  );

  res.json({ token });
});

module.exports = router;
