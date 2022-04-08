const users = [];

class UsersController {
    async cadastrar(req, res) {
        const user = req.body;
        users.push(user);
        res.redirect('/');
    }

    async login(req, res) {

        const { email, senha } = req.body;
        const usuarioEcontrado = users.find(u => u.email == email);
        if (!usuarioEcontrado) return res.redirect('/login.html');
        if (usuarioEcontrado.senha == senha) {
            req.session.user = usuarioEcontrado;
            if (usuarioEcontrado.senha == senha) {
                //res.send('Usuario e senha confirmados, vc fez o login');
                return res.redirect('/tenis');
            }

        } else {

            return res.redirect('/');
        }

    }
}

module.exports = UsersController;