import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ModalConfirm } from '../../../../../components'
import { useTypedSelector } from '../../../../../hooks/useTypedSelector'
import { editClient } from '../../../../../state/slices/clientsSlice'
import { ClientData } from '../../../../../types'
import useClientData from '../../../hooks/useClientData'

type EditClientModalProps = {
  clientId: string
  onClose: (modalType?: string) => void
}

const EditClientModal = ({
  clientId,
  onClose,
}: EditClientModalProps): JSX.Element => {
  const [initialInputData, setInitialInputData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })
  const {
    clientInputData,
    handlers: { handleInputData, handleSubmitInputData },
  } = useClientData({ onSubmit: handleAddClient, initialInputData })
  const dispatch = useDispatch()

  /**
   * Get selectedClient data & set it in the input
   */
  const clientsSelector = useTypedSelector(state => state.clients.data)
  const selectedClient = clientsSelector.find(
    (client: ClientData) => client.id === clientId
  )
  useEffect(() => {
    if (selectedClient) {
      setInitialInputData({
        firstName: selectedClient.firstName,
        lastName: selectedClient.lastName,
        email: selectedClient.email,
        password: selectedClient.password,
      })
    }
  }, [selectedClient])

  function handleAddClient(): void {
    dispatch(editClient({ clientId, clientDataToUpdate: clientInputData }))
  }

  const modalConfirmButtonGroupConfig = {
    confirmBtnConfig: {
      id: 'edit-client-modal-cancel',
      content: 'Cancelar',
      onClick: onClose,
    },
    cancelBtnConfig: {
      id: 'edit-client-modal-edit',
      content: 'Editar cliente',
      onClick: handleSubmitInputData,
    },
  }

  return (
    <ModalConfirm
      title="Editar cliente"
      onClose={onClose}
      confirmBtnConfig={modalConfirmButtonGroupConfig.confirmBtnConfig}
      cancelBtnConfig={modalConfirmButtonGroupConfig.cancelBtnConfig}
    >
      <form action="">
        <label htmlFor="firstName">
          Nombre
          <input
            id="firstName"
            name="firstName"
            type="text"
            maxLength={36}
            value={clientInputData.firstName}
            onChange={handleInputData}
          />
        </label>

        <label htmlFor="lastName">
          Apellidos
          <input
            id="lastName"
            name="lastName"
            type="text"
            maxLength={48}
            value={clientInputData.lastName}
            onChange={handleInputData}
          />
        </label>

        <label htmlFor="email">
          Correo electrónico
          <input
            id="email"
            name="email"
            type="email"
            maxLength={64}
            value={clientInputData.email}
            onChange={handleInputData}
          />
        </label>

        <label htmlFor="password">
          Contraseña
          <input
            id="password"
            name="password"
            type="text"
            value={clientInputData.password}
            onChange={handleInputData}
          />
        </label>
      </form>
    </ModalConfirm>
  )
}

export default EditClientModal
