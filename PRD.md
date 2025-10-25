# ClassiFy - Multi-Category Classified Ads Platform

A comprehensive classified ads platform enabling users to buy, sell, and discover items across multiple categories with advanced filtering, user authentication, messaging, and administrative capabilities.

**Experience Qualities**:
1. **Trustworthy** - Clean, professional interface that builds confidence in transactions and user safety through clear information hierarchy and transparent processes
2. **Efficient** - Streamlined workflows that help users quickly post ads, find items, and communicate with sellers without friction or confusion
3. **Accessible** - Intuitive navigation and inclusive design that serves both tech-savvy and casual users across all devices and contexts

**Complexity Level**: Complex Application (advanced functionality, accounts)
Full-featured marketplace with user authentication, dynamic multi-category support, real-time messaging, favorites, admin panel, image uploads, and comprehensive filtering - requiring sophisticated state management and user flows.

## Essential Features

### Multi-Category Browse & Discovery
- **Functionality**: Homepage with category grid, global search, and featured listings across categories (Auto, Real Estate, Electronics, Jobs, Services, etc.)
- **Purpose**: Allow users to quickly navigate to relevant sections and discover trending items
- **Trigger**: Landing on homepage or navigating to category page
- **Progression**: Load homepage → View category grid → Click category → See filtered listings → Apply additional filters
- **Success criteria**: Categories load instantly, search autocompletes, category navigation is intuitive, featured items are visually distinct

### Dynamic Listing Display with Category-Specific Filters
- **Functionality**: Display ads in grid/list view with filters that adapt based on selected category (e.g., km/year for cars, bedrooms for real estate)
- **Purpose**: Help users find exactly what they need through relevant, context-aware filtering
- **Trigger**: Selecting a category or searching
- **Progression**: Choose category → See relevant filters → Apply filters (price, location, specs) → Results update → Pagination/scroll
- **Success criteria**: Filters are category-appropriate, filtering is instant, state persists across navigation, pagination works smoothly

### Listing Detail View
- **Functionality**: Comprehensive listing page with image gallery, specifications, seller info, map (for location-based items), and contact options
- **Purpose**: Provide complete information for decision-making and facilitate seller contact
- **Trigger**: Clicking on a listing card
- **Progression**: Click listing → Gallery loads → Scroll through specs → View seller profile → Contact or save
- **Success criteria**: All data displays correctly, images are zoomable, contact options are prominent, SEO-friendly URLs

### User Authentication & Profile Management
- **Functionality**: Register, login, logout, user dashboard showing active listings, favorites, and messages
- **Purpose**: Enable personalized experience, listing management, and secure transactions
- **Trigger**: Clicking login/register or attempting protected action
- **Progression**: Click login → Enter credentials → Validate → Redirect to dashboard → View/manage listings
- **Success criteria**: Validation works, errors are clear, sessions persist, protected routes redirect properly

### Add/Edit Listing Flow
- **Functionality**: Multi-step form that adapts based on category selection, with image/video upload, field validation, and preview
- **Purpose**: Enable users to create compelling listings with all necessary information
- **Trigger**: Clicking "Post Ad" button (requires authentication)
- **Progression**: Select category → Fill dynamic form fields → Upload images → Preview listing → Submit → Confirmation
- **Success criteria**: Form validates properly, image uploads work, preview matches final result, listing appears in user dashboard

### Favorites & Saved Searches
- **Functionality**: Save listings for later viewing, persist across sessions, manage from dashboard
- **Purpose**: Help users track items of interest and return to them easily
- **Trigger**: Clicking heart/save icon on listing card or detail page
- **Progression**: Click save → Icon changes state → Item appears in favorites dashboard → Click to view later
- **Success criteria**: Saves persist in useKV, visual feedback is immediate, favorites list is manageable

### Messaging System
- **Functionality**: In-app messaging between buyers and sellers with conversation threads and notifications
- **Purpose**: Facilitate communication without exposing personal contact information prematurely
- **Trigger**: Clicking "Contact Seller" button
- **Progression**: Click contact → Open message compose → Send message → Seller receives notification → Conversation thread
- **Success criteria**: Messages persist, conversations are threaded, unread count is accurate, notifications work

