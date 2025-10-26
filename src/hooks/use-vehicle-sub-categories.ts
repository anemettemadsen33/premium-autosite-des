import { useMemo } from 'react'
import {
  type MainCategory,
  type VehicleSubCategory,
  getSubCategoriesByMainCategory,
} from '@/lib/vehicleSubCategories'

/**
 * Custom hook to get sub-categories filtered by main category
 * Returns memoized array to prevent unnecessary re-renders
 * @param mainCategory - The main category to filter by
 * @returns Array of sub-categories for the selected main category
 */
export function useVehicleSubCategories(mainCategory: MainCategory | null): VehicleSubCategory[] {
  return useMemo(() => {
    if (!mainCategory) return []
    return getSubCategoriesByMainCategory(mainCategory)
  }, [mainCategory])
}
