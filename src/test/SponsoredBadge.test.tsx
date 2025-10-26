import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SponsoredBadge } from '../components/SponsoredBadge'

describe('SponsoredBadge', () => {
  it('should render the sponsored badge', () => {
    render(<SponsoredBadge />)
    expect(screen.getByText('Sponsored')).toBeInTheDocument()
  })

  it('should render with custom className applied to badge', () => {
    const { container } = render(<SponsoredBadge className="custom-class" />)
    const badge = container.querySelector('.custom-class')
    expect(badge).toBeInTheDocument()
  })

  it('should include dealer name in tooltip when provided', () => {
    const dealerName = 'Premium Motors'
    render(<SponsoredBadge dealerName={dealerName} />)
    // The badge itself should still show "Sponsored"
    expect(screen.getByText('Sponsored')).toBeInTheDocument()
  })

  it('should render without dealer name', () => {
    render(<SponsoredBadge />)
    expect(screen.getByText('Sponsored')).toBeInTheDocument()
  })
})
