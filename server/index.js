const { ApolloServer } = require('apollo-server')
const { loadTypeSchema } = require('./utils/loadSchema')
const itemResolvers = require('./types/item/item.resolvers')
const { config } = require('dotenv')
// const Bundler = require('parcel-bundler')
// const express = require('express')
config()

const types = ['item']

// const file = 'src/public/index.html'
// const options = {}
// const bundler = new Bundler(file, options)

// const app = express()
// app.use(bundler.middleware())

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
    resolvers: itemResolvers //merge({}, item),
    // tracing: true,
    // introspection: true,
    // playground: true,
    // async context({ req }) {
    //   // console.log(req)
    //   // const user = await authenticate(req)
    //   // return { user }
    //   return { token: '123' }
    // }
  })

  // server.applyMiddleware({ app })

  // app.listen({ port: 3000 }, () => {
  //   console.log(`GQL server ready at ${server.graphqlPath}`)
  // })

  const { url } = await server.listen({ port: process.env.PORT })
  if (process.env.NODE_ENV === 'development') {
    console.log(`GQL server ready at ${url}`)
  }
}

start()

// const server = new ApolloServer({ typeDefs, resolvers })

// server.listen().then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`)
// })
