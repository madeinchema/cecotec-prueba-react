import { useQuery } from '@apollo/client'
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { GET_PRODUCT } from '../../../queries'
import { EditableProductData, Product } from '../../../types'
import {
  productFormReducer,
  initialProductFormState,
} from '../utils/productFormReducer'

/**
 * Types
 */
interface ProductForm {
  name: string
  price: string
}

interface UseProductDataProps {
  productId?: string
  onSubmit: () => void
}

interface UseProductData {
  productForm: EditableProductData
  handlers: {
    handleSetProductForm: (inputData: ProductForm) => void
    handleChangeProductForm: (event: ChangeEvent<HTMLInputElement>) => void
    handleSubmitProductForm: () => void
    handleResetProductForm: () => void
  }
}

/**
 * useProductData hook
 */
function useProductData({
  productId,
  onSubmit,
}: UseProductDataProps): UseProductData {
  const [productForm, setProductForm] = useReducer(
    productFormReducer,
    initialProductFormState
  )
  const [selectedProduct, setSelectedProduct] =
    useState<Product | undefined>(undefined)
  const { data } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
    skip: !productId,
  })

  /**
   * Pre-fill form if selected product
   */
  useEffect(() => {
    if (productId && data && !selectedProduct) {
      setSelectedProduct(data.product)
    }
  }, [data, productId, selectedProduct])

  /**
   * Handler callbacks
   */
  const handleSetProductForm = useCallback((inputData: ProductForm): void => {
    setProductForm({ type: 'form', payload: inputData })
  }, [])

  const handleChangeProductForm = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const { name, value } = event.target
      if (name === 'name' || name === 'price') {
        setProductForm({ type: name, payload: value })
      }
    },
    []
  )

  const handleResetProductForm = useCallback((): void => {
    setProductForm({ type: 'form', payload: initialProductFormState })
  }, [])

  const handleSubmitProductForm = useCallback((): void => {
    if (productForm.name.length === 0 || productForm.price.length === 0) {
      return
    }
    onSubmit()
    handleResetProductForm()
  }, [
    handleResetProductForm,
    onSubmit,
    productForm.name.length,
    productForm.price.length,
  ])

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
    return () => {
      handleResetProductForm()
    }
  }, [handleResetProductForm, handleSetProductForm, selectedProduct])

  /**
   * Handlers
   */
  const handlers = useMemo(
    () => ({
      handleSetProductForm,
      handleChangeProductForm,
      handleSubmitProductForm,
      handleResetProductForm,
    }),
    [
      handleChangeProductForm,
      handleResetProductForm,
      handleSetProductForm,
      handleSubmitProductForm,
    ]
  )

  return { productForm, handlers }
}

export default useProductData
