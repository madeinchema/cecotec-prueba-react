import { useQuery } from '@apollo/client'
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { GET_PRODUCT } from '../../../queries'
import { EditableProductData, Product } from '../../../types'

/**
 * Types
 */

interface InputProductData {
  name: string
  price: string
}

interface UseProductData {
  productForm: EditableProductData
  handlers: {
    handleSetProductForm: (inputData: InputProductData) => void
    handleChangeProductForm: (event: ChangeEvent<HTMLInputElement>) => void
    handleSubmitProductForm: () => void
    handleResetProductForm: () => void
  }
}

interface UseProductDataProps {
  productId?: string
  onSubmit: () => void
}

const initialFormState = {
  name: '',
  price: '',
}

/**
 * useProductData hook
 */
function useProductData({
  productId,
  onSubmit,
}: UseProductDataProps): UseProductData {
  const [productForm, setProductForm] =
    useState<EditableProductData>(initialFormState)
  const [selectedProduct, setSelectedProduct] =
    useState<Product | undefined>(undefined)
  const { data } = useQuery(GET_PRODUCT, { variables: { id: productId } })
  useEffect(() => {
    if (productId && data && !selectedProduct) {
      setSelectedProduct(data.product)
    }
  }, [data, productId, selectedProduct])

  /**
   * Handler callbacks
   */
  const handleSetProductForm = useCallback(
    (inputData: InputProductData): void => {
      setProductForm(inputData)
    },
    []
  )

  const handleResetProductForm = useCallback((): void => {
    setProductForm(initialFormState)
  }, [])

  /**
   * Get selectedProduct data & set it in the input
   */
  useEffect(() => {
    if (selectedProduct) {
      handleSetProductForm({
        name: selectedProduct.name,
        price: selectedProduct.price,
      })
    }
    return () => handleResetProductForm()
  }, [handleResetProductForm, handleSetProductForm, selectedProduct])

  /**
   * Handlers
   */
  const handlers = useMemo(
    () => ({
      handleSetProductForm,
      handleChangeProductForm(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target
        setProductForm(prevState => ({
          ...prevState,
          [name]: value,
        }))
      },
      handleSubmitProductForm(): void {
        if (productForm.name.length === 0 || productForm.price.length === 0) {
          return
        }
        onSubmit()
        handleResetProductForm()
      },
      handleResetProductForm,
    }),
    [
      handleResetProductForm,
      handleSetProductForm,
      onSubmit,
      productForm.name.length,
      productForm.price.length,
    ]
  )

  return { productForm, handlers }
}

export default useProductData
