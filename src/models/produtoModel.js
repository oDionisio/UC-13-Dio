const fs = require('fs');
const path = require('path');
const arquivoProdutos = path.join(__dirname, '..', '..', 'database', 'produtos.json');
 
const produtoModel = {
    //1. le todos os produtos do arquivo produtos.json
    buscarTodos: () => {
        if (!fs.existsSync(arquivoProdutos)) {
            return [];
        }
 
        const conteudo = fs.readFileSync(arquivoProdutos, 'utf-8');
        return conteudo ? JSON.parse(conteudo) : [];
    },
    //2. salva um novo produto no arquivo produtos.json
    salvar: (novoProduto) => {
        //3.busca todos os produtos
        const listaProdutos = produtoModel.buscarTodos();
        //4.adiciona o novo produto na lista
        listaProdutos.push(novoProduto);
        //5.salvar
        fs.writeFileSync(arquivoProdutos, JSON.stringify(listaProdutos, null, 2), 'utf-8');
        return novoProduto;
    },
    buscarPorCodigo: (codigo) => {
    const listaProdutos = produtoModel.buscarTodos();
    return listaProdutos.find(produto => String(produto.codigo) === String(codigo));
},
}
module.exports = produtoModel;