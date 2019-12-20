const Item = require('./item.model')

const items = () => {
  return Item.findAll()
}

const itemResolvers = {
  Query: {
    items
  }
}

module.exports = itemResolvers
