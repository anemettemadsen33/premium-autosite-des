import { useState, useRef } from 'react'
import { VideoCamera, Upload, X, Play, Trash } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

interface VideoUploaderProps {
  onVideoUploaded: (videoUrl: string) => void
  existingVideo?: string
  maxSizeMB?: number
}

export function VideoUploader({ onVideoUploaded, existingVideo, maxSizeMB = 50 }: VideoUploaderProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(existingVideo || null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file')
      return
    }

    const maxSize = maxSizeMB * 1024 * 1024
    if (file.size > maxSize) {
      toast.error(`Video size must be less than ${maxSizeMB}MB`)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const reader = new FileReader()
      
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100
          setUploadProgress(Math.round(progress))
        }
      }

      reader.onload = (e) => {
        const videoDataUrl = e.target?.result as string
        setVideoUrl(videoDataUrl)
        onVideoUploaded(videoDataUrl)
        toast.success('Video uploaded successfully')
        setIsUploading(false)
        setUploadProgress(100)
      }

      reader.onerror = () => {
        toast.error('Failed to upload video')
        setIsUploading(false)
        setUploadProgress(0)
      }

      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Video upload error:', error)
      toast.error('Failed to upload video')
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleRemoveVideo = () => {
    setVideoUrl(null)
    setUploadProgress(0)
    onVideoUploaded('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    toast.success('Video removed')
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <VideoCamera className="text-accent" weight="duotone" />
          Video Walkthrough
        </CardTitle>
        <CardDescription>
          Add a video to showcase your vehicle (max {maxSizeMB}MB)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />

        {!videoUrl ? (
          <button
            onClick={triggerFileInput}
            disabled={isUploading}
            className="w-full border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <VideoCamera size={48} className="text-muted-foreground mb-4" weight="duotone" />
            <p className="text-sm font-medium mb-1">Upload Video</p>
            <p className="text-xs text-muted-foreground">MP4, MOV, AVI up to {maxSizeMB}MB</p>
          </button>
        ) : (
          <div className="space-y-3">
            <div className="relative rounded-lg overflow-hidden border bg-black">
              <video 
                src={videoUrl} 
                controls 
                className="w-full h-auto max-h-96"
                preload="metadata"
              >
                Your browser does not support video playback.
              </video>
              
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={handleRemoveVideo}
              >
                <Trash />
              </Button>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={triggerFileInput}
                className="flex-1"
              >
                <Upload className="mr-2" size={18} />
                Replace Video
              </Button>
            </div>
          </div>
        )}

        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Uploading video...</span>
              <span className="font-medium">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted/30 rounded-lg">
          <p className="font-medium">💡 Video Tips:</p>
          <p>• Keep it under 60 seconds for best engagement</p>
          <p>• Show exterior from all angles</p>
          <p>• Include interior features and condition</p>
          <p>• Demonstrate any special features</p>
          <p>• Film in good lighting conditions</p>
        </div>
      </CardContent>
    </Card>
  )
}
