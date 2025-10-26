export type Category = 'cars' | 'motorcycles' | 'trucks' | 'rvs' | 'parts'

export type ListingStatus = 'draft' | 'active' | 'pending' | 'sold'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  createdAt: string
}

export interface Listing {
  id: string
  userId: string
  category: Category
  status: ListingStatus
  title: string
  description: string
  price: number
  location: string
  images: string[]
  createdAt: string
  updatedAt: string
  views: number
  isFeatured?: boolean
  
  brand?: string
  model?: string
  year?: number
  mileage?: number
  fuelType?: string
  transmission?: string
  condition?: 'new' | 'used' | 'certified'
  bodyType?: string
  engineSize?: string
  color?: string
  
  partType?: string
  partCondition?: 'new' | 'used' | 'refurbished'
  compatibility?: string
}

export interface Message {
  id: string
  listingId: string
  senderId: string
  receiverId: string
  content: string
  createdAt: string
  read: boolean
}

export interface Conversation {
  id: string
  listingId: string
  participantIds: [string, string]
  lastMessage: Message
  unreadCount: number
}

export interface Favorite {
  userId: string
  listingId: string
  createdAt: string
}

export interface SearchFilters {
  category?: Category
  minPrice?: number
  maxPrice?: number
  brand?: string
  model?: string
  yearFrom?: number
  yearTo?: number
  mileageMax?: number
  fuelType?: string
  transmission?: string
  condition?: string
  location?: string
  query?: string
}

export type Vehicle = any
export type Announcement = any
