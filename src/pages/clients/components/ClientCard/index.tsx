import { useState } from 'react'
import { useDispatch } from 'react-redux'
import ButtonGroup from '../../../../components/common/ButtonGroup'
import { ClientPublicData } from '../../../../types'
import { removeClient } from '../../../../state/slices/clientsSlice'

import { Portal, ModalConfirm } from '../../../../components'
import EditClientModal from '../EditClientModal'
import './styles.scss'

type ModalType = 'REMOVE_CLIENT' | 'EDIT_CLIENT'

const ClientCard = ({
  id,
  firstName,
  email,
  avatar,
}: ClientPublicData): JSX.Element => {
  const [handleShowClientModals, setHandleShowClientModals] = useState({
    REMOVE_CLIENT: false,
    EDIT_CLIENT: false,
  })
  const dispatch = useDispatch()

  const toggleClientModal = (modalType: ModalType): void => {
    setHandleShowClientModals(prevState => ({
      ...prevState,
      [modalType]: !prevState[modalType],
    }))
  }

  const handleRemoveClient = (): void => {
    dispatch(removeClient(id))
    toggleClientModal('REMOVE_CLIENT')
  }

  const buttonGroupDataSource = [
    {
      id: `${id}-edit`,
      children: 'Editar',
      onClick: () => toggleClientModal('EDIT_CLIENT'),
    },
    {
      id: `${id}-remove`,
      children: 'Eliminar',
      onClick: () => toggleClientModal('REMOVE_CLIENT'),
    },
  ]

  const modalConfirmButtonGroupConfig = {
    confirmBtnConfig: {
      id: `modal-cancel-remove-client-${id}`,
      content: 'Cancelar',
      onClick: () => toggleClientModal('REMOVE_CLIENT'),
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

      {handleShowClientModals.EDIT_CLIENT && (
        <Portal id="edit-client-modal">
          <EditClientModal
            clientId={id}
            onClose={() => toggleClientModal('EDIT_CLIENT')}
          />
        </Portal>
      )}

      {handleShowClientModals.REMOVE_CLIENT && (
        <Portal id="remove-client-modal">
          <ModalConfirm
            title="¿Eliminar cliente?"
            onClose={() => toggleClientModal('REMOVE_CLIENT')}
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
