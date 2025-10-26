import { useState, useMemo } from 'react'
import { MOCK_ANNOUNCEMENTS } from '@/lib/data'
import { Announcement } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { motion } from 'framer-motion'
import { 
  Megaphone, 
  MagnifyingGlass, 
  CalendarBlank, 
  Tag,
  Funnel,
  X,
  PushPin
} from '@phosphor-icons/react'

const categoryLabels: Record<Announcement['category'], { label: string; color: string }> = {
  'new-arrival': { label: 'New Arrival', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' },
  'promotion': { label: 'Promotion', color: 'bg-amber-500/10 text-amber-700 border-amber-500/20' },
  'event': { label: 'Event', color: 'bg-purple-500/10 text-purple-700 border-purple-500/20' },
  'news': { label: 'News', color: 'bg-blue-500/10 text-blue-700 border-blue-500/20' },
  'service': { label: 'Service', color: 'bg-slate-500/10 text-slate-700 border-slate-500/20' }
}

export function Announcements() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredAnnouncements = useMemo(() => {
    let filtered = MOCK_ANNOUNCEMENTS

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(ann => 
        ann.title.toLowerCase().includes(query) ||
        ann.excerpt.toLowerCase().includes(query) ||
        ann.content.toLowerCase().includes(query)
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(ann => ann.category === selectedCategory)
    }

    return filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [searchQuery, selectedCategory])

  const handleAnnouncementClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement)
    setDialogOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
  }

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (searchQuery) count++
    if (selectedCategory !== 'all') count++
    return count
  }, [searchQuery, selectedCategory])

  return (
    <>
      <div className="min-h-screen pt-20 pb-24">
        <div className="bg-gradient-to-br from-primary via-primary to-purple-950 text-primary-foreground py-16 px-6 md:px-12 lg:px-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Megaphone size={48} weight="duotone" className="text-accent" />
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                  Announcements
                </h1>
              </div>
              <p className="text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
                Stay updated with the latest news, events, promotions, and new arrivals from AUTOSITE.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-24 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              <aside className="lg:col-span-1 space-y-6">
                <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Funnel size={24} weight="duotone" className="text-accent" />
                      <h2 className="text-xl font-bold">Filter</h2>
                    </div>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs h-8"
                      >
                        <X size={14} className="mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Search</Label>
                      <div className="relative">
                        <MagnifyingGlass 
                          size={18} 
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                        />
                        <Input
                          type="text"
                          placeholder="Search announcements..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 h-11 rounded-xl"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-3 block">Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="h-11 rounded-xl">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="new-arrival">New Arrivals</SelectItem>
                          <SelectItem value="promotion">Promotions</SelectItem>
                          <SelectItem value="event">Events</SelectItem>
                          <SelectItem value="news">News</SelectItem>
                          <SelectItem value="service">Service Updates</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Total</span>
                          <span className="font-semibold">{MOCK_ANNOUNCEMENTS.length}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Filtered</span>
                          <span className="font-semibold text-accent">{filteredAnnouncements.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>

              <div className="lg:col-span-3">
                <div className="mb-8">
                  <p className="text-lg font-semibold">
                    {filteredAnnouncements.length} {filteredAnnouncements.length === 1 ? 'Announcement' : 'Announcements'}
                  </p>
                </div>

                {filteredAnnouncements.length === 0 ? (
                  <div className="text-center py-24 bg-card rounded-3xl border border-border">
                    <Megaphone size={80} weight="duotone" className="text-muted-foreground mx-auto mb-6 opacity-40" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">No announcements found</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Try adjusting your filters or search query.
                    </p>
                    <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                      <X size={18} className="mr-2" />
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredAnnouncements.map((announcement, index) => (
                      <motion.div
                        key={announcement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                      >
                        <Card 
                          className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-accent/30 group relative"
                          onClick={() => handleAnnouncementClick(announcement)}
                        >
                          {announcement.isPinned && (
                            <div className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground rounded-full p-2 shadow-lg">
                              <PushPin size={18} weight="fill" />
                            </div>
                          )}
                          <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-1 relative h-64 md:h-auto overflow-hidden">
                              <img 
                                src={announcement.image} 
                                alt={announcement.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                            <div className="md:col-span-2 p-6 md:py-6 md:pr-6 md:pl-0">
                              <CardHeader className="p-0 mb-4">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                  <Badge 
                                    variant="outline" 
                                    className={`${categoryLabels[announcement.category].color} border font-medium`}
                                  >
                                    <Tag size={14} className="mr-1" weight="fill" />
                                    {categoryLabels[announcement.category].label}
                                  </Badge>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarBlank size={16} weight="duotone" />
                                    {formatDate(announcement.date)}
                                  </div>
                                </div>
                                <CardTitle className="text-2xl mb-2 group-hover:text-accent transition-colors">
                                  {announcement.title}
                                </CardTitle>
                                <CardDescription className="text-base leading-relaxed">
                                  {announcement.excerpt}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="p-0">
                                <Button 
                                  variant="outline" 
                                  className="rounded-xl group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all"
                                >
                                  Read More
                                </Button>
                              </CardContent>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedAnnouncement && (
            <>
              <DialogHeader>
                <div className="mb-4">
                  <img 
                    src={selectedAnnouncement.image} 
                    alt={selectedAnnouncement.title}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <Badge 
                    variant="outline" 
                    className={`${categoryLabels[selectedAnnouncement.category].color} border font-medium`}
                  >
                    <Tag size={14} className="mr-1" weight="fill" />
                    {categoryLabels[selectedAnnouncement.category].label}
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarBlank size={16} weight="duotone" />
                    {formatDate(selectedAnnouncement.date)}
                  </div>
                </div>
                <DialogTitle className="text-3xl mb-4">
                  {selectedAnnouncement.title}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {selectedAnnouncement.excerpt}
                </p>
                <div className="h-px bg-border" />
                <p className="text-base leading-relaxed whitespace-pre-line">
                  {selectedAnnouncement.content}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
