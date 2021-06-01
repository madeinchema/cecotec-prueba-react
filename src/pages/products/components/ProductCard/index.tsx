import { useState } from 'react'
import { useMutation } from '@apollo/client'
import ButtonGroup from '../../../../components/common/ButtonGroup'
import { Product } from '../../../../types'

import { Portal, ModalConfirm, Card } from '../../../../components'
import EditProductModal from '../EditProductModal'
import './styles.scss'
import { GET_ALL_PRODUCTS, REMOVE_PRODUCT } from '../../../../queries'

type ModalType = 'REMOVE_PRODUCT' | 'EDIT_PRODUCT'

const ProductCard = ({ id, name, price, image }: Product): JSX.Element => {
  const [handleShowProductModals, setHandleShowProductModals] = useState({
    REMOVE_PRODUCT: false,
    EDIT_PRODUCT: false,
  })
  const [removeProduct] = useMutation(REMOVE_PRODUCT, {
    refetchQueries: [{ query: GET_ALL_PRODUCTS }],
  })

  const toggleProductModal = (modalType: ModalType): void => {
    setHandleShowProductModals(prevState => ({
      ...prevState,
      [modalType]: !prevState[modalType],
    }))
  }

  const handleRemoveProduct = (): void => {
    removeProduct({ variables: { id } })
    toggleProductModal('REMOVE_PRODUCT')
  }

  const buttonGroupDataSource = [
    {
      id: `${id}-edit`,
      children: 'Editar',
      onClick: () => toggleProductModal('EDIT_PRODUCT'),
    },
    {
      id: `${id}-remove`,
      children: 'Eliminar',
      onClick: () => toggleProductModal('REMOVE_PRODUCT'),
    },
  ]

  const modalConfirmButtonGroupConfig = {
    confirmBtnConfig: {
      id: `modal-cancel-remove-product-${id}`,
      content: 'Cancelar',
      onClick: () => toggleProductModal('REMOVE_PRODUCT'),
    },
    cancelBtnConfig: {
      id: `modal-confirm-remove-product-${id}`,
      content: 'Eliminar producto',
      onClick: () => handleRemoveProduct(),
    },
  }

  return (
    <>
      <Card className="product" buttonGroupDataSource={buttonGroupDataSource}>
        <>
          <img src={image} alt="product" />
          <div className="product-card--details">
            <p className="product-card--details--name">{name}</p>
            <p className="product-card--details--price">{price}€</p>
          </div>
        </>
      </Card>

      {handleShowProductModals.EDIT_PRODUCT && (
        <Portal id="edit-product-modal">
          <EditProductModal
            productId={id}
            onClose={() => toggleProductModal('EDIT_PRODUCT')}
          />
        </Portal>
      )}

      {handleShowProductModals.REMOVE_PRODUCT && (
        <Portal id="remove-product-modal">
          <ModalConfirm
            title="¿Eliminar producto?"
            onClose={() => toggleProductModal('REMOVE_PRODUCT')}
            confirmBtnConfig={modalConfirmButtonGroupConfig.confirmBtnConfig}
            cancelBtnConfig={modalConfirmButtonGroupConfig.cancelBtnConfig}
          >
            ¿Estás seguro? Esta acción no se puede deshacer.
          </ModalConfirm>
        </Portal>
      )}
    </>
  )
}

export default ProductCard
