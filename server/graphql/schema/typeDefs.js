const { gql } = require('apollo-server-core')

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: String!
    image: String
  }

  # Queries
  type Query {
    getAllProducts: [Product!]!
  }

  # Mutations
  type Mutation {
    createProduct(name: String!, price: String!): Product!
    removeLastProduct: [Product!]!
  }
`

module.exports = typeDefs
