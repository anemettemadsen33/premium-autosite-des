# AUTOSITE - Premium Automotive Marketplace Platform (Full-Featured Dealer Edition)

A cutting-edge, ultra-high-performance automotive marketplace platform with AI-powered pricing, live auctions, vehicle history reports, seller verification, test drive scheduling, advanced analytics, comprehensive listing management, live chat support, real-time notifications, quick actions panel, performance monitoring, help center, keyboard shortcuts, sponsored listings, import feeds, KYC verification, multi-currency support, gamification, white-label customization, video previews, API console, and comprehensive sub-category system across multiple vehicle categories.

**Experience Qualities**:
1. **Lightning Fast** - Optimized with debounced search, lazy image loading, virtual scrolling, smart caching, infinite scroll, and real-time performance monitoring
2. **Intelligent** - AI-powered price predictions, personalized recommendations, smart search, live chat support, automated imports, and data-driven insights
3. **Professional** - Enterprise-grade features including sponsored listings, KYC verification, white-label customization, API access, multi-currency support, and comprehensive dealer tools

**Complexity Level**: Complex Application (advanced functionality, AI integration, real-time features, enterprise capabilities, dealer-focused tools)
Premium automotive marketplace with AI pricing predictions, sponsored listing management, automated import feeds (CSV/XML/JSON/URL), ML price predictions, KYC identity verification, multi-currency support with tax calculators, comprehensive KPI dashboards, gamification system with badges and missions, white-label dealer customization, live chat with video preview scheduling, API console for developers, live auction system, vehicle history reports, seller verification and ratings, test drive scheduling, personalized recommendations, advanced analytics dashboard, live chat support with AI, real-time notifications system, quick actions panel, performance monitoring, comprehensive help center, keyboard shortcuts, VIN/OCR document scanning, video listings, PDF generation, smart cost calculator, auto-tagging features, and multi-level vehicle category system with sub-categories.

## Vehicle Category & Sub-Category System (NEW)

### Main Category Navigation
- **Functionality**: Dedicated pages for each main vehicle category (Cars, Motorcycles, Vans up to 7.5t, Trucks over 7.5t, Construction Machinery, Agricultural Vehicles, Trailers, Caravans & Motorhomes, Semi-Trailers, Parts & Accessories). Each category page displays total listings, sub-category filters, sorting options, and grid/list view toggle
- **Purpose**: Organize vast inventory into logical groups, enable specialized browsing, match industry standards
- **Trigger**: Click category from homepage grid, navbar Categories menu, or breadcrumb navigation
- **Progression**: View all categories → Select main category → See category page with sub-category grid → Filter by sub-category → Browse filtered listings
- **Success criteria**: All 10 main categories accessible, clear visual hierarchy, instant filtering, mobile-optimized grid

### Sub-Category Filtering
- **Functionality**: Granular sub-categories for each main category (e.g., Motorcycles include Sport, Touring, Naked, Enduro, Scooter, Chopper/Cruiser, Quad/ATV, Trike, Classic, Trial, Motocross; Vans include Box Body, Chassis, Closed Box, Flatbed/Dropside, Refrigerated, Tipper, Window Van). Interactive sub-category grid shows listing count per sub-category
- **Purpose**: Help buyers find exact vehicle type, reduce search time, professional categorization
- **Trigger**: Viewing main category page, creating new listing
- **Progression**: Select main category → View sub-category grid → Click specific sub-category → See filtered results → Click "All" to clear filter
- **Success criteria**: 8-12 sub-categories per main category, visible listing counts, single-click filtering, breadcrumb navigation

### Category-Aware Listing Creation
- **Functionality**: Two-step category selection when creating listings: first choose main category (required), then select specific sub-category (optional). Form validates sub-category belongs to selected main category. Real-time validation feedback
- **Purpose**: Ensure correct categorization, prevent errors, maintain data quality
- **Trigger**: Creating or editing a vehicle listing
- **Progression**: Select main category dropdown → Sub-category dropdown activates → Choose specific type → Validation confirms match → Continue with listing details
- **Success criteria**: Dependent dropdown behavior, clear validation, helpful error messages, sub-category optional but recommended

