import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { EditableClientData } from '../../../types'

/**
 * Types
 */

interface UseClientData {
  clientInputData: EditableClientData
  handlers: {
    handleInputData: (event: ChangeEvent<HTMLInputElement>) => void
    handleSubmitInputData: () => void
  }
}

interface UseClientDataProps {
  onSubmit: () => void
  initialInputData?: EditableClientData
}

/**
 * useClientData hook
 */
function useClientData({
  onSubmit,
  initialInputData,
}: UseClientDataProps): UseClientData {
  const initialInputDataState = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }),
    []
  )
  const [clientInputData, setClientInputData] = useState<EditableClientData>(
    initialInputDataState
  )

  useEffect(() => {
    if (initialInputData) {
      setClientInputData(initialInputData)
    }
  }, [initialInputData])

  /**
   * Handlers
   */
  const handlers = useMemo(
    () => ({
      handleInputData(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target
        setClientInputData(prevState => ({
          ...prevState,
          [name]: value,
        }))
      },
      handleSubmitInputData(): void {
        if (
          clientInputData.firstName.length === 0 ||
          clientInputData.lastName.length === 0 ||
          clientInputData.email.length === 0 ||
          clientInputData.password.length === 0
        ) {
          return
        }
        onSubmit()
        setClientInputData(initialInputDataState)
      },
    }),
    [
      clientInputData.email.length,
      clientInputData.firstName.length,
      clientInputData.lastName.length,
      clientInputData.password.length,
      initialInputDataState,
      onSubmit,
    ]
  )

  return { clientInputData, handlers }
}

export default useClientData
