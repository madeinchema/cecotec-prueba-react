import ButtonGroup from '../../../../components/common/ButtonGroup'
import { Client } from '../../Clients'
import './styles.scss'

const ClientCard = ({ id, name, email }: Client): JSX.Element => {
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
        <div className="avatar" />
        <div className="details">
          <p className="details--name">
            {name} <span className="details--id">#{id}</span>
          </p>
          <p className="details--email">{email}</p>
        </div>
      </div>
      <ButtonGroup dataSource={buttonGroupDataSource} />
    </div>
  )
}

export default ClientCard
