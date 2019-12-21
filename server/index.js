const { ApolloServer } = require('apollo-server')
const { loadTypeSchema } = require('./utils/loadSchema')
const itemResolvers = require('./types/item/item.resolvers')
const { config } = require('dotenv')
config()

const types = ['item']

const start = async () => {
  const rootSchema = `
    schema {
      query: Query
      mutation: Mutation
    }
  `
  const schemaTypes = await Promise.all(types.map(loadTypeSchema))

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: itemResolvers, //merge({}, item),
    // tracing: true,
    // introspection: true,
    // playground: true,
    async context({ req }) {
      // console.log(req)
      // const user = await authenticate(req)
      // return { user }
      return { token: '123' }
    }
  })

  const { url } = await server.listen({ port: 3000 })
  console.log(`GQL server ready at ${url}`)
}

start()

// const server = new ApolloServer({ typeDefs, resolvers })

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`)
// })
