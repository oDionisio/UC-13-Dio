const produtoModel = require('../models/produtoModel');

const produtoController = {
    criarProduto: async (req, res) => {
        try {
            const { codigo, nome, quantidade, preco } = req.body;
            //validação simples dos campos obrigatórios
            if (!codigo || !nome || !quantidade || !preco) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Todos os campos (codigo, nome, quantidade, preco) são obrigatórios!'
                });
            }

            //trasnformar e calcular os dados do produto
            const nomeMaisculo = String(nome).toUpperCase();
            const codigoNumerico = Number(codigo);
            const qtde = Number(quantidade);
            const valorPreco = Number(preco);

            if (Number.isNaN(codigoNumerico) || Number.isNaN(qtde) || Number.isNaN(valorPreco)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Os campos codigo, quantidade e preco devem ser numéricos!'
                });
            }

            const valorTotal = Number((qtde * valorPreco).toFixed(2));

            //Chama a função parsirtit o arquivo 
            const novoProduto = await produtoModel.create({
                data: {
                    codigo: codigoNumerico,
                    nome: nomeMaisculo,
                    quantidade: qtde,
                    preco: valorPreco,
                    total: valorTotal
                }
            });

            // Retorna a resposta HTTP com o produto criado(201) com o produto salvo
            return res.status(201).json({
                sucesso: true,
                mensagem: 'Produto criado com sucesso',
                produto: novoProduto
            });
        } catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({
                    sucesso: false,
                    mensagem: 'Já existe um produto cadastrado com este código!'
                });
            }
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },
    listarProdutos: async (req, res) => {
        try {
            const produtos = await produtoModel.findMany();
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Produtos listados com sucesso',
                total: produtos.length,
                produtos: produtos
            });
        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },
    atualizar: async (req, res) => {
        try {
            const { codigo } = req.params;
            const { nome, quantidade, preco } = req.body;

            const codigoNumerico = Number(codigo);
            if (Number.isNaN(codigoNumerico)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'O código informado deve ser numérico!'
                });
            }

            const produtoAtual = await produtoModel.findUnique({
                where: { codigo: codigoNumerico }
            });
            if (!produtoAtual) {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Produto não encontrado!'
                });
            }

            const qtdeFinal = quantidade !== undefined ? Number(quantidade) : produtoAtual.quantidade;
            const precoFinal = preco !== undefined ? Number(preco) : Number(produtoAtual.preco);

            if (Number.isNaN(qtdeFinal) || Number.isNaN(precoFinal)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Os campos quantidade e preco devem ser numéricos!'
                });
            }

            const totalFinal = Number((qtdeFinal * precoFinal).toFixed(2));

            const produtoAtualizado = await produtoModel.update({
                where: { codigo: codigoNumerico },
                data: {
                    nome: nome ? String(nome).toUpperCase() : produtoAtual.nome,
                    quantidade: qtdeFinal,
                    preco: precoFinal,
                    total: totalFinal
                }
            });

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Produto atualizado com sucesso!',
                produto: produtoAtualizado
            });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Produto não encontrado!'
                });
            }
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },
    excluir: async (req, res) => {
        try {
            const { codigo } = req.params;

            const codigoNumerico = Number(codigo);
            if (Number.isNaN(codigoNumerico)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'O código informado deve ser numérico!'
                });
            }

            await produtoModel.delete({
                where: { codigo: codigoNumerico }
            });

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Produto excluído com sucesso!'
            });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Produto não encontrado!'
                });
            }
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }
};

module.exports = produtoController;
