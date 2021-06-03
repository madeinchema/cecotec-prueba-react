import { render } from '@testing-library/react'
import { ButtonGroup } from '../..'
import { ButtonGroupDataSource } from './index'

describe('<ButtonGroup /> common component', () => {
  let buttonGroupDataSource: ButtonGroupDataSource[]

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

  it('renders two buttons', () => {
    const { getByText } = render(
      <ButtonGroup dataSource={buttonGroupDataSource} />
    )
    expect(getByText(/button 1/i).closest('button')).toBeInTheDocument()
    expect(getByText(/button 2/i).closest('button')).toBeInTheDocument()
  })
})
