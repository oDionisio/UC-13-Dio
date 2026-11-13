const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');


// Associa o prefixo /produtos ao arquivo produtoRoutes
router.use('/produtos', produtoRoutes);

// Comentado temporariamente para não dar erro de arquivo faltando
// const usuarioRoutes = require('./usuarioRoutes');
// router.use('/usuarios', usuarioRoutes);

module.exports = router;