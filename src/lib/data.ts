import { Vehicle, Announcement } from './types'

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

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Grand Opening of Our New Beverly Hills Showroom',
    category: 'event',
    date: '2024-12-15',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80',
    excerpt: 'Join us for the grand opening of our state-of-the-art showroom featuring an exclusive collection of luxury vehicles.',
    content: 'We are thrilled to announce the grand opening of our new flagship showroom in Beverly Hills. This state-of-the-art facility spans over 25,000 square feet and showcases our most exclusive collection of premium vehicles. Join us on December 15th for champagne, live music, and special unveiling events throughout the day.',
    isPinned: true
  },
  {
    id: 'ann-2',
    title: 'New 2024 GT Sport Turbo Now Available',
    category: 'new-arrival',
    date: '2024-12-10',
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80',
    excerpt: 'The highly anticipated GT Sport Turbo has arrived. Experience 450 horsepower of pure automotive excellence.',
    content: 'The wait is over! The all-new 2024 GT Sport Turbo has arrived at our showroom. Featuring a 3.0L twin-turbo V6 engine producing 450 horsepower, this masterpiece accelerates from 0-60 mph in just 3.8 seconds. Schedule your test drive today and experience the perfect blend of power and refinement.',
    isPinned: true
  },
  {
    id: 'ann-3',
    title: 'Holiday Sale - Up to 15% Off Select Models',
    category: 'promotion',
    date: '2024-12-01',
    image: 'https://images.unsplash.com/photo-1607603750916-e102b4f3921b?w=800&q=80',
    excerpt: 'Celebrate the season with exceptional savings on our premium inventory. Limited time offer on select 2024 models.',
    content: 'This holiday season, take advantage of our biggest sale of the year! Save up to 15% on select 2024 models, plus enjoy special financing rates as low as 2.9% APR for qualified buyers. Offer valid through December 31st. Visit our showroom or contact our sales team to learn more about eligible vehicles and financing options.',
    isPinned: true
  },
  {
    id: 'ann-4',
    title: 'AUTOSITE Wins Luxury Dealer of the Year Award',
    category: 'news',
    date: '2024-11-28',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80',
    excerpt: 'We are honored to receive the prestigious Luxury Dealer of the Year award from the National Auto Dealers Association.',
    content: 'AUTOSITE has been recognized as the Luxury Dealer of the Year by the National Auto Dealers Association. This prestigious award acknowledges our commitment to excellence in customer service, quality inventory, and community engagement. Thank you to our valued customers for making this achievement possible.'
  },
  {
    id: 'ann-5',
    title: 'Extended Service Hours for the Holidays',
    category: 'service',
    date: '2024-11-25',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80',
    excerpt: 'We are extending our service department hours throughout the holiday season for your convenience.',
    content: 'To better serve you during the busy holiday season, our service department will be extending its hours. Starting December 1st through January 15th, we will be open Monday through Saturday from 7:00 AM to 9:00 PM, and Sundays from 9:00 AM to 6:00 PM. Schedule your service appointment online or call us directly.'
  },
  {
    id: 'ann-6',
    title: 'EcoLux Electric Vehicles: The Future is Here',
    category: 'new-arrival',
    date: '2024-11-20',
    image: 'https://images.unsplash.com/photo-1617654112368-307921291f42?w=800&q=80',
    excerpt: 'Introducing our expanded electric vehicle lineup with cutting-edge technology and zero emissions.',
    content: 'Join the electric revolution with our new EcoLux Electric lineup. Experience the future of sustainable luxury with up to 405 miles of range, lightning-fast acceleration, and cutting-edge autopilot technology. Plus, take advantage of available federal tax credits up to $7,500. Book your test drive today.'
  },
  {
    id: 'ann-7',
    title: 'Exclusive VIP Customer Appreciation Event',
    category: 'event',
    date: '2024-11-15',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    excerpt: 'Join us for an exclusive evening celebrating our valued customers with luxury experiences and special previews.',
    content: 'You are invited to our exclusive VIP Customer Appreciation Event on November 15th. Enjoy an elegant evening featuring gourmet cuisine, premium cocktails, live entertainment, and the first look at our upcoming 2025 model releases. RSVP required. Limited to 100 guests.'
  },
  {
    id: 'ann-8',
    title: 'New Trade-In Program Offers Maximum Value',
    category: 'promotion',
    date: '2024-11-10',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    excerpt: 'Get top dollar for your current vehicle with our enhanced trade-in program and instant online appraisals.',
    content: 'Our new Enhanced Trade-In Program makes upgrading easier than ever. Get an instant online appraisal, receive competitive offers above market value, and enjoy a streamlined process with same-day approvals. Visit our website to get your free vehicle appraisal in minutes, or bring your vehicle to our showroom for an in-person evaluation.'
  },
  {
    id: 'ann-9',
    title: 'AUTOSITE Partners with Local Charities',
    category: 'news',
    date: '2024-11-05',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
    excerpt: 'We are proud to announce our partnership with three local charities supporting education and community development.',
    content: 'As part of our commitment to giving back, AUTOSITE is proud to partner with three outstanding local charities focused on education and community development. For every vehicle sold this quarter, we will donate $500 to support youth education programs, community arts initiatives, and environmental conservation efforts.'
  },
  {
    id: 'ann-10',
    title: 'Winter Tire Package Special Offer',
    category: 'service',
    date: '2024-10-28',
    image: 'https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800&q=80',
    excerpt: 'Prepare for winter driving with our complete tire package including installation and seasonal storage.',
    content: 'Stay safe this winter with our comprehensive winter tire package. Purchase a complete set of premium winter tires and receive free installation, balancing, and seasonal storage. Package includes tire rotation and pressure checks. Offer valid through November 30th. Contact our service department to schedule your appointment.'
  },
  {
    id: 'ann-11',
    title: 'Introducing Our Online Vehicle Reservation System',
    category: 'news',
    date: '2024-10-20',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    excerpt: 'Reserve your dream vehicle online with our new digital reservation platform. Simple, secure, and convenient.',
    content: 'Shopping for your next vehicle is now easier than ever with our new online reservation system. Browse our inventory, select your preferred vehicle, and reserve it with a fully refundable deposit—all from the comfort of your home. Your reserved vehicle will be held for 48 hours while you arrange financing and schedule your visit.'
  },
  {
    id: 'ann-12',
    title: 'Meet Our New General Manager, Sarah Johnson',
    category: 'news',
    date: '2024-10-15',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    excerpt: 'We are excited to welcome Sarah Johnson as our new General Manager, bringing 15 years of luxury automotive experience.',
    content: 'Please join us in welcoming Sarah Johnson as AUTOSITE\'s new General Manager. Sarah brings 15 years of experience in luxury automotive retail, with a proven track record of excellence in customer satisfaction and team development. "I am thrilled to join the AUTOSITE family and look forward to continuing our tradition of exceptional service," says Sarah.'
  }
]
