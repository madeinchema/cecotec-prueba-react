import { ReactNode } from 'react'
import ButtonGroup from '../ButtonGroup'
import './styles.scss'

export type ButtonGroupConfig = {
  id: string
  content: ReactNode
  onClick: () => void
}

interface ModalConfirmProps {
  title?: string
  children: ReactNode
  onClose?: () => void
  confirmBtnConfig: ButtonGroupConfig
  cancelBtnConfig: ButtonGroupConfig
}

const ModalConfirm = ({
  title,
  children,
  onClose,
  confirmBtnConfig,
  cancelBtnConfig,
}: ModalConfirmProps): JSX.Element => {
  const buttonGroupDataSource = [
    {
      id: confirmBtnConfig.id,
      children: confirmBtnConfig.content,
      onClick: confirmBtnConfig.onClick,
    },
    {
      id: cancelBtnConfig.id,
      children: cancelBtnConfig.content,
      onClick: cancelBtnConfig.onClick,
    },
  ]

  return (
    <div className="modal">
      <div className="modal--content--container">
        <div className="modal--content">
          <div className="modal--header">
            {title && <h2>{title}</h2>}
            {onClose && (
              <span
                tabIndex={0}
                onKeyPress={onClose}
                role="button"
                className="close"
                onClick={onClose}
              >
                &times;
              </span>
            )}
          </div>
          {children}
        </div>
        <ButtonGroup dataSource={buttonGroupDataSource} />
      </div>
    </div>
  )
}

export default ModalConfirm
