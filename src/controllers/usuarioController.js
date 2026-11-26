const usuarioModel = require('../models/usuarioModel');

const usuarioController = {
    criarUsuario: async (req, res) => {
        try {
            const { nome, email, senha } = req.body;

            // Validação simples dos campos obrigatórios
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Todos os campos (nome, email, senha) são obrigatórios!'
                });
            }

            // Transforma e trata os dados do usuário
            const nomeMaisculo = String(nome).toUpperCase();
            const emailMinusculo = String(email).toLowerCase();
            const senhaCriptografada = String(senha);

            const novoUsuario = await usuarioModel.create({
                data: {
                    nome: nomeMaisculo,
                    email: emailMinusculo,
                    senha: senhaCriptografada
                }
            });

            // Retorna a resposta HTTP com o usuário criado (201)
            return res.status(201).json({
                sucesso: true,
                mensagem: 'Usuário criado com sucesso',
                usuario: novoUsuario
            });
        } catch (error) {
            if (error.code === 'P2002') {
                return res.status(409).json({
                    sucesso: false,
                    mensagem: 'Já existe um usuário cadastrado com este e-mail!'
                });
            }
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    },

    listarUsuarios: async (req, res) => {
        try {
            const usuarios = await usuarioModel.findMany();
            return res.status(200).json({
                sucesso: true,
                mensagem: 'Usuários listados com sucesso',
                total: usuarios.length,
                usuarios: usuarios
            });
        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: error.message
            });
        }
    }
};

module.exports = usuarioController;
