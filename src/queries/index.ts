import { gql } from '@apollo/client'

/**
 * Queries
 */
export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    allProducts {
      id
      name
      price
      image
    }
  }
`

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      price
      image
    }
  }
`

/**
 * Mutations
 */
export const ADD_PRODUCT = gql`
  mutation AddProduct($name: String!, $price: String!) {
    addProduct(name: $name, price: $price) {
      id
      name
      price
      image
    }
  }
`

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: ID!) {
    removeProduct(id: $id) {
      id
      name
      price
      image
    }
  }
`

export const EDIT_PRODUCT = gql`
  mutation EditProduct($id: ID!, $name: String!, $price: String!) {
    editProduct(id: $id, name: $name, price: $price) {
      id
      name
      price
    }
  }
`
