import { ReactNode } from 'react'
import ButtonGroup from '../ButtonGroup'
import './styles.scss'

interface CardProps {
  children: ReactNode
  className?: string
  buttonGroupDataSource: {
    id: string
    children: string
    onClick: () => void
  }[]
}

const Card = ({
  children,
  className,
  buttonGroupDataSource,
}: CardProps): JSX.Element => {
  const propsClassName = className ? `${className}-card` : null

  return (
    <div className={`${propsClassName} card`}>
      <div className={`${propsClassName} card--container`}>{children}</div>
      <ButtonGroup dataSource={buttonGroupDataSource} />
    </div>
  )
}

export default Card
