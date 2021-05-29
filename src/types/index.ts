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
