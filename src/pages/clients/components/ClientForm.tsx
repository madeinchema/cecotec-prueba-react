interface ClientFormProps {
  config: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    fields: {
      firstName: string
      lastName: string
      email: string
      password: string
    }
  }
}

const ClientForm = ({
  config: { onChange, fields },
}: ClientFormProps): JSX.Element => (
  <form action="">
    <label htmlFor="firstName">
      Nombre
      <input
        id="firstName"
        name="firstName"
        type="text"
        maxLength={36}
        value={fields.firstName}
        onChange={onChange}
      />
    </label>

    <label htmlFor="lastName">
      Apellidos
      <input
        id="lastName"
        name="lastName"
        type="text"
        maxLength={48}
        value={fields.lastName}
        onChange={onChange}
      />
    </label>

    <label htmlFor="email">
      Correo electrónico
      <input
        id="email"
        name="email"
        type="email"
        maxLength={64}
        value={fields.email}
        onChange={onChange}
      />
    </label>

    <label htmlFor="password">
      Contraseña
      <input
        id="password"
        name="password"
        type="text"
        maxLength={64}
        value={fields.password}
        onChange={onChange}
      />
    </label>
  </form>
)

export default ClientForm
