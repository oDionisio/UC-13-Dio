const prisma = require('../../database/prisma');

//1. le todos os produtos do arquivo produtos.json
//2. salva um novo produto no arquivo produtos.json
//3.busca todos os produtos
//4.adiciona o novo produto na lista
//5.salvar
// Expõe os métodos do Prisma (findMany, create, update, delete, etc.)
const ProdutoModel = prisma.produto;

module.exports = ProdutoModel;
