# AUTOSITE - Automotive Marketplace Platform

A comprehensive automotive marketplace platform enabling users to browse, search, list, and manage vehicle listings across multiple categories (cars, motorcycles, trucks, RVs, parts) with full user account management, favorites, messaging, and dynamic filtering.

**Experience Qualities**:
1. **Empowering** - Users have complete control to browse, list, manage, and communicate about vehicles with intuitive tools and clear workflows
2. **Trustworthy** - Professional presentation with user authentication, persistent data, and transparent processes that build confidence in transactions
3. **Efficient** - Fast navigation, smart filtering, instant search, and streamlined workflows that respect users' time

**Complexity Level**: Complex Application (advanced functionality, accounts)
Multi-category automotive marketplace with user authentication, listing management (CRUD), favorites system, messaging, dynamic filtering, responsive design, dark mode, persistent storage, and SEO pages.

## Essential Features

### Homepage with Category Selection
- **Functionality**: Hero with search bar, category cards (Cars, Motorcycles, Trucks, RVs, Parts), featured listings, quick stats
- **Purpose**: Provide immediate access to all listing categories and featured content
- **Trigger**: Landing on site or clicking logo
- **Progression**: View hero → Select category OR search → Browse featured listings → Navigate to category/listing
- **Success criteria**: Categories are clear, search is prominent, featured listings are attractive, mobile responsive

### Dynamic Category Pages (/sales/:category)
- **Functionality**: Category-specific listing browser with dynamic filters (brand, model, price, year, km, location), search, sorting, pagination
- **Purpose**: Enable users to browse and find listings within a specific category with powerful filtering
- **Trigger**: Clicking category card or navigating to category route
- **Progression**: View category → Apply filters → Search keywords → Sort results → Browse listings → Click for details
- **Success criteria**: Filters are category-appropriate, search is instant, results update smoothly, empty states guide users, mobile filters collapse

### Listing Detail Page
- **Functionality**: Full listing view with image gallery, complete specifications, seller info, contact button, favorite button, share options
- **Purpose**: Provide comprehensive listing information and enable contact with seller
- **Trigger**: Clicking listing card
- **Progression**: View images → Review specs → Check seller info → Contact seller OR Add to favorites
- **Success criteria**: Images load properly, all specs display, contact is clear, favorites work instantly

### User Authentication (Login/Register/Reset)
- **Functionality**: Email/password authentication with validation, password reset flow, persistent sessions using useKV
- **Purpose**: Enable user accounts for listing management, favorites, and messaging
- **Trigger**: Clicking Login/Register buttons or accessing protected pages
- **Progression**: Enter credentials → Validate → Create session → Redirect to dashboard/previous page
- **Success criteria**: Validation is clear, errors are helpful, sessions persist, redirects work properly

### User Dashboard
- **Functionality**: Overview of user's listings, favorites count, messages count, quick actions, account stats
- **Purpose**: Central hub for managing user's marketplace activity
- **Trigger**: Logging in or clicking Dashboard link
- **Progression**: View overview → Navigate to listings/favorites/messages → Take actions
- **Success criteria**: Stats are accurate, navigation is clear, actions are accessible

### My Listings Management
- **Functionality**: View, edit, delete user's own listings with status indicators (active/pending/sold), quick stats
- **Purpose**: Enable users to manage their posted listings
- **Trigger**: Clicking "My Listings" in dashboard
- **Progression**: View listings → Edit listing → Update details → Save OR Delete listing → Confirm
- **Success criteria**: CRUD operations work properly, changes persist, confirmations prevent accidents

### Favorites System
- **Functionality**: Save/remove listings to favorites, view all favorited listings, quick contact from favorites
- **Purpose**: Allow users to bookmark listings of interest for later review
- **Trigger**: Clicking heart icon on listing or navigating to Favorites page
- **Progression**: Click favorite → Item saved → View favorites page → Browse saved → Contact OR Remove
- **Success criteria**: Favorites persist, heart icon state updates, removal is instant

### Messaging System
- **Functionality**: Send messages to sellers, view conversations, message list, basic inbox/sent organization
- **Purpose**: Enable communication between buyers and sellers
- **Trigger**: Clicking "Contact Seller" on listing detail
- **Progression**: Click contact → Compose message → Send → View in messages → Receive replies
- **Success criteria**: Messages send successfully, conversations are organized, notifications are clear

