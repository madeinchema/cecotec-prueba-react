import { useMutation } from '@apollo/client'
import { ModalConfirm } from '../../../components'
import { ADD_PRODUCT, GET_ALL_PRODUCTS } from '../../../queries'
import useProductForm from '../hooks/useProductForm'
import ProductForm from './ProductForm'

type AddProductModalProps = {
  onClose: () => void
}

const AddProductModal = ({ onClose }: AddProductModalProps): JSX.Element => {
  const {
    productForm,
    handlers: {
      handleChangeProductForm,
      handleSubmitProductForm,
      handleInputOnClick,
    },
  } = useProductForm({ onSubmit: handleAddProduct })
  const [addProduct] = useMutation(ADD_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }],
  })

  function handleAddProduct(): void {
    addProduct({
      variables: {
        name: productForm.name.value,
        price: productForm.price.value,
      },
    })
    onClose()
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

  const addProductFormConfig = {
    onChange: handleChangeProductForm,
    onClick: handleInputOnClick,
    fields: {
      name: {
        value: productForm.name.value,
        isValid: productForm.name.isValid,
      },
      price: {
        value: productForm.price.value,
        isValid: productForm.price.isValid,
      },
    },
  }

  return (
    <ModalConfirm
      title="Añadir producto"
      onClose={onClose}
      confirmBtnConfig={modalConfirmButtonGroupConfig.confirmBtnConfig}
      cancelBtnConfig={modalConfirmButtonGroupConfig.cancelBtnConfig}
    >
      <ProductForm config={addProductFormConfig} />
    </ModalConfirm>
  )
}

export default AddProductModal
