import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowCounterClockwise,
  Eye,
  Play,
  Pause,
  ArrowsOutSimple,
  ArrowsInSimple
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'

interface Virtual360ViewerProps {
  images: string[]
  title: string
}

export function Virtual360Viewer({ images, title }: Virtual360ViewerProps) {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  const frameCount = 36
  const totalFrames = Math.min(images.length, frameCount)

  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % totalFrames)
      }, 100)
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current)
      }
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current)
        playIntervalRef.current = undefined
      }
    }
  }, [isPlaying, totalFrames])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setIsPlaying(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - startX
    const sensitivity = 3
    const frameDelta = Math.floor(deltaX / sensitivity)

    if (Math.abs(frameDelta) > 0) {
      setCurrentFrame((prev) => {
        let newFrame = prev + frameDelta
        if (newFrame < 0) newFrame = totalFrames + newFrame
        if (newFrame >= totalFrames) newFrame = newFrame % totalFrames
        return newFrame
      })
      setStartX(e.clientX)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartX(e.touches[0].clientX)
    setIsPlaying(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const deltaX = e.touches[0].clientX - startX
    const sensitivity = 3
    const frameDelta = Math.floor(deltaX / sensitivity)

    if (Math.abs(frameDelta) > 0) {
      setCurrentFrame((prev) => {
        let newFrame = prev + frameDelta
        if (newFrame < 0) newFrame = totalFrames + newFrame
        if (newFrame >= totalFrames) newFrame = newFrame % totalFrames
        return newFrame
      })
      setStartX(e.touches[0].clientX)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen()
          setIsFullscreen(true)
        }
      } else {
        if (document.exitFullscreen && document.fullscreenElement) {
          await document.exitFullscreen()
          setIsFullscreen(false)
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error)
    }
  }

  const resetView = () => {
    setCurrentFrame(0)
    setIsPlaying(false)
  }

  if (images.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="text-accent" weight="fill" />
          360° Virtual View
          <Badge variant="secondary" className="ml-auto">
            Interactive
          </Badge>
        </CardTitle>
        <CardDescription>
          Drag or swipe to rotate • Click play for auto-rotation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          ref={containerRef}
          className="relative bg-muted rounded-lg overflow-hidden aspect-video cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.img
            key={currentFrame}
            src={images[currentFrame % images.length]}
            alt={`${title} - View ${currentFrame + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            draggable={false}
          />

          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-medium">
            Frame {currentFrame + 1} / {totalFrames}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-muted-foreground">
            {isDragging ? '← Drag to rotate →' : 'Drag or swipe to explore'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            variant="default"
            size="sm"
            className="flex-1"
          >
            {isPlaying ? (
              <>
                <Pause className="mr-2" weight="fill" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2" weight="fill" />
                Auto-Rotate
              </>
            )}
          </Button>

          <Button
            onClick={resetView}
            variant="outline"
            size="sm"
          >
            <ArrowCounterClockwise weight="bold" />
          </Button>

          <Button
            onClick={toggleFullscreen}
            variant="outline"
            size="sm"
          >
            {isFullscreen ? (
              <ArrowsInSimple weight="bold" />
            ) : (
              <ArrowsOutSimple weight="bold" />
            )}
          </Button>
        </div>

        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentFrame + 1) / totalFrames) * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: Math.min(6, totalFrames) }).map((_, idx) => {
            const frameIdx = Math.floor((idx / 6) * totalFrames)
            return (
              <button
                key={idx}
                onClick={() => setCurrentFrame(frameIdx)}
                className={`
                  relative aspect-video rounded overflow-hidden border-2 transition-all
                  ${currentFrame === frameIdx ? 'border-accent scale-105' : 'border-transparent hover:border-accent/50'}
                `}
              >
                <img
                  src={images[frameIdx % images.length]}
                  alt={`Preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
