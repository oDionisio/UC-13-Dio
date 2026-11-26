const categoriaModel = require('../models/categoriaModel');

const categoriaController = {
    criar: async (req, res) => {
        try {
            const { nome } = req.body;
            if (!nome) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'O campo nome é obrigatório!'
                });
            }

            const categoria = await categoriaModel.create({
                data: { nome: String(nome).toUpperCase() }
            });

            return res.status(201).json({
                sucesso: true,
                mensagem: 'Categoria criada com sucesso',
                categoria: categoria
            });
        } catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({
                    sucesso: false,
                    mensagem: 'Já existe uma categoria com este nome!'
                });
            }
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },
    listar: async (req, res) => {
        try {
            const categorias = await categoriaModel.findMany();
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Categorias listadas com sucesso',
                total: categorias.length,
                categorias: categorias
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
            const id = Number(req.params.id);
            const { nome } = req.body;

            if (Number.isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'O id informado deve ser numérico!'
                });
            }

            if (!nome) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'O campo nome é obrigatório!'
                });
            }

            const categoriaAtualizada = await categoriaModel.update({
                where: { id: id },
                data: { nome: String(nome).toUpperCase() }
            });

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Categoria atualizada com sucesso!',
                categoria: categoriaAtualizada
            });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Categoria não encontrada!'
                });
            }
            if (error.code === 'P2002') {
                return res.status(409).json({
                    sucesso: false,
                    mensagem: 'Já existe uma categoria com este nome!'
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
            const id = Number(req.params.id);

            if (Number.isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'O id informado deve ser numérico!'
                });
            }

            await categoriaModel.delete({
                where: { id: id }
            });

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Categoria excluída com sucesso!'
            });
        } catch (error) {
            if (error.code === 'P2025') {
                return res.status(404).json({
                    sucesso: false,
                    mensagem: 'Categoria não encontrada!'
                });
            }
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }
};

module.exports = categoriaController;
