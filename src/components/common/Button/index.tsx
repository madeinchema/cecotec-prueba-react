import { ReactNode } from 'react'
import './styles.scss'

export type ButtonProps = {
  children: ReactNode
  className?: string
  variant?: 'default' | 'primary'
  onClick?: () => void
}

const Button = ({
  children,
  className,
  variant = 'default',
  onClick,
}: ButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={`button ${className || null} button__${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