### Add Listing Form
- **Functionality**: Multi-step form with category selection, dynamic fields based on category, image upload, validation, preview
- **Purpose**: Enable users to create new listings with all required information
- **Trigger**: Clicking "Add Listing" button (requires authentication)
- **Progression**: Select category → Fill details → Upload images → Preview → Submit → View confirmation
- **Success criteria**: Fields adapt to category, validation prevents errors, images upload successfully, submission creates listing

### Purchase & Financing System
- **Functionality**: Buy Now and Leasing/Finance options with region-specific forms (US/EU), separate flows for individuals and companies, payment plan selection, full compliance forms
- **Purpose**: Enable direct vehicle purchases and financing applications through the platform
- **Trigger**: Clicking "Buy Now" or "Finance" buttons on vehicle details
- **Progression**: Select purchase type → Choose region (US/EU) → Select entity type (Individual/Company) → Fill comprehensive form → Review terms → Submit application
- **Success criteria**: Forms adapt to region and entity type, all required compliance fields present, validation prevents errors, submissions are processed

### Market Insights Dashboard
- **Functionality**: Real-time market trends, popular models, regional pricing data, price distribution charts, category growth metrics
- **Purpose**: Provide data-driven insights to help buyers and sellers make informed decisions
- **Trigger**: Clicking "Market Insights" in navigation
- **Progression**: View overview → Select region/timeframe filters → Browse trends → Explore popular models → Analyze pricing data → Navigate to related actions
- **Success criteria**: Data visualizations are clear, filters work properly, metrics are relevant, insights are actionable

### Vehicle Comparison Tool
- **Functionality**: Compare up to 3 vehicles side-by-side with detailed specifications, pricing, images, and key features in table format
- **Purpose**: Help buyers make informed decisions by directly comparing vehicles of interest
- **Trigger**: Clicking "Compare" button on vehicle cards or accessing comparison page from user menu
- **Progression**: Add vehicles to comparison (via button or modal) → View side-by-side comparison table → Review specifications → Navigate to individual listings
- **Success criteria**: Up to 3 vehicles can be compared, comparison persists, easy to add/remove vehicles, table is responsive and readable

### Financial Calculators
- **Functionality**: Two calculators - Financing calculator (monthly payments, total interest, loan terms) and Trade-in estimator (vehicle value based on age, mileage, condition)
- **Purpose**: Help buyers plan purchases and understand financing options
- **Trigger**: Clicking "Calculators" in main navigation
- **Progression**: Select calculator tab → Enter vehicle/loan details → View real-time calculations → Adjust parameters → Apply results to purchase decisions
- **Success criteria**: Calculations are accurate, inputs are validated, results update in real-time, mobile responsive

### Saved Searches & Alerts
- **Functionality**: Save search filter combinations with custom names, enable/disable email alerts for new matching listings, manage multiple saved searches
- **Purpose**: Help users track vehicles matching specific criteria without repeated manual searches
- **Trigger**: Saving search from category page filters or accessing via user menu
- **Progression**: Configure filters → Save search with name → Enable alerts → Receive notifications for new matches → Run saved search anytime
- **Success criteria**: Searches persist across sessions, alerts can be toggled, easy to manage and delete searches

### Search Functionality
- **Functionality**: Global search bar with category filter, keyword matching across listings, instant results
- **Purpose**: Help users quickly find specific listings across all categories
- **Trigger**: Typing in search bar
- **Progression**: Enter keywords → Select category filter → View results → Click listing
- **Success criteria**: Search is fast, results are relevant, filters work properly

### SEO Pages
- **Functionality**: About, Terms & Conditions, Privacy Policy, 404 error page with helpful content
- **Purpose**: Provide legal information, build trust, handle errors gracefully
- **Trigger**: Footer links, broken URLs
- **Progression**: Navigate to page → Read content → Return to site
- **Success criteria**: Content is clear, pages are accessible, 404 redirects work

### Dark Mode Toggle
- **Functionality**: Toggle between light and dark themes with persistent preference
- **Purpose**: Improve usability in different lighting conditions and user preference
- **Trigger**: Clicking theme toggle button
- **Progression**: Click toggle → Theme switches → Preference saves → Persists on reload
- **Success criteria**: Toggle is accessible, transition is smooth, preference persists

## Edge Case Handling

