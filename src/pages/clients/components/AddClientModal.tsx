import { useDispatch } from 'react-redux'
import { ModalConfirm } from '../../../components'
import { addClient } from '../../../state/slices/clientsSlice'
import useClientData from '../useClientData.hooks'
import ClientForm from './ClientForm'

type AddClientModalProps = {
  onClose: () => void
}

const AddClientModal = ({ onClose }: AddClientModalProps): JSX.Element => {
  const dispatch = useDispatch()
  const {
    clientFormData: clientInputData,
    handlers: { handleInputData, handleSubmitInputData },
  } = useClientData({ onSubmit: handleAddClient })

  function handleAddClient(): void {
    dispatch(addClient(clientInputData))
    onClose()
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

  const addClientFormConfig = {
    onChange: handleInputData,
    fields: {
      firstName: clientInputData.firstName,
      lastName: clientInputData.lastName,
      email: clientInputData.email,
      password: clientInputData.password,
    },
  }

  return (
    <ModalConfirm
      title="Añadir cliente"
      onClose={onClose}
      confirmBtnConfig={modalConfirmButtonGroupConfig.confirmBtnConfig}
      cancelBtnConfig={modalConfirmButtonGroupConfig.cancelBtnConfig}
    >
      <ClientForm config={addClientFormConfig} />
    </ModalConfirm>
  )
}

export default AddClientModal
