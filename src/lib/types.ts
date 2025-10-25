export interface Vehicle {
  id: string
  name: string
  brand: string
  type: 'sedan' | 'suv' | 'coupe' | 'sports' | 'electric'
  year: number
  price: number
  image: string
  images: string[]
  description: string
  specs: {
    engine: string
    horsepower: number
    torque: string
    transmission: string
    acceleration: string
    topSpeed: string
    fuelEconomy: string
  }
  features: string[]
  colors: VehicleColor[]
  isNew?: boolean
  isFeatured?: boolean
}

export interface VehicleColor {
  name: string
  hex: string
  image?: string
}

export interface VehicleConfiguration {
  vehicleId: string
  color: string
  wheels?: string
  interior?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  vehicleId?: string
}
