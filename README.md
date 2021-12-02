# Ejercicio API con deploy en Heroku

## Usar Dockerfile

### [NodeJS and Docker](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/ "Dockerizing a NodeJS web app")

```
// crear la imagen desde Dockerfile
docker build -t <image-name> .

// correr contenedor de fondo con puerto 3000 expuesto
docker run -dp 3000:3000 <image-name>

// detener contenedor
docker stop <containerid>

// eliminar imagen
docker rmi -f <image-name>
```

## Modo de uso de la API

```
GET /users
Trae todos los usuarios

GET /users/email/:email
Trae un usuario según su email

GET /users/name/:name
Trae un usuario según su nombre

POST /users
Agrega a un nuevo usuario mediante un formulario

PUT /users
Actualiza a un usuario mediante un formulario

DELETE /users/delete/:email
Elimina al usuario por su email

DELETE /users/deletes
Elimina varios usuarios por su email mediante queries
Ej: /users/deletes?email=homero@mail.com,bart@mail.com
```
