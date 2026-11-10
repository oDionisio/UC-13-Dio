const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');

// Rota para produtos
router.use('/produtos', produtoRoutes);

//associação com a rota /usuarios

module.exports = router;
