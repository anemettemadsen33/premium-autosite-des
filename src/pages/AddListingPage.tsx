import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuth } from '@/lib/auth'
import { useListings } from '@/lib/listings'
import { CATEGORIES, BRANDS_BY_CATEGORY, FUEL_TYPES, TRANSMISSIONS, CONDITIONS, BODY_TYPES } from '@/lib/data'
import { Category } from '@/lib/types'
import { Plus, Images, Sparkle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { VINScanner } from '@/components/VINScanner'
import { VideoUploader } from '@/components/VideoUploader'
import { AutoTagging } from '@/components/AutoTagging'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

interface AddListingPageProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function AddListingPage({ onNavigate }: AddListingPageProps) {
  const { user } = useAuth()
  const { createListing } = useListings()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [category, setCategory] = useState<Category>('cars')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState('')
  const [mileage, setMileage] = useState('')
  const [fuelType, setFuelType] = useState('')
  const [transmission, setTransmission] = useState('')
  const [condition, setCondition] = useState<'new' | 'used' | 'certified'>('used')
  const [bodyType, setBodyType] = useState('')
  const [color, setColor] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [featureTags, setFeatureTags] = useState<string[]>([])
  const [engineSize, setEngineSize] = useState('')

  const handleVINDataExtracted = (data: any) => {
    if (data.make) setBrand(data.make)
    if (data.model) setModel(data.model)
    if (data.year) setYear(data.year.toString())
    if (data.engineSize) setEngineSize(data.engineSize)
    if (data.color) setColor(data.color)
    if (data.mileage) setMileage(data.mileage.toString())
    
    if (data.make && data.model && data.year) {
      setTitle(`${data.year} ${data.make} ${data.model}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast.error('Please login to create a listing')
      onNavigate('login')
      return
    }

    if (!title || !description || !price || !location) {
      toast.error('Please fill in all required fields')
      return
    }

    const priceNum = parseFloat(price)
    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error('Please enter a valid price')
      return
    }

    setIsSubmitting(true)

    try {
      const listing = createListing({
        userId: user.id,
        category,
        status: 'active',
        title,
        description,
        price: priceNum,
        location,
        images: imageUrl ? [imageUrl] : ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format'],
        brand: brand || undefined,
        model: model || undefined,
        year: year ? parseInt(year) : undefined,
        mileage: mileage ? parseInt(mileage) : undefined,
        fuelType: fuelType || undefined,
        transmission: transmission || undefined,
        condition,
        bodyType: bodyType || undefined,
        color: color || undefined,
      })

      toast.success('Listing created successfully!')
      onNavigate('listing', { id: listing.id })
    } catch (error) {
      toast.error('Failed to create listing')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-primary to-purple-900 text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Create New Listing</h1>
          <p className="text-primary-foreground/80">List your vehicle for sale</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="mb-6 p-4 bg-gradient-to-r from-accent/10 to-purple-500/10 rounded-lg border border-accent/30">
          <div className="flex items-center gap-2 mb-2">
            <Sparkle className="text-accent" weight="fill" />
            <h2 className="font-semibold">AI-Powered Tools Available</h2>
            <Badge variant="secondary" className="ml-auto">New</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Use our advanced tools to speed up listing creation and improve accuracy
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <VINScanner onDataExtracted={handleVINDataExtracted} />
          <VideoUploader onVideoUploaded={setVideoUrl} />
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., 2020 Tesla Model 3 Long Range"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your vehicle in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  required
                />
              </div>

              {description && description.length > 20 && (
                <AutoTagging 
                  description={description} 
                  onTagsGenerated={setFeatureTags}
                  existingTags={featureTags}
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="25000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <div className="flex gap-2">
                  <Images size={20} weight="duotone" className="text-muted-foreground mt-2" />
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Optional: Add a custom image URL. A default image will be used if not provided.
                </p>
              </div>

              {category !== 'parts' && (
                <>
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold mb-4">Vehicle Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="brand">Brand</Label>
                        <Select value={brand} onValueChange={setBrand}>
                          <SelectTrigger id="brand">
                            <SelectValue placeholder="Select brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {BRANDS_BY_CATEGORY[category]?.map(b => (
                              <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          placeholder="e.g., Model 3"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Input
                          id="year"
                          type="number"
                          placeholder="2020"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mileage">Mileage</Label>
                        <Input
                          id="mileage"
                          type="number"
                          placeholder="50000"
                          value={mileage}
                          onChange={(e) => setMileage(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fuelType">Fuel Type</Label>
                        <Select value={fuelType} onValueChange={setFuelType}>
                          <SelectTrigger id="fuelType">
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {FUEL_TYPES.map(fuel => (
                              <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="transmission">Transmission</Label>
                        <Select value={transmission} onValueChange={setTransmission}>
                          <SelectTrigger id="transmission">
                            <SelectValue placeholder="Select transmission" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {TRANSMISSIONS.map(trans => (
                              <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Select value={condition} onValueChange={(val) => setCondition(val as any)}>
                          <SelectTrigger id="condition">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="used">Used</SelectItem>
                            <SelectItem value="certified">Certified Pre-Owned</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {category === 'cars' && (
                        <div className="space-y-2">
                          <Label htmlFor="bodyType">Body Type</Label>
                          <Select value={bodyType} onValueChange={setBodyType}>
                            <SelectTrigger id="bodyType">
                              <SelectValue placeholder="Select body type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">None</SelectItem>
                              {BODY_TYPES.map(body => (
                                <SelectItem key={body} value={body}>{body}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <Input
                          id="color"
                          placeholder="e.g., Black"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNavigate('dashboard')}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 gap-2 bg-gradient-to-r from-accent to-purple-600"
                >
                  <Plus size={20} weight="bold" />
                  {isSubmitting ? 'Creating...' : 'Create Listing'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
