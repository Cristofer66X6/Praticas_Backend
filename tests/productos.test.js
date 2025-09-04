const request = require('supertest');
const app = require('../app');
const db = require('../db');
const Producto = require('../models/producto');

beforeAll(async () => {
  await db.query('DELETE FROM productos');
});

afterEach(async () => {
  await Producto.deleteAll();
});

afterAll(async () => {
  await db.end();
});

describe('GET /productos', () => {
  it('retorna productos (200)', async () => {
    await Producto.create('Test', 10);
    const res = await request(app).get('/productos');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('retorna 404 en ruta no encontrada', async () => {
    const res = await request(app).get('/noexiste');
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /productos', () => {
  it('crea producto correctamente', async () => {
    const res = await request(app)
      .post('/productos')
      .send({ nombre: 'Nuevo', precio: 20 });
    expect(res.statusCode).toBe(201);
    expect(res.body.nombre).toBe('Nuevo');
  });

  it('falla si faltan campos', async () => {
    const res = await request(app)
      .post('/productos')
      .send({ nombre: 'Incompleto' });
    expect(res.statusCode).toBe(400);
  });
});
