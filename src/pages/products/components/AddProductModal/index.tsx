import { useDispatch } from 'react-redux'
import { ModalConfirm } from '../../../../components'
import { addClient } from '../../../../state/slices/clientsSlice'
import useProductData from '../../hooks/useProductData'

type AddProductModalProps = {
  onClose: () => void
}

const AddProductModal = ({ onClose }: AddProductModalProps): JSX.Element => {
  const dispatch = useDispatch()
  const {
    productInputData,
    handlers: { handleInputData, handleSubmitInputData },
  } = useProductData({ onSubmit: handleAddClient })

  function handleAddClient(): void {
    // dispatch(addClient(productInputData))
  }

  const modalConfirmButtonGroupConfig = {
    confirmBtnConfig: {
      id: 'add-product-modal-cancel',
      content: 'Cancelar',
      onClick: onClose,
    },
    cancelBtnConfig: {
      id: 'add-product-modal-add',
      content: 'Añadir producto',
      onClick: handleSubmitInputData,
    },
  }

  return (
    <ModalConfirm
      title="Añadir producto"
      onClose={onClose}
      confirmBtnConfig={modalConfirmButtonGroupConfig.confirmBtnConfig}
      cancelBtnConfig={modalConfirmButtonGroupConfig.cancelBtnConfig}
    >
      <form action="">
        <label htmlFor="name">
          Nombre
          <input
            id="name"
            name="name"
            type="text"
            maxLength={36}
            value={productInputData.name}
            onChange={handleInputData}
          />
        </label>

        <label htmlFor="price">
          Apellidos
          <input
            id="price"
            name="price"
            type="text"
            maxLength={48}
            value={productInputData.price}
            onChange={handleInputData}
          />
        </label>
      </form>
    </ModalConfirm>
  )
}

export default AddProductModal