### Admin Panel
- **Functionality**: Protected admin area for user management, listing moderation, statistics dashboard
- **Purpose**: Enable platform moderation and monitoring
- **Trigger**: Admin user accessing /admin route
- **Progression**: Admin login → View dashboard → See listings/users → Moderate content → View analytics
- **Success criteria**: Only admins can access, actions are logged, statistics are accurate

## Edge Case Handling

- **No listings in category** - Show encouraging empty state with "Post the first ad" CTA
- **Search returns no results** - Suggest broadening filters, show popular categories, check spelling
- **Image upload failures** - Retry mechanism, clear error messages, show upload progress
- **Expired/sold listings** - Mark clearly, allow renewal, archive from active view
- **Spam/inappropriate content** - Report button, admin review queue, automated flagging
- **Network errors during form submission** - Save draft locally using useKV, allow retry
- **Mobile image gallery** - Touch-optimized swipe gestures, pinch-to-zoom support
- **Invalid/missing user data** - Graceful degradation, prompt to complete profile
- **Concurrent edits** - Detect conflicts, show warning before overwriting
- **Large file uploads** - Size validation, compression, progress indicators

## Design Direction

The design should feel approachable yet professional - like a modern marketplace that's trustworthy and easy to use. It should balance functionality with visual appeal, prioritizing clarity and efficiency over decorative elements. The interface should feel familiar to users of established platforms while offering a fresh, contemporary aesthetic. Minimal but functional interface that lets content (listings) take center stage while providing robust filtering and navigation.

## Color Selection

**Complementary** - Using a balanced palette of warm and cool tones to create visual interest while maintaining professionalism and readability.

- **Primary Color**: Vibrant Blue (oklch(0.55 0.18 240)) - Communicates trust, reliability, and professionalism. Used for primary CTAs and interactive elements.
- **Secondary Colors**: 
  - Soft Slate (oklch(0.45 0.02 240)) - Supporting color for secondary actions and less prominent UI elements
  - Light Neutral (oklch(0.96 0.005 240)) - Backgrounds and cards for clean, spacious feel
- **Accent Color**: Energetic Orange (oklch(0.65 0.16 40)) - Attention-grabbing for important actions, new badges, and featured items
- **Foreground/Background Pairings**:
  - Background (Warm White oklch(0.98 0.003 60)): Dark Gray text (oklch(0.25 0.01 240)) - Ratio 11.5:1 ✓
  - Card (Pure White oklch(1 0 0)): Dark Gray text (oklch(0.25 0.01 240)) - Ratio 12.6:1 ✓
  - Primary (Vibrant Blue oklch(0.55 0.18 240)): White text (oklch(1 0 0)) - Ratio 5.2:1 ✓
  - Secondary (Soft Slate oklch(0.45 0.02 240)): White text (oklch(1 0 0)) - Ratio 7.8:1 ✓
  - Accent (Energetic Orange oklch(0.65 0.16 40)): White text (oklch(1 0 0)) - Ratio 4.6:1 ✓
  - Muted (Light Gray oklch(0.94 0.005 240)): Muted text (oklch(0.48 0.01 240)) - Ratio 5.9:1 ✓

## Font Selection

Typography should be highly readable and professional while feeling modern and approachable - clear sans-serifs that work well at various sizes and maintain readability across devices.

**Primary Font**: Inter (All text) - Versatile, highly legible sans-serif designed for UI with excellent rendering at all sizes
**Secondary Font**: System font stack as fallback for performance

- **Typographic Hierarchy**:
  - H1 (Page Titles): Inter Bold/42px/tight (-0.01em) letter spacing
  - H2 (Section Headers): Inter SemiBold/32px/normal letter spacing
  - H3 (Card Titles): Inter SemiBold/20px/normal letter spacing
  - H4 (Subsections): Inter Medium/18px/normal letter spacing
  - Body (Descriptions): Inter Regular/16px/relaxed (1.6) line height
  - Small (Metadata): Inter Regular/14px/normal line height
  - Tiny (Labels): Inter Medium/12px/wide (0.02em) letter spacing
  - Button Text: Inter SemiBold/16px/normal letter spacing

## Animations

Animations should feel snappy and purposeful - providing feedback and guiding attention without slowing down interactions. Movement should feel natural and responsive, enhancing usability rather than being decorative.

