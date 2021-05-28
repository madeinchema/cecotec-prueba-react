import { Button } from '../../components'
import './login.scss'

const Login = (): JSX.Element => {
  return (
    <div className="login">
      <div className="login--container">
        <div className="login--logo">
          <img src="./logo.png" alt="" />
        </div>
        <form action="">
          <label htmlFor="email">
            Correo electrónico
            <input id="email" type="email" />
          </label>
          <label htmlFor="password">
            Contraseña
            <input id="password" type="password" />
          </label>
        </form>
        <Button className="login--button" variant="primary">
          Iniciar sesión
        </Button>
        <p className="login--alternative-action">¿No tienes cuenta?</p>
      </div>
    </div>
  )
}

export default Login
