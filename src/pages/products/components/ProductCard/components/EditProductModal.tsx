import { useEffect, useState } from 'react'
import { ModalConfirm } from '../../../../../components'
import useProductData from '../../../hooks/useProductData'

type EditProductModalProps = {
  productId: string
  onClose: (modalType?: string) => void
}

const EditProductModal = ({
  productId,
  onClose,
}: EditProductModalProps): JSX.Element => {
  const [initialInputData, setInitialInputData] = useState({
    name: '',
    price: '',
  })
  const {
    productInputData,
    handlers: { handleInputData, handleSubmitInputData },
  } = useProductData({ onSubmit: handleAddClient, initialInputData })

  /**
   * Get selectedProduct data & set it in the input
   */
  // const clientsSelector = useTypedSelector(state => state.clients.data)
  // const selectedProduct = clientsSelector.find(
  //   (client: ClientData) => client.id === clientId
  // )
  useEffect(() => {
    // if (selectedProduct) {
    //   setInitialInputData({
    //     name: selectedProduct.name,
    //     price: selectedProduct.price,
    //   })
    // }
  }, [])

  function handleAddClient(): void {
    //
  }

  const modalConfirmButtonGroupConfig = {
    confirmBtnConfig: {
      id: 'edit-product-modal-cancel',
      content: 'Cancelar',
      onClick: onClose,
    },
    cancelBtnConfig: {
      id: 'edit-product-modal-edit',
      content: 'Editar producto',
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
            id="name"
            name="name"
            type="text"
            maxLength={36}
            value={productInputData.name}
            onChange={handleInputData}
          />
        </label>

        <label htmlFor="firstName">
          Precio
          <input
            id="price"
            name="price"
            type="text"
            maxLength={36}
            value={productInputData.price}
            onChange={handleInputData}
          />
        </label>
      </form>
    </ModalConfirm>
  )
}

export default EditProductModal
