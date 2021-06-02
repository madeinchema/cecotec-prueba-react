import { Link } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import './styles.scss'
import { headerNavItems } from './headerNavItems.constants'

const Header = (): JSX.Element => {
  const currentUserSelector = useTypedSelector(state => state.currentUser)
  const isLoggedIn = !!currentUserSelector.data
  const isLoggedInKey = currentUserSelector.data ? 'loggedIn' : 'loggedOut'

  return (
    <div className="header">
      <div className="header__container">
        <Link className="header__logo" to="/">
          <img src="./logo.png" alt="" />
        </Link>

        <nav className="header__nav">
          {headerNavItems[isLoggedInKey].map(navItem => (
            <li key={navItem.label} className="header__nav-item">
              <Link to={navItem.link}>{navItem.label}</Link>
            </li>
          ))}
          {isLoggedIn && (
            <div className="header__nav-item--avatar">
              <img
                src={currentUserSelector.data.avatar}
                alt="username avatar"
              />
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}

export default Header
