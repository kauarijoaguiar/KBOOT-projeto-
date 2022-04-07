const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/view');




// PARSER DOS FORMULÁRIOS
app.use(express.urlencoded({
    extended: true,
}));

// PARSER DAS REQUISIÇOES COM JSON
app.use(express.json());




const session = require('express-session');
const { post } = require('./routes/tenis-routes');
app.use(session({
    secret: 'chave secreta de criptografia',
    resave: false, // NAO SOBRESCREVER CASO NAO HAJA MODIFICAÇÕES,
    saveUninitialized: false,
    cookie: { secure: false }
}))


app.use(express.static('public'));

/* 
SEMPRE QUE UTILIZAMOS APP.USE ESTAMOS INCLUINDO UM MIDDLEWARE !!!

MIDDLEWARE É UMA FUNÇÃO QUE EXECUTA ENTRE O REQUEST E O ENDPOINT FINAL, PERMITINDO QUE SEJA VERIFICADO, INCLUIDO, TESTADO, QUALQUER CÓDIGO, ANTES DE "PASSAR PARA FRENTE" NEXT() FUNCTION
*/
app.use('*', (req, res, next) => {
    console.log(`Request recebido para ${req.baseUrl} as ${new Date()}`);

    // atrasando o usuario kkkkk
    // setTimeout(() => next(), 1000);
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
        <a href="/tenis">VOLTAR</a>
    `);
})

const porta = process.env.PORT;
app.listen(porta, () => console.log(`Server iniciado na porta` + porta));