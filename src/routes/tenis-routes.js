const { Router } = require('express');

const { TenisController } = require('../controllers/tenis-controller');


const routes = Router();

const tenisController = new TenisController();

routes.get('/cadastrar', tenisController.mostraCadastro);

routes.get('/deletar/:id', tenisController.deletar);

routes.get('/alterar/:id', tenisController.mostraAltera);

routes.post('/alterar/:id', tenisController.alterar);

routes.get('/carrinho/:id', tenisController.carrinho);

routes.get('/', tenisController.listar);

routes.get('/:id', tenisController.detalhar);


routes.post('/', tenisController.pag)

module.exports = routes;