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
        id: 'add-product-modal-cancel',
        content: 'Cancelar',
        onClick: () => {
          /**/
        },
      },
      cancelBtnConfig: {
        id: 'add-product-modal-add',
        content: 'Añadir producto',
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
})
