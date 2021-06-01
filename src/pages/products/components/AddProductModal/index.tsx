import { useMutation, useQuery } from '@apollo/client'
import { ModalConfirm } from '../../../../components'
import { ADD_PRODUCT, GET_ALL_PRODUCTS } from '../../../../queries'
import useProductForm from '../../hooks/useProductForm'
import ProductForm from '../ProductForm'

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

  const productFormConfig = {
    onChange: handleChangeProductForm,
    fields: {
      name: productForm.name,
      price: productForm.price,
    },
  }

  return (
    <ModalConfirm
      title="Añadir producto"
      onClose={onClose}
      confirmBtnConfig={modalConfirmButtonGroupConfig.confirmBtnConfig}
      cancelBtnConfig={modalConfirmButtonGroupConfig.cancelBtnConfig}
    >
      <ProductForm config={productFormConfig} />
    </ModalConfirm>
  )
}

export default AddProductModal