### Visual Category System
- **Functionality**: Each main category has unique gradient color scheme and icon (Cars: blue/cyan, Motorcycles: orange/red, Vans: green/emerald, Trucks: indigo/purple, Construction: yellow/amber, Agricultural: lime/green, Trailers: teal/cyan, Caravans: pink/rose, Semi-Trailers: violet/purple, Parts: gray/slate). Consistent visual identity across platform
- **Purpose**: Quick visual recognition, professional appearance, improve navigation UX
- **Trigger**: Viewing any category-related page
- **Progression**: See color-coded category cards → Recognize category at a glance → Navigate faster
- **Success criteria**: Distinct colors, appropriate icons, consistent usage, accessibility-compliant contrast

## Dealer-Focused Premium Features

### Sponsored Listings & Visual Promotions
- **Functionality**: Dealers can sponsor listings with premium placement, golden "Sponsored" badge with star icon, subtle glow effect, larger cards, and differentiated hover states. Tooltip explains sponsorship
- **Purpose**: Generate revenue, provide dealers with enhanced visibility, distinguish premium content
- **Trigger**: Dealer marks listing as sponsored in campaign manager
- **Progression**: Create/select listing → Set sponsored budget → Choose placement (top/featured/sidebar) → Monitor impressions & clicks → View CTR analytics
- **Success criteria**: Sponsored cards visually distinct but not intrusive, badge clearly visible, tracking accurate, ROI metrics available

### Import Feed Wizard (CSV/XML/JSON/URL)
- **Functionality**: 3-step wizard for importing bulk vehicle listings from various sources. Upload files or connect URL feeds. Drag-and-drop field mapping interface maps source fields to platform fields. Preview before import with validation
- **Purpose**: Save hours manually creating listings, enable integration with dealer management systems, automate inventory sync
- **Trigger**: Navigate to Import tab in Dealer Hub, click "New Feed"
- **Progression**: Choose feed type (CSV/XML/JSON/URL) → Upload or connect → Map fields (auto-detected) → Preview & validate → Confirm import → View imported listings
- **Success criteria**: Supports common formats, auto-detects fields when possible, validates data, handles errors gracefully, supports scheduled sync

### ML Price Prediction & Smart Suggestions
- **Functionality**: Machine learning analyzes market data to predict optimal listing price. Shows confidence level (%), factors impacting price (positive/negative), market comparison (average, percentile), and recommendations (raise/lower price)
- **Purpose**: Help dealers price competitively, increase conversion rates, provide data-driven insights
- **Trigger**: Automatically shown when creating/editing listing, or click "AI Price Suggestion"
- **Progression**: AI analyzes vehicle specs + market → Display predicted price with confidence bar → Show factors (mileage, age, features) → Compare to market average → Suggest adjustments
- **Success criteria**: Predictions within 10% of actual market value, clear confidence indicator, actionable insights, factors explained

### KYC Identity Verification
- **Functionality**: 3-step verification process: upload ID document (passport/ID card/license with front+back), take selfie with document, submit for review. Status tracking (unverified → pending → in-progress → verified/rejected). Verified badge on profile
- **Purpose**: Build trust, prevent fraud, enable premium dealer features, comply with regulations
- **Trigger**: Click "Verify Account" in Dealer Hub or prompted when accessing dealer tools
- **Progression**: Select document type → Upload document images → Take selfie → Submit → Wait 24-48h → Receive verification status → Get verified badge
- **Success criteria**: Clear requirements listed, image quality validation, secure storage, 24-48h turnaround, status notifications, visible badge

### Multi-Currency & Tax Calculator
- **Functionality**: Currency selector in navbar (EUR/USD/GBP/RON) with real-time conversion. Price calculator shows base price + VAT (19%) + registration tax (5%) + total. All prices automatically converted and formatted per locale
- **Purpose**: Support international buyers, show complete cost transparency, localize experience
- **Trigger**: Select currency from navbar dropdown, or view calculator in listing details
- **Progression**: Choose currency → Prices auto-convert across site → View detailed cost breakdown with taxes → See monthly payment estimates
- **Success criteria**: Accurate exchange rates, proper locale formatting, tax calculations correct for region, persistent selection

### Dealer KPI Dashboard
- **Functionality**: Comprehensive analytics dashboard with 4 key metrics (Views, Clicks, Saves, Leads) showing weekly trends, percent changes, charts (line & bar), top 3 performing listings, conversion rate, revenue tracking, and CTR
- **Purpose**: Data-driven decision making, performance tracking, ROI measurement, identify successful listings
- **Trigger**: Navigate to Dashboard tab in Dealer Hub
- **Progression**: View at-a-glance KPIs → Analyze trends in charts → Review top listings → Export reports → Optimize strategy
- **Success criteria**: Real-time data, clear visualizations, actionable insights, export capability, mobile responsive

