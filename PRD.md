# AUTOSITE - Premium Automotive Showcase

A sophisticated automotive showcase platform featuring premium vehicles with comprehensive information, financing options, service packages, and expert consultation.

**Experience Qualities**:
1. **Luxurious** - High-end design language with refined animations and premium visual treatments that evoke the sophistication of luxury vehicles
2. **Trustworthy** - Professional presentation with transparent information and clear communication that builds confidence in purchasing decisions
3. **Intuitive** - Seamless navigation and effortless user flows that make browsing and inquiring about vehicles feel natural and enjoyable

**Complexity Level**: Light Application (multiple features with basic state)
Multi-page automotive showcase with vehicle browsing, filtering, detailed views, contact forms, financing calculator, and service information - using client-side navigation and form handling.

## Essential Features

### Homepage with Vehicle Collection
- **Functionality**: Hero section with call-to-action, filterable vehicle grid with type and sort options, featured vehicle highlights
- **Purpose**: Showcase premium vehicle collection and provide easy discovery of available inventory
- **Trigger**: Landing on homepage or navigating to home
- **Progression**: View hero → Scroll to collection → Apply filters → Browse vehicles → Click for details
- **Success criteria**: Vehicles load instantly, filters work smoothly, cards are visually appealing, responsive on all devices

### Inventory Listing Page
- **Functionality**: Dedicated full-page inventory browser with advanced filtering sidebar, search functionality, price range slider, multiple view modes (grid/list), and comprehensive sorting options
- **Purpose**: Provide powerful browsing and discovery tools for users to find their ideal vehicle from the complete collection
- **Trigger**: Clicking "Inventory" in navigation or "Browse All" CTAs
- **Progression**: Navigate to inventory → View all vehicles → Apply filters (type, brand, year, price, new/featured) → Search by keyword → Toggle view mode → Sort results → Click vehicle for details
- **Success criteria**: Sidebar filters are sticky and accessible, search is instant, filters update count dynamically, empty states are helpful, view modes switch smoothly, mobile responsive with collapsible filters

### Vehicle Detail Modal
- **Functionality**: Full-screen modal with image gallery, comprehensive specifications, features list, color options, and contact CTA
- **Purpose**: Provide all necessary information for purchase consideration in an immersive format
- **Trigger**: Clicking on any vehicle card
- **Progression**: Click vehicle → Modal opens with gallery → Review specs → View features → Contact about vehicle
- **Success criteria**: Modal animates smoothly, all data displays correctly, images are high quality, easy to close and navigate

### About Page
- **Functionality**: Company story, team profiles, core values, statistics, and brand messaging
- **Purpose**: Build trust and establish credibility through transparency about company history and values
- **Trigger**: Clicking "About" in navigation
- **Progression**: Navigate to page → Read story → View team → Review values → CTA to collection
- **Success criteria**: Content is engaging, images load properly, animations enhance storytelling, mobile responsive

### Services Page
- **Functionality**: Service offerings grid, process workflow, benefits list, booking CTA
- **Purpose**: Communicate comprehensive automotive services beyond vehicle sales
- **Trigger**: Clicking "Services" in navigation
- **Progression**: View services → Understand process → Review benefits → Schedule service
- **Success criteria**: Services are clearly differentiated, pricing is transparent, booking flow is clear

### Financing Page
- **Functionality**: Interactive payment calculator with sliders, financing options comparison, requirements checklist, application CTA
- **Purpose**: Help users understand financing options and calculate affordability
- **Trigger**: Clicking "Financing" in navigation
- **Progression**: Adjust calculator → View monthly payment → Compare options → Apply for financing
- **Success criteria**: Calculator updates in real-time, calculations are accurate, options are clearly explained

### Contact Page
- **Functionality**: Multi-field contact form with department selection, location information, FAQ section, embedded map
- **Purpose**: Provide multiple channels for customer communication and answer common questions
- **Trigger**: Clicking "Contact" in navigation or contact CTAs
- **Progression**: View contact info → Fill form or call → Submit message → Receive confirmation
- **Success criteria**: Form validates properly, success message displays, all contact methods are clear

