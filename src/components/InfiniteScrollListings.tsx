import { useState, useEffect, useCallback, useRef } from 'react'
import { VehicleCard } from '@/components/VehicleCard'
import { Listing } from '@/lib/types'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

interface InfiniteScrollListingsProps {
  listings: Listing[]
  onNavigate: (page: string, params?: Record<string, string>) => void
  pageSize?: number
  viewMode?: 'grid' | 'list'
}

export function InfiniteScrollListings({
  listings,
  onNavigate,
  pageSize = 12,
  viewMode = 'grid'
}: InfiniteScrollListingsProps) {
  const [displayedCount, setDisplayedCount] = useState(pageSize)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [sentinelRef, entry] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '200px'
  })

  const displayedListings = listings.slice(0, displayedCount)
  const hasMore = displayedCount < listings.length

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return

    setIsLoadingMore(true)
    
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + pageSize, listings.length))
      setIsLoadingMore(false)
    }, 300)
  }, [isLoadingMore, hasMore, pageSize, listings.length])

  useEffect(() => {
    if (entry?.isIntersecting && hasMore && !isLoadingMore) {
      loadMore()
    }
  }, [entry, hasMore, isLoadingMore, loadMore])

  useEffect(() => {
    setDisplayedCount(pageSize)
  }, [listings.length, pageSize])

  return (
    <div className="space-y-6">
      <div 
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
            : 'flex flex-col gap-6'
        }
      >
        {displayedListings.map((listing, index) => (
          <VehicleCard
            key={listing.id}
            listing={listing}
            onNavigate={onNavigate}
            index={index % pageSize}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="py-8">
          {isLoadingMore && (
            <div 
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'flex flex-col gap-6'
              }
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="space-y-4">
                  <Skeleton className="w-full h-64 rounded-lg" />
                  <Skeleton className="w-3/4 h-6" />
                  <Skeleton className="w-1/2 h-4" />
                  <Skeleton className="w-1/3 h-8" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
