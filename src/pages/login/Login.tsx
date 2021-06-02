import { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { Button } from '../../components'
import { loadCurrentUser } from '../../state/slices/currentUserSlice'
import './login.scss'

const Login = (): JSX.Element => {
  const SESSION_KEY = 'session'
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    email: '',
    password: '',
  })
  const history = useHistory()
  const dispatch = useDispatch()

  const handleFormOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  function loadUserData(): void {
    const sessionData = localStorage.getItem(SESSION_KEY) || ''
    fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
      headers: {
        token: sessionData,
      },
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('user', JSON.stringify(data))
        dispatch(loadCurrentUser())
        history.push('/clients')
      })
  }

  const handleLoginResponse = (): void => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/login_get`)
      .then(res => res.json())
      .then(data => {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data))
        loadUserData()
      })
  }

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_SERVER_URL}/login_post`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(() => {
        handleLoginResponse()
      })
  }

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
