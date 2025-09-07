#Diagrama Entidad relación para Postgres
![alt text](image.png)

Instalamos las dependencias 

"npm install express @prisma/client"
"npm install -D prisma nodemon"

Inicializamos Prisma
"npx prisma init"

En nuestro .env ponemos la conexion a nuestro postgress
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=practica2
DATABASE_URL="postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public"

Ejecutamos migraciones
"npx prisma migrate dev --name init"

Ponemos los datos iniciales con

"npx prisma db seed"

Corremos migraciones y seeds

"npx prisma migrate dev"
"npx prisma db seed"

Iniciamos el servido

"npx nodemon src/server.js"


Probamos la ruta en POSTMAN
GET http://localhost:3000/pedidos?clienteId=1&estado=pendiente&sort=fecha,desc&page=1&limit=5

EJEMPLOS CONSULTAS
CREATE TABLE cliente (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  creadoEn TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedido (
  id SERIAL PRIMARY KEY,
  clienteId INT REFERENCES cliente(id),
  estado VARCHAR(20) NOT NULL,
  fecha TIMESTAMP DEFAULT NOW(),
  total NUMERIC(10,2) NOT NULL
);


1. Ver todos los clientes
SELECT * FROM cliente;

2. Ver todos los pedidos
SELECT * FROM pedido;

3. Buscar pedidos de un cliente específico
SELECT * 
FROM pedido
WHERE clienteId = 1;

4. Filtrar pedidos por estado
SELECT * 
FROM pedido
WHERE estado = 'pendiente';

5. Ordenar pedidos por fecha (más recientes primero)
SELECT * 
FROM pedido
ORDER BY fecha DESC;

6. Pedidos con total mayor a 1000
SELECT * 
FROM pedido
WHERE total > 1000;

7. Contar cuántos pedidos tiene cada cliente
SELECT c.nombre, COUNT(p.id) AS total_pedidos
FROM cliente c
LEFT JOIN pedido p ON c.id = p.clienteId
GROUP BY c.nombre;

8. Sumar totales de pedidos por cliente
SELECT c.nombre, SUM(p.total) AS gasto_total
FROM cliente c
JOIN pedido p ON c.id = p.clienteId
GROUP BY c.nombre
ORDER BY gasto_total DESC;