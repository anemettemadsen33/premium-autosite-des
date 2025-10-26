import { 
  EnvelopeSimple, 
  Phone, 
  MapPin,
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  LinkedinLogo
} from '@phosphor-icons/react'

interface LayoutFooterProps {
  onNavigate: (page: string, params?: Record<string, string>) => void
}

export function LayoutFooter({ onNavigate }: LayoutFooterProps) {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', page: 'about' },
        { label: 'Terms of Service', page: 'terms' },
        { label: 'Privacy Policy', page: 'privacy' },
      ]
    },
    {
      title: 'Categories',
      links: [
        { label: 'Cars', page: 'category', params: { category: 'cars' } },
        { label: 'Motorcycles', page: 'category', params: { category: 'motorcycles' } },
        { label: 'Trucks', page: 'category', params: { category: 'trucks' } },
        { label: 'RVs', page: 'category', params: { category: 'rvs' } },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', page: 'about' },
        { label: 'Contact Us', page: 'about' },
        { label: 'FAQ', page: 'about' },
      ]
    }
  ]

  const socialLinks = [
    { icon: FacebookLogo, href: '#', label: 'Facebook' },
    { icon: InstagramLogo, href: '#', label: 'Instagram' },
    { icon: TwitterLogo, href: '#', label: 'Twitter' },
    { icon: LinkedinLogo, href: '#', label: 'LinkedIn' },
  ]

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-blue-500 tracking-tight hover:opacity-80 transition-opacity mb-4"
            >
              AUTOSITE
            </button>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Your premier destination for buying and selling vehicles. Find your perfect ride or sell your vehicle with ease.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <EnvelopeSimple size={18} weight="duotone" className="text-accent" />
                <span>contact@autosite.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={18} weight="duotone" className="text-accent" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={18} weight="duotone" className="text-accent" />
                <span>123 Auto Street, Car City, CC 12345</span>
              </div>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => onNavigate(link.page, link.params)}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} AUTOSITE. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Icon size={20} weight="duotone" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
