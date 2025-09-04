const db = require('../db');

const Producto = {
  async getAll() {
    const res = await db.query('SELECT * FROM productos');
    return res.rows;
  },

  async create(nombre, precio) {
    const res = await db.query(
      'INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *',
      [nombre, precio]
    );
    return res.rows[0];
  },

  async deleteAll() {
    await db.query('DELETE FROM productos');
  }
};

module.exports = Producto;
