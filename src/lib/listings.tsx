import { useKV } from '@github/spark/hooks'
import { Listing } from './types'
import { SAMPLE_LISTINGS } from './data'

export function getAllListings(): Listing[] {
  return SAMPLE_LISTINGS
}

export function useListings() {
  const [listings, setListings] = useKV<Record<string, Listing>>('listings', {})
  
  const allListings = listings ? Object.values(listings) : []
  
  const createListing = (listing: Omit<Listing, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => {
    const id = `listing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()
    
    const newListing: Listing = {
      ...listing,
      id,
      createdAt: now,
      updatedAt: now,
      views: 0
    }
    
    setListings(current => ({ ...(current || {}), [id]: newListing }))
    return newListing
  }
  
  const updateListing = (id: string, updates: Partial<Listing>) => {
    setListings(current => {
      if (!current || !current[id]) return current || {}
      
      return {
        ...current,
        [id]: {
          ...current[id],
          ...updates,
          updatedAt: new Date().toISOString()
        }
      }
    })
  }
  
  const deleteListing = (id: string) => {
    setListings(current => {
      if (!current) return {}
      const { [id]: removed, ...rest } = current
      return rest
    })
  }
  
  const incrementViews = (id: string) => {
    setListings(current => {
      if (!current || !current[id]) return current || {}
      
      return {
        ...current,
        [id]: {
          ...current[id],
          views: current[id].views + 1
        }
      }
    })
  }
  
  const getListingById = (id: string): Listing | undefined => {
    return listings ? listings[id] : undefined
  }
  
  const getListingsByUser = (userId: string): Listing[] => {
    return allListings.filter(listing => listing.userId === userId)
  }
  
  return {
    listings: allListings,
    createListing,
    updateListing,
    deleteListing,
    incrementViews,
    getListingById,
    getListingsByUser
  }
}
