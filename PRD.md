# AUTOSITE - Premium Automotive Showcase

A premium automotive website that showcases luxury vehicles with an elegant, sophisticated interface designed to attract and engage potential buyers through exceptional visual presentation and intuitive user experience.

**Experience Qualities**:
1. **Luxurious** - Every element should evoke premium quality and exclusivity, making visitors feel they're browsing a high-end automotive collection
2. **Sophisticated** - Clean, refined aesthetics that communicate professionalism and attention to detail
3. **Aspirational** - Design should inspire desire and emotional connection with the vehicles displayed

**Complexity Level**: Light Application (multiple features with basic state)
The application showcases vehicles with filtering, detailed views, and configurator functionality while maintaining focus on visual excellence and smooth interactions.

## Essential Features

### Vehicle Gallery Display
- **Functionality**: Display premium vehicles in a visually stunning grid/card layout with high-quality images
- **Purpose**: Create immediate visual impact and showcase the automotive collection
- **Trigger**: Landing on the homepage
- **Progression**: Page load → Hero section appears → Vehicle grid fades in → Hover reveals vehicle details
- **Success criteria**: All vehicles display properly with smooth loading transitions, images are crisp and properly sized

### Vehicle Detail View
- **Functionality**: Comprehensive vehicle information including specifications, features, gallery, and pricing
- **Purpose**: Provide all necessary information for informed decision-making
- **Trigger**: Clicking on a vehicle card
- **Progression**: Click vehicle → Modal/page transition → Gallery carousel → Specifications tabs → Call-to-action
- **Success criteria**: All vehicle data displays correctly, image gallery is smooth, specifications are clearly organized

### Vehicle Configurator
- **Functionality**: Interactive tool to customize vehicle options (color, wheels, interior, packages)
- **Purpose**: Engage users and allow personalization to increase emotional investment
- **Trigger**: Click "Configure" button on vehicle detail
- **Progression**: Open configurator → Select category (color/wheels/interior) → View real-time preview → Save configuration
- **Success criteria**: Options update smoothly, preview reflects choices, configuration persists

### Filter & Search System
- **Functionality**: Filter vehicles by type, price range, brand, features
- **Purpose**: Help users quickly find vehicles matching their preferences
- **Trigger**: Interacting with filter controls in sidebar/header
- **Progression**: Select filter → Results update instantly → Adjust filters → Clear filters
- **Success criteria**: Filtering is instant, multiple filters work together, clear visual feedback

### Contact & Reservation
- **Functionality**: Schedule test drives, request information, contact dealer
- **Purpose**: Convert interest into actionable leads
- **Trigger**: Click contact/reserve buttons
- **Progression**: Click CTA → Form modal appears → Fill details → Submit → Confirmation
- **Success criteria**: Form validates properly, submission provides clear feedback, data persists

## Edge Case Handling

- **No vehicles available** - Display elegant empty state with compelling imagery and message
- **Slow image loading** - Show sophisticated skeleton loaders with brand styling
- **Filter returns no results** - Suggest alternative filters or show similar vehicles
- **Mobile navigation** - Collapse filters into drawer, optimize touch targets
- **Unsaved configurations** - Prompt user before navigating away from configurator
- **Form submission errors** - Inline validation with helpful, non-technical error messages

## Design Direction

The design should evoke feelings of luxury, precision, and aspiration - similar to premium automotive brand websites like Porsche, BMW, or Tesla. It should feel modern and cutting-edge with a minimal but rich interface that lets the vehicles take center stage while providing sophisticated interaction patterns.

## Color Selection

**Triadic** - Using deep sophisticated tones balanced with metallic accents and premium neutrals to create an upscale automotive showroom feel.

- **Primary Color**: Deep Charcoal (oklch(0.25 0.01 270)) - Communicates luxury, sophistication, and premium quality. Used for primary actions and brand elements.
- **Secondary Colors**: 
  - Platinum Silver (oklch(0.85 0.005 270)) - Represents automotive excellence and metallic precision
  - Carbon Black (oklch(0.15 0.005 270)) - Deep backgrounds and high-contrast elements
- **Accent Color**: Electric Blue (oklch(0.60 0.15 250)) - Modern, technological highlight for CTAs and interactive elements. Represents innovation and premium technology.
- **Foreground/Background Pairings**:
  - Background (Warm White oklch(0.98 0.005 90)): Charcoal text (oklch(0.25 0.01 270)) - Ratio 11.2:1 ✓
  - Card (Pure White oklch(1 0 0)): Charcoal text (oklch(0.25 0.01 270)) - Ratio 12.1:1 ✓
  - Primary (Deep Charcoal oklch(0.25 0.01 270)): White text (oklch(1 0 0)) - Ratio 12.1:1 ✓
  - Secondary (Platinum oklch(0.85 0.005 270)): Charcoal text (oklch(0.25 0.01 270)) - Ratio 5.8:1 ✓
  - Accent (Electric Blue oklch(0.60 0.15 250)): White text (oklch(1 0 0)) - Ratio 4.9:1 ✓
  - Muted (Light Gray oklch(0.93 0.005 270)): Muted text (oklch(0.50 0.01 270)) - Ratio 6.2:1 ✓

