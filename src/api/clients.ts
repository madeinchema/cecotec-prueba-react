import { ClientData } from '../types'

export const getClientsFromApi = (): Promise<ClientData[]> => {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/clients`).then(res =>
    res.json()
  )
}

export const addClientToApi = (
  clientData: ClientData
): Promise<ClientData[]> => {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/clients`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientData),
  }).then(res => res.json())
}

export const removeClientFromApi = (
  clientId: string
): Promise<{ [K in string]: never }> => {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/clients/${clientId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())
}
