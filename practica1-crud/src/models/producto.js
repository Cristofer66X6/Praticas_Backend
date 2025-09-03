let productos = [];
let idCounter = 1;

export function getAll() {
  return productos;
}

export function getById(id) {
  return productos.find(p => p.id === id);
}

export function create(data) {
  const nuevo = {
    id: idCounter++,
    nombre: data.nombre,
    precio: data.precio,
    stock: data.stock,
    creadoEn: new Date()
  };
  productos.push(nuevo);
  return nuevo;
}

export function update(id, data) {
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return null;
  productos[index] = { ...productos[index], ...data };
  return productos[index];
}

export function remove(id) {
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return null;
  const eliminado = productos[index];
  productos.splice(index, 1);
  return eliminado;
}
