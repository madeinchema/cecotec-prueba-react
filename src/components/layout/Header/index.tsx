import './styles.scss'

const Header = (): JSX.Element => {
  return (
    <div className="header">
      <div className="logo">
        <img className="logo--img" src="./logo.png" alt="" />
      </div>
      <nav className="nav">
        <li className="nav--item">Clientes</li>
        <li className="nav--item">Productos</li>
        <li className="nav--item">Cerrar sesión</li>
      </nav>
    </div>
  )
}

export default Header
