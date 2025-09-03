Practica 1 
El backend nosotros lo vamos a correr con el siguiente comando
"npm run dev"

Previamente accediendo a la carpeta de nuestro proyecto 
"cd C:\Users\alber\Documents\BACKEND\practica1-crud"

Cuando este todo bien estaremos viendo
"Servidor en http://localhost:3000"


Instalamos Dotenv con
"npm install dotenv"

EJEMPLOS CON EL CRUD:
POST http://localhost:3000/productos
R=
{
  "nombre": "Laptop",
  "precio": 1200,
  "stock": 5
}


GET http://localhost:3000/productos?page=1&limit=2&sort=precio,desc
{
  "page": 1,
  "limit": 2,
  "total": 5,
  "data": [
    { "id": 2, "nombre": "Monitor", "precio": 250, "stock": 8, "creadoEn": "..." },
    { "id": 1, "nombre": "Laptop", "precio": 1200, "stock": 5, "creadoEn": "..." }
  ]
}

PUT http://localhost:3000/productos/1
R=
{
  "stock": 10
}

DELETE
http://localhost:3000/productos/1
R=ELIMINA EL PRODUCTO

