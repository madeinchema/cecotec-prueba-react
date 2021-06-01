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
    allProducts: [Product!]!
    product(id: ID!): Product!
  }

  # Mutations
  # TODO: add/edit should return added/edited product
  type Mutation {
    addProduct(name: String!, price: String!): Product!
    editProduct(id: ID!, name: String!, price: String!): [Product!]!
    removeProduct(id: ID!): [Product!]!
  }
`

module.exports = typeDefs
