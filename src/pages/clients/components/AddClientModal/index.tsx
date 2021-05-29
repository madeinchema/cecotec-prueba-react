import ButtonGroup from '../../../../components/common/ButtonGroup'
import useAddClient from './hooks/useAddClient'
import './styles.scss'

type AddClientModalProps = {
  onClose: () => void
}

const AddClientModal = ({ onClose }: AddClientModalProps): JSX.Element => {
  const {
    addClientInputData,
    handlers: { handleInputData, handleSubmitInputData },
  } = useAddClient()

  const buttonGroupDataSource = [
    {
      id: 'add-client-modal-cancel',
      children: 'Cancelar',
      onClick: onClose,
    },
    {
      id: 'add-client-modal-add',
      children: 'Añadir cliente',
      onClick: handleSubmitInputData,
    },
  ]

  return (
    <div className="modal">
      <div className="modal--content--container">
        <div className="modal--content">
          <div className="modal--header">
            <h2>Añadir cliente</h2>
            <span
              tabIndex={0}
              onKeyPress={onClose}
              role="button"
              className="close"
              onClick={onClose}
            >
              &times;
            </span>
          </div>

          <form action="">
            <label htmlFor="firstName">
              Nombre
              <input
                id="firstName"
                name="firstName"
                type="text"
                maxLength={36}
                value={addClientInputData.firstName}
                onChange={handleInputData}
              />
            </label>

            <label htmlFor="lastName">
              Apellidos
              <input
                id="lastName"
                name="lastName"
                type="text"
                maxLength={48}
                value={addClientInputData.lastName}
                onChange={handleInputData}
              />
            </label>

            <label htmlFor="email">
              Correo electrónico
              <input
                id="email"
                name="email"
                type="email"
                maxLength={64}
                value={addClientInputData.email}
                onChange={handleInputData}
              />
            </label>

            <label htmlFor="password">
              Contraseña
              <input
                id="password"
                name="password"
                type="text"
                value={addClientInputData.password}
                onChange={handleInputData}
              />
            </label>
          </form>
        </div>
        <ButtonGroup dataSource={buttonGroupDataSource} />
      </div>
    </div>
  )
}

export default AddClientModal
