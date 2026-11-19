// 1. Carrega as variáveis de ambiente do arquivo .env (como a DATABASE_URL)
// para dentro do objeto global 'process.env' do Node.js.
require('dotenv').config();

// 2. Importa a classe principal 'PrismaClient' que foi gerada automaticamente
// pelo comando 'npx prisma generate' com base nas suas tabelas do schema.prisma.
const { PrismaClient } = require('../src/generated/prisma');

// 3. Importa o adaptador oficial (driver) exigido pelo Prisma 7 para traduzir
// os comandos JavaScript em queries SQL compatíveis com MySQL e MariaDB.
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

// 4. Cria a ponte de conexão (pool) passando o endereço, usuário, senha e nome
// do banco de dados configurados na variável DATABASE_URL do arquivo .env.
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);

// 5. Instancia o cliente do Prisma conectado a esse adaptador. É através desse
// objeto 'prisma' que teremos acesso às tabelas (ex: prisma.produto, prisma.usuario).
const prisma = new PrismaClient({ adapter });

// 6. Exporta essa única instância pronta (padrão Singleton) para que todas as
// Models da aplicação reaproveitem a mesma conexão sem sobrecarregar o MySQL.
module.exports = prisma;
