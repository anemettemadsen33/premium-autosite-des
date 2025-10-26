# AUTOSITE - Automotive Marketplace Platform (Super Performance Edition with AI & Advanced Features)

A cutting-edge, high-performance automotive marketplace platform with AI-powered pricing, live auctions, vehicle history reports, seller verification, test drive scheduling, advanced analytics, and comprehensive listing management across multiple categories.

**Experience Qualities**:
1. **Lightning Fast** - Optimized with debounced search, lazy image loading, virtual scrolling, smart caching, and infinite scroll for instant performance
2. **Intelligent** - AI-powered price predictions, personalized recommendations, smart search, and data-driven insights
3. **Professional** - Enterprise-grade features including auction system, seller verification, vehicle history reports, and advanced analytics

**Complexity Level**: Complex Application (advanced functionality, AI integration, real-time features, enterprise capabilities)
Premium automotive marketplace with AI pricing predictions, live auction system, vehicle history reports, seller verification and ratings, test drive scheduling, personalized recommendations, advanced analytics dashboard, and comprehensive CRUD operations.

## Essential Features

### Homepage with Category Selection
- **Functionality**: Hero with advanced search form (brand, category, fuel type, price range, mileage, year range), promotional carousel, category cards (Cars, Motorcycles, Trucks, RVs, Parts), featured listings, helpful tools section
- **Purpose**: Provide immediate access to all listing categories, advanced search capabilities, and promotional content
- **Trigger**: Landing on site or clicking logo
- **Progression**: View hero → Fill search filters → Click "Search Vehicles" → Redirect to category page with filters → OR Browse carousel → View category cards → Select category → OR Browse featured listings → Navigate to listing
- **Success criteria**: Search form is comprehensive with all filter options, filters are passed via URL parameters to category page, carousel auto-rotates through promotional slides with manual navigation, categories are clear, featured listings are attractive, mobile responsive

### Dynamic Category Pages (/sales/:category) - PERFORMANCE OPTIMIZED
- **Functionality**: High-performance category browser with debounced search (300ms), lazy-loaded images, infinite scroll pagination, URL state sync, advanced multi-filter system (brand, model, price, year, mileage, fuel, transmission, condition), real-time filtering without page reload, multiple sort options, grid/list view toggle with preference persistence
- **Purpose**: Deliver instant, responsive browsing experience with advanced filtering capabilities
- **Trigger**: Category selection, homepage search, or direct URL with query parameters
- **Progression**: Load category → Filters auto-apply from URL → Debounced search activates → Images lazy load on scroll → Apply filters instantly → Sort updates without reload → Infinite scroll loads more → Toggle view mode
- **Success criteria**: Search debounces at 300ms, images load only when visible, filters update URL, no full page reloads, smooth infinite scroll, view preference persists, responsive on all devices, handles 1000+ listings smoothly

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

## AI-Powered Features

### AI Price Prediction
- **Functionality**: Machine learning-powered vehicle valuation based on brand, model, year, mileage, condition, location, and market trends. Provides predicted price with confidence score and key factors affecting valuation
- **Purpose**: Help sellers price competitively and buyers identify good deals
- **Trigger**: Clicking "Get AI Price Prediction" on listing detail page
- **Progression**: View listing → Click AI analysis → System analyzes vehicle → Display predicted price with confidence level → Show price comparison (above/below market) → List key factors (positive/negative/neutral impacts)
- **Success criteria**: Predictions complete within 5 seconds, confidence scores are accurate, factors are relevant and actionable, UI updates smoothly

### AI-Powered Recommendations
- **Functionality**: Personalized vehicle recommendations based on browsing history, favorites, current listing, and user preferences. Intelligently suggests similar vehicles, better deals, or alternative options
- **Purpose**: Increase engagement and help users discover relevant vehicles
- **Trigger**: Viewing listing detail, browsing categories, or on homepage
- **Progression**: System analyzes context → Generates top 3 recommendations → Displays with reasoning → User can refresh for new suggestions
- **Success criteria**: Recommendations are relevant, update based on user behavior, refresh generates different appropriate options

## Live Auction System

### Live Vehicle Auctions
- **Functionality**: Real-time auction system with countdown timers, live bidding, auto-bidding capability, bid history, reserve prices, and status indicators (live/ending soon/ended)
- **Purpose**: Enable dynamic pricing and create urgency for high-value vehicles
- **Trigger**: Viewing auction listing or accessing auctions page
- **Progression**: Browse auctions → Filter by status (live/ending soon/upcoming/ended) → View auction details → Place manual bid OR set auto-bid limit → Monitor countdown → Receive notifications → Win confirmation
- **Success criteria**: Real-time countdown updates every second, bids process instantly, auto-bidding works correctly, winners are notified, auction status updates accurately

