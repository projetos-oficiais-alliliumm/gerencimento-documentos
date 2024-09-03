# Gerenciamento de Documentos

Envio e recebimento de documentos entre setores.


## Desenvolvimento 

- Frontend
  - Typescript
  - React JS
  - Node JS
- Backend
  - Javascript
  - Express
  - Prisma ORM
- Banco
  - PostegreSQL

## Requisitos para execução local
- Node JS > 17.0.0
- PostgreSQL

## Procedimentos para execução local

### Requisitos para execução local
- Node Js > 17.0.0
- PostgreSQL

### Instalação de dependência

A partir do diretório raiz ```/``` do projeto:

> ```npm run install:back``` => Instalar dependências do backend do projeto

> ```npm run install:front``` => Instalar dependências do frontend do projeto

A partir do diretório ```/backend```:

> ```npm install```

A partir do diretório ```/frontend```:

> ```npm install```

### Conexão com banco de dados

Criar servidor e o database no SGBD com esses atributos paro o arquivo de variáveis de ambiente ```.env```:

- hostname
- port
- user
- password

> Ao criar o banco, o schema de sua escolha deverá declará-lo em ```.env```.

### Declaração de variável de ambiente

1. Criar arquivo ```.env``` no diretório ```backend``` => ```backend/.env```
2. Incluir a variável abaixo de acordo com o servidor criado no SDBD
  > DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
  - USER => Usuário da Conexão
  - PASSWORD => Senha da Conexão
  - HOST => Hostname/Adress da Conexão
  - DATABASE => Nome do Banco
  - SCHEMA => Schema do Banco

### Configuração do Prisma

1. No diretório ```backend```, executar o prisma migrate para criação das tabelas a partir do schema do prisma
> ```npx prisma migrate dev --name init```

>Opcional: ```npx prisma generate``` para gerar o modo cliente do backend, o comando acima já faz automaticamente.

## Execução do projeto local

A partir do diretório raiz ```/``` do projeto:

> ```npm run start:back``` => Executar o backend do projeto

> ```npm run start:front``` => Executar o frontend do projeto

A partir do diretório ```/backend```:

> ```npm start```

A partir do diretório ```/frontend```:

> ```npm start```

> OBS: Certificar que a conexão com banco está ativa para completo funcionamento do sistema.










  

