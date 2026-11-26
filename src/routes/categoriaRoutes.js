const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/listarTodos', categoriaController.listar);
router.post('/novo', categoriaController.criar);
router.put('/atualizar/:id', categoriaController.atualizar);
router.delete('/excluir/:id', categoriaController.excluir);

module.exports = router;