## Font Selection

Typography should communicate precision engineering and modern luxury - clean, geometric sans-serifs that feel contemporary and premium.

**Primary Font**: Inter (Display & UI) - Modern, highly legible geometric sans-serif with excellent web rendering
**Secondary Font**: Orbitron (Accents & Specs) - Futuristic, geometric font for technical specifications and brand elements

- **Typographic Hierarchy**:
  - H1 (Hero Headlines): Inter Bold/56px/tight (-0.02em) letter spacing
  - H2 (Vehicle Names): Inter SemiBold/36px/tight letter spacing
  - H3 (Section Headers): Inter SemiBold/24px/normal letter spacing
  - Body (Descriptions): Inter Regular/16px/relaxed (1.6) line height
  - Small (Specs): Orbitron Medium/13px/wide (0.05em) letter spacing
  - Button Text: Inter SemiBold/15px/slight (0.01em) letter spacing

## Animations

Animations should feel premium and purposeful - smooth, physics-based transitions that add polish without delaying interaction. Movement should feel like precision machinery with subtle acceleration curves.

- **Purposeful Meaning**: Animations reinforce the premium, engineered feel - doors opening, configurations transforming, elements sliding with mechanical precision
- **Hierarchy of Movement**: Hero elements get grand entrance animations, vehicle cards have subtle hover lifts suggesting depth, CTAs pulse gently to invite interaction

Key animation patterns:
- **Card Hover**: Subtle lift with shadow increase (200ms cubic-bezier)
- **Image Gallery**: Smooth crossfade with parallax effect (400ms ease-out)
- **Filter Apply**: Staggered fade-in of results (150ms per item)
- **Modal Entrance**: Scale from 0.95 with fade (300ms ease-out)
- **Configuration Changes**: Smooth color/option transitions (250ms)

## Component Selection

- **Components**:
  - **Card**: Vehicle displays with hover effects, image, title, specs, price - enhanced with custom glass-morphic effects
  - **Dialog**: Full-screen vehicle detail modals with backdrop blur
  - **Carousel**: High-quality image galleries with smooth transitions
  - **Tabs**: Specifications, features, performance data organization
  - **Select/Dropdown**: Filter controls with custom styling
  - **Button**: Primary CTAs with subtle shine effects, secondary outline buttons
  - **Input**: Contact forms with floating labels
  - **Badge**: Feature highlights and new vehicle indicators
  - **Separator**: Elegant dividers between content sections
  - **Scroll Area**: Smooth scrolling content areas

- **Customizations**:
  - **Vehicle Card Component**: Custom card with image overlay, gradient overlays, and animated hover states
  - **Configurator Panel**: Custom interactive option selector with visual preview
  - **Specification Grid**: Custom layout for technical specs with icon integration
  - **Hero Section**: Full-width immersive header with parallax scrolling
  
- **States**:
  - Buttons: Rest (subtle gradient), Hover (brightness increase + scale), Active (slight scale down), Focus (electric blue ring)
  - Inputs: Default (silver border), Focus (blue border + shadow), Filled (charcoal border), Error (red border + message)
  - Cards: Rest (flat), Hover (lifted shadow + scale 1.02), Active (selected state with blue accent)

- **Icon Selection**:
  - Car, Engine, Gauge for vehicle type indicators
  - Gear, Lightning for performance features
  - Eye, Heart for favorites/wishlist
  - CalendarBlank for test drive scheduling
  - MagnifyingGlass for search
  - Funnel for filters
  - X, CaretLeft/Right for navigation

- **Spacing**:
  - Container padding: px-6 md:px-12 lg:px-24
  - Section gaps: gap-16 md:gap-24
  - Card padding: p-6
  - Grid gaps: gap-6 md:gap-8
  - Element spacing: space-y-4 for vertical stacks

- **Mobile**:
  - Stack vehicle cards single column on mobile
  - Collapse filters into slide-out drawer
  - Full-width hero on mobile with reduced text size
  - Swipeable image galleries
  - Bottom-fixed CTA buttons for key actions
  - Hamburger menu for navigation
  - Touch-optimized 44px minimum touch targets
