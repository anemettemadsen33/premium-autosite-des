import { describe, it, expect } from 'vitest'
import { cn, formatPrice } from '../lib/utils'

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500')
      expect(result).toBe('text-red-500 bg-blue-500')
    })

    it('should handle conditional classes', () => {
      const result = cn('base-class', true && 'conditional-class', false && 'hidden-class')
      expect(result).toBe('base-class conditional-class')
    })

    it('should merge tailwind classes with conflicts', () => {
      const result = cn('text-red-500', 'text-blue-500')
      expect(result).toBe('text-blue-500')
    })
  })

  describe('formatPrice', () => {
    it('should format price with default currency', () => {
      const result = formatPrice(10000)
      expect(result).toBe('€10,000')
    })

    it('should format price with custom currency', () => {
      const result = formatPrice(5000, '$')
      expect(result).toBe('$5,000')
    })

    it('should format price without decimals', () => {
      const result = formatPrice(1234.56)
      expect(result).toBe('€1,235')
    })

    it('should handle zero price', () => {
      const result = formatPrice(0)
      expect(result).toBe('€0')
    })

    it('should handle large numbers', () => {
      const result = formatPrice(1000000)
      expect(result).toBe('€1,000,000')
    })
  })
})
