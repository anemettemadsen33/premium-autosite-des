export type MainCategory = 
  | 'Car'
  | 'Motorbike'
  | 'VanUpTo7500'
  | 'TruckOver7500'
  | 'ConstructionMachine'
  | 'AgriculturalVehicle'
  | 'Trailer'
  | 'Caravan'
  | 'SemiTrailer'
  | 'Parts'

export type VehicleSubCategoryCode = 
  | 'Car.SmallCar'
  | 'Car.Cabrio'
  | 'Car.Sedan'
  | 'Car.Coupe'
  | 'Car.SUV'
  | 'Car.Estate'
  | 'Car.Van'
  | 'Car.OffRoad'
  | 'Car.SportsCar'
  | 'Car.Other'
  | 'Motorbike.Naked'
  | 'Motorbike.Touring'
  | 'Motorbike.Sport'
  | 'Motorbike.Enduro'
  | 'Motorbike.Scooter'
  | 'Motorbike.Chopper'
  | 'Motorbike.Quad'
  | 'Motorbike.Trike'
  | 'Motorbike.Classic'
  | 'Motorbike.Trial'
  | 'Motorbike.Cross'
  | 'Motorbike.Other'
  | 'VanUpTo7500.BoxBody'
  | 'VanUpTo7500.Chassis'
  | 'VanUpTo7500.ClosedBox'
  | 'VanUpTo7500.FlatbedDropside'
  | 'VanUpTo7500.Platform'
  | 'VanUpTo7500.Refrigerated'
  | 'VanUpTo7500.Tipper'
  | 'VanUpTo7500.WindowVan'
  | 'VanUpTo7500.Other'
  | 'TruckOver7500.BoxBody'
  | 'TruckOver7500.Chassis'
  | 'TruckOver7500.CurtainSider'
  | 'TruckOver7500.FlatbedDropside'
  | 'TruckOver7500.HookLift'
  | 'TruckOver7500.Refrigerated'
  | 'TruckOver7500.Tipper'
  | 'TruckOver7500.TankTruck'
  | 'TruckOver7500.CarTransporter'
  | 'TruckOver7500.Concrete'
  | 'TruckOver7500.Other'
  | 'ConstructionMachine.MiniExcavator'
  | 'ConstructionMachine.CrawlerExcavator'
  | 'ConstructionMachine.WheelExcavator'
  | 'ConstructionMachine.WheelLoader'
  | 'ConstructionMachine.Bulldozer'
  | 'ConstructionMachine.Grader'
  | 'ConstructionMachine.Roller'
  | 'ConstructionMachine.Dumper'
  | 'ConstructionMachine.TeleHandler'
  | 'ConstructionMachine.SkidSteer'
  | 'ConstructionMachine.Crane'
  | 'ConstructionMachine.Other'
  | 'AgriculturalVehicle.Tractor'
  | 'AgriculturalVehicle.CombineHarvester'
  | 'AgriculturalVehicle.Baler'
  | 'AgriculturalVehicle.Forage'
  | 'AgriculturalVehicle.Sprayer'
  | 'AgriculturalVehicle.Plough'
  | 'AgriculturalVehicle.Other'
  | 'Trailer.BoxTrailer'
  | 'Trailer.CarTransporter'
  | 'Trailer.CurtainSider'
  | 'Trailer.Flatbed'
  | 'Trailer.Refrigerated'
  | 'Trailer.Tipper'
  | 'Trailer.Other'
  | 'Caravan.Caravan'
  | 'Caravan.Motorhome'
  | 'Caravan.CamperVan'
  | 'Caravan.Other'
  | 'SemiTrailer.BoxBody'
  | 'SemiTrailer.CurtainSider'
  | 'SemiTrailer.Flatbed'
  | 'SemiTrailer.LowLoader'
  | 'SemiTrailer.Refrigerated'
  | 'SemiTrailer.Tipper'
  | 'SemiTrailer.TankTrailer'
  | 'SemiTrailer.CarTransporter'
  | 'SemiTrailer.Other'
  | 'Parts.Engine'
  | 'Parts.Transmission'
  | 'Parts.Suspension'
  | 'Parts.Brakes'
  | 'Parts.Exhaust'
  | 'Parts.Body'
  | 'Parts.Interior'
  | 'Parts.Electrical'
  | 'Parts.Wheels'
  | 'Parts.Other'

