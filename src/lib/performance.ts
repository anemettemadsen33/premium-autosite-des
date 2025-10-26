import { useEffect, useRef } from 'react'

interface PerformanceMetrics {
  renderTime: number
  renderCount: number
  componentName: string
}

const metrics = new Map<string, PerformanceMetrics>()

export function usePerformanceMonitor(componentName: string, enabled: boolean = false) {
  const renderCount = useRef(0)
  const startTime = useRef(0)

  useEffect(() => {
    if (!enabled) return

    renderCount.current += 1
    startTime.current = performance.now()

    return () => {
      const renderTime = performance.now() - startTime.current
      const existing = metrics.get(componentName) || {
        renderTime: 0,
        renderCount: 0,
        componentName
      }

      metrics.set(componentName, {
        ...existing,
        renderTime: (existing.renderTime + renderTime) / 2,
        renderCount: existing.renderCount + 1
      })
    }
  }, [componentName, enabled])
}

export function getPerformanceMetrics() {
  return Array.from(metrics.values())
}

export function clearPerformanceMetrics() {
  metrics.clear()
}

export function logPerformanceMetrics() {
  console.table(getPerformanceMetrics())
}
