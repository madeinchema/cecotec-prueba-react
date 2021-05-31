import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { EditableProductData } from '../../../types'

/**
 * Types
 */

interface UseProductData {
  productInputData: EditableProductData
  handlers: {
    handleInputData: (event: ChangeEvent<HTMLInputElement>) => void
    handleSubmitInputData: () => void
  }
}

interface UseProductDataProps {
  onSubmit: () => void
  initialInputData?: EditableProductData
}

/**
 * useProductData hook
 */
function useProductData({
  onSubmit,
  initialInputData,
}: UseProductDataProps): UseProductData {
  const initialInputDataState = useMemo(
    () => ({
      name: '',
      price: '',
    }),
    []
  )
  const [productInputData, setProductInputData] = useState<EditableProductData>(
    initialInputDataState
  )

  useEffect(() => {
    if (initialInputData) {
      setProductInputData(initialInputData)
    }
  }, [initialInputData])

  /**
   * Handlers
   */
  const handlers = useMemo(
    () => ({
      handleInputData(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target
        setProductInputData(prevState => ({
          ...prevState,
          [name]: value,
        }))
      },
      handleSubmitInputData(): void {
        if (
          productInputData.name.length === 0 ||
          productInputData.price.length === 0
        ) {
          return
        }
        onSubmit()
        setProductInputData(initialInputDataState)
      },
    }),
    [
      productInputData.name.length,
      productInputData.price.length,
      initialInputDataState,
      onSubmit,
    ]
  )

  return { productInputData, handlers }
}

export default useProductData