export interface VehicleSubCategory {
  code: VehicleSubCategoryCode
  label: string
  labelDe: string
  mainCategory: MainCategory
}

export const VEHICLE_SUB_CATEGORIES: VehicleSubCategory[] = [
  { code: 'Car.SmallCar', label: 'Small Car', labelDe: 'Kleinwagen', mainCategory: 'Car' },
  { code: 'Car.Cabrio', label: 'Convertible/Cabrio', labelDe: 'Cabrio', mainCategory: 'Car' },
  { code: 'Car.Sedan', label: 'Sedan/Saloon', labelDe: 'Limousine', mainCategory: 'Car' },
  { code: 'Car.Coupe', label: 'Coupe', labelDe: 'Coupé', mainCategory: 'Car' },
  { code: 'Car.SUV', label: 'SUV/Off-road', labelDe: 'SUV/Geländewagen', mainCategory: 'Car' },
  { code: 'Car.Estate', label: 'Estate/Station Wagon', labelDe: 'Kombi', mainCategory: 'Car' },
  { code: 'Car.Van', label: 'Van/Minibus', labelDe: 'Van/Kleinbus', mainCategory: 'Car' },
  { code: 'Car.OffRoad', label: 'Off-road', labelDe: 'Geländewagen', mainCategory: 'Car' },
  { code: 'Car.SportsCar', label: 'Sports Car', labelDe: 'Sportwagen', mainCategory: 'Car' },
  { code: 'Car.Other', label: 'Other', labelDe: 'Sonstige', mainCategory: 'Car' },

  { code: 'Motorbike.Naked', label: 'Naked Bike', labelDe: 'Naked Bike', mainCategory: 'Motorbike' },
  { code: 'Motorbike.Touring', label: 'Touring', labelDe: 'Tourer', mainCategory: 'Motorbike' },
  { code: 'Motorbike.Sport', label: 'Sport/Supersport', labelDe: 'Sportler/Supersportler', mainCategory: 'Motorbike' },
  { code: 'Motorbike.Enduro', label: 'Enduro', labelDe: 'Enduro', mainCategory: 'Motorbike' },
  { code: 'Motorbike.Scooter', label: 'Scooter', labelDe: 'Roller', mainCategory: 'Motorbike' },
  { code: 'Motorbike.Chopper', label: 'Chopper/Cruiser', labelDe: 'Chopper/Cruiser', mainCategory: 'Motorbike' },
  { code: 'Motorbike.Quad', label: 'Quad/ATV', labelDe: 'Quad/ATV', mainCategory: 'Motorbike' },
  { code: 'Motorbike.Trike', label: 'Trike', labelDe: 'Trike', mainCategory: 'Motorbike' },
  { code: 'Motorbike.Classic', label: 'Classic/Oldtimer', labelDe: 'Oldtimer', mainCategory: 'Motorbike' },
  { code: 'Motorbike.Trial', label: 'Trial', labelDe: 'Trial', mainCategory: 'Motorbike' },
  { code: 'Motorbike.Cross', label: 'Motocross', labelDe: 'Motocross', mainCategory: 'Motorbike' },
  { code: 'Motorbike.Other', label: 'Other', labelDe: 'Sonstige', mainCategory: 'Motorbike' },

  { code: 'VanUpTo7500.BoxBody', label: 'Box Body', labelDe: 'Koffer', mainCategory: 'VanUpTo7500' },
  { code: 'VanUpTo7500.Chassis', label: 'Chassis Cab', labelDe: 'Fahrgestell', mainCategory: 'VanUpTo7500' },
  { code: 'VanUpTo7500.ClosedBox', label: 'Closed Box', labelDe: 'Geschlossener Kasten', mainCategory: 'VanUpTo7500' },
  { code: 'VanUpTo7500.FlatbedDropside', label: 'Flatbed/Dropside', labelDe: 'Pritsche/Plane', mainCategory: 'VanUpTo7500' },
  { code: 'VanUpTo7500.Platform', label: 'Platform', labelDe: 'Pritsche', mainCategory: 'VanUpTo7500' },
  { code: 'VanUpTo7500.Refrigerated', label: 'Refrigerated', labelDe: 'Kühlwagen', mainCategory: 'VanUpTo7500' },
  { code: 'VanUpTo7500.Tipper', label: 'Tipper', labelDe: 'Kipper', mainCategory: 'VanUpTo7500' },
  { code: 'VanUpTo7500.WindowVan', label: 'Window Van', labelDe: 'Kastenwagen', mainCategory: 'VanUpTo7500' },
  { code: 'VanUpTo7500.Other', label: 'Other', labelDe: 'Sonstige', mainCategory: 'VanUpTo7500' },

  { code: 'TruckOver7500.BoxBody', label: 'Box Body', labelDe: 'Koffer', mainCategory: 'TruckOver7500' },
  { code: 'TruckOver7500.Chassis', label: 'Chassis Cab', labelDe: 'Fahrgestell', mainCategory: 'TruckOver7500' },
  { code: 'TruckOver7500.CurtainSider', label: 'Curtain Sider', labelDe: 'Plane', mainCategory: 'TruckOver7500' },
  { code: 'TruckOver7500.FlatbedDropside', label: 'Flatbed/Dropside', labelDe: 'Pritsche', mainCategory: 'TruckOver7500' },
  { code: 'TruckOver7500.HookLift', label: 'Hook Lift', labelDe: 'Abrollkipper', mainCategory: 'TruckOver7500' },
  { code: 'TruckOver7500.Refrigerated', label: 'Refrigerated', labelDe: 'Kühlwagen', mainCategory: 'TruckOver7500' },
  { code: 'TruckOver7500.Tipper', label: 'Tipper', labelDe: 'Kipper', mainCategory: 'TruckOver7500' },
  { code: 'TruckOver7500.TankTruck', label: 'Tank Truck', labelDe: 'Tankwagen', mainCategory: 'TruckOver7500' },
  { code: 'TruckOver7500.CarTransporter', label: 'Car Transporter', labelDe: 'Autotransporter', mainCategory: 'TruckOver7500' },
  { code: 'TruckOver7500.Concrete', label: 'Concrete Mixer', labelDe: 'Betonmischer', mainCategory: 'TruckOver7500' },
  { code: 'TruckOver7500.Other', label: 'Other', labelDe: 'Sonstige', mainCategory: 'TruckOver7500' },

  { code: 'ConstructionMachine.MiniExcavator', label: 'Mini Excavator', labelDe: 'Minibagger', mainCategory: 'ConstructionMachine' },
  { code: 'ConstructionMachine.CrawlerExcavator', label: 'Crawler Excavator', labelDe: 'Raupenbagger', mainCategory: 'ConstructionMachine' },
  { code: 'ConstructionMachine.WheelExcavator', label: 'Wheel Excavator', labelDe: 'Mobilbagger', mainCategory: 'ConstructionMachine' },
  { code: 'ConstructionMachine.WheelLoader', label: 'Wheel Loader', labelDe: 'Radlader', mainCategory: 'ConstructionMachine' },
  { code: 'ConstructionMachine.Bulldozer', label: 'Bulldozer', labelDe: 'Planierraupe', mainCategory: 'ConstructionMachine' },
  { code: 'ConstructionMachine.Grader', label: 'Grader', labelDe: 'Grader', mainCategory: 'ConstructionMachine' },
  { code: 'ConstructionMachine.Roller', label: 'Roller/Compactor', labelDe: 'Walze', mainCategory: 'ConstructionMachine' },
  { code: 'ConstructionMachine.Dumper', label: 'Dumper', labelDe: 'Dumper', mainCategory: 'ConstructionMachine' },
  { code: 'ConstructionMachine.TeleHandler', label: 'Telehandler', labelDe: 'Teleskoplader', mainCategory: 'ConstructionMachine' },
  { code: 'ConstructionMachine.SkidSteer', label: 'Skid Steer Loader', labelDe: 'Kompaktlader', mainCategory: 'ConstructionMachine' },
  { code: 'ConstructionMachine.Crane', label: 'Crane', labelDe: 'Kran', mainCategory: 'ConstructionMachine' },
  { code: 'ConstructionMachine.Other', label: 'Other', labelDe: 'Sonstige', mainCategory: 'ConstructionMachine' },

  { code: 'AgriculturalVehicle.Tractor', label: 'Tractor', labelDe: 'Traktor', mainCategory: 'AgriculturalVehicle' },
  { code: 'AgriculturalVehicle.CombineHarvester', label: 'Combine Harvester', labelDe: 'Mähdrescher', mainCategory: 'AgriculturalVehicle' },
  { code: 'AgriculturalVehicle.Baler', label: 'Baler', labelDe: 'Ballenpresse', mainCategory: 'AgriculturalVehicle' },
  { code: 'AgriculturalVehicle.Forage', label: 'Forage Harvester', labelDe: 'Feldhäcksler', mainCategory: 'AgriculturalVehicle' },
  { code: 'AgriculturalVehicle.Sprayer', label: 'Sprayer', labelDe: 'Feldspritze', mainCategory: 'AgriculturalVehicle' },
  { code: 'AgriculturalVehicle.Plough', label: 'Plough/Plow', labelDe: 'Pflug', mainCategory: 'AgriculturalVehicle' },
  { code: 'AgriculturalVehicle.Other', label: 'Other', labelDe: 'Sonstige', mainCategory: 'AgriculturalVehicle' },

  { code: 'Trailer.BoxTrailer', label: 'Box Trailer', labelDe: 'Kofferanhänger', mainCategory: 'Trailer' },
  { code: 'Trailer.CarTransporter', label: 'Car Transporter', labelDe: 'Autotransporter', mainCategory: 'Trailer' },
  { code: 'Trailer.CurtainSider', label: 'Curtain Sider', labelDe: 'Planenanhänger', mainCategory: 'Trailer' },
  { code: 'Trailer.Flatbed', label: 'Flatbed', labelDe: 'Pritschenanhänger', mainCategory: 'Trailer' },
  { code: 'Trailer.Refrigerated', label: 'Refrigerated', labelDe: 'Kühlanhänger', mainCategory: 'Trailer' },
  { code: 'Trailer.Tipper', label: 'Tipper', labelDe: 'Kipperanhänger', mainCategory: 'Trailer' },
  { code: 'Trailer.Other', label: 'Other', labelDe: 'Sonstige', mainCategory: 'Trailer' },

  { code: 'Caravan.Caravan', label: 'Caravan/Travel Trailer', labelDe: 'Wohnwagen', mainCategory: 'Caravan' },
  { code: 'Caravan.Motorhome', label: 'Motorhome/RV', labelDe: 'Wohnmobil', mainCategory: 'Caravan' },
  { code: 'Caravan.CamperVan', label: 'Camper Van', labelDe: 'Kastenwagen', mainCategory: 'Caravan' },
  { code: 'Caravan.Other', label: 'Other', labelDe: 'Sonstige', mainCategory: 'Caravan' },

  { code: 'SemiTrailer.BoxBody', label: 'Box Body', labelDe: 'Koffer', mainCategory: 'SemiTrailer' },
  { code: 'SemiTrailer.CurtainSider', label: 'Curtain Sider', labelDe: 'Plane', mainCategory: 'SemiTrailer' },
  { code: 'SemiTrailer.Flatbed', label: 'Flatbed', labelDe: 'Pritsche', mainCategory: 'SemiTrailer' },
  { code: 'SemiTrailer.LowLoader', label: 'Low Loader', labelDe: 'Tieflader', mainCategory: 'SemiTrailer' },
  { code: 'SemiTrailer.Refrigerated', label: 'Refrigerated', labelDe: 'Kühlauflieger', mainCategory: 'SemiTrailer' },
  { code: 'SemiTrailer.Tipper', label: 'Tipper', labelDe: 'Kipperauflieger', mainCategory: 'SemiTrailer' },
  { code: 'SemiTrailer.TankTrailer', label: 'Tank Trailer', labelDe: 'Tankauflieger', mainCategory: 'SemiTrailer' },
  { code: 'SemiTrailer.CarTransporter', label: 'Car Transporter', labelDe: 'Autotransporter', mainCategory: 'SemiTrailer' },
  { code: 'SemiTrailer.Other', label: 'Other', labelDe: 'Sonstige', mainCategory: 'SemiTrailer' },

  { code: 'Parts.Engine', label: 'Engine & Components', labelDe: 'Motor & Komponenten', mainCategory: 'Parts' },
  { code: 'Parts.Transmission', label: 'Transmission', labelDe: 'Getriebe', mainCategory: 'Parts' },
  { code: 'Parts.Suspension', label: 'Suspension', labelDe: 'Fahrwerk', mainCategory: 'Parts' },
  { code: 'Parts.Brakes', label: 'Brakes', labelDe: 'Bremsen', mainCategory: 'Parts' },
  { code: 'Parts.Exhaust', label: 'Exhaust System', labelDe: 'Abgasanlage', mainCategory: 'Parts' },
  { code: 'Parts.Body', label: 'Body Parts', labelDe: 'Karosserieteile', mainCategory: 'Parts' },
  { code: 'Parts.Interior', label: 'Interior', labelDe: 'Innenausstattung', mainCategory: 'Parts' },
  { code: 'Parts.Electrical', label: 'Electrical', labelDe: 'Elektrik', mainCategory: 'Parts' },
  { code: 'Parts.Wheels', label: 'Wheels & Tires', labelDe: 'Räder & Reifen', mainCategory: 'Parts' },
  { code: 'Parts.Other', label: 'Other Parts', labelDe: 'Sonstige Teile', mainCategory: 'Parts' },
]

