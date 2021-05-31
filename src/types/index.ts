/**
 * Clients
 */
export interface ClientPublicData {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar: string
}

export interface ClientSecureData {
  password: string
}

export type ClientData = ClientPublicData & ClientSecureData

export interface EditableClientData {
  firstName: string
  lastName: string
  email: string
  password: string
}

/**
 * Products
 */
export interface Product {
  id: string
  name: string
  price: string
  image: string
}

export interface EditableProductData {
  name: string
  price: string
}
