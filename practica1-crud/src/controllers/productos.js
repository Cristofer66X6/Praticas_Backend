import { z } from "zod";
import * as service from "../services/producto.js";

const schemaProducto = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  precio: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().int().min(0, "El stock debe ser mayor o igual a 0"),
});

// GET /productos?page=1&limit=10&sort=precio,desc
export function getAll(req, res) {
  let { page = 1, limit = 10, sort } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let productos = service.listar();

  // Ordenar
  if (sort) {
    const [campo, orden] = sort.split(",");
    productos.sort((a, b) => {
      if (orden === "desc") return b[campo] - a[campo];
      return a[campo] - b[campo];
    });
  }

  // Paginación
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginados = productos.slice(start, end);

  res.json({
    page,
    limit,
    total: productos.length,
    data: paginados,
  });
}

export function getById(req, res) {
  const id = parseInt(req.params.id);
  const producto = service.buscarPorId(id);
  if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(producto);
}

export function create(req, res) {
  try {
    const data = schemaProducto.parse(req.body);
    const nuevo = service.crear(data);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ error: err.errors });
  }
}

export function update(req, res) {
  const id = parseInt(req.params.id);
  try {
    const data = schemaProducto.partial().parse(req.body);
    const actualizado = service.actualizar(id, data);
    if (!actualizado) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.errors });
  }
}

export function remove(req, res) {
  const id = parseInt(req.params.id);
  const eliminado = service.eliminar(id);
  if (!eliminado) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(eliminado);
}