export const MAIN_CATEGORIES: { code: MainCategory; label: string; labelDe: string }[] = [
  { code: 'Car', label: 'Cars', labelDe: 'Pkw' },
  { code: 'Motorbike', label: 'Motorcycles', labelDe: 'Motorräder' },
  { code: 'VanUpTo7500', label: 'Vans (up to 7.5t)', labelDe: 'Transporter (bis 7,5t)' },
  { code: 'TruckOver7500', label: 'Trucks (over 7.5t)', labelDe: 'Lkw (über 7,5t)' },
  { code: 'ConstructionMachine', label: 'Construction Machinery', labelDe: 'Baumaschinen' },
  { code: 'AgriculturalVehicle', label: 'Agricultural Vehicles', labelDe: 'Landmaschinen' },
  { code: 'Trailer', label: 'Trailers', labelDe: 'Anhänger' },
  { code: 'Caravan', label: 'Caravans & Motorhomes', labelDe: 'Wohnwagen & Wohnmobile' },
  { code: 'SemiTrailer', label: 'Semi-Trailers', labelDe: 'Auflieger' },
  { code: 'Parts', label: 'Parts & Accessories', labelDe: 'Teile & Zubehör' },
]

export function getSubCategoriesByMainCategory(mainCategory: MainCategory | null): VehicleSubCategory[] {
  if (!mainCategory) return []
  return VEHICLE_SUB_CATEGORIES.filter(sub => sub.mainCategory === mainCategory)
}

export function getMainCategoryByCode(code: MainCategory | null): { code: MainCategory; label: string; labelDe: string } | undefined {
  if (!code) return undefined
  return MAIN_CATEGORIES.find(cat => cat.code === code)
}

export function getSubCategoryByCode(code: VehicleSubCategoryCode | null): VehicleSubCategory | undefined {
  if (!code) return undefined
  return VEHICLE_SUB_CATEGORIES.find(sub => sub.code === code)
}

export function validateSubCategoryForMainCategory(
  mainCategory: MainCategory | null,
  subCategory: VehicleSubCategoryCode | null
): boolean {
  if (!mainCategory || !subCategory) return false
  const sub = getSubCategoryByCode(subCategory)
  return sub?.mainCategory === mainCategory
}
