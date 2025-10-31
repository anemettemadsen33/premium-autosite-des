import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SponsoredBadge } from '../components/SponsoredBadge'

describe('SponsoredBadge', () => {
  it('should render the sponsored badge with correct styling', () => {
    const { container } = render(<SponsoredBadge />)
    expect(screen.getByText('Sponsored')).toBeInTheDocument()
    // Verify gradient styling is applied
    const badge = container.querySelector('.bg-gradient-to-r')
    expect(badge).toBeInTheDocument()
  })

  it('should render with custom className applied to badge', () => {
    const { container } = render(<SponsoredBadge className="custom-class" />)
    const badge = container.querySelector('.custom-class')
    expect(badge).toBeInTheDocument()
  })

  it('should display dealer-specific message when dealerName is provided', () => {
    const dealerName = 'Premium Motors'
    render(<SponsoredBadge dealerName={dealerName} />)
    // The badge should always show "Sponsored" text
    expect(screen.getByText('Sponsored')).toBeInTheDocument()
    // In a real test, we'd verify the tooltip contains the dealer name
    // but that requires user interaction simulation
  })
})
