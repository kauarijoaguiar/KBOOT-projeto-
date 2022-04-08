const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/view');




app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());




const session = require('express-session');
const { post } = require('./routes/tenis-routes');
app.use(session({
    secret: 'chave secreta de criptografia',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(express.static('public'));
app.use('*', (req, res, next) => {
    console.log(`Request recebido para ${req.baseUrl} as ${new Date()}`);
    next();
})


app.get('*', (req, res, next) => {
    if (req.url != '/login.html' && req.url != '/entrar.html') {
        if (!req.session.user) {
            res.redirect('/login.html');
        } else {
            next();
        }
    } else {
        next();
    }
})

app.get('/', (req, res) => {
    res.redirect('/login.html');
});

const tenisRoutes = require('./routes/tenis-routes');
app.use('/tenis', tenisRoutes);

const usersRoutes = require('./routes/users-routes');
app.use('/users', usersRoutes);




app.use('*', (req, res) => {
    return res.status(404).send(`
        <h1>Sorry, not found!!!</h1>
        <a href="/login.html">VOLTAR</a>
    `);
})

const porta = process.env.PORT;
app.listen(porta, () => console.log(`Server iniciado na porta` + porta));