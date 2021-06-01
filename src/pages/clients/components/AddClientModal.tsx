import { useDispatch } from 'react-redux'
import { ModalConfirm } from '../../../components'
import { addClient } from '../../../state/slices/clientsSlice'
import useClientData from '../hooks/useClientData'

type AddClientModalProps = {
  onClose: () => void
}

const AddClientModal = ({ onClose }: AddClientModalProps): JSX.Element => {
  const dispatch = useDispatch()
  const {
    clientInputData,
    handlers: { handleInputData, handleSubmitInputData },
  } = useClientData({ onSubmit: handleAddClient })

  function handleAddClient(): void {
    dispatch(addClient(clientInputData))
  }

  const modalConfirmButtonGroupConfig = {
    confirmBtnConfig: {
      id: 'add-client-modal-cancel',
      content: 'Cancelar',
      onClick: onClose,
    },
    cancelBtnConfig: {
      id: 'add-client-modal-add',
      content: 'Añadir cliente',
      onClick: handleSubmitInputData,
    },
  }

  return (
    <ModalConfirm
      title="Añadir cliente"
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

export default AddClientModal
