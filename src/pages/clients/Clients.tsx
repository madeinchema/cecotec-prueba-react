import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Portal, AuthGuard } from '../../components'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getClients } from '../../state/slices/clientsSlice'
import { ClientPublicData } from '../../types'

import ClientCard from './components/ClientCard'
import AddClientModal from './components/AddClientModal'
import './clients.scss'

const Clients = (): JSX.Element => {
  const currentUserSelector = useTypedSelector(state => state.currentUser)
  const { data, loading, error } = useTypedSelector(state => state.clients)
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const isLoggedIn = currentUserSelector.data
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getClients())
  }, [dispatch])

  const toggleAddClientModal = (): void => {
    setShowAddClientModal(prevState => !prevState)
  }

  const handleAddClient = (): void => {
    toggleAddClientModal()
  }

  if (!isLoggedIn) return <AuthGuard isLoggedIn={isLoggedIn} redirectPath="/" />

  return (
    <div className="clients">
      <div className="clients--container">
        <div className="clients--header">
          <h1>Clientes</h1>
          <Button variant="primary" onClick={handleAddClient}>
            Añadir cliente
          </Button>
        </div>
        {loading && <div>Loading...</div>}
        {!loading && !error && data.length === 0 && (
          <div className="clients--empty">Empty</div>
        )}
        {!loading && data.length > 0 && (
          <div className="clients--grid">
            {data.map((clientData: ClientPublicData) => (
              <ClientCard
                key={`${clientData.id}-card`}
                id={clientData.id}
                firstName={clientData.firstName}
                lastName={clientData.lastName}
                email={clientData.email}
                avatar={clientData.avatar}
              />
            ))}
          </div>
        )}
        {showAddClientModal && (
          <Portal id="add-client-modal">
            <AddClientModal onClose={toggleAddClientModal} />
          </Portal>
        )}
      </div>
    </div>
  )
}

export default Clients
