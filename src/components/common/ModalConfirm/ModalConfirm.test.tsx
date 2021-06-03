import { render } from '@testing-library/react'
import ModalConfirm, { ButtonGroupConfig } from '.'

describe('<ModalConfirm /> common component', () => {
  let modalConfirmButtonGroupConfig: {
    confirmBtnConfig: ButtonGroupConfig
    cancelBtnConfig: ButtonGroupConfig
  }

  beforeEach(() => {
    modalConfirmButtonGroupConfig = {
      confirmBtnConfig: {
        id: '1',
        content: 'Button 1',
        onClick: () => {
          /**/
        },
      },
      cancelBtnConfig: {
        id: '2',
        content: 'Button 2',
        onClick: () => {
          /**/
        },
      },
    }
  })

  it(`renders ModalConfirm's children`, () => {
    const { getByText } = render(
      <ModalConfirm
        confirmBtnConfig={modalConfirmButtonGroupConfig.confirmBtnConfig}
        cancelBtnConfig={modalConfirmButtonGroupConfig.cancelBtnConfig}
      >
        ModalConfirm
      </ModalConfirm>
    )
    expect(getByText(/modalconfirm/i)).toBeInTheDocument()
  })

  it('renders ModalConfirm with 2 buttons', () => {
    const { getByText } = render(
      <ModalConfirm
        confirmBtnConfig={modalConfirmButtonGroupConfig.confirmBtnConfig}
        cancelBtnConfig={modalConfirmButtonGroupConfig.cancelBtnConfig}
      >
        ModalConfirm
      </ModalConfirm>
    )
    expect(getByText(/button 1/i).closest('button')).toBeInTheDocument()
    expect(getByText(/button 2/i).closest('button')).toBeInTheDocument()
  })
})
