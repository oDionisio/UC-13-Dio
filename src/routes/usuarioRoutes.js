const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para listar todos os usuários (GET)
router.get('/listarTodos', usuarioController.listarUsuarios);    

// Rota para criar um novo usuário (POST)
router.post('/novo', usuarioController.criarUsuario);

module.exports = router;
