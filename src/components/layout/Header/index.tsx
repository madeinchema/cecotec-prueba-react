import { Link } from 'react-router-dom'
import './styles.scss'

const Header = (): JSX.Element => {
  return (
    <div className="header">
      <div className="header--container">
        <Link className="logo--img" to="/">
          <img src="./logo.png" alt="" />
        </Link>
        <nav className="nav">
          <li className="nav--item">
            <Link to="/clients">Clientes</Link>
          </li>
          <li className="nav--item">
            <Link to="/products">Productos</Link>
          </li>
          <li className="nav--item">Cerrar sesión</li>
        </nav>
      </div>
    </div>
  )
}

export default Header
