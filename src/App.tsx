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

      <section id="vehicles" className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No vehicles match your filters</p>
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

      <footer className="bg-primary text-primary-foreground py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-2">AUTOSITE</h3>
          <p className="text-primary-foreground/80 mb-6">Premium Automotive Excellence</p>
          <p className="text-sm text-primary-foreground/60">
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