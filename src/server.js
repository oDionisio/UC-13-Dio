require('dotenv').config();
const express = require('express');
const routes = require('./routes') // Importa automaticamente o routes/index.js
const app = express();

app.use(express.json());
// Carrega todas as rotas principais da API
app.use(routes);


const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`)
})