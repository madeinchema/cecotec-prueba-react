import { Client } from '../Clients'
import './client-card.scss'

const ClientCard = ({ id, name, email }: Client): JSX.Element => {
  return (
    <div className="client-card">
      <div className="container">
        <div className="avatar" />
        <p className="client-card--name">
          {name} <span className="client-card--id">#{id}</span>
        </p>
        <p className="client-card--email">{email}</p>
      </div>
      <div className="buttons">
        <button type="button" className="button">
          Edit
        </button>
        <div className="separator" />
        <button type="button" className="button">
          Remove
        </button>
      </div>
    </div>
  )
}

export default ClientCard
