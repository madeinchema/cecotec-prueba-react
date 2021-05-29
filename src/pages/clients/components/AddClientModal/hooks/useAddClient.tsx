import { ChangeEvent, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addClient } from '../../../../../state/slices/clientsSlice'

/**
 * Types
 */
export interface AddClientInputData {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface UseAddClient {
  addClientInputData: AddClientInputData
  handlers: {
    handleInputData: (event: ChangeEvent<HTMLInputElement>) => void
    handleSubmitInputData: () => void
  }
}

/**
 * useAddClient hook
 */
function useAddClient(): UseAddClient {
  const initialInputDataState = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }),
    []
  )
  const [addClientInputData, setAddClientInputData] =
    useState<AddClientInputData>(initialInputDataState)
  const dispatch = useDispatch()

  /**
   * Handlers
   */
  const handlers = useMemo(
    () => ({
      handleInputData(event: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = event.target
        setAddClientInputData(prevState => ({
          ...prevState,
          [name]: value,
        }))
      },
      handleSubmitInputData(): void {
        if (
          addClientInputData.firstName.length === 0 ||
          addClientInputData.lastName.length === 0 ||
          addClientInputData.email.length === 0 ||
          addClientInputData.password.length === 0
        ) {
          return
        }
        dispatch(addClient(addClientInputData))
        setAddClientInputData(initialInputDataState)
      },
    }),
    [dispatch, initialInputDataState, addClientInputData]
  )

  return { addClientInputData, handlers }
}

export default useAddClient
