import { useKV } from '@github/spark/hooks'
import { Favorite } from './types'

export function useFavorites(userId: string | null) {
  const [favorites, setFavorites] = useKV<Favorite[]>('favorites', [])
  
  const userFavorites = favorites?.filter(f => f.userId === userId) || []
  const userFavoriteIds = userFavorites.map(f => f.listingId)
  
  const toggleFavorite = (listingId: string) => {
    if (!userId) return
    
    setFavorites(current => {
      const currentFavs = current || []
      const existing = currentFavs.find(f => f.userId === userId && f.listingId === listingId)
      
      if (existing) {
        return currentFavs.filter(f => !(f.userId === userId && f.listingId === listingId))
      } else {
        return [...currentFavs, {
          userId,
          listingId,
          createdAt: new Date().toISOString()
        }]
      }
    })
  }
  
  const isFavorite = (listingId: string): boolean => {
    return userFavoriteIds.includes(listingId)
  }
  
  return {
    favorites: userFavorites,
    favoriteIds: userFavoriteIds,
    toggleFavorite,
    isFavorite
  }
}
