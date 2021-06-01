import { ReactNode } from 'react'
import Header from '../Header'
import './styles.scss'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  )
}

export default Layout
