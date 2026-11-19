// 1. Carrega as variáveis de ambiente do arquivo .env (como a DATABASE_URL)
// para que o terminal (CLI do Prisma) consiga ler os dados de acesso ao MySQL.
require('dotenv').config();

// 2. Importa duas ferramentas internas do pacote Prisma:
// - defineConfig: função que valida e estrutura as configurações do Prisma 7.
// - env: função auxiliar que lê variáveis do .env e avisa caso alguma esteja faltando.
const { defineConfig, env } = require('prisma/config');

// 3. Exporta o objeto de configuração que será lido pelos comandos de terminal
// (como 'npx prisma migrate dev', 'npx prisma generate' e 'npx prisma studio').
module.exports = defineConfig({
  // 4. Indica onde está o arquivo (ou pasta) com o desenho das suas tabelas.
  schema: 'prisma/schema.prisma',

  // 5. Define a pasta onde o Prisma vai salvar o histórico de alterações SQL
  // do banco de dados toda vez que você rodar uma migration.
  migrations: {
    path: 'prisma/migrations',
  },

  // 6. Configura a fonte de dados para os comandos de terminal, apontando a URL
  // de conexão do MySQL armazenada na variável DATABASE_URL do seu arquivo .env.
  datasource: {
    url: env('DATABASE_URL'),
  },
});