- **Purposeful Meaning**: Animations provide clear feedback for user actions (saves, filters applied, content loaded), guide attention to important updates (new messages), and smooth transitions between views
- **Hierarchy of Movement**: Critical user feedback gets immediate animation (button press, save), content transitions are smooth but quick (150-250ms), background animations are subtle and non-intrusive

Key animation patterns:
- **Card Hover**: Subtle lift with shadow (150ms ease-out)
- **Filter Apply**: Fade content out/in with results (200ms)
- **Modal Entrance**: Scale from 0.96 with backdrop fade (250ms ease-out)
- **Image Upload**: Progress bar with percentage, success checkmark animation
- **Toast Notifications**: Slide in from top/bottom (200ms bounce)
- **List Items**: Staggered fade-in on load (100ms offset per item)
- **Save/Favorite**: Heart icon scale + color change (150ms)
- **Loading States**: Skeleton pulse animation (1.5s infinite)

## Component Selection

- **Components**:
  - **Card**: Listing previews with image, title, price, location - clean borders and hover states
  - **Button**: Primary (filled), Secondary (outline), Destructive for delete actions
  - **Input**: Text fields with labels, validation states, and helper text
  - **Select**: Category choosers, filter dropdowns with search capability
  - **Checkbox/Radio**: Filter options, form selections
  - **Textarea**: Description fields in listing forms
  - **Dialog**: Modals for contact forms, confirmations, image lightbox
  - **Tabs**: Organize listing details (Description, Specs, Seller Info)
  - **Badge**: Category tags, "New", "Featured" indicators, listing status
  - **Avatar**: User profile pictures in messages and listings
  - **Separator**: Dividers between content sections
  - **Carousel**: Image galleries in listing details
  - **Scroll Area**: Message threads, long lists
  - **Form**: React Hook Form integration with validation
  - **Toast (Sonner)**: Success/error notifications
  - **Drawer**: Mobile filter panel, mobile navigation
  - **Accordion**: FAQ sections, filter groups
  - **Slider**: Price range, kilometer range filters
  - **Switch**: Toggle saved searches, notification preferences
  - **Pagination**: Navigate through listing pages
  - **Skeleton**: Loading states for cards and content

- **Customizations**:
  - **ListingCard**: Custom card with image, favorite button, price badge, category tag
  - **CategoryGrid**: Homepage category navigation with icons and counts
  - **FilterSidebar**: Dynamic filter panel that adapts to category
  - **ImageUploader**: Drag-drop upload zone with preview grid
  - **MessageThread**: Chat-style message layout with timestamps
  - **UserDashboardLayout**: Tabbed interface for My Ads, Favorites, Messages
  - **SearchBar**: Autocomplete search with category filter
  
- **States**:
  - Buttons: Default (solid primary), Hover (darker shade), Active (scale 0.98), Focus (ring), Disabled (muted + no pointer)
  - Inputs: Default (border-input), Focus (border-primary + ring), Error (border-destructive + error text), Success (border-green)
  - Cards: Default (border subtle), Hover (shadow-md + border-primary), Selected (border-primary + bg-primary/5)
  - Checkboxes: Unchecked, Checked (primary), Indeterminate (dash), Disabled

- **Icon Selection** (Phosphor Icons):
  - House, Car, Briefcase, DeviceMobile for category icons
  - MagnifyingGlass for search
  - Funnel, SlidersHorizontal for filters
  - Heart, HeartFilled for favorites
  - ChatCircle, Bell for messaging/notifications
  - Plus, PencilSimple for create/edit
  - Trash, X for delete/close
  - Eye for view count
  - MapPin for location
  - User, UserCircle for profile
  - Upload for file uploads
  - Check, Warning for validation states

- **Spacing**:
  - Page container: max-w-7xl mx-auto px-4 md:px-6 lg:px-8
  - Section spacing: py-12 md:py-16 lg:py-20
  - Card padding: p-4 md:p-6
  - Grid gaps: gap-4 md:gap-6
  - Form field spacing: space-y-4
  - Button padding: px-6 py-2.5

- **Mobile**:
  - Single column listing grid on mobile
  - Filters collapse into bottom drawer
  - Sticky search bar at top
  - Bottom navigation for main sections
  - Swipeable image galleries
  - Touch-optimized form inputs (min 44px height)
  - Collapsible filter sections with accordions
  - Mobile-first responsive breakpoints (sm: 640px, md: 768px, lg: 1024px)
