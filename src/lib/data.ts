import { Listing, Category } from './types'

export const CATEGORIES: { id: Category; name: string; description: string }[] = [
  {
    id: 'cars',
    name: 'Cars',
    description: 'Browse our selection of automobiles'
  },
  {
    id: 'motorcycles',
    name: 'Motorcycles',
    description: 'Find your perfect bike'
  },
  {
    id: 'trucks',
    name: 'Trucks',
    description: 'Heavy duty and commercial vehicles'
  },
  {
    id: 'rvs',
    name: 'RVs & Campers',
    description: 'Recreational vehicles and motorhomes'
  },
  {
    id: 'parts',
    name: 'Parts & Accessories',
    description: 'Auto parts and accessories'
  }
]

export const SAMPLE_LISTINGS: Listing[] = [
  {
    id: 'demo-1',
    userId: 'demo-user',
    category: 'cars',
    status: 'active',
    title: '2022 Tesla Model 3 Long Range',
    description: 'Excellent condition electric sedan with autopilot, premium interior, and long range battery. One owner, well maintained.',
    price: 42500,
    location: 'Los Angeles, CA',
    images: ['https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    views: 234,
    isFeatured: true,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2022,
    mileage: 15000,
    fuelType: 'Electric',
    transmission: 'Automatic',
    condition: 'used',
    bodyType: 'Sedan',
    color: 'Pearl White'
  },
  {
    id: 'demo-2',
    userId: 'demo-user',
    category: 'cars',
    status: 'active',
    title: '2024 BMW M4 Competition',
    description: 'Brand new M4 with competition package, carbon fiber trim, M Sport exhaust, and premium sound system.',
    price: 82000,
    location: 'Miami, FL',
    images: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&auto=format'],
    createdAt: '2024-01-14T14:30:00Z',
    updatedAt: '2024-01-14T14:30:00Z',
    views: 456,
    isFeatured: true,
    brand: 'BMW',
    model: 'M4',
    year: 2024,
    mileage: 120,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'new',
    bodyType: 'Coupe',
    engineSize: '3.0L I6',
    color: 'Isle of Man Green'
  },
  {
    id: 'demo-3',
    userId: 'demo-user',
    category: 'motorcycles',
    status: 'active',
    title: '2023 Ducati Panigale V4 S',
    description: 'Superbike with electronic suspension, quick shifter, and full Akrapovic exhaust. Track ready.',
    price: 28900,
    location: 'Austin, TX',
    images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format'],
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    views: 189,
    brand: 'Ducati',
    model: 'Panigale V4 S',
    year: 2023,
    mileage: 2400,
    fuelType: 'Gasoline',
    transmission: 'Manual',
    condition: 'used',
    engineSize: '1103cc',
    color: 'Ducati Red'
  },
  {
    id: 'demo-4',
    userId: 'demo-user',
    category: 'trucks',
    status: 'active',
    title: '2021 Ford F-150 Raptor',
    description: 'Off-road beast with Fox Racing shocks, 450hp EcoBoost V6, and leather interior. Perfect for adventures.',
    price: 65000,
    location: 'Denver, CO',
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format'],
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-12T16:45:00Z',
    views: 312,
    isFeatured: true,
    brand: 'Ford',
    model: 'F-150 Raptor',
    year: 2021,
    mileage: 28000,
    fuelType: 'Gasoline',
    transmission: 'Automatic',
    condition: 'used',
    bodyType: 'Pickup',
    engineSize: '3.5L V6',
    color: 'Velocity Blue'
  },
  {
    id: 'demo-5',
    userId: 'demo-user',
    category: 'rvs',
    status: 'active',
    title: '2023 Airstream Flying Cloud 30FB',
    description: 'Luxury travel trailer with modern amenities, full kitchen, bathroom, and sleeping for 4. Like new condition.',
    price: 125000,
    location: 'Portland, OR',
    images: ['https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=800&auto=format'],
    createdAt: '2024-01-11T11:20:00Z',
    updatedAt: '2024-01-11T11:20:00Z',
    views: 167,
    brand: 'Airstream',
    model: 'Flying Cloud',
    year: 2023,
    mileage: 3000,
    condition: 'used',
    color: 'Silver'
  },
  {
    id: 'demo-6',
    userId: 'demo-user',
    category: 'parts',
    status: 'active',
    title: 'Performance Exhaust System - Universal Fit',
    description: 'Stainless steel cat-back exhaust system. Improves sound and performance. Fits most sedans and coupes.',
    price: 850,
    location: 'Chicago, IL',
    images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&auto=format'],
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
    views: 89,
    partType: 'Exhaust',
    partCondition: 'new',
    compatibility: 'Universal'
  }
]

export const BRANDS_BY_CATEGORY: Record<Category, string[]> = {
  cars: ['Acura', 'Audi', 'BMW', 'Chevrolet', 'Ford', 'Honda', 'Hyundai', 'Lexus', 'Mercedes-Benz', 'Nissan', 'Porsche', 'Tesla', 'Toyota', 'Volkswagen'],
  motorcycles: ['BMW', 'Ducati', 'Harley-Davidson', 'Honda', 'Kawasaki', 'KTM', 'Suzuki', 'Triumph', 'Yamaha'],
  trucks: ['Chevrolet', 'Dodge', 'Ford', 'GMC', 'RAM', 'Toyota'],
  rvs: ['Airstream', 'Forest River', 'Jayco', 'Thor', 'Winnebago'],
  parts: ['ACDelco', 'Bosch', 'Denso', 'OEM', 'Performance', 'Universal']
}

export const FUEL_TYPES = ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'Plug-in Hybrid']
export const TRANSMISSIONS = ['Automatic', 'Manual', 'CVT', 'Semi-Automatic']
export const CONDITIONS = ['New', 'Used', 'Certified Pre-Owned']
export const BODY_TYPES = ['Sedan', 'SUV', 'Coupe', 'Convertible', 'Wagon', 'Hatchback', 'Pickup', 'Van']

export const MOCK_VEHICLES: any[] = []
export const MOCK_ANNOUNCEMENTS: any[] = []
