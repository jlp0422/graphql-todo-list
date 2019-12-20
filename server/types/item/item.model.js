const conn = require('../../db/utils/conn');
const { Sequelize } = conn;

const Item = conn.define('item', {
  title: Sequelize.STRING,
  description: Sequelize.STRING
})

module.exports = Item
