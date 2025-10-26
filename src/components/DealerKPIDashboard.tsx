import { Eye, Cursor, Heart, ChatCircle, TrendUp, TrendDown } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { DealerKPI } from '@/lib/types'

interface DealerKPIDashboardProps {
  kpi: DealerKPI
}

export function DealerKPIDashboard({ kpi }: DealerKPIDashboardProps) {
  const kpis = [
    {
      label: 'Vizualizări',
      value: kpi.views,
      change: 12.5,
      icon: Eye,
      color: 'from-blue-400 to-cyan-500'
    },
    {
      label: 'Click-uri',
      value: kpi.clicks,
      change: 8.3,
      icon: Cursor,
      color: 'from-purple-400 to-pink-500'
    },
    {
      label: 'Salvări',
      value: kpi.saves,
      change: -2.1,
      icon: Heart,
      color: 'from-amber-400 to-yellow-500'
    },
    {
      label: 'Lead-uri',
      value: kpi.leads,
      change: 15.7,
      icon: ChatCircle,
      color: 'from-green-400 to-emerald-500'
    }
  ]

  const mockChartData = [
    { name: 'Lun', views: 4000, clicks: 2400, saves: 800, leads: 400 },
    { name: 'Mar', views: 3000, clicks: 1398, saves: 600, leads: 300 },
    { name: 'Mie', views: 2000, clicks: 9800, saves: 900, leads: 450 },
    { name: 'Joi', views: 2780, clicks: 3908, saves: 1100, leads: 520 },
    { name: 'Vin', views: 1890, clicks: 4800, saves: 950, leads: 480 },
    { name: 'Sâm', views: 2390, clicks: 3800, saves: 700, leads: 350 },
    { name: 'Dum', views: 3490, clicks: 4300, saves: 850, leads: 420 }
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((item) => {
          const Icon = item.icon
          const isPositive = item.change > 0

          return (
            <Card key={item.label} className="p-6 space-y-3">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color}`}>
                  <Icon className="w-6 h-6 text-white" weight="fill" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? <TrendUp className="w-4 h-4" /> : <TrendDown className="w-4 h-4" />}
                  {Math.abs(item.change)}%
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-3xl font-bold">{item.value.toLocaleString()}</p>
              </div>

              <div className="text-xs text-muted-foreground">
                față de săptămâna trecută
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-lg">Evoluție Săptămânală</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line type="monotone" dataKey="views" stroke="hsl(210, 100%, 60%)" strokeWidth={2} />
              <Line type="monotone" dataKey="clicks" stroke="hsl(280, 100%, 65%)" strokeWidth={2} />
              <Line type="monotone" dataKey="leads" stroke="hsl(140, 100%, 45%)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-lg">Comparație Metrici</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="name" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="clicks" fill="hsl(280, 100%, 65%)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="saves" fill="hsl(45, 100%, 60%)" radius={[8, 8, 0, 0]} />
              <Bar dataKey="leads" fill="hsl(140, 100%, 45%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Top 3 Anunțuri Performante</h3>
          <p className="text-sm text-muted-foreground">Cele mai multe vizualizări</p>
        </div>

        <div className="space-y-3">
          {kpi.topListings.map((listing, idx) => (
            <div
              key={listing.listingId}
              className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 text-white font-bold">
                #{idx + 1}
              </div>

              <div className="flex-1">
                <h4 className="font-semibold">{listing.title}</h4>
                <p className="text-sm text-muted-foreground">ID: {listing.listingId}</p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-accent">{listing.metric.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">vizualizări</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6 space-y-2">
          <p className="text-sm text-muted-foreground">Rata de Conversie</p>
          <p className="text-3xl font-bold">{((kpi.conversions / kpi.leads) * 100).toFixed(1)}%</p>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <TrendUp className="w-4 h-4" />
            <span>+3.2% vs luna trecută</span>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <p className="text-sm text-muted-foreground">Revenue Total</p>
          <p className="text-3xl font-bold">€{kpi.revenue.toLocaleString()}</p>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <TrendUp className="w-4 h-4" />
            <span>+12.5% vs luna trecută</span>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <p className="text-sm text-muted-foreground">CTR (Click Through Rate)</p>
          <p className="text-3xl font-bold">{((kpi.clicks / kpi.views) * 100).toFixed(1)}%</p>
          <div className="flex items-center gap-2 text-sm text-amber-600">
            <TrendDown className="w-4 h-4" />
            <span>-0.8% vs luna trecută</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
