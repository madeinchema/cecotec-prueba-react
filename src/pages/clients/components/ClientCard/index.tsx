import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ButtonGroup from '../../../../components/common/ButtonGroup'
import { ClientPublicData } from '../../../../types'
import { removeClient } from '../../../../state/slices/clientsSlice'
import './styles.scss'
import Portal from '../../../../components/layout/Portal'
import ModalConfirm from '../../../../components/common/ModalConfirm'

const ClientCard = ({
  id,
  firstName,
  email,
  avatar,
}: ClientPublicData): JSX.Element => {
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const dispatch = useDispatch()

  function toggleModal(): void {
    setShowAddClientModal(prevState => !prevState)
  }

  function handleRemoveClient(): void {
    dispatch(removeClient(id))
    toggleModal()
  }

  const buttonGroupDataSource = [
    {
      id: `${id}-edit`,
      children: 'Editar',
      onClick: () => console.log('editar cliente'),
    },
    {
      id: `${id}-remove`,
      children: 'Eliminar',
      onClick: () => toggleModal(),
    },
  ]

  const modalConfirmButtonGroupConfig = {
    confirmBtnConfig: {
      id: `modal-cancel-remove-client-${id}`,
      content: 'Cancelar',
      onClick: () => toggleModal(),
    },
    cancelBtnConfig: {
      id: `modal-confirm-remove-client-${id}`,
      content: 'Eliminar cliente',
      onClick: () => handleRemoveClient(),
    },
  }

  return (
    <div className="client-card">
      <div className="container">
        <img src={avatar} alt="client-avatar" className="avatar" />
        <div className="details">
          <p className="details--name">
            {firstName} <span className="details--id">#{id}</span>
          </p>
          <p className="details--email">{email}</p>
        </div>
      </div>
      <ButtonGroup dataSource={buttonGroupDataSource} />
      {showAddClientModal && (
        <Portal id="add-client-modal">
          <ModalConfirm
            title="¿Eliminar cliente?"
            onClose={toggleModal}
            confirmBtnConfig={modalConfirmButtonGroupConfig.confirmBtnConfig}
            cancelBtnConfig={modalConfirmButtonGroupConfig.cancelBtnConfig}
          >
            ¿Estás seguro? Esta acción no se puede deshacer.
          </ModalConfirm>
        </Portal>
      )}
    </div>
  )
}

export default ClientCard
