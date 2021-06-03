import { render } from '@testing-library/react'
import { Button } from '../..'

describe('<Button /> common component', () => {
  it('displays button with text "button"', () => {
    const { getByText } = render(<Button>Button</Button>)
    expect(getByText(/button/i)).toBeInTheDocument()
  })
  it('has button className', () => {
    const { container } = render(<Button>Button</Button>)
    expect(container.firstChild.classList.contains('button')).toBe(true)
  })
  it('has default variant className', () => {
    const { container } = render(<Button>Button</Button>)
    expect(container.firstChild.classList.contains('button__default')).toBe(
      true
    )
  })
})
