import './styles.scss'

interface AuthGuardProps {
  className?: string
}

const AuthGuard = ({ className }: AuthGuardProps): JSX.Element => {
  return (
    <div className={className ? `${className} auth-guard` : 'auth-guard'}>
      <p>Necesitas haber iniciado sesión.</p>
    </div>
  )
}

export default AuthGuard
