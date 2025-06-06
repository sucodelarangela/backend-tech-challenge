# Backend Tech Challenge

Este projeto é um Backend que fornece uma API e disponibiliza os dados para [Backend For Frontend (BFF)](https://github.com/sucodelarangela/bff-tech-challenge) para o Tech Challenge da FIAP.

O [código original desta API](https://github.com/israelmeinert/tech-challenge-2) foi desenvolvido e fornecida pelo Instrutor Israel Meinert. No entanto, modificações foram necessárias para atender às demandas do Tech Challenge (adicionadas update e delete de transações).

> **NOTA:**
>
> _Esta aplicação está hosteada no free tier da plataforma [**Render**](https://render.com/), que pode hibernar o servidor por tempo de inatividade. Nesse caso, pode ocorrer da API devolver um erro com [**Status 504**](https://http.dog/504) nos primeiros acessos._
>
> _Caso isto ocorra, **tente novamente em alguns segundos** enquanto o servidor "acorda"._

## Estrutura do Projeto

```
backend-tech-challenge/
├── src/
│   ├── controller/       - Controladores da API
│   ├── feature/          - Serviços para consumo da API
│   ├── infra/            - Configs e conexões do MongoDB
│   ├── models/           - Definições de modelos da aplicação
│   ├── index.js          - Ponto de entrada da aplicação
│   ├── publicRoutes.js   - Rotas públicas da API
│   ├── routes.js         - Rotas protegidas da API
│   └── swagger.js        - Configuração do Swagger
├── .gitignore            - Arquivos ignorados pelo Git
├── Dockerfile            - Instruçoes de imagens Docker
├── package.json          - Dependências e scripts
├── README.md             - Documentação do projeto
└── collection.json       - JSON para importação no Postman
```

## Requisitos

- Node.js >= 16.x
- npm ou yarn

## Documentação da API

### Docker

- `docker build -t backend-tech-challenge .` - Construir a imagem
- `docker run -p 3000:3000 backend-tech-challenge` - Executar o container

### Sem Docker

Rodando localmente a API:

```bash
npm i # ou yarn
npm run dev # ou yarn dev
```

### Swagger

- No browser: `{{base_url}}/docs` - Abre a documentação no Swagger

Para rotas que necessitam autenticação, cole o token na modal que aparecerá ao clicar no ícone de Cadeado.

### Importando collection no postman

Este projeto possui o arquivo _tech-challenge.postman_collection_ que é uma collection do Postman. Com o Postman instalado, você pode importar este arquivo e ter acesso a todos os requests desse projeto.

### Endpoints

#### Contas

- `GET /account` - Busca contas

#### Transações

- `POST /account/transaction` - Cria uma nova transação
- `PUT /account/transaction/update/:transactionId` - Atualiza uma transação
- `DELETE /account/transaction/delete` - Exclui uma transação

#### Extratos

- `GET /account/:accountId/statement` - Busca o extrato da conta

#### Users

- `GET /user` - Busca usuários
- `POST /user` - Cria um novo usuário
- `POST /user/auth` - Autentica um usuário

## Equipe

| <img width="120" src="https://avatars.githubusercontent.com/u/86853033?v=4"> | <img width="120" src="https://avatars.githubusercontent.com/u/167245532?v=4"> | <img width="120" src="https://avatars.githubusercontent.com/u/12201855?v=4"> |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| [Angela Caldas](https://github.com/sucodelarangela)                          | [Guilherme Afonso](https://github.com/guilhermeafonsogauge)                   | [Paula Macedo](https://github.com/paulamacedof)                              |
