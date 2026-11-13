const usuarioController = {
    criarUsuario: (req, res) => {
        const { nome, email, senha } = req.body;
        
        // Validação simples dos campos obrigatórios
        if (!nome || !email || !senha) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        // Transforma e trata os dados do usuário
        const nomeMaisculo = String(nome).toUpperCase();
        const emailMinusculo = String(email).toLowerCase();
        const senhaCriptografada = String(senha);

        const novoUsuario = {
            nome: nomeMaisculo,
            email: emailMinusculo,
            senha: senhaCriptografada,
            criadoEm: new Date().toISOString()
        };

        // Chama a função para salvar o usuário no arquivo  
        const usuarioSalvo = usuarioModel.salvar(novoUsuario);

        // Retorna a resposta HTTP com o usuário criado (201)
        return res.status(201).json({
            sucesso: true,
            message: 'Usuário criado com sucesso',
            usuario: usuarioSalvo || novoUsuario 
        });
    },

    listarUsuarios: (req, res) => {
        const usuarios = usuarioModel.buscarTodos();
        return res.status(200).json({
            sucesso: true,
            message: 'Usuários listados com sucesso',
            total: usuarios.length,
            usuarios: usuarios
        });
    }
};

module.exports = usuarioController;