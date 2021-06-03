import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { AuthGuard, Button, Portal } from '../../components'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { GET_ALL_PRODUCTS } from '../../queries'
import { Product } from '../../types'

import AddProductModal from './components/AddProductModal'
import ProductCard from './components/ProductCard'
import './products.scss'

const Products = (): JSX.Element => {
  const currentUserSelector = useTypedSelector(state => state.currentUser)
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS)
  const isLoggedIn = currentUserSelector.data

  const toggleAddProductModal = (): void => {
    setShowAddClientModal(prevState => !prevState)
  }

  const handleAddClient = (): void => {
    toggleAddProductModal()
  }

  if (!isLoggedIn) return <AuthGuard />

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
