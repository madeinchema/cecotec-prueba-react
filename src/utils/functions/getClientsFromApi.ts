import { ClientData } from '../../types'

export const getClientsFromApi = (): Promise<ClientData[]> => {
  return fetch(`${process.env.REACT_APP_SERVER_URL}/clients`).then(res =>
    res.json()
  )
}
