import { useState, useEffect, useCallback } from 'react'

export function useUrlState<T extends Record<string, any>>(
  initialState: T,
  onChange?: (state: T) => void
): [T, (updates: Partial<T>) => void, () => void] {
  const [state, setState] = useState<T>(initialState)

  const parseUrlParams = useCallback((): Partial<T> => {
    const params = new URLSearchParams(window.location.search)
    const parsed: Partial<T> = {}

    params.forEach((value, key) => {
      if (key in initialState) {
        const initialValue = initialState[key as keyof T]
        
        if (typeof initialValue === 'number') {
          parsed[key as keyof T] = Number(value) as any
        } else if (typeof initialValue === 'boolean') {
          parsed[key as keyof T] = (value === 'true') as any
        } else {
          parsed[key as keyof T] = value as any
        }
      }
    })

    return parsed
  }, [initialState])

  useEffect(() => {
    const urlState = parseUrlParams()
    if (Object.keys(urlState).length > 0) {
      const newState = { ...initialState, ...urlState }
      setState(newState)
      onChange?.(newState)
    }
  }, [])

  const updateState = useCallback((updates: Partial<T>) => {
    setState(prev => {
      const newState = { ...prev, ...updates }
      
      const params = new URLSearchParams()
      Object.entries(newState).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.set(key, String(value))
        }
      })

      const newUrl = params.toString() 
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname
      
      window.history.replaceState({}, '', newUrl)
      
      onChange?.(newState)
      return newState
    })
  }, [onChange])

  const clearState = useCallback(() => {
    setState(initialState)
    window.history.replaceState({}, '', window.location.pathname)
    onChange?.(initialState)
  }, [initialState, onChange])

  return [state, updateState, clearState]
}
