import { useMemo } from 'react'
import {
  type MainCategory,
  type VehicleSubCategory,
  getSubCategoriesByMainCategory,
} from '@/lib/vehicleSubCategories'

export function useVehicleSubCategories(mainCategory: MainCategory | null): VehicleSubCategory[] {
  return useMemo(() => {
    if (!mainCategory) return []
    return getSubCategoriesByMainCategory(mainCategory)
  }, [mainCategory])
}
