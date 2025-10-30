import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { MAIN_CATEGORIES, type MainCategory, type VehicleSubCategoryCode } from '@/lib/vehicleSubCategories'
import { useVehicleSubCategories } from '@/hooks/use-vehicle-sub-categories'
import { listingFormSchema } from '@/lib/validationSchema'
import { Car, CheckCircle, XCircle } from '@phosphor-icons/react'

interface CategorySelectorFormProps {
  onNavigate?: (page: string) => void
}

export function CategorySelectorForm({ onNavigate }: CategorySelectorFormProps) {
  const [mainCategory, setMainCategory] = useState<MainCategory | null>(null)
  const [subCategory, setSubCategory] = useState<VehicleSubCategoryCode | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [location, setLocation] = useState('')

  const subCategories = useVehicleSubCategories(mainCategory)

  const handleMainCategoryChange = (value: string) => {
    const newMainCategory = value === 'none' ? null : (value as MainCategory)
    setMainCategory(newMainCategory)
    setSubCategory(null)
  }

  const handleSubCategoryChange = (value: string) => {
    setSubCategory(value === 'none' ? null : (value as VehicleSubCategoryCode))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!mainCategory) {
      toast.error('Please select a main category')
      return
    }

    const formData = {
      title,
      description,
      price: Number(price),
      location,
      mainCategory,
      subCategory,
      brand: '',
      model: '',
    }

    const result = listingFormSchema.safeParse(formData)

    if (!result.success) {
      const errors = result.error.errors.map(err => err.message).join(', ')
      toast.error(`Validation failed: ${errors}`)
      return
    }

    toast.success('Listing validated successfully!', {
      description: `Category: ${mainCategory}${subCategory ? ` → ${subCategory}` : ''}`,
    })

    console.log('Valid form data:', result.data)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-accent/10 rounded-xl">
            <Car size={24} weight="duotone" className="text-accent" />
          </div>
          <div>
            <CardTitle>Category Selection Demo</CardTitle>
            <CardDescription>
              Select main category and sub-category with validation
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mainCategory" className="text-sm font-medium mb-2 block">
                Main Category <span className="text-destructive">*</span>
              </Label>
              <Select value={mainCategory || 'none'} onValueChange={handleMainCategoryChange}>
                <SelectTrigger id="mainCategory">
                  <SelectValue placeholder="Select main category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Select category...</SelectItem>
                  {MAIN_CATEGORIES.map(cat => (
                    <SelectItem key={cat.code} value={cat.code}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subCategory" className="text-sm font-medium mb-2 block">
                Sub-Category
              </Label>
              <Select 
                value={subCategory || 'none'} 
                onValueChange={handleSubCategoryChange}
                disabled={!mainCategory}
              >
                <SelectTrigger id="subCategory" disabled={!mainCategory}>
                  <SelectValue placeholder={mainCategory ? "Select sub-category" : "Select main category first"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">All sub-categories</SelectItem>
                  {subCategories.map(sub => (
                    <SelectItem key={sub.code} value={sub.code}>
                      {sub.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {mainCategory && subCategories.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {subCategories.length} options available
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="title" className="text-sm font-medium mb-2 block">
              Listing Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., 2023 BMW R1250GS Adventure"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium mb-2 block">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the vehicle..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-sm font-medium mb-2 block">
                Price <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="25000"
                required
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-sm font-medium mb-2 block">
                Location <span className="text-destructive">*</span>
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Berlin, Germany"
                required
              />
            </div>
          </div>

          {mainCategory && subCategory && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} weight="fill" className="text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Category Selection Valid</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {mainCategory} → {subCategory}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Validate Form
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setMainCategory(null)
                setSubCategory(null)
                setTitle('')
                setDescription('')
                setPrice('')
                setLocation('')
                toast.info('Form reset')
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
