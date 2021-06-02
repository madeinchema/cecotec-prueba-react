import { useQuery } from '@apollo/client'
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { GET_PRODUCT } from '../../queries'
import { Product } from '../../types'
import { moveCursorToEnd } from './productForm.functions'
import {
  productFormReducer,
  initialProductFormState,
  ProductFormReducerState,
} from './productForm.reducers'

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
    handleInputOnClick: (event: MouseEvent<HTMLInputElement>) => void
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
      const element = event.currentTarget
      moveCursorToEnd(element)

      if (element.name === 'name' || element.name === 'price') {
        setProductForm({ type: element.name, payload: element.value })
      }
    },
    []
  )

  const handleInputOnClick = useCallback(
    (event: MouseEvent<HTMLInputElement>): void => {
      const element = event.currentTarget
      moveCursorToEnd(element)
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
      handleInputOnClick,
    }),
    [
      handleChangeProductForm,
      handleResetProductForm,
      handleSetProductForm,
      handleSubmitProductForm,
      handleInputOnClick,
    ]
  )

  return { productForm, handlers }
}

export default useProductForm
