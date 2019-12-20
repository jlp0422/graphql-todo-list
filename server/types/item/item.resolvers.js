const Item = require('./item.model')

const items = () => {
  return Item.findAll()
}

const item = (parent, { id }) => {
  return Item.findOne({ where: { id } })
}

const createItem = (parent, { input }) => {
  return Item.create({ ...input })
}

const itemResolvers = {
  Query: {
    items,
    item
  },
  Mutation: {
    createItem
  }
}

module.exports = itemResolvers
