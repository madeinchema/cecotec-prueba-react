import './styles.scss'

interface AuthGuardProps {
  isLoggedIn: boolean
  className?: string
}

const AuthGuard = ({ isLoggedIn, className }: AuthGuardProps): JSX.Element => {
  const isLoggedInText = isLoggedIn ? 'loggedIn' : 'loggedOut'

  const authGuardTexts = {
    loggedIn:
      'Ya ha iniciado sesión. Le estamos redirigiendo, por favor espere.',
    loggedOut: 'Necesitas haber iniciado sesión.',
  }

  return (
    <div className={className ? `${className} auth-guard` : 'auth-guard'}>
      <p>{authGuardTexts[isLoggedInText]}</p>
    </div>
  )
}

export default AuthGuard
