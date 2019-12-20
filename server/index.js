const { ApolloServer } = require('apollo-server')
const { loadTypeSchema } = require('./utils/loadSchema')
const itemResolvers = require('./types/item/item.resolvers')

const types = ['item']

const start = async () => {
  const rootSchema = `
    schema {
      query: Query
    }
  `
  const schemaTypes = await Promise.all(types.map(loadTypeSchema))

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: itemResolvers //merge({}, item),
    // async context({ req }) {
    //   const user = await authenticate(req)
    //   return { user }
    // }
  })

  const { url } = await server.listen({ port: 3000 })
  console.log(`GQL server ready at ${url}`)
}

start()

// const server = new ApolloServer({ typeDefs, resolvers })

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`)
// })
