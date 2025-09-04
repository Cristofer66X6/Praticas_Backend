#Objetivo de la practica
Crear una API backend de Node.js con Express + PostgreSQL, y asegurar su calidad mediante pruebas automatizadas (unitarias e integración), midiendo la cobertura de código y ejecutando pruebas automáticamente en GitHub (CI/CD).


Inicializamos el proyecto y creamos dependencias
"npm init -y"
"npm install express pg dotenv"
"npm install --save-dev jest supertest"

con este comando hacemos la covertura la cual es para que muestre qué tanto de mi código está cubierto por pruebas automatizadas y eso ayuda a mejorar la calidad de nuestros tests
"npm run test:coverage"

Comando para ejecutar el servidor
"npm start"
comando para ejecutar los test
"npm test"
Verificar cobertura
"npm run test:coverage"