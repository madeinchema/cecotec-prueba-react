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
import { Product } from '../../../types'
import {
  productFormReducer,
  initialProductFormState,
  ProductFormReducerState,
} from '../utils/productFormReducer'

/**
 * Types
 */
interface UseProductFormProps {
  productId?: string
  onSubmit: () => void
}

interface UseProductForm {
  productForm: ProductFormReducerState
  handlers: {
    handleSetProductForm: (inputData: ProductFormReducerState) => void
    handleChangeProductForm: (event: ChangeEvent<HTMLInputElement>) => void
    handleSubmitProductForm: () => void
    handleResetProductForm: () => void
  }
}

/**
 * useProductForm hook
 */
function useProductForm({
  productId,
  onSubmit,
}: UseProductFormProps): UseProductForm {
  const [productForm, setProductForm] = useReducer(
    productFormReducer,
    initialProductFormState
  )
  const [selectedProduct, setSelectedProduct] =
    useState<Product | undefined>(undefined)
  const { data: productQueryData } = useQuery(GET_PRODUCT, {
    variables: { id: productId },
    skip: !productId,
  })

  /**
   * Pre-fill form if selected product
   */
  useEffect(() => {
    if (productId && productQueryData && !selectedProduct) {
      setSelectedProduct(productQueryData.product)
    }
  }, [productQueryData, productId, selectedProduct])

  /**
   * Handler callbacks
   */
  const handleSetProductForm = useCallback(
    (inputData: ProductFormReducerState): void => {
      setProductForm({ type: 'form', payload: inputData })
    },
    []
  )

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
    if (
      productForm.name.value.length === 0 ||
      productForm.price.value.length === 0
    ) {
      return
    }
    onSubmit()
    handleResetProductForm()
  }, [
    handleResetProductForm,
    onSubmit,
    productForm.name.value.length,
    productForm.price.value.length,
  ])

  /**
   * Get selectedProduct data & set it in the input
   */
  useEffect(() => {
    if (selectedProduct) {
      handleSetProductForm({
        name: {
          value: selectedProduct.name,
        },
        price: {
          value: selectedProduct.price,
        },
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

export default useProductForm
