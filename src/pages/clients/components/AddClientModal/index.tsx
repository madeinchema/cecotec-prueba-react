import ButtonGroup from '../../../../components/common/ButtonGroup'
import './styles.scss'

type AddClientModalProps = {
  onClose: () => void
}

const AddClientModal = ({ onClose }: AddClientModalProps): JSX.Element => {
  const buttonGroupDataSource = [
    {
      id: 'add-client-modal-cancel',
      children: 'Cancelar',
      onClick: () => onClose(),
    },
    {
      id: 'add-client-modal-add',
      children: 'Añadir cliente',
      onClick: () => console.log('añadir cliente'),
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
            <label htmlFor="name">
              Nombre
              <input id="name" type="text" />
            </label>

            <label htmlFor="email">
              Correo electrónico
              <input id="email" type="email" />
            </label>

            <label htmlFor="id">
              ID
              <input id="id" name="id" type="text" disabled />
            </label>
          </form>
        </div>
        <ButtonGroup dataSource={buttonGroupDataSource} />
      </div>
    </div>
  )
}

export default AddClientModal
