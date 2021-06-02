import { useMutation } from '@apollo/client'
import { useMemo } from 'react'
import { ModalConfirm } from '../../../components'
import { GET_ALL_PRODUCTS, EDIT_PRODUCT } from '../../../queries'
import useProductForm from '../useProductForm.hooks'
import ProductForm from './ProductForm'

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
    handlers: {
      handleChangeProductForm,
      handleSubmitProductForm,
      handleInputOnClick,
    },
  } = useProductForm({ productId, onSubmit: handleAddProduct })

  function handleAddProduct(): void {
    editProduct({
      variables: {
        id: productId,
        name: productForm.name.value,
        price: productForm.price.value,
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

  const editProductFormConfig = useMemo(
    () => ({
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
    }),
    [
      handleChangeProductForm,
      handleInputOnClick,
      productForm.name.isValid,
      productForm.name.value,
      productForm.price.isValid,
      productForm.price.value,
    ]
  )

  return (
    <ModalConfirm
      title="Editar producto"
      onClose={onClose}
      confirmBtnConfig={modalConfirmButtonGroupConfig.confirmBtnConfig}
      cancelBtnConfig={modalConfirmButtonGroupConfig.cancelBtnConfig}
    >
      <ProductForm config={editProductFormConfig} />
    </ModalConfirm>
  )
}

export default EditProductModal
