# Gerenciamento de Documentos

Envio e recebimento de documentos entre setores.

## Frameworks 

## Requisitos para execução local
- Node Js > 17.0.0
- PostgreSQL

## Procedimentos para execução local

### Instalação de dependência

A partir do diretório raiz ```/``` do projeto:

```npm run install:back``` => Instalar dependências do backend do projeto

```npm run install:front``` => Instalar dependências do frontend do projeto

A partir do diretório ```/backend```:

```npm install```

A partir do diretório ```/frontend```:

```npm install```

### Conexão com banco de dados

Criar servidor no SGBD com esses atributos paro o arquivo de variáveis de ambiente ```.env```:

- hostname
- port
- user
- password

Criar Database 

> Ao criar o banco, tem-se por padrão o schema ```public```, se criar outro schema para este banco, o qual será escolhido para o projeto, deverá declará-lo em ```.env```.

Declaração de variável de ambiente

1. Criar arquivo ```.env``` no diretório ```backend``` => ```backend/.env```
2. Incluir a variável abaixo de acordo com o servidor criado no SDBD
  > - USER => Usuário da Conexão
  > - PASSWORD => Senha da Conexão
  > - HOST => Hostname/Adress da Conexão
  > - DATABASE => Nome do Banco
  > - SCHEMA => Schema do Banco
  >> DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"

### Configuração do Prisma










  

