const faker = require('faker')
const conn = require('./conn')
const Item = require('../../types/item/item.model')

const createItem = () => {
  return Item.create({
    title: `${faker.hacker.verb()} ${faker.hacker.noun()}`,
    description: faker.hacker.phrase()
  })
}

const createItems = () => {
  return Promise.all([
    createItem(),
    createItem(),
    createItem(),
    createItem(),
    createItem()
  ]).catch(err => console.log(err))
}

const seed = () => {
  conn
    .sync({ force: true })
    .then(() => {
      console.log('Seeding now...')
      return createItems()
    })
    .then(() => console.log('Seed Complete!'))
    .then(() => {
      return conn.close()
    })
    .catch(err => console.log('*** Error Seeding Database ***', err))
}

seed()
