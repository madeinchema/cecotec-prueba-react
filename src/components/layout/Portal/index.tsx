import { memo, ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  id: string
  children: ReactNode
}

const Portal = ({ id, children }: PortalProps): JSX.Element => {
  const el = useRef(
    document.getElementById(id) || document.createElement('div')
  )
  const [dynamic] = useState(!el.current.parentElement)
  useEffect(() => {
    if (dynamic) {
      el.current.id = id
      document.body.appendChild(el.current)
    }
    return () => {
      if (dynamic && el.current.parentElement) {
        el.current.parentElement.removeChild(el.current)
      }
    }
  }, [dynamic, id])
  return createPortal(children, el.current)
}

export default memo(Portal)
