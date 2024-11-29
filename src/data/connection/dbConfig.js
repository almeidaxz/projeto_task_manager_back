require('dotenv').config();

// Configura a conexão do QueryBuilder Knex com o banco de dados utilizando a biblioteca PG.
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: false
  }
})

module.exports = knex;