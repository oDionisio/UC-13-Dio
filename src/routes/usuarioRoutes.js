const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para listar todos os usuários (GET)
router.get('/listar', usuarioController.listarUsuarios);    

// Rota para criar um novo usuário (POST)
router.post('/new', usuarioController.criarUsuario);

module.exports = router;