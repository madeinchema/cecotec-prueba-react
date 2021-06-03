import { render } from '@testing-library/react'
import { ButtonGroupDataSource } from '../ButtonGroup/index'
import Card from '.'

describe('<ButtonGroup /> common component', () => {
  let buttonGroupDataSource: {
    id: string
    children: string
    onClick: () => void
  }[]

  beforeEach(() => {
    buttonGroupDataSource = [
      {
        id: '1',
        children: 'Button 1',
        onClick: () => {
          /**/
        },
      },
      {
        id: '2',
        children: 'Button 2',
        onClick: () => {
          /**/
        },
      },
    ]
  })

  it('renders children"', () => {
    const { getByText } = render(<Card>Card</Card>)
    expect(getByText(/card/i)).toBeInTheDocument()
  })

  it('renders card with 2 buttons', () => {
    const { getByText } = render(
      <Card buttonGroupDataSource={buttonGroupDataSource}>Card</Card>
    )
    expect(getByText(/button 1/i).closest('button')).toBeInTheDocument()
    expect(getByText(/button 2/i).closest('button')).toBeInTheDocument()
  })
})
