const produtoModel = require('../models/produtoModel');

const produtoController = {
    criarProduto: (req, res) => {
        const { codigo, nome, preco, qtde } = req.body;
        //validação simples dos campos obrigatórios
        if (!codigo || !nome || !preco || !qtde) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
          }
          
          //trasnformar e calcular os dados do produto
          const nomeMaisculo = String(nome).toUpperCase();
          const quantidade = Number(qtde);
          const valorTotal =  Number(preco) * quantidade;
          const valorPreco = Number(preco);

         const novoProduto = {
         codigo,
         nome: nomeMaisculo,
          preco: valorPreco,
          qtde: quantidade,
          total: valorTotal,
          criadoEm: new Date().toISOString()
         };
         //Chama a função parsirtit o arquivo 
         const produtoSalvo = produtoModel.salvar(novoProduto);

         // Retorna a resposta HTTP com o produto criado(201) com o produto salvo
         return res.status(201).json({
            sucesso: true,
            message: 'Produto criado com sucesso',
            produto: produtoSalvo });
        },
        listarProdutos: (req, res) => {
            const produtos = produtoModel.buscarTodos();
            return res.status(200).json({
                sucesso: true,
                message: 'Produtos listados com sucesso',
                total: produtos.length,
                produtos: produtos
            });
        }

    }
module.exports = produtoController;
