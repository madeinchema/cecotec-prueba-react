import { RootStateOrAny, TypedUseSelectorHook, useSelector } from 'react-redux'

export const useTypedSelector: TypedUseSelectorHook<RootStateOrAny> =
  useSelector