### Gamification & Community
- **Functionality**: XP system with levels, 5 badge types (Expert Poster, Top Seller, Early Adopter, Verified Dealer, Community Helper), daily/weekly missions (post listings, respond to messages), achievement tracking, weekly leaderboard
- **Purpose**: Increase engagement, reward active users, build community, encourage quality content
- **Trigger**: Automatic background tracking, view progress in Gamification tab
- **Progression**: Complete actions → Earn XP → Level up → Unlock badges → Complete missions → Climb leaderboard → Claim rewards
- **Success criteria**: Fair XP distribution, meaningful badges, achievable missions, competitive leaderboard, visible progress

### White-Label Dealer Customization
- **Functionality**: Dealers customize their storefront with logo upload, custom colors (primary/secondary/accent), 4 preset themes (Light/Dark/Classic/Modern), headline/tagline text, custom domain, advanced CSS. Live preview shows changes instantly
- **Purpose**: Brand consistency, professional appearance, unique dealer identity, custom domains
- **Trigger**: Navigate to White Label tab in Dealer Hub
- **Progression**: Upload logo → Choose theme or custom colors → Set headline/tagline → Add custom CSS → View live preview → Save & publish
- **Success criteria**: Easy customization, instant preview, preset themes accelerate setup, supports custom domains, no coding required

### Live Chat & Video Preview
- **Functionality**: WhatsApp/Messenger-style chat interface with online status indicators, typing indicators, read receipts. Dealers can offer instant or scheduled video calls. Floating button pulses when dealer online. 1-click to join video preview
- **Purpose**: Real-time buyer-seller communication, virtual vehicle tours, increase trust, reduce visit friction
- **Trigger**: Click chat button on listing, or request video preview
- **Progression**: Open chat → See dealer online status → Send message → Request video preview → Schedule time or join now → Video call in browser → End call
- **Success criteria**: Low-latency messaging, reliable video, clear online indicators, easy scheduling, mobile compatible

### API Console & Developer Tools
- **Functionality**: Dark-themed developer console with API key management (create/delete/permissions), interactive documentation (Swagger-style), playground to test endpoints, code examples (request/response), rate limit tracking
- **Purpose**: Enable integrations, third-party tools, custom dashboards, automation, developer ecosystem
- **Trigger**: Navigate to API tab in Dealer Hub
- **Progression**: Create API key with permissions → Read endpoint docs → Test in playground → Copy code examples → Integrate with external systems
- **Success criteria**: Clear documentation, working playground, secure key management, rate limiting, versioned API

### VIN & Document Scanner (OCR)
- **Functionality**: Upload photos of vehicle registration documents or title papers to automatically extract vehicle details using AI-powered OCR. Extracts VIN, make, model, year, engine size, color, registration number, owner name, and mileage
- **Purpose**: Save time on manual data entry and reduce errors when creating listings
- **Trigger**: Clicking VIN Scanner card on Add Listing page or uploading document image
- **Progression**: Upload document photo → AI analyzes image → Extract vehicle data → Preview extracted fields → Apply to form with one click
- **Success criteria**: Supports images up to 10MB, processes in under 10 seconds, extracts 5+ fields on average, graceful error handling

### PDF Listing Generator
- **Functionality**: Generate professional PDF documents for any vehicle listing with complete specifications, images, QR code for online viewing, and branded layout
- **Purpose**: Enable offline sharing, printing, and professional presentation of listings
- **Trigger**: Clicking "Download PDF" button on listing detail page
- **Progression**: Click download → Generate PDF with QR code → Open print dialog → Save or print
- **Success criteria**: Generates in under 3 seconds, includes all listing data, QR code links to online listing, professional layout, print-ready format

### Video Walkthroughs
- **Functionality**: Upload video tours (up to 50MB) to vehicle listings showing exterior, interior, features, and condition. Supports MP4, MOV, AVI formats with in-browser preview
- **Purpose**: Provide buyers with dynamic, detailed views of vehicles to increase confidence and engagement
- **Trigger**: Uploading video file via Video Uploader component on Add Listing page
- **Progression**: Select video file → Upload with progress bar → Preview video → Apply to listing → Video displays on listing detail
- **Success criteria**: Supports common video formats, shows upload progress, allows preview before publishing, video plays inline on listing pages

