const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para listar todos os produtos (GET)
router.get('/listar', produtoController.listarProdutos);

// Rota para criar um novo produto (POST)
router.post('/new', produtoController.criarProduto);

module.exports = router;