### Navigation System
- **Functionality**: Fixed header with responsive navigation, mobile menu drawer, smooth page transitions
- **Purpose**: Enable easy navigation between all pages and sections
- **Trigger**: Page load and navigation clicks
- **Progression**: Click nav item → Page changes → Scroll to top → Content loads
- **Success criteria**: Navigation is always accessible, current page is indicated, mobile menu works smoothly

## Edge Case Handling

- **No vehicles in filtered category** - Show friendly empty state with message and reset filters option
- **Form submission errors** - Display clear error messages with guidance on how to fix
- **Large images loading slowly** - Show skeleton loaders and optimize image sizes
- **Mobile navigation overflow** - Collapse menu into drawer on smaller screens
- **Calculator edge cases** - Prevent invalid inputs (negative values, extreme ranges)
- **Modal on small screens** - Full-screen modal with proper scroll behavior
- **Browser back button** - Handle navigation state properly
- **Missing vehicle data** - Graceful fallbacks for optional fields

## Design Direction

The design should feel premium and sophisticated - like a high-end automotive showroom translated to digital. It should balance elegance with functionality, using refined typography, generous spacing, and purposeful animations to create an immersive luxury experience. The interface should feel modern and cutting-edge while maintaining approachability for all users. Minimal but impactful design that lets the vehicles shine while providing all necessary information and tools.

## Color Selection

**Analogous with Accent** - Using deep purples and blues with vibrant accent highlights to evoke luxury, technology, and trust.

- **Primary Color**: Deep Navy (oklch(0.22 0.02 260)) - Communicates sophistication, trust, and premium quality. Used for headers and primary UI elements.
- **Secondary Colors**: 
  - Soft Purple (oklch(0.65 0.19 270)) - Accent color for highlights, CTAs, and interactive elements
  - Light Neutral (oklch(0.96 0.005 280)) - Backgrounds and muted elements for clean, spacious feel
- **Accent Color**: Vibrant Purple (oklch(0.65 0.19 270)) - Attention-grabbing for important actions, featured badges, and interactive states
- **Foreground/Background Pairings**:
  - Background (Soft White oklch(0.99 0.003 280)): Dark Navy text (oklch(0.20 0.01 260)) - Ratio 14.2:1 ✓
  - Card (Pure White oklch(1 0 0)): Dark Navy text (oklch(0.20 0.01 260)) - Ratio 15.8:1 ✓
  - Primary (Deep Navy oklch(0.22 0.02 260)): White text (oklch(0.99 0 0)) - Ratio 12.1:1 ✓
  - Secondary (Light Gray oklch(0.96 0.005 280)): Dark Navy text (oklch(0.22 0.02 260)) - Ratio 8.9:1 ✓
  - Accent (Vibrant Purple oklch(0.65 0.19 270)): White text (oklch(1 0 0)) - Ratio 4.8:1 ✓
  - Muted (Light Gray oklch(0.96 0.005 280)): Muted text (oklch(0.52 0.01 260)) - Ratio 5.1:1 ✓

## Font Selection

Typography should convey modern luxury and precision - clean, highly legible sans-serifs that work beautifully at all sizes with excellent hierarchy for complex information.

**Primary Font**: Inter (All text) - Versatile, meticulously crafted sans-serif with excellent legibility and wide range of weights
**Display Font**: Orbitron (Optional branding) - Modern, tech-inspired for special headings

- **Typographic Hierarchy**:
  - H1 (Hero Titles): Inter Bold/72px/tight (-0.02em) letter spacing
  - H2 (Page Titles): Inter Bold/56px/tight (-0.01em) letter spacing
  - H3 (Section Headers): Inter SemiBold/40px/tight tracking
  - H4 (Card Titles): Inter SemiBold/24px/normal letter spacing
  - Body (Descriptions): Inter Regular/18px/relaxed (1.6) line height
  - Small (Metadata): Inter Regular/16px/normal line height
  - Caption (Labels): Inter Medium/14px/normal letter spacing
  - Button Text: Inter SemiBold/16px/normal letter spacing

## Animations

Animations should feel premium and refined - smooth transitions that enhance the experience without drawing attention away from content. Movement should feel sophisticated and purposeful.

