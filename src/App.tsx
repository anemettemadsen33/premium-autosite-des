import { useState, useMemo } from 'react'
import { Hero } from '@/components/Hero'
import { VehicleCard } from '@/components/VehicleCard'
import { VehicleDetailModal } from '@/components/VehicleDetailModal'
import { ContactModal } from '@/components/ContactModal'
import { FilterBar } from '@/components/FilterBar'
import { MOCK_VEHICLES } from '@/lib/data'
import { Vehicle } from '@/lib/types'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [contactVehicle, setContactVehicle] = useState<Vehicle | null>(null)
  const [selectedType, setSelectedType] = useState('all')
  const [selectedSort, setSelectedSort] = useState('featured')

  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = MOCK_VEHICLES

    if (selectedType !== 'all') {
      filtered = filtered.filter(v => v.type === selectedType)
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        case 'year':
          return b.year - a.year
        case 'featured':
        default:
          if (a.isFeatured && !b.isFeatured) return -1
          if (!a.isFeatured && b.isFeatured) return 1
          return 0
      }
    })

    return sorted
  }, [selectedType, selectedSort])

  const handleVehicleClick = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setDetailModalOpen(true)
  }

  const handleContact = (vehicle: Vehicle) => {
    setContactVehicle(vehicle)
    setDetailModalOpen(false)
    setContactModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <section id="vehicles" className="px-6 md:px-12 lg:px-24 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Our Collection
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
              Browse our carefully curated selection of premium vehicles. Each one represents the pinnacle of automotive excellence.
            </p>
          </div>

          <FilterBar
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />

          {filteredAndSortedVehicles.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-xl text-muted-foreground mb-4 font-medium">No vehicles match your filters</p>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onClick={() => handleVehicleClick(vehicle)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gradient-to-br from-primary via-primary to-purple-950 text-primary-foreground py-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h3 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">AUTOSITE</h3>
          <p className="text-primary-foreground/70 mb-8 text-lg font-light tracking-wide">Premium Automotive Excellence</p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
          <p className="text-sm text-primary-foreground/50 font-medium tracking-wider">
            © 2024 AUTOSITE. All rights reserved.
          </p>
        </div>
      </footer>

      <VehicleDetailModal
        vehicle={selectedVehicle}
        open={detailModalOpen}
        onOpenChange={setDetailModalOpen}
        onContact={handleContact}
      />

      <ContactModal
        vehicle={contactVehicle}
        open={contactModalOpen}
        onOpenChange={setContactModalOpen}
      />

      <Toaster />
    </div>
  )
}

export default App