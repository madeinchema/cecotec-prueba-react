import { gql, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { Button, Portal } from '../../components'
import { ClientPublicData, Product } from '../../types'
import AddProductModal from './components/AddProductModal'
import ProductCard from './components/ProductCard'
import './products.scss'

const ALL_PRODUCTS = gql`
  query AllProducts {
    allProducts {
      id
      name
      price
      image
    }
  }
`

const Products = (): JSX.Element => {
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const { loading, error, data } = useQuery(ALL_PRODUCTS)
  console.log('🚀 ~ file: Products.tsx ~ line 32 ~ allProducts', data)

  const toggleAddProductModal = (): void => {
    setShowAddClientModal(prevState => !prevState)
  }

  const handleAddClient = (): void => {
    toggleAddProductModal()
  }

  return (
    <div className="products">
      <div className="products--container">
        <div className="products--header">
          <h1>Productos</h1>
          <Button variant="primary" onClick={handleAddClient}>
            Añadir producto
          </Button>
        </div>
        {loading && <div>Loading...</div>}
        {!loading && !error && data.allProducts.length === 0 && (
          <div className="products--empty">Empty</div>
        )}
        {!loading && data.allProducts && (
          <div className="products--grid">
            {data.allProducts?.map((product: Product) => (
              <ProductCard
                key={`${product.id}-card`}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        )}
        {showAddClientModal && (
          <Portal id="add-product-modal">
            <AddProductModal onClose={toggleAddProductModal} />
          </Portal>
        )}
      </div>
    </div>
  )
}

export default Products
