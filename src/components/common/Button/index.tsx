import { ReactNode } from 'react'
import './styles.scss'

export type ButtonProps = {
  children: ReactNode
  className?: string
  variant?: 'default' | 'primary'
  onClick?: () => void
  type?: 'button' | 'submit'
}

const Button = ({
  children,
  className,
  variant = 'default',
  onClick,
  type = 'button',
}: ButtonProps): JSX.Element => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`button ${className || null} button__${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
