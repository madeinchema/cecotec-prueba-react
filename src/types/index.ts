export interface ClientPublicData {
  id: string
  name: string
  email: string
  avatar: string
}

export interface ClientSecureData {
  password: string
}

export type ClientData = ClientPublicData & ClientSecureData
