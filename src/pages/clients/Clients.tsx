import './clients.scss'
import ClientCard from './components/ClientCard'

export interface Client {
  id: number
  name: string
  email: string
}

const clientsList = [
  { id: 1, name: 'John Doe', email: 'example@gmail.com' },
  { id: 2, name: 'Jane Doe', email: 'testing@gmail.com' },
  { id: 3, name: 'Jenni Doe', email: 'jenni@gmail.com' },
  { id: 4, name: 'Clark Doe', email: 'clark@gmail.com' },
]

const Clients = (): JSX.Element => {
  return (
    <div className="clients">
      <h1>Clients</h1>
      <div className="clients--grid">
        {clientsList.map((client: Client) => (
          <ClientCard
            key={client.id}
            id={client.id}
            name={client.name}
            email={client.email}
          />
        ))}
      </div>
    </div>
  )
}

export default Clients
