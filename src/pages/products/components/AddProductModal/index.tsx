import { useMutation, useQuery } from '@apollo/client'
import { ModalConfirm } from '../../../../components'
import { ADD_PRODUCT, GET_ALL_PRODUCTS } from '../../../../queries'
import useProductForm from '../../hooks/useProductForm'

type AddProductModalProps = {
  onClose: () => void
}

const AddProductModal = ({ onClose }: AddProductModalProps): JSX.Element => {
  const {
    productForm,
    handlers: { handleChangeProductForm, handleSubmitProductForm },
  } = useProductForm({ onSubmit: handleAddProduct })
  const [addProduct] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }],
  })

  function handleAddProduct(): void {
    addProduct({
      variables: {
        name: productForm.name,
        price: productForm.price,
      },
    })
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
      onClick: handleSubmitProductForm,
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
            value={productForm.name}
            onChange={handleChangeProductForm}
          />
        </label>

        <label htmlFor="price">
          Apellidos
          <input
            id="price"
            name="price"
            type="text"
            maxLength={48}
            value={productForm.price}
            onChange={handleChangeProductForm}
          />
        </label>
      </form>
    </ModalConfirm>
  )
}

export default AddProductModal
