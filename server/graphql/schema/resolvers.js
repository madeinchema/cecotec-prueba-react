const { v1: uuid } = require('uuid')
const { image } = require('faker')
const products = require('../products')

const resolvers = {
  Query: {
    allProducts() {
      return products
    },
    product: (parent, { id }, context, info) =>
      products.find(product => product.id === id),
  },

  Mutation: {
    addProduct(parent, args, context, info) {
      const newProduct = args
      newProduct.id = uuid()
      newProduct.image = image.fashion()
      products.push(newProduct)
      return newProduct
    },
    removeProduct(parent, { id }, context, info) {
      const productIndex = products.findIndex(product => product.id === id)
      if (productIndex !== -1) {
        products.splice(productIndex, 1)
      }
      return products
    },
    editProduct(parent, { id, name, price }, context, info) {
      const productIndex = products.findIndex(product => product.id === id)
      if (productIndex !== -1) {
        products[productIndex].name = name
        products[productIndex].price = price
      }
      return products
    },
  },
}

module.exports = resolvers
