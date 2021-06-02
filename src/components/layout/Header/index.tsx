import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import './styles.scss'
import { headerNavItems } from './headerNavItems.constants'

const Header = (): JSX.Element => {
  const currentUserSelector = useTypedSelector(state => state.currentUser)

  const isLoggedIn = currentUserSelector.data ? 'loggedIn' : 'loggedOut'

  return (
    <div className="header">
      <div className="header--container">
        <Link className="logo--img" to="/">
          <img src="./logo.png" alt="" />
        </Link>
        <nav className="nav">
          {headerNavItems[isLoggedIn].map(navItem => (
            <li key={navItem.label} className="nav--item">
              <Link to={navItem.link}>{navItem.label}</Link>
            </li>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Header
