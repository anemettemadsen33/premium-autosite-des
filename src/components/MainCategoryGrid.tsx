import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MAIN_CATEGORIES, type MainCategory } from '@/lib/vehicleSubCategories'
import { useListings } from '@/lib/listings'
import { 
  Car, 
  Motorcycle, 
  Truck, 
  Tractor,
  Wrench,
  House,
  ArrowRight
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MainCategoryGridProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

const CATEGORY_ICONS: Record<MainCategory, any> = {
  'Car': Car,
  'Motorbike': Motorcycle,
  'VanUpTo7500': Truck,
  'TruckOver7500': Truck,
  'ConstructionMachine': Tractor,
  'AgriculturalVehicle': Tractor,
  'Trailer': Truck,
  'Caravan': House,
  'SemiTrailer': Truck,
  'Parts': Wrench,
}

const CATEGORY_COLORS: Record<MainCategory, string> = {
  'Car': 'from-blue-500 to-cyan-600',
  'Motorbike': 'from-orange-500 to-red-600',
  'VanUpTo7500': 'from-green-500 to-emerald-600',
  'TruckOver7500': 'from-indigo-500 to-purple-600',
  'ConstructionMachine': 'from-yellow-500 to-amber-600',
  'AgriculturalVehicle': 'from-lime-500 to-green-600',
  'Trailer': 'from-teal-500 to-cyan-600',
  'Caravan': 'from-pink-500 to-rose-600',
  'SemiTrailer': 'from-violet-500 to-purple-600',
  'Parts': 'from-gray-500 to-slate-600',
}

export function MainCategoryGrid({ onNavigate }: MainCategoryGridProps) {
  const { listings } = useListings()

  const getCategoryCount = (categoryCode: MainCategory): number => {
    return listings.filter(l => l.mainCategory === categoryCode).length
  }

  return (
    <div className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Browse by Category</h2>
          <p className="text-muted-foreground text-lg">
            Find exactly what you're looking for in our specialized categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {MAIN_CATEGORIES.map((category, index) => {
            const Icon = CATEGORY_ICONS[category.code]
            const count = getCategoryCount(category.code)

            return (
              <motion.div
                key={category.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  onClick={() => onNavigate('main-category', { mainCategory: category.code })}
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden border-2 hover:border-accent/50 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="relative">
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity rounded-xl",
                        CATEGORY_COLORS[category.code]
                      )} />
                      
                      <div className="relative">
                        <div className={cn(
                          "p-4 bg-gradient-to-br rounded-2xl mb-4 inline-flex",
                          CATEGORY_COLORS[category.code]
                        )}>
                          <Icon size={32} weight="duotone" className="text-white" />
                        </div>

                        <h3 className="font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                          {category.label}
                        </h3>

                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {count} listing{count !== 1 ? 's' : ''}
                          </Badge>
                          <ArrowRight 
                            size={18} 
                            className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" 
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
