const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const path = require('path');
const createError = require('http-errors');

let PORT = process.env.PORT || 3000;

const app = express();

let users = ['homero', 'bart', 'lisa', 'marge', 'maggie'];

app.use(cors());

app.use(methodOverride());

app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/users', (req, res) => {
	res.send(users);
});

app.post('/users/:nombre', (req, res) => {
	users.push(req.params.nombre);
	res.send('Usuario creado');
});

app.put('/users/:viejo/:nuevo', (req, res) => {
	users = users.filter(user => user !== req.params.viejo);
	users.push(req.params.nuevo);
	res.send('Usuario actualizado');
});

app.delete('/users/:nombre', (req, res) => {
	if (!users.includes(req.params.nombre)) {
		return res.send('No existe el usuario que queres eliminar');
	}
	users = users.filter(user => user !== req.params.nombre);
	res.send('Usuario eliminado');
});

app.use((req, res, next) => {
	next(createError(404));
});

app.use((error, req, res, next) => {
	res.sendFile(path.join(__dirname, '/views/notfound.html'));
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
