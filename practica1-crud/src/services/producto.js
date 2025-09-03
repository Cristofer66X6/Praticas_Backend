import * as Producto from "../models/producto.js";

export function listar() {
  return Producto.getAll();
}

export function buscarPorId(id) {
  return Producto.getById(id);
}

export function crear(data) {
  return Producto.create(data);
}

export function actualizar(id, data) {
  return Producto.update(id, data);
}

export function eliminar(id) {
  return Producto.remove(id);
}
