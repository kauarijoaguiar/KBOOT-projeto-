let tenis = [];

const { nanoid } = require('nanoid');

class TenisController {

    async mostraCadastro(req, res) {
        return res.render('pag', { user: req.session.user, tenis: tenis });
    }

    async listar(req, res) {
        let filtroPag = {};
        let filtro = req.query;
        let campo = Object.keys(filtro)[0];
        let tenisAux = tenis;
        if (typeof(filtro[campo]) != "undefined") {
            filtroPag.filtro = campo;
            filtroPag.valor = filtro[campo];
            tenisAux = tenis.filter(tenisX => tenisX[campo].includes(filtro[campo]));
        }
        return res.render('listagem', { user: req.session.user, tenis: tenisAux, filtro: filtroPag });
    }

    async deletar(req, res) {
        const { id } = req.params;
        const tenisIdx = tenis.findIndex(t => t.id == id);
        tenis.splice(tenisIdx, 1);
        return res.redirect('/tenis')
    }

    async detalhar(req, res) {
        const { id } = req.params;
        const tenisFiltrado = tenis.filter(t => t.id == id);
        if (tenisFiltrado.length > 0) {
            return res.render('detalhar', { tenis: tenisFiltrado[0], user: req.session.user });
        } else {
            return res.send('Tênis não encontrado');
        }
    }

    async pag(req, res) {
        tenis.push({
            id: nanoid(8),
            ...req.body
        });
        console.log(tenis)
        return res.redirect('/tenis');
    }

    async mostraAltera(req, res) {
        const { id } = req.params;
        const tenisFiltrado = tenis.filter(t => t.id == id);
        if (tenisFiltrado.length > 0) {
            return res.render('alterar', { tenis: tenisFiltrado[0], user: req.session.user });
        } else {
            return res.send('Tênis não encontrado');
        }
    }
    async alterar(req, res) {
        const { id } = req.params;
        const tenisIdx = tenis.findIndex(t => t.id == id);
        tenis.splice(tenisIdx, 1);
        tenis.push({
            id: id,
            ...req.body
        });
        return res.redirect('/tenis');
    };
    async carrinho(req, res) {
        //res.send('aqui vamos add no carrinho');
    };
}

module.exports = { TenisController }