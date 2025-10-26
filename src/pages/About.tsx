import { motion } from 'framer-motion'
import { Sparkle, Users, Trophy, Shield, Target } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function About() {
  const values = [
    {
      icon: Trophy,
      title: 'Excellence',
      description: 'We source only the finest vehicles from prestigious manufacturers, ensuring every model meets our exacting standards.'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Transparent pricing, comprehensive vehicle histories, and honest expert guidance at every step of your journey.'
    },
    {
      icon: Users,
      title: 'Service',
      description: 'Dedicated specialists committed to providing a personalized experience tailored to your unique preferences.'
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Meticulous attention to detail in every aspect, from vehicle preparation to the final handover ceremony.'
    }
  ]

  const stats = [
    { value: '2,500+', label: 'Vehicles Delivered' },
    { value: '15+', label: 'Years Experience' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Luxury Brands' }
  ]

  const team = [
    {
      name: 'Alexander Sterling',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Former automotive engineer with 20 years in luxury vehicle sales.'
    },
    {
      name: 'Victoria Chen',
      role: 'Chief Sales Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      bio: 'Expert in customer relations with international market expertise.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Technical Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
      bio: 'Certified master technician specializing in high-performance vehicles.'
    },
    {
      name: 'Sophia Laurent',
      role: 'Design Consultant',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      bio: 'Luxury automotive stylist with an eye for perfection and detail.'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1920&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-primary/40 to-background/90" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <Sparkle size={16} weight="fill" className="text-accent" />
              <span className="text-sm text-white/90 font-medium">Our Story</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Redefining Automotive
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-blue-400">
                Excellence
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              For over 15 years, we've been connecting discerning clients with their dream vehicles through expertise, integrity, and passion.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                A Legacy of Excellence
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                AUTOSITE was founded on a simple belief: buying a luxury vehicle should be as extraordinary as the vehicle itself. We've transformed the traditional automotive retail experience into something truly remarkable.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our team of dedicated specialists brings decades of combined experience in luxury automotive sales, technical expertise, and customer service. We don't just sell vehicles—we forge lasting relationships with our clients.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every vehicle in our collection is carefully selected, thoroughly inspected, and meticulously prepared to ensure it meets our exacting standards before it reaches you.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1562911791-c7a97b729ec5?w=800&q=80"
                  alt="AUTOSITE Showroom"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg group">
                    <CardContent className="p-8">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <value.icon size={28} className="text-accent" weight="duotone" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                Meet Our Team
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Expert specialists dedicated to your automotive journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg group">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-accent font-medium mb-3">
                        {member.role}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-br from-primary via-primary to-purple-950 text-primary-foreground rounded-3xl p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02ek0yNCA0NGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Find Your Dream Vehicle?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Explore our exclusive collection and let our experts guide you to the perfect match.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-base px-10 py-6 rounded-full shadow-xl font-medium"
                onClick={() => window.location.href = '/'}
              >
                View Collection
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
