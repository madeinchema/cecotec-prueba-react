const { v1: uuid } = require('uuid')
const products = require('../products')

const resolvers = {
  Query: {
    getAllProducts() {
      return products
    },
  },

  Mutation: {
    createProduct(parent, args, context, info) {
      const newProduct = args
      newProduct.id = uuid()
      products.push(newProduct)
      return newProduct
    },
    removeLastProduct(parent, args, context, info) {
      products.pop()
      return products
    },
  },
}

module.exports = resolvers
