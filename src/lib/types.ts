import type { MainCategory, VehicleSubCategoryCode } from './vehicleSubCategories'

export type Category = 'cars' | 'motorcycles' | 'trucks' | 'rvs' | 'parts'

export type ListingStatus = 'draft' | 'active' | 'pending' | 'sold'

export type SellerTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export type AuctionStatus = 'upcoming' | 'live' | 'ending-soon' | 'ended'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  createdAt: string
  isVerified?: boolean
  sellerRating?: number
  totalSales?: number
  sellerTier?: SellerTier
  businessName?: string
  businessLicense?: string
}

export interface Listing {
  id: string
  userId: string
  category: Category
  mainCategory?: MainCategory
  subCategory?: VehicleSubCategoryCode
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
  
  aiPredictedPrice?: number
  priceConfidence?: number
  has360View?: boolean
  hasARView?: boolean
  hasVideoWalkthrough?: boolean
  historyReportAvailable?: boolean
  warrantyIncluded?: boolean
  inspectionCertified?: boolean
  deliveryAvailable?: boolean
  tradeInAccepted?: boolean
  isAuction?: boolean
  auctionData?: AuctionData
}

export interface AuctionData {
  id: string
  listingId: string
  startTime: string
  endTime: string
  startingBid: number
  currentBid: number
  reservePrice?: number
  bidIncrement: number
  totalBids: number
  leadingBidderId?: string
  status: AuctionStatus
  bids: Bid[]
}

export interface Bid {
  id: string
  auctionId: string
  bidderId: string
  amount: number
  timestamp: string
  isAutoBid: boolean
}

export interface VehicleHistoryReport {
  listingId: string
  vin: string
  reportDate: string
  accidents: HistoryAccident[]
  owners: number
  serviceMaintenance: ServiceRecord[]
  titleStatus: 'clean' | 'salvage' | 'rebuilt' | 'lemon'
  odometer: OdometerReading[]
  recalls: RecallInfo[]
  theftRecord: boolean
  floodDamage: boolean
  frameDamage: boolean
  airbagDeployment: boolean
}

export interface HistoryAccident {
  date: string
  severity: 'minor' | 'moderate' | 'severe'
  damage: string
  repaired: boolean
}

export interface ServiceRecord {
  date: string
  mileage: number
  type: string
  facility: string
  cost?: number
}

export interface OdometerReading {
  date: string
  mileage: number
  source: string
}

export interface RecallInfo {
  date: string
  component: string
  description: string
  repaired: boolean
}

export interface SellerReview {
  id: string
  sellerId: string
  reviewerId: string
  listingId: string
  rating: number
  comment: string
  createdAt: string
  verifiedPurchase: boolean
}

export interface TestDriveRequest {
  id: string
  listingId: string
  requesterId: string
  preferredDate: string
  preferredTime: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  message?: string
  createdAt: string
}

export interface VehicleRecommendation {
  listingId: string
  score: number
  reasons: string[]
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

export interface Vehicle {
  id: string
  type: string
  brand: string
  model: string
  year: number
  price: number
  mileage?: number
  location: string
  images: string[]
  description?: string
}

export interface Announcement {
  id: string
  title: string
  content: string
  createdAt: string
  type: 'info' | 'warning' | 'success'
  priority?: 'low' | 'medium' | 'high'
}

export type Currency = 'EUR' | 'USD' | 'GBP' | 'RON'

export type KYCStatus = 'unverified' | 'pending' | 'in-progress' | 'verified' | 'rejected'

export type BadgeType = 'expert-poster' | 'top-seller' | 'early-adopter' | 'verified-dealer' | 'community-helper'

export interface SponsoredListing {
  listingId: string
  dealerId: string
  startDate: string
  endDate: string
  budget: number
  impressions: number
  clicks: number
  ctr: number
  position: 'top' | 'featured' | 'sidebar'
}

export interface ImportFeed {
  id: string
  userId: string
  name: string
  type: 'csv' | 'xml' | 'json' | 'url'
  source: string
  fieldMapping: Record<string, string>
  schedule?: 'manual' | 'hourly' | 'daily' | 'weekly'
  lastSync?: string
  status: 'active' | 'paused' | 'error'
  itemsImported: number
  createdAt: string
}

export interface PricePrediction {
  listingId: string
  predictedPrice: number
  confidence: number
  factors: Array<{
    factor: string
    impact: 'positive' | 'negative' | 'neutral'
    weight: number
  }>
  marketComparison: {
    averagePrice: number
    similarListings: number
    pricePercentile: number
  }
}

export interface KYCVerification {
  userId: string
  status: KYCStatus
  documentType?: 'passport' | 'id-card' | 'drivers-license'
  documentImages?: string[]
  selfieImage?: string
  submittedAt?: string
  reviewedAt?: string
  reviewedBy?: string
  rejectionReason?: string
}

export interface UserGamification {
  userId: string
  xp: number
  level: number
  badges: BadgeType[]
  missions: Mission[]
  leaderboardRank?: number
}

export interface Mission {
  id: string
  type: 'daily' | 'weekly' | 'achievement'
  title: string
  description: string
  xpReward: number
  progress: number
  target: number
  completed: boolean
  expiresAt?: string
}

export interface DealerWhiteLabel {
  dealerId: string
  customDomain?: string
  logo?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  theme: 'light' | 'dark' | 'classic' | 'modern'
  headline?: string
  tagline?: string
  customCSS?: string
}

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  content: string
  type: 'text' | 'image' | 'video-request' | 'video-link'
  timestamp: string
  read: boolean
}

export interface VideoPreview {
  id: string
  listingId: string
  dealerId: string
  requesterId: string
  scheduledAt?: string
  duration: number
  status: 'pending' | 'scheduled' | 'live' | 'completed' | 'cancelled'
  meetingLink?: string
}

export interface APIKey {
  id: string
  userId: string
  name: string
  key: string
  permissions: string[]
  createdAt: string
  lastUsed?: string
  expiresAt?: string
  active: boolean
}

export interface DealerKPI {
  dealerId: string
  period: string
  views: number
  clicks: number
  saves: number
  leads: number
  conversions: number
  revenue: number
  topListings: Array<{
    listingId: string
    title: string
    metric: number
  }>
}
