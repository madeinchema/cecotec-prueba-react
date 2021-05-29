import ButtonGroup from '../../../../components/common/ButtonGroup'
import { ClientPublicData } from '../../../../types'
import './styles.scss'

const ClientCard = ({
  id,
  firstName,
  email,
  avatar,
}: ClientPublicData): JSX.Element => {
  const buttonGroupDataSource = [
    {
      id: `${id}-edit`,
      children: 'Editar',
      onClick: () => console.log('editar cliente'),
    },
    {
      id: `${id}-remove`,
      children: 'Eliminar',
      onClick: () => console.log('eliminar cliente'),
    },
  ]

  return (
    <div className="client-card">
      <div className="container">
        <img src={avatar} alt="client-avatar" className="avatar" />
        <div className="details">
          <p className="details--name">
            {firstName} <span className="details--id">#{id}</span>
          </p>
          <p className="details--email">{email}</p>
        </div>
      </div>
      <ButtonGroup dataSource={buttonGroupDataSource} />
    </div>
  )
}

export default ClientCard