### Auctions Page
- **Functionality**: Dedicated page showing all auction listings with filters (live/ending soon/upcoming/ended), sorting options (ending soon/most bids/highest bid), live statistics, and auction cards with bid counts
- **Purpose**: Centralized hub for auction discovery and participation
- **Trigger**: Clicking "Auctions" in navigation
- **Progression**: View auction overview stats → Filter by status → Sort listings → Browse auction cards → Click to view details
- **Success criteria**: Stats update in real-time, filters work instantly, auction badges display correctly (LIVE/Ending Soon), countdown timers are synchronized

## Seller Trust & Verification

### Seller Verification & Ratings
- **Functionality**: Seller profile cards with verification badges, tier system (Bronze/Silver/Gold/Platinum), ratings (1-5 stars), review system, total sales count, and verified purchase badges
- **Purpose**: Build trust, encourage quality service, reward high-performing sellers
- **Trigger**: Viewing listing detail or seller profile
- **Progression**: View seller card → See verification status and tier → Read reviews and ratings → Submit own review (if eligible) → Rate seller 1-5 stars → Write review comment → Submit
- **Success criteria**: Verification badges are prominent, tier colors are distinct, reviews persist, average ratings calculate correctly, verified purchase badges show appropriately

### Seller Reviews & Reputation
- **Functionality**: 5-star rating system with written reviews, verified purchase badges, review history, seller response capability
- **Purpose**: Provide transparency and accountability in transactions
- **Trigger**: After viewing or purchasing from a listing
- **Progression**: Write review → Select star rating → Add comment → Mark as verified purchase (if applicable) → Submit → Review appears on seller profile
- **Success criteria**: Reviews are time-stamped, ratings average correctly, verified purchases are marked, seller can view all reviews

## Vehicle History & Inspection

### Vehicle History Reports
- **Functionality**: Comprehensive AI-generated history reports including VIN, accident history, service records, odometer readings, ownership count, title status, recalls, and critical checks (theft/flood/frame damage)
- **Purpose**: Provide transparency and build buyer confidence
- **Trigger**: Clicking "Purchase Report" on listing detail
- **Progression**: View report summary → See purchase option (€29.99) → Click purchase → Generate report → Display full history → View accidents, service records, odometer history, recalls
- **Success criteria**: Reports generate quickly, data is comprehensive and realistic, critical checks are highlighted, pricing is clear, report is downloadable

## Test Drive Management

### Test Drive Scheduling
- **Functionality**: Calendar-based scheduling system with date/time selection, preferred time slots, optional message, request status tracking (pending/approved/rejected/completed), and request history
- **Purpose**: Facilitate in-person vehicle inspections
- **Trigger**: Clicking "Schedule Test Drive" on listing detail
- **Progression**: Click schedule → Select date from calendar → Choose time slot → Add optional message → Submit request → Track status → Receive approval notification
- **Success criteria**: Calendar disables past dates, time slots are clear (9AM-6PM), requests track properly, status updates work, sellers can approve/reject

## Advanced Analytics

### Analytics Dashboard
- **Functionality**: Comprehensive seller dashboard with timeframe filters (7d/30d/90d/all time), per-listing analytics, key metrics (total views, active listings, conversion rate, average price), top performers, category breakdown, and recent activity feed
- **Purpose**: Help sellers optimize listings and track performance
- **Trigger**: Clicking "Analytics" in user menu
- **Progression**: View overview stats → Select timeframe → Filter by listing → View top performers → Analyze category breakdown → Review recent activity → Navigate to specific listings
- **Success criteria**: Metrics calculate accurately, charts update smoothly, filters work instantly, data visualizations are clear, insights are actionable

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

## Performance Optimizations

### Advanced Performance Features
- **Debounced Search**: 300ms debounce on all search inputs to reduce unnecessary renders and API calls
- **Lazy Image Loading**: Images load only when entering viewport with 100px threshold, using Intersection Observer API
- **Infinite Scroll**: Automatically loads more listings as user scrolls, initial load of 12 items, loads 12 more per trigger
- **Smart Caching**: In-memory cache with TTL (5min default) and LRU eviction for frequently accessed data
- **Memoization**: useMemo for expensive filtering and sorting operations to prevent recalculation
- **Virtual Scrolling**: For extremely large datasets (1000+ items), renders only visible items plus overscan
- **URL State Sync**: All filters sync to URL for shareable links and browser back/forward support
- **View Persistence**: Grid/list view preference saved to localStorage
- **Optimistic UI Updates**: Favorites and other actions update UI immediately before backend confirmation
- **Code Splitting**: React.memo on heavy components (VehicleCard, filters) to prevent unnecessary re-renders
- **Performance Monitoring**: Built-in hooks to track render times and component performance in development

