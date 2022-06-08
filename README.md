# Setup do projeto
    1 - Ter o npm e o node.js nas mais novas versões;
    2 - Rodar npm install;
    3 - Ter o postgresql 11+ instalado;
    4 - Criar 2 bancos de dados, um para dev e outro para teste no postgres com os seguintes dados respectivamente:
        - Nome: wise-pay-dev e wise-pay-test;
        - Owner: postgres (com todos os grants);
    5 - Ajustar o .env do projeto com as credenciais do usuário do seu banco

# Rodando o projeto
    - Existem 1 comando básico para rodar o projeto: npm run dev
    - Para rodar os testes do projeto: npm run test

## Testes
A cobertura dos testes está localizada na pasta coverage, na raiz do projeto. Os testes foram estruturados para os usecases, repositories e para as rotas da api. Para os usecases, foi utilizado um InMemoryRepository, preparado para testes unitários de funcionalidades básicas da aplicação. O arquivo task.routes.test.ts contém os testes das rotas da API.
