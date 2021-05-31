const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema/typeDefs')
const resolvers = require('./schema/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(() => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port 4000
    📭  Query at https://studio.apollographql.com/dev
`)
})
