import { useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { Skeleton } from '@/components/ui/skeleton'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
  fallback?: string
}

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  aspectRatio = '16/9',
  fallback = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format'
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '100px'
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      setIsInView(true)
    }
  }, [entry])

  useEffect(() => {
    if (isInView && !imageSrc) {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
      }
      img.onerror = () => {
        setImageSrc(fallback)
        setIsLoaded(true)
      }
    }
  }, [isInView, src, imageSrc, fallback])

  return (
    <div 
      ref={ref as any}
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      )}
    </div>
  )
}
