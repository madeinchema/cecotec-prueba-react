import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AuthGuard, Button } from '../../components'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { logInCurrentUser } from '../../state/slices/currentUserSlice'
import './login.scss'

const Login = (): JSX.Element => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
  })
  const currentUserSelector = useTypedSelector(state => state.currentUser)
  const isLoggedIn = currentUserSelector.data
  const dispatch = useDispatch()

  const handleFormOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch(logInCurrentUser(formData))
  }

  if (isLoggedIn)
    return <AuthGuard isLoggedIn={isLoggedIn} redirectPath="/clients" />

  return (
    <div className="login">
      <div className="login--container">
        <div className="login--logo">
          <img src="./logo.png" alt="" />
        </div>
        <form onSubmit={handleLoginSubmit}>
          <label htmlFor="email">
            Correo electrónico
            <input
              name="email"
              id="email"
              type="email"
              value={formData.email}
              onChange={handleFormOnChange}
            />
          </label>
          <label htmlFor="password">
            Contraseña
            <input
              name="password"
              id="password"
              type="password"
              value={formData.password}
              onChange={handleFormOnChange}
            />
          </label>
          <Button type="submit" className="login--button" variant="primary">
            Iniciar sesión
          </Button>
        </form>
        <p className="login--alternative-action">¿No tienes cuenta?</p>
      </div>
    </div>
  )
}

export default Login
