# Ejercicio API con deploy en Heroku

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
