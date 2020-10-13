

  
# Populacao api
Api que retorna a população dos estados brasileiros. Esse serviço se comunica com outro serviço chamado estados-api (api que retorna os estados brasileiros)
Tendo dois tipos de comunicação, por rest e por fila.

### Instalação
Estou usando o gerenciador de pacote yarn, caso utilize o npm, altere os comandos para os do npm.
```sh
$ git clone https://github.com/andersonribeirodemoraes/populacao-api.git
$ cd populacao-api
$ yarn
```
### Banco de Dados
Estou usando o [knex](http://knexjs.org/) para manipular o banco de dados sqlite3.

#### Migrations
Para criar a tabela de populacao.
Para rodar é utilizado o knex, mas criei uma configuração no package.json, para facilitar o uso.

#### Rodando as migrations
```sh
$ yarn knex:migrate //Roda as últimas migrations
$ yarn knex:migrate:rollback //Faz rollback nas migrations
```

#### Seeds
Preparei uma carga inicial de populacao.

#### Rodando os Seeds
```sh
$ yarn knex seed:run
```

#### Criando as filas
Para criar as filas, rode o comando abaixo: 
```sh
$ yarn rabbit:make
```
Será criado as filas:
processing.requests - o serviço estados-api vai publicar na fila a mensagem dos estados e o populacao-api vai consumir.
processing.results - o populacao-api vai publicar nessa fila a mensagem para o estados-api consumir.

#### Rodando o projeto
Comunicação por rest
```sh
$ yarn dev:server
```

Comunicação por fila
```sh
$ yarn dev:server-queue
```