- **No listings in category** - Show empty state with CTA to add first listing
- **Search with no results** - Suggest adjusting filters or browsing all categories
- **Unauthenticated access to protected pages** - Redirect to login with return URL
- **Form validation errors** - Clear inline messages with correction guidance
- **Image upload failures** - Show error with retry option, validate file types/sizes
- **Duplicate favorites** - Prevent and show already favorited state
- **Message send failures** - Retry mechanism with error notification
- **Deleted listing in favorites** - Handle gracefully with "no longer available" message
- **Mobile filters overflow** - Collapse into drawer with clear open/close
- **Long listing titles/descriptions** - Truncate with expand option
- **Browser back button** - Properly handle navigation history
- **Session expiry** - Detect and prompt re-login
- **Missing required fields** - Prevent submission and highlight fields
- **Price/number input validation** - Accept only valid numeric input
- **Region-specific form fields** - Dynamic placeholders and labels based on US/EU selection
- **Company vs Individual forms** - Show appropriate fields for each entity type
- **Finance eligibility** - Validate income and employment requirements
- **Multi-region compliance** - Handle different ID types, tax numbers, and regulatory requirements
- **No vehicles in comparison** - Show empty state with CTA to browse listings
- **Comparison with less than 3 vehicles** - Show "add vehicle" placeholder card
- **Calculator invalid inputs** - Validate numeric inputs and show helpful error messages
- **Trade-in value ranges** - Display estimated ranges rather than exact values
- **Saved search with no results** - Indicate no current matches but alerts are active
- **Duplicate saved searches** - Prevent identical filter combinations or allow with warning

## Design Direction

The design should feel modern and approachable - like a contemporary marketplace platform that's professional yet accessible. It should balance visual appeal with functionality, using clear typography, organized layouts, and purposeful animations. The interface should feel trustworthy and efficient while maintaining a pleasant browsing experience. Clean, functional design that puts listings front and center while providing powerful tools for discovery and management.

## Color Selection

**Analogous with Accent** - Using blues and purples with vibrant highlights to evoke trust, professionalism, and modern technology.

- **Primary Color**: Deep Blue (oklch(0.22 0.02 260)) - Communicates trust, stability, and professionalism. Used for headers and primary UI elements.
- **Secondary Colors**: 
  - Soft Purple (oklch(0.65 0.19 270)) - Accent color for CTAs, highlights, and interactive elements
  - Light Neutral (oklch(0.96 0.005 280)) - Backgrounds and muted elements for clean, organized feel
- **Accent Color**: Vibrant Purple (oklch(0.65 0.19 270)) - Attention-grabbing for actions, badges, and interactive states
- **Foreground/Background Pairings**:
  - Background Light (oklch(0.99 0.003 280)): Dark text (oklch(0.20 0.01 260)) - Ratio 14.2:1 ✓
  - Background Dark (oklch(0.15 0.01 260)): Light text (oklch(0.99 0 0)) - Ratio 13.5:1 ✓
  - Card Light (oklch(1 0 0)): Dark text (oklch(0.20 0.01 260)) - Ratio 15.8:1 ✓
  - Card Dark (oklch(0.18 0.01 260)): Light text (oklch(0.99 0 0)) - Ratio 12.8:1 ✓
  - Primary (oklch(0.22 0.02 260)): White text (oklch(0.99 0 0)) - Ratio 12.1:1 ✓
  - Accent (oklch(0.65 0.19 270)): White text (oklch(1 0 0)) - Ratio 4.8:1 ✓

## Font Selection

Typography should convey modern professionalism and clarity - clean sans-serifs with excellent legibility for dense information like specifications and listings.

**Primary Font**: Inter (All text) - Versatile, highly legible sans-serif ideal for UI and content
**Optional Display**: For branding only if needed

- **Typographic Hierarchy**:
  - H1 (Page Titles): Inter Bold/48px/tight (-0.01em)
  - H2 (Section Headers): Inter SemiBold/32px/tight
  - H3 (Card Headers): Inter SemiBold/24px/normal
  - H4 (Subsections): Inter Medium/20px/normal
  - Body (Content): Inter Regular/16px/relaxed (1.6) line height
  - Small (Metadata): Inter Regular/14px/normal
  - Tiny (Labels): Inter Medium/12px/wide (0.02em)
  - Button: Inter SemiBold/14px/normal

## Animations

Animations should feel snappy and functional - providing feedback and guiding attention without delaying user actions.

- **Purposeful Meaning**: Animations provide immediate feedback (button clicks, form submissions), guide navigation (page transitions, modal opens), and indicate state changes (favorites toggle, theme switch)
- **Hierarchy of Movement**: Critical interactions are instant (favorites, filters), page transitions are smooth (300ms), modals have presence (250ms), micro-interactions are subtle (150ms)

