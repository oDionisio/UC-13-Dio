const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');
const usuarioRoutes = require('./usuarioRoutes');

// Associa o prefixo /produtos ao arquivo produtoRoutes
router.use('/produtos', produtoRoutes);

// Associa o prefixo /usuarios ao arquivo usuarioRoutes
router.use('/usuarios', usuarioRoutes);
// const usuarioRoutes = require('./usuarioRoutes');
// router.use('/usuarios', usuarioRoutes);

module.exports = router;