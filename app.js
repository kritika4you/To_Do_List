const express = require('express');
const path = require('path');
const db = require('./db');
const authRouter = require('./auth');
const todosRouter = require('./todos');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use('/auth', authRouter);
app.use('/todos', todosRouter);

app.get('/', (req, res) => {
    res.render('index', { isLoggedIn: false });
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});