Key animation patterns:
- **Page Transitions**: Quick fade (200ms)
- **Modal Entry**: Scale from 0.95 with backdrop (250ms)
- **Card Hover**: Subtle lift with border (150ms)
- **Button Click**: Scale to 0.98 (100ms)
- **Favorite Toggle**: Heart fill animation (200ms)
- **Filter Apply**: Instant with list update fade
- **Form Submit**: Button state + success toast
- **Theme Toggle**: Smooth color transition (300ms)
- **Mobile Menu**: Slide from side (250ms)
- **Image Gallery**: Smooth carousel (300ms)

## Component Selection

- **Components**:
  - **Card**: Listing cards, category cards, dashboard widgets
  - **Button**: Various actions and CTAs with appropriate variants
  - **Input**: Search, filters, forms with validation states
  - **Textarea**: Message composition, listing descriptions
  - **Select**: Dropdowns for filters, category selection, sorting
  - **Checkbox**: Filter options, form agreements
  - **Dialog**: Listing detail view, confirmations, image lightbox
  - **Badge**: Category labels, status indicators (New, Featured, Sold)
  - **Avatar**: User profile images
  - **Tabs**: User dashboard sections, form entity type selection
  - **Separator**: Content section dividers
  - **Label**: Form field labels
  - **Toast (Sonner)**: Success/error notifications
  - **Carousel**: Image galleries in listing details
  - **Switch**: Dark mode toggle, settings
  - **Dropdown Menu**: User account menu
  - **Scroll Area**: Long content lists
  
- **Custom Components**:
  - **ListingCard**: Listing preview with image, title, price, location, favorite button
  - **CategoryCard**: Large category selector with icon and count
  - **SearchBar**: Global search with category filter
  - **FilterSidebar**: Collapsible filter panel with dynamic fields
  - **ImageUploader**: Multi-image upload with preview and reorder
  - **UserNav**: Account dropdown with menu
  - **ThemeToggle**: Dark/light mode switcher
  - **MessageThread**: Conversation view with messages
  - **ListingForm**: Multi-step dynamic form for adding listings
  - **FavoriteButton**: Toggleable heart with persist
  - **PurchaseModal**: Comprehensive purchase/finance application with region and entity type selection
  - **MarketInsightsCharts**: Data visualization for market trends and pricing
  - **RegionSelector**: US/EU region toggle with localized formatting
  - **CompareButton**: Add/remove vehicles from comparison with floating summary button
  - **FinancingCalculator**: Interactive loan payment calculator with breakdown
  - **TradeInEstimator**: Vehicle value estimator based on condition and mileage
  - **SavedSearchCard**: Display saved search with filter summary and alert toggle
  
- **States**:
  - Buttons: Default, Hover, Active (scale 0.98), Focus (ring), Disabled, Loading
  - Inputs: Default, Focus (border-accent), Error (border-destructive), Disabled
  - Cards: Default, Hover (lift + border), Active/Selected
  - Favorite: Inactive (outline), Active (filled heart)
  - Listing Status: Draft, Active, Pending, Sold
  
- **Icon Selection** (Phosphor Icons):
  - Car, Motorcycle, Truck, Van (category icons)
  - MagnifyingGlass (search)
  - Heart/HeartStraight (favorites)
  - User/UserCircle (account)
  - List, X (menu toggle)
  - ChatCircle/ChatDots (messages)
  - Plus/PlusCircle (add listing)
  - Pencil/PencilSimple (edit)
  - Trash (delete)
  - Eye (view)
  - MapPin (location)
  - Tag (price)
  - Calendar (date)
  - Gauge (mileage)
  - Moon/Sun (theme toggle)
  - SignOut (logout)
  - Funnel (filters)
  - Share (share listing)
  - Image/Images (gallery)
  - ShoppingCart (buy now)
  - CreditCard (financing)
  - ChartLine/TrendUp/TrendDown (market insights)
  - Fire (popular/hot items)
  - Globe (region selection)
  - Briefcase (company forms)
  - ChartBar (comparison)
  - Calculator (financial tools)
  - MagnifyingGlass (saved searches)
  - Bell/BellSlash (alerts)
  
- **Spacing**:
  - Page container: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
  - Section spacing: py-12 md:py-16
  - Card padding: p-4 md:p-6
  - Grid gaps: gap-4 md:gap-6
  - Form spacing: space-y-4
  - Dashboard layout: grid with gaps
  
- **Mobile**:
  - Responsive grid (1 col mobile, 2-4 cols desktop)
  - Collapsible filter drawer on mobile
  - Fixed bottom nav for key actions (optional)
  - Touch-optimized (min 44px targets)
  - Mobile-friendly forms (single column)
  - Responsive nav with drawer
  - Mobile-first breakpoints
