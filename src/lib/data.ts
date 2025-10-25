import { Vehicle } from './types'

export const MOCK_VEHICLES: Vehicle[] = [
  {
    id: '1',
    name: 'GT Sport Turbo',
    brand: 'Velocity',
    type: 'sports',
    year: 2024,
    price: 89900,
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80',
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=1200&q=80',
      'https://images.unsplash.com/photo-1616788494672-ec7598a1ba5b?w=1200&q=80'
    ],
    description: 'Experience pure driving exhilaration with the GT Sport Turbo. This masterpiece of automotive engineering combines raw power with refined elegance.',
    specs: {
      engine: '3.0L Twin-Turbo V6',
      horsepower: 450,
      torque: '406 lb-ft',
      transmission: '8-Speed Dual-Clutch',
      acceleration: '0-60 mph in 3.8s',
      topSpeed: '180 mph',
      fuelEconomy: '19/26 mpg'
    },
    features: [
      'Adaptive Sport Suspension',
      'Performance Brake System',
      'Carbon Fiber Aerodynamics',
      'Premium Audio System',
      'Advanced Driver Assistance'
    ],
    colors: [
      { name: 'Midnight Black', hex: '#0a0a0a' },
      { name: 'Racing Red', hex: '#c41e3a' },
      { name: 'Pearl White', hex: '#f8f8f8' }
    ],
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'EcoLux Electric',
    brand: 'Tesla',
    type: 'electric',
    year: 2024,
    price: 74900,
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617654112368-307921291f42?w=1200&q=80',
      'https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=1200&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80'
    ],
    description: 'The future of sustainable luxury. Zero emissions, maximum performance, and cutting-edge technology in a stunning package.',
    specs: {
      engine: 'Dual Electric Motors',
      horsepower: 670,
      torque: '713 lb-ft',
      transmission: 'Single-Speed Automatic',
      acceleration: '0-60 mph in 3.1s',
      topSpeed: '155 mph',
      fuelEconomy: '120 MPGe'
    },
    features: [
      '405-mile Range',
      'Autopilot Included',
      'Premium Interior',
      'Supercharger Access',
      'Over-the-Air Updates'
    ],
    colors: [
      { name: 'Deep Blue Metallic', hex: '#1e3a5f' },
      { name: 'Silver Metallic', hex: '#c0c0c0' },
      { name: 'Red Multi-Coat', hex: '#8b0000' }
    ],
    isNew: true,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Urban Elite SUV',
    brand: 'Range Rover',
    type: 'suv',
    year: 2024,
    price: 95500,
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80',
      'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?w=1200&q=80'
    ],
    description: 'Command every journey with the Urban Elite SUV. Uncompromising luxury meets unparalleled capability.',
    specs: {
      engine: '3.6L Supercharged V6',
      horsepower: 395,
      torque: '406 lb-ft',
      transmission: '9-Speed Automatic',
      acceleration: '0-60 mph in 5.4s',
      topSpeed: '140 mph',
      fuelEconomy: '18/23 mpg'
    },
    features: [
      'All-Wheel Drive',
      'Terrain Response System',
      'Panoramic Sunroof',
      'Luxury Leather Interior',
      '360° Camera System'
    ],
    colors: [
      { name: 'Carpathian Grey', hex: '#4a5568' },
      { name: 'Santorini Black', hex: '#1a1a1a' },
      { name: 'Fuji White', hex: '#f5f5f5' }
    ],
    isFeatured: true
  },
  {
    id: '4',
    name: 'Executive Sedan Pro',
    brand: 'BMW',
    type: 'sedan',
    year: 2024,
    price: 67900,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80',
      'https://images.unsplash.com/photo-1617531653520-bd4c47949cd3?w=1200&q=80',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1200&q=80'
    ],
    description: 'Refined elegance for the discerning professional. The Executive Sedan Pro delivers sophistication and performance in perfect harmony.',
    specs: {
      engine: '2.0L Turbocharged I4',
      horsepower: 255,
      torque: '295 lb-ft',
      transmission: '8-Speed Automatic',
      acceleration: '0-60 mph in 5.9s',
      topSpeed: '130 mph',
      fuelEconomy: '23/33 mpg'
    },
    features: [
      'Adaptive Cruise Control',
      'Premium Sound System',
      'Heated & Ventilated Seats',
      'Wireless Charging',
      'Digital Cockpit Display'
    ],
    colors: [
      { name: 'Sophisto Grey', hex: '#6b7280' },
      { name: 'Alpine White', hex: '#ffffff' },
      { name: 'Carbon Black', hex: '#111827' }
    ]
  },
  {
    id: '5',
    name: 'Prestige Coupe',
    brand: 'Mercedes',
    type: 'coupe',
    year: 2024,
    price: 82900,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1200&q=80',
      'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1200&q=80'
    ],
    description: 'Style meets substance in the Prestige Coupe. A testament to automotive artistry and engineering excellence.',
    specs: {
      engine: '3.0L Twin-Turbo I6',
      horsepower: 382,
      torque: '369 lb-ft',
      transmission: '9-Speed Automatic',
      acceleration: '0-60 mph in 4.4s',
      topSpeed: '155 mph',
      fuelEconomy: '21/28 mpg'
    },
    features: [
      'Sport Exhaust System',
      'AMG Performance Package',
      'Luxury Interior Trim',
      'Advanced Infotainment',
      'LED Matrix Headlights'
    ],
    colors: [
      { name: 'Designo Diamond White', hex: '#f0f0f0' },
      { name: 'Obsidian Black', hex: '#0f0f0f' },
      { name: 'Brilliant Blue', hex: '#2563eb' }
    ],
    isNew: true
  },
  {
    id: '6',
    name: 'Adventure X Pro',
    brand: 'Jeep',
    type: 'suv',
    year: 2024,
    price: 58900,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80'
    ],
    description: 'Built for those who refuse to be limited. The Adventure X Pro conquers any terrain while providing premium comfort.',
    specs: {
      engine: '2.0L Turbocharged I4',
      horsepower: 270,
      torque: '295 lb-ft',
      transmission: '8-Speed Automatic',
      acceleration: '0-60 mph in 6.3s',
      topSpeed: '124 mph',
      fuelEconomy: '20/25 mpg'
    },
    features: [
      '4x4 Off-Road Capability',
      'Trail Rated Badge',
      'Skid Plates & Tow Hooks',
      'All-Weather Floor Mats',
      'Uconnect Touchscreen'
    ],
    colors: [
      { name: 'Granite Crystal', hex: '#3f3f46' },
      { name: 'Firecracker Red', hex: '#dc2626' },
      { name: 'Bright White', hex: '#fafafa' }
    ]
  }
]
