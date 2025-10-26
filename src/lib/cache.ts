import { useState, useEffect, useCallback, useRef } from 'react'

interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
}

class Cache<T> {
  private cache = new Map<string, CacheEntry<T>>()
  private maxSize: number
  private ttl: number

  constructor(maxSize: number = 100, ttl: number = 5 * 60 * 1000) {
    this.maxSize = maxSize
    this.ttl = ttl
  }

  set(key: string, data: T, customTTL?: number): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey) this.cache.delete(firstKey)
    }

    const now = Date.now()
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + (customTTL || this.ttl)
    })
  }

  get(key: string): T | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  clear(): void {
    this.cache.clear()
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  invalidate(predicate: (key: string, data: T) => boolean): void {
    for (const [key, entry] of this.cache.entries()) {
      if (predicate(key, entry.data)) {
        this.cache.delete(key)
      }
    }
  }
}

const globalCache = new Cache<unknown>()

export function useCache<T>(
  key: string,
  fetcher: () => T | Promise<T>,
  options?: {
    ttl?: number
    enabled?: boolean
  }
): { data: T | null; isLoading: boolean; refetch: () => Promise<void> } {
  const [data, setData] = useState<T | null>(globalCache.get(key))
  const [isLoading, setIsLoading] = useState(!globalCache.has(key))
  const fetcherRef = useRef(fetcher)

  fetcherRef.current = fetcher

  const fetch = useCallback(async () => {
    if (options?.enabled === false) return

    setIsLoading(true)
    try {
      const result = await Promise.resolve(fetcherRef.current())
      globalCache.set(key, result, options?.ttl)
      setData(result)
    } catch (error) {
      console.error(`Cache fetch error for key "${key}":`, error)
    } finally {
      setIsLoading(false)
    }
  }, [key, options?.ttl, options?.enabled])

  useEffect(() => {
    if (!globalCache.has(key) && options?.enabled !== false) {
      fetch()
    }
  }, [key, fetch, options?.enabled])

  return { data, isLoading, refetch: fetch }
}

export function invalidateCache(keyOrPredicate: string | ((key: string, data: unknown) => boolean)) {
  if (typeof keyOrPredicate === 'string') {
    globalCache.delete(keyOrPredicate)
  } else {
    globalCache.invalidate(keyOrPredicate as (key: string, data: unknown) => boolean)
  }
}

export function clearCache() {
  globalCache.clear()
}
