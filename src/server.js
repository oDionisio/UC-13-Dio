const express = require('express');
const app = express();
const cpfController = require('./cpf.controller.controller')
app.use(express.json());
const routes = require('./models/routes/produtoRoutes');
app.use('/produtos', routes); //usa as rotas da pasta routes/produtoRoutes.js


// rota ou endpoint
app.get('/', (req, res) => {
    return res.json({message:'API TI-325 rodando....'});
})

// request, response   
app.get('/ping', (req, res) => {
    return res.json({message:'ping pong'});
})

app.post('/usuario', (req, res) => {
    // const nome = req.body.nome;
    // const idade = req.body.idade;
    const { nome, idade } = req.body;

    // Transformações
    // 1. Converte o nome para MAIUSCULAS
    // 2. Calcula o ano aproximado de nascimento
    // 3. Adiciona um status personalizado
    const nomeFormatado = nome ? nome.toUpperCase() : 'NÃO INFORMADO';
    const anoNascimento = new Date().getFullYear() - idade;

    return res.json({
        mensagem: 'Dados recebidos e processados com sucesso',
        dadosOriginais: {nome, idade},
        dadosProcessados:{
            nomeFormatado,
            idade,
            anoNascimentoAproximado: anoNascimento,
            perfil: idade >= 18 ? 'Adulto' : 'Adolescente'
        }
    })
})


//rota post chamando a função do controller receberCpf
app.post('/cpf', cpfController.receberCPF);








const PORT = process.env.PORT;
app.listen(PORT, () => {
//  console.log('Servidor rodando... em http://localhost:3000')
    console.log(`Servidor rodando... em http://localhost:${PORT}`)
})

