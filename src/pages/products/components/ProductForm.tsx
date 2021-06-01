interface ProductFormProps {
  config: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    fields: {
      name: string
      price: string
    }
  }
}

const ProductForm = ({ config }: ProductFormProps): JSX.Element => {
  return (
    <form action="">
      <label htmlFor="name">
        Nombre
        <input
          id="name"
          name="name"
          type="text"
          maxLength={36}
          value={config.fields.name}
          onChange={config.onChange}
        />
      </label>

      <label htmlFor="price">
        Precio
        <input
          id="price"
          name="price"
          type="number"
          min="0.00"
          max="10000.00"
          step="0.01"
          maxLength={48}
          placeholder="0,00"
          value={config.fields.price}
          onChange={config.onChange}
        />
      </label>
    </form>
  )
}

export default ProductForm
