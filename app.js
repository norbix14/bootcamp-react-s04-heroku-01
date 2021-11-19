const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const path = require('path');
const createError = require('http-errors');
const { v4: uuid } = require('uuid');

const PORT = process.env.PORT || 3000;

const app = express();

let users = [
	{ email: 'homero@mail.com', name: 'homero', password: uuid()},
	{ email: 'homero@mail.com', name: 'cosme fulanito', password: uuid()},
	{ email: 'marge@mail.com', name: 'marge', password: uuid()},
	{ email: 'marge@mail.com', name: 'marge la fugitiva', password: uuid()},
	{ email: 'bart@mail.com', name: 'bart', password: uuid()},
	{ email: 'bart@mail.com', name: 'el barto', password: uuid()},
	{ email: 'lisa@mail.com', name: 'lisa', password: uuid()},
	{ email: 'lisa@mail.com', name: 'lisa corazon de leon', password: uuid()},
	{ email: 'maggie@mail.com', name: 'maggie', password: uuid()},
	{ email: 'maggie@mail.com', name: 'maggie hija de coddor', password: uuid()},
];

app.use(cors());

app.use(methodOverride());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/add', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/add.html'));
});

app.get('/users', (req, res) => {
	res.send([...users]);
});

app.get('/users/email/:email', (req, res) => {
	res.send(users.filter(user => user.email === req.params.email));
});

app.get('/users/name/:name', (req, res) => {
	res.send(users.filter(user => user.name === req.params.name));
});

app.post('/users', (req, res) => {
	const { name = '', email = '', password = '' } = req.body;
	if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
		return res.send('No hay datos para guardar');
	}
	let checkUser = users.map(user => user.email === email);
	if (checkUser.includes(true)) {
		return res.send('No se puede crear al usuario. Email en uso.');
	}
	users.push({ name, email, password });
	res.send('Usuario creado');
});

app.put('/users', (req, res) => {
	const { name, email, password } = req.body;
	users = users.filter(user => user.email !== email);
	users.push({ name, email, password });
	res.send('Usuario actualizado');
});

app.delete('/users/delete/:email', (req, res) => {
	let checkUser = users.map(user => user.email === req.params.email);
	if (checkUser.includes(true)) {
		users = users.filter(user => user.email !== req.params.email);
		res.send('Usuario eliminado');
	}
	return res.send('No hay usuario para eliminar');
});

app.delete('/users/deletes/', (req, res) => {
	const { email = '' } = req.query;
	if (!email) {
		return res.send('Ingresá los mails de los usuarios a eliminar separados por coma');
	}
	const emails = email.split(',');
	emails.forEach(mail => {
		users = users.filter(user => mail !== user.email);
	});
	res.send('Usuarios eliminados');
});

app.use((req, res, next) => {
	next(createError(404));
});

app.use((error, req, res, next) => {
	res.sendFile(path.join(__dirname, '/views/notfound.html'));
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
