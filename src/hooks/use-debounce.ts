import { useEffect, useState } from 'react'

/**
 * Debounce hook to delay updating a value until after user stops typing
 * Reduces expensive operations like API calls and filtering
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds (default: 500ms)
 * @returns Debounced value that updates after the delay period
 * @example
 * const searchQuery = 'hello'
 * const debouncedSearch = useDebounce(searchQuery, 300) // Updates 300ms after user stops typing
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
