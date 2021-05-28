import { useState } from 'react'
import { Button } from '../../components'
import Portal from '../../components/layout/Portal'
import './clients.scss'
import AddClientModal from './components/AddClientModal'
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
  const [showAddClientModal, setShowAddClientModal] = useState(false)

  const toggleAddClientModal = (): void => {
    setShowAddClientModal(prevState => !prevState)
  }

  const handleAddClient = (): void => {
    toggleAddClientModal()
  }

  return (
    <div className="clients">
      <div className="clients--header">
        <h1>Clients</h1>
        <Button variant="primary" onClick={handleAddClient}>
          Añadir cliente
        </Button>
      </div>
      <div className="clients--grid">
        {clientsList.map((client: Client) => (
          <ClientCard
            key={`${client.id}-card`}
            id={client.id}
            name={client.name}
            email={client.email}
          />
        ))}
      </div>
      {showAddClientModal && (
        <Portal id="add-client-modal">
          <AddClientModal onClose={toggleAddClientModal} />
        </Portal>
      )}
    </div>
  )
}

export default Clients