### Smart Cost Calculator (Romania)
- **Functionality**: Calculate total vehicle ownership costs specific to Romania including RCA insurance (mandatory liability), road tax (impozit auto), registration fees, technical inspection (ITP), and environmental taxes. Provides 1-year and 3-year cost projections
- **Purpose**: Help buyers understand complete cost of ownership beyond purchase price
- **Trigger**: Navigating to Smart Calculator page from Calculators section or dedicated link
- **Progression**: Enter vehicle details (price, engine, fuel, age, location) → View real-time cost breakdown → See annual and 3-year totals → Calculate monthly average
- **Success criteria**: Accurate Romanian tax/fee calculations, updates in real-time, shows clear breakdown, mobile responsive, includes explanatory notes

### AI Auto-Tagging & Feature Detection
- **Functionality**: Analyze vehicle description text using AI to automatically detect and tag features like "Navigation", "LED Headlights", "Leather Seats", "Panoramic Roof", etc. Supports 50+ common vehicle features
- **Purpose**: Improve listing visibility, save time tagging features manually, ensure consistent feature naming
- **Trigger**: Clicking "Auto-Detect Features" after entering listing description
- **Progression**: Write description → Click auto-detect → AI analyzes text → Display detected features as tags → Remove unwanted tags → Apply to listing
- **Success criteria**: Detects 3-10 features from typical descriptions, processes in under 5 seconds, allows manual editing, tags display on listing cards

### Advanced Tools Hub Page
- **Functionality**: Dedicated showcase page displaying all 6 advanced AI tools with descriptions, features, benefits, and direct access links
- **Purpose**: Centralize discovery of premium features and drive adoption
- **Trigger**: Clicking "Advanced Tools" in main navigation or promotional banners
- **Progression**: View tools overview → Read feature descriptions → Click tool card → Navigate to relevant page
- **Success criteria**: All tools clearly presented, engaging design, easy navigation, statistics showcased

### Live Analytics Dashboard (NEW)
- **Functionality**: Real-time analytics dashboard tracking listing performance with comprehensive metrics including views, clicks, favorites, contacts, shares, phone/email reveals, conversion rates, device breakdown, and time-series charts. Event tracking system captures all user interactions with automatic sessionId and device detection
- **Purpose**: Provide dealers and sellers with actionable insights to optimize listings and understand buyer behavior
- **Trigger**: Clicking "Live Analytics" in user dropdown menu or navigating to /live-dashboard route
- **Progression**: View overview stats → Select timeframe (7/30/90/all days) → Filter by specific listing → Explore tabs (Overview, Engagement, Performance, Devices) → View charts and metrics → Refresh data
- **Success criteria**: Auto-tracks all listing interactions (views, clicks, favorites, contacts), displays real-time charts with Recharts, calculates conversion rates and click-through rates, shows device breakdown (mobile/tablet/desktop), top performing listings ranked by views, smooth tab navigation, responsive design

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

## Premium Support & Help Features

### Live Chat Support with AI
- **Functionality**: Real-time chat interface with AI-powered instant responses, conversation history persistence, typing indicators, online status, quick action buttons for common questions
- **Purpose**: Provide instant 24/7 support to users for questions about listings, purchases, technical issues, and general inquiries
- **Trigger**: Clicking floating chat button (bottom right), accessible from any page
- **Progression**: Click chat button → View welcome screen with quick actions OR type message → Receive AI-generated response within 2 seconds → Continue conversation → Minimize or close chat → History persists
- **Success criteria**: AI responses are contextual and helpful, chat state persists between sessions, typing indicators work, messages are conversational and under 100 words, quick actions trigger appropriate responses

### Real-time Notification System
- **Functionality**: Advanced notification panel with categorized alerts (auctions, price drops, favorites, messages, system), read/unread tracking, notification filtering (all/unread), individual notification actions, bulk actions (mark all read, clear all), badge counter on navbar
- **Purpose**: Keep users informed of important events and activities without overwhelming them
- **Trigger**: Clicking notification bell icon in navbar, automatic badge updates
- **Progression**: Receive notification → Badge count updates → Open notification panel → Filter by all/unread → View notification details → Click action button OR mark as read → Delete individual OR clear all
- **Success criteria**: Notifications categorize correctly, unread count accurate, filters work instantly, smooth animations, notifications persist, action buttons navigate appropriately

