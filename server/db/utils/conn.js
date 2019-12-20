const Sequelize = require('sequelize');

const conn = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/graphql_todo_list',
  { logging: false }
)

module.exports = conn
