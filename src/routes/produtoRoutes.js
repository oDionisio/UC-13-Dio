const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para listar todos os produtos (GET)
router.get('/listarTodos', produtoController.listarProdutos);

// Rota para criar um novo produto (POST)
router.post('/novo', produtoController.criarProduto);

router.put('/atualizar/:codigo', produtoController.atualizar);
router.delete('/excluir/:codigo', produtoController.excluir);

module.exports = router;
