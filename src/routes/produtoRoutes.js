const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para listar todos os produtos(ROTA POST)
//Produto/Novo
router.post('/new', produtoController.criarProduto);

module.exports = router;