### Quick Actions Panel
- **Functionality**: Floating action button (bottom left) opening grid menu with 8 frequently used actions: Post Listing, Live Auctions (with LIVE badge), Favorites, Advanced Search, Calculators, Market Insights, Compare, Saved Searches - each with gradient colored cards and icons
- **Purpose**: Provide instant access to key features from anywhere on the site
- **Trigger**: Clicking lightning bolt floating button (bottom left)
- **Progression**: Click quick actions button → View grid of 8 action cards → Select action → Navigate to page → Panel closes automatically
- **Success criteria**: Panel opens smoothly with staggered card animations, all actions navigate correctly, responsive on mobile, cards are visually distinct with gradient backgrounds

### Performance Monitor Dashboard
- **Functionality**: Real-time performance metrics page showing Page Load Time, DOM Content Loaded, First Paint, First Contentful Paint with visual indicators (good/warning/poor), overall performance score (0-100) with grade (Excellent/Good/Needs Improvement/Poor), progress bars, optimization recommendations checklist
- **Purpose**: Allow users and admins to monitor site performance and identify optimization opportunities
- **Trigger**: Accessing via user menu "Performance" link
- **Progression**: Navigate to performance page → View overall score with visual grade → Review individual metrics with status indicators → Read optimization recommendations → Understand what makes the site fast
- **Success criteria**: Metrics calculate from actual browser Performance API, scores reflect real data, visual indicators are clear (green/yellow/red), recommendations list current optimizations

### Help Center & Knowledge Base
- **Functionality**: Comprehensive help system with searchable knowledge base, 6 categories (Getting Started, Buying, Auctions, Selling, Tools & Features, Account & Security), expandable FAQ accordions, popular questions section, category browsing with article counts, live chat CTA
- **Purpose**: Empower users to find answers independently and reduce support load
- **Trigger**: Clicking "Help" in main navigation
- **Progression**: Land on help center → Search keywords OR browse by category → Select category → View filtered articles → Expand accordion to read answer → Still need help? → Start live chat
- **Success criteria**: Search filters articles instantly across all categories, categories show correct article counts, accordions expand smoothly, popular questions display prominently, live chat CTA is visible

### Keyboard Shortcuts System
- **Functionality**: Global keyboard shortcuts for navigation (H=home, D=dashboard, F=favorites, M=messages, A=auctions, N=new listing), actions (C=chat, Q=quick actions, T=toggle theme), and help (?=show shortcuts, Esc=close modals) - with help dialog showing all shortcuts organized by category
- **Purpose**: Enable power users to navigate and perform actions faster without mouse
- **Trigger**: Pressing any shortcut key OR pressing "?" to view help dialog
- **Progression**: Press shortcut key → Action executes immediately → OR Press ? → View shortcuts dialog with categories → Learn available shortcuts → Press Esc to close
- **Success criteria**: Shortcuts work from any page (except when typing in inputs), help dialog opens with ?, dialog shows all shortcuts organized by category with visual key badges, shortcuts don't interfere with normal typing

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
- **Chat AI timeout** - Show error message with retry and fallback to email support
- **Chat connection lost** - Indicate offline status and queue messages for retry
- **Notification permission denied** - Still show in-app notifications without push
- **Too many notifications** - Implement auto-cleanup after 30 days
- **Notification action on deleted item** - Handle gracefully with "no longer available" message
- **Quick actions on mobile** - Ensure panel is touch-optimized and doesn't overlap chat
- **Keyboard shortcut conflicts** - Disable shortcuts when typing in input fields
- **Performance monitoring on slow devices** - Show accurate metrics without impacting performance
- **Help center search no results** - Suggest browsing categories or starting live chat
- **Multiple chat windows** - Prevent opening multiple instances, show existing chat
- **Chat message too long** - Limit input length and show character count
- **Unread notification overflow** - Cap badge at 9+ for clean UI
- **Quick actions navigation race** - Ensure panel closes before page transition

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
  - **LiveChatSupport**: AI-powered real-time chat with conversation history, typing indicators, quick actions
  - **NotificationPanel**: Real-time notification system with filtering, categories, actions, badges
  - **QuickActionsPanel**: Floating quick access menu with 8 gradient action cards
  - **KeyboardShortcuts**: Global keyboard navigation and shortcut help dialog
  
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
  - Bell/BellSlash (alerts & notifications)
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
  - ChatCircleDots (live chat support)
  - Lightning (quick actions)
  - Question (help center)
  - Keyboard (keyboard shortcuts)
  - Gauge (performance monitoring)
  - Robot (AI assistant)
  
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
