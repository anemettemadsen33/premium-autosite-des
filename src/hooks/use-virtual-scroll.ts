import { useState, useEffect, useCallback, useRef } from 'react'

interface UseVirtualScrollOptions<T> {
  itemHeight: number
  containerHeight: number
  items: T[]
  overscan?: number
}

export function useVirtualScroll<T>({
  itemHeight,
  containerHeight,
  items,
  overscan = 3
}: UseVirtualScrollOptions<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const totalHeight = items.length * itemHeight
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length,
    startIndex + visibleCount + 2 * overscan
  )

  const visibleItems = items.slice(startIndex, endIndex)
  const offsetY = startIndex * itemHeight

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement
    setScrollTop(target.scrollTop)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return {
    scrollRef,
    visibleItems,
    totalHeight,
    offsetY,
    startIndex
  }
}
