import { MouseEvent } from 'react'
import { ProductFormInputValue } from '../../utils/reducers/productFormReducer'
import './styles.scss'

interface ProductFormProps {
  config: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onClick: (event: MouseEvent<HTMLInputElement>) => void
    fields: ProductFormInputValue
  }
}

const ProductForm = ({
  config: { onChange, onClick, fields },
}: ProductFormProps): JSX.Element => (
  <form action="" className="product-form">
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
        type="tel"
        dir="ltr"
        placeholder="0,00"
        value={fields.price.value}
        onClick={onClick}
        onChange={onChange}
        className={fields.price.isValid ? 'invalid' : undefined}
      />
    </label>
  </form>
)

export default ProductForm
