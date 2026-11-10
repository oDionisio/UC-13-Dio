const fs = require('fs');
const path = require('path');
const arquivoProdutos = path.join(__dirname,'..','..', 'database', 'produtos.json');

const produtoModel = {
    //1. le todos os ptds do arquivo produtos.json
    bucarTodos: ()=> {
        if (!fs.readFileSync(arquivoProdutos, ' utf-8')) {
            return[];
        }
        const conteudo = fs.readFileSync(arquivoProdutos, 'utf-8');
        return conteudo ? JSON.parse(conteudo) : [];
        
    },
    //2. salva um novo prdt no arquivo produtos.json
    salva: (novoProduto) =>{
        const listaProdutos = produtoModel.bucarTodos();
        listaProdutos.push(novoProduto);
        fs.writeFileSync(arquivoProdutos, JSON.stringify(listaProdutos, null, 2), 'utf-8' );


    }
}
module.exports = produtoModel;