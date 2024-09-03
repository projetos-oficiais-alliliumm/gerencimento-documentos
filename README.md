# Gerenciamento de Documentos

Envio e recebimento de documentos entre setores.

## Requisitos para execução local
- Node Js > 17.0.0
- PostgreSQL

## Procedimentos para execução local

### Instalação de dependência

A partir do diretório raiz ```/``` do projeto:

```npm run install:back``` -> Instalar dependências do backend do projeto

```npm run install:front``` -> Instalar dependências do frontend do projeto

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

Ao criar o banco, tem-se por padrão o schema ```public```, se criar outro schema para este banco, o qual será escolhido para o projeto, deverá declará-lo em ```.env```.



  

