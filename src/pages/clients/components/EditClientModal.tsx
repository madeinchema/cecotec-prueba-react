import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ModalConfirm } from '../../../components'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { editClient } from '../../../state/slices/clientsSlice'
import { ClientData } from '../../../types'

import useClientData from '../useClientData.hooks'
import ClientForm from './ClientForm'

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
    clientFormData: clientInputData,
    handlers: { handleInputData, handleSubmitInputData },
  } = useClientData({ onSubmit: handleEditClient, initialInputData })
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

  function handleEditClient(): void {
    dispatch(editClient({ clientId, clientDataToUpdate: clientInputData }))
    onClose()
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

  const editClientFormConfig = {
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
      title="Editar cliente"
      onClose={onClose}
      confirmBtnConfig={modalConfirmButtonGroupConfig.confirmBtnConfig}
      cancelBtnConfig={modalConfirmButtonGroupConfig.cancelBtnConfig}
    >
      <ClientForm config={editClientFormConfig} />
    </ModalConfirm>
  )
}

export default EditClientModal
