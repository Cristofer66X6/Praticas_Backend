Comenzamos la practica inicializando el proyecto con:
npm init -y

npm install express bcrypt jsonwebtoken dotenv
express = framework web,
bcrypt = para hashear contraseñas,
jsonwebtoken = para emitir/verificar JWT,
dotenv = para manejar claves secretas en .env.


ejecutamos el siguiente comando para iniciar el servidor:
node index.js


Pruebas en postman

Registro

Método: POST

URL: http://localhost:3000/auth/register

Body (JSON):

{
  "username": "admin1",
  "password": "123456",
  "role": "admin"
}


Respuesta esperada:

{ "message": "Usuario registrado con éxito" }

➤ Login

Método: POST

URL: http://localhost:3000/auth/login

Body (JSON):

{
  "username": "admin1",
  "password": "123456"
}


Respuesta esperada:

{ "token": "eyJhbGciOiJIUzI1NiIsInR..." }


Copia ese token completo.

➤ Ruta protegida

Método: GET

URL: http://localhost:3000/productos

En Headers agregar:

Key: Authorization
Value: Bearer <token>


Respuesta esperada:

[
  { "id": 1, "name": "Laptop" },
  { "id": 2, "name": "Mouse" }
]