### Technical Implementation
- **useDebounce Hook**: Delays state updates for search inputs to reduce renders
- **useIntersectionObserver Hook**: Triggers lazy loading for images and infinite scroll
- **useCache Hook**: Implements caching layer with automatic invalidation
- **useLocalStorage Hook**: Persists user preferences across sessions
- **usePerformanceMonitor Hook**: Tracks component render metrics
- **LazyImage Component**: Progressive image loading with skeleton states
- **InfiniteScrollListings Component**: Automated pagination without buttons
- **Advanced filtering**: All filters computed in single useMemo to batch updates

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
- **AI prediction timeout** - Show graceful error with retry option
- **AI prediction fails** - Fallback to market average with disclaimer
- **Auction ended during bid** - Prevent bid and show auction ended message
- **Bid below minimum** - Highlight minimum bid requirement and prevent submission
- **Auto-bid exceeds max** - Stop auto-bidding and notify user
- **Concurrent bids** - Handle race conditions, last valid bid wins
- **Test drive date in past** - Disable past dates in calendar
- **Double-booked test drive** - Show time slot as unavailable
- **Test drive without login** - Redirect to login with return URL
- **History report generation fails** - Show error and offer refund/retry
- **Seller with no reviews** - Show "No reviews yet" with invitation to be first
- **Self-review attempt** - Prevent sellers from reviewing themselves
- **Review without purchase** - Allow but don't mark as verified purchase
- **Analytics with no data** - Show empty states with helpful messages
- **Timeframe with zero activity** - Display "No activity in this period"
- **Recommendation engine timeout** - Fallback to popular/recent listings
- **No similar vehicles** - Recommend from same category or price range
- **Unverified seller warnings** - Show appropriate trust indicators
- **Expired verification** - Prompt seller to re-verify
- **Missing VIN for history** - Generate realistic placeholder or request from seller
- **Report already purchased** - Show cached report without re-charging

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
  - **VehicleCard**: Optimized listing preview with lazy-loaded image, React.memo for performance, favorite button, hover animations, auction badge support
  - **LazyImage**: Progressive image component with Intersection Observer, skeleton placeholder, error fallback
  - **AdvancedSearchBar**: Autocomplete search with recent searches (localStorage), debounced input, keyboard navigation
  - **InfiniteScrollListings**: Auto-loading list with Intersection Observer, skeleton states, view mode support
  - **CategoryCard**: Large category selector with icon and count
  - **FilterSidebar**: Collapsible filter panel with URL state sync, active filter badges, clear all functionality
  - **ImageUploader**: Multi-image upload with preview and reorder
  - **UserNav**: Account dropdown with menu
  - **ThemeToggle**: Dark/light mode switcher
  - **MessageThread**: Conversation view with messages
  - **ListingForm**: Multi-step dynamic form for adding listings
  - **FavoriteButton**: Toggleable heart with optimistic updates
  - **PurchaseModal**: Comprehensive purchase/finance application with region and entity type selection
  - **MarketInsightsCharts**: Data visualization for market trends and pricing
  - **RegionSelector**: US/EU region toggle with localized formatting
  - **CompareButton**: Add/remove vehicles from comparison with floating summary button
  - **FinancingCalculator**: Interactive loan payment calculator with breakdown
  - **TradeInEstimator**: Vehicle value estimator based on condition and mileage
  - **SavedSearchCard**: Display saved search with filter summary and alert toggle
  - **AIPricePrediction**: AI-powered price analysis with confidence scores and factor breakdown
  - **AIRecommendations**: Personalized vehicle recommendations with reasoning
  - **LiveAuction**: Real-time auction component with countdown, bidding, auto-bid, and bid history
  - **VehicleHistoryReport**: Comprehensive history report with accidents, service, odometer, recalls
  - **SellerProfileCard**: Seller verification, ratings, reviews, tier badges, and contact
  - **TestDriveScheduler**: Calendar-based scheduling with time slots and request tracking
  
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
  - ChartLine/TrendUp/TrendDown (market insights & analytics)
  - Fire (popular/hot items & live auctions)
  - Globe (region selection)
  - Briefcase (company forms & business sellers)
  - ChartBar (comparison)
  - Calculator (financial tools)
  - MagnifyingGlass (saved searches)
  - Bell/BellSlash (alerts)
  - Sparkle (AI features)
  - Gavel (auctions)
  - Clock (time/countdown)
  - ShieldCheck (verification & trust)
  - Star (ratings)
  - Certificate (seller tiers)
  - FileText (reports)
  - Warning (issues/alerts)
  - CheckCircle (verified/approved)
  - Wrench (service/maintenance)
  - Phone (contact)
  
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
