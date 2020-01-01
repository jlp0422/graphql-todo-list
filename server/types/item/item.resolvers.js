const Item = require('./item.model')

const items = async () => {
  const items = await Item.findAll()
  return items
}

const item = async (parent, { id }) => {
  const item = await Item.findOne({ where: { id } })
  return item
}

const createItem = async (parent, { input }) => {
  const item = await Item.create({ ...input })
  return item
}

const removeItem = async (parent, { input }) => {
  const removedItems = await Item.destroy({ where: { id: input.id } })
  return Boolean(removedItems)
}

const itemResolvers = {
  Query: {
    items,
    item
  },
  Mutation: {
    createItem,
    removeItem
  }
}

module.exports = itemResolvers
