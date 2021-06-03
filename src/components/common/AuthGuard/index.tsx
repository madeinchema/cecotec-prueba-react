import { useEffect } from 'react'
import { useHistory } from 'react-router'
import './styles.scss'

interface AuthGuardProps {
  isLoggedIn: boolean
  className?: string
  redirectPath?: string
}

const AuthGuard = ({
  isLoggedIn,
  className,
  redirectPath,
}: AuthGuardProps): JSX.Element => {
  const history = useHistory()
  const isLoggedInText = isLoggedIn ? 'loggedIn' : 'loggedOut'

  const authGuardTexts = {
    loggedIn:
      'Ya ha iniciado sesión. Le estamos redirigiendo, por favor espere.',
    loggedOut:
      'Necesita haber iniciado sesión. Le estamos redirigiendo, por favor espere.',
  }

  useEffect(() => {
    if (redirectPath) {
      const redirectTimer = setTimeout(() => history.push(redirectPath), 2000)
      return () => {
        clearTimeout(redirectTimer)
      }
    }
    return undefined
  }, [history, redirectPath])

  return (
    <div className={className ? `${className} auth-guard` : 'auth-guard'}>
      <p>{authGuardTexts[isLoggedInText]}</p>
    </div>
  )
}

export default AuthGuard
