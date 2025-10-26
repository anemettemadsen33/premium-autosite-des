import { z } from 'zod'
import {
  type MainCategory,
  type VehicleSubCategoryCode,
  MAIN_CATEGORIES,
  VEHICLE_SUB_CATEGORIES,
  validateSubCategoryForMainCategory,
} from '@/lib/vehicleSubCategories'

const mainCategoryCodes = MAIN_CATEGORIES.map(cat => cat.code) as [MainCategory, ...MainCategory[]]
const subCategoryCodes = VEHICLE_SUB_CATEGORIES.map(sub => sub.code) as [VehicleSubCategoryCode, ...VehicleSubCategoryCode[]]

/**
 * Validation schema for vehicle category selection
 * Ensures that selected sub-category belongs to the selected main category
 */
export const vehicleCategorySchema = z.object({
  mainCategory: z.enum(mainCategoryCodes, {
    errorMap: () => ({ message: 'Please select a valid main category' })
  }),
  subCategory: z.enum(subCategoryCodes, {
    errorMap: () => ({ message: 'Please select a valid sub-category' })
  }).optional().nullable(),
}).refine(
  (data) => {
    if (!data.subCategory) return true
    return validateSubCategoryForMainCategory(data.mainCategory, data.subCategory)
  },
  {
    message: 'Sub-category must belong to the selected main category',
    path: ['subCategory'],
  }
)

/**
 * Comprehensive listing form validation schema
 * Includes all required fields and category validation
 */

export const listingFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.number().positive('Price must be a positive number'),
  location: z.string().min(2, 'Location is required'),
  
  mainCategory: z.enum(mainCategoryCodes, {
    errorMap: () => ({ message: 'Please select a valid main category' })
  }),
  subCategory: z.enum(subCategoryCodes, {
    errorMap: () => ({ message: 'Please select a valid sub-category' })
  }).optional().nullable(),
  
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  mileage: z.number().min(0).optional(),
  fuelType: z.string().optional(),
  transmission: z.string().optional(),
  condition: z.enum(['new', 'used', 'certified']).optional(),
  bodyType: z.string().optional(),
  engineSize: z.string().optional(),
  color: z.string().optional(),
}).refine(
  (data) => {
    if (!data.subCategory) return true
    return validateSubCategoryForMainCategory(data.mainCategory, data.subCategory)
  },
  {
    message: 'Sub-category must belong to the selected main category',
    path: ['subCategory'],
  }
)

export type VehicleCategoryFormData = z.infer<typeof vehicleCategorySchema>
export type ListingFormData = z.infer<typeof listingFormSchema>
