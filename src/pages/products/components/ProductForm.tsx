import { ProductFormInputValue } from '../utils/productFormReducer'

interface ProductFormProps {
  config: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    fields: ProductFormInputValue
  }
}

const ProductForm = ({
  config: { onChange, fields },
}: ProductFormProps): JSX.Element => (
  <form action="">
    <label htmlFor="name">
      Nombre
      <input
        id="name"
        name="name"
        type="text"
        maxLength={36}
        value={fields.name.value}
        onChange={onChange}
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
        placeholder="0,00"
        value={fields.price.value}
        onChange={onChange}
      />
    </label>
  </form>
)

export default ProductForm
