import { render } from '@testing-library/react'
import AuthGuard from '.'
import authGuardConstants from './authGuard.constants'

describe('<AuthGuard /> common component', () => {
  it(`renders loggedIn constant's text`, () => {
    const { getByText } = render(<AuthGuard isLoggedIn />)
    expect(getByText(authGuardConstants.loggedIn)).toBeInTheDocument()
  })
  it(`renders loggedOut constant's text`, () => {
    const { getByText } = render(<AuthGuard isLoggedIn={false} />)
    expect(getByText(authGuardConstants.loggedOut)).toBeInTheDocument()
  })
})