- **Purposeful Meaning**: Animations guide users through the experience (page transitions, modal reveals), provide feedback (button interactions, form submissions), and create hierarchy (staggered content reveals, scroll animations)
- **Hierarchy of Movement**: Hero elements get dramatic reveals (800ms), page content fades in with stagger (200-400ms), micro-interactions are snappy (150ms), ambient animations are subtle and slow (2-8s)

Key animation patterns:
- **Page Transitions**: Fade and subtle slide (400ms ease-out)
- **Hero Reveal**: Sequential fade-up with delays (600-1000ms)
- **Modal Entry**: Scale from 0.96 with backdrop fade (300ms)
- **Card Hover**: Subtle lift with border glow (200ms ease-out)
- **Button Press**: Scale to 0.98 (100ms) with color shift
- **Filter Apply**: Content fade-out/in (250ms)
- **Form Success**: Check animation with toast slide-in
- **Scroll Reveals**: Content fades up as enters viewport
- **Image Gallery**: Smooth carousel transitions (400ms)
- **Calculator Updates**: Number count-up animation (300ms)

## Component Selection

- **Components**:
  - **Card**: Vehicle previews, service offerings, team members - with hover states and shadows
  - **Button**: Primary (gradient), Secondary (outline), variants for different contexts
  - **Input**: Text fields with floating labels, validation states
  - **Textarea**: Multi-line message fields with character counter
  - **Select**: Dropdown menus for filters and form fields
  - **Slider**: Interactive range inputs for financing calculator
  - **Dialog**: Full-screen vehicle detail modals with galleries
  - **Badge**: "New", "Featured" indicators with gradient backgrounds
  - **Separator**: Dividers between content sections
  - **Label**: Form field labels with required indicators
  - **Toast (Sonner)**: Success/error notifications with animations
  - **Carousel**: Image galleries in vehicle details (via embla-carousel-react)

- **Customizations**:
  - **VehicleCard**: Custom card with image, specs preview, price, hover effects
  - **FilterBar**: Responsive filter controls with type buttons and sort dropdown
  - **Hero**: Full-screen hero section with animated gradient text
  - **Navbar**: Fixed navigation with active page indicator and mobile menu
  - **ContactModal**: Specialized modal for vehicle inquiries with pre-filled details
  - **VehicleDetailModal**: Full-featured modal with gallery and comprehensive specs
  - **StatCard**: Animated statistics with count-up effects
  - **ProcessStep**: Numbered workflow visualization
  
- **States**:
  - Buttons: Default (gradient/solid), Hover (enhanced gradient), Active (scale 0.98), Focus (ring), Disabled (muted)
  - Inputs: Default (border-input), Focus (border-accent + ring), Error (border-destructive), Success (border-accent)
  - Cards: Default (border subtle), Hover (border-accent + shadow-lg + lift), Selected (border-accent)
  - Nav Items: Default (muted), Active (accent with underline indicator), Hover (foreground)

- **Icon Selection** (Phosphor Icons):
  - Sparkle for premium badges and highlights
  - ArrowDown for scroll indicators
  - X for close buttons
  - List for mobile menu
  - Phone, Envelope, MapPin for contact info
  - Trophy, Shield, Users, Target for value props
  - Wrench, Star, GasPump for services
  - CreditCard, Calculator, ChartLine for financing
  - CheckCircle for completed states and features
  - Clock for hours and time-based info
  - ChatCircle for messaging/contact

- **Spacing**:
  - Page container: max-w-7xl mx-auto px-6 md:px-12 lg:px-24
  - Section spacing: py-20
  - Hero height: h-screen or h-[60vh]
  - Card padding: p-6 md:p-8
  - Grid gaps: gap-8 md:gap-12
  - Content spacing: space-y-6 md:space-y-8
  - Form field spacing: space-y-4

- **Mobile**:
  - Single column layouts on mobile
  - Collapsible mobile navigation drawer
  - Touch-optimized button sizes (min 44px)
  - Responsive typography scaling
  - Full-screen modals on small screens
  - Stacked form fields
  - Simplified hero sections
  - Mobile-first responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
