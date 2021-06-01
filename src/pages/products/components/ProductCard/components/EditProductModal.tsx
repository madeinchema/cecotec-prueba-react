import { useMutation } from '@apollo/client'
import { ModalConfirm } from '../../../../../components'
import { GET_ALL_PRODUCTS, EDIT_PRODUCT } from '../../../../../queries'
import useProductForm from '../../../hooks/useProductForm'

type EditProductModalProps = {
  productId: string
  onClose: (modalType?: string) => void
}

const EditProductModal = ({
  productId,
  onClose,
}: EditProductModalProps): JSX.Element => {
  const [editProduct] = useMutation(EDIT_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }],
  })
  const {
    productForm,
    handlers: { handleChangeProductForm, handleSubmitProductForm },
  } = useProductForm({ productId, onSubmit: handleAddProduct })

  function handleAddProduct(): void {
    editProduct({
      variables: {
        id: productId,
        name: productForm.name,
        price: productForm.price,
      },
    })
    onClose()
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
      onClick: handleSubmitProductForm,
    },
  }

  return (
    <ModalConfirm
      title="Editar producto"
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
            value={productForm.name}
            onChange={handleChangeProductForm}
          />
        </label>

        <label htmlFor="firstName">
          Precio
          <input
            id="price"
            name="price"
            type="text"
            maxLength={36}
            value={productForm.price}
            onChange={handleChangeProductForm}
          />
        </label>
      </form>
    </ModalConfirm>
  )
}

export default EditProductModal
