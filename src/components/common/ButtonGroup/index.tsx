import { Fragment } from 'react'
import Button, { ButtonProps } from '../Button'
import './styles.scss'

export type ButtonGroupDataSource = ButtonProps & {
  id: string
  onClick: () => void
}

type ButtonGroupProps = {
  dataSource: ButtonGroupDataSource[]
}

const ButtonGroup = ({ dataSource }: ButtonGroupProps): JSX.Element => {
  return (
    <div className="button-group">
      {dataSource.map((button, index) => {
        return (
          <Fragment key={button.id}>
            <Button
              onClick={button.onClick}
              variant={button.variant}
              className={button.className}
            >
              {button.children}
            </Button>
            {index % 2 === 0 && <div className="separator" />}
          </Fragment>
        )
      })}
    </div>
  )
}

export default ButtonGroup
