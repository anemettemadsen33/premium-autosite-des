# Live Analytics Dashboard - Feature Documentation

## Overview

The Live Analytics Dashboard is a comprehensive real-time analytics system for dealers and sellers to track the performance of their vehicle listings. It provides detailed insights into user engagement, conversion metrics, and device analytics.

## Features Implemented

### 1. **Real-Time Event Tracking**
- Automatically tracks all user interactions with listings
- Event types captured:
  - `view`: When a user views a listing detail page
  - `click`: When a user clicks on a listing card
  - `favorite`: When a user saves a listing to favorites
  - `contact`: When a user sends a message to the seller
  - `share`: When a user shares a listing
  - `phone_reveal`: When a user reveals the seller's phone number
  - `email_reveal`: When a user reveals the seller's email

### 2. **Session & Device Tracking**
- Automatic session ID generation for unique visitor tracking
- Device type detection (mobile, tablet, desktop)
- Referrer tracking to understand traffic sources
- Privacy-respecting: uses sessionStorage for temporary session IDs

### 3. **Analytics Dashboard UI**

#### **Overview Tab**
- Total Views (with unique visitor count)
- Total Clicks (with click-through rate)
- Total Leads (with conversion rate)
- Active Listings count
- Time-series chart showing views & clicks over time
- Top 5 performing listings with detailed metrics

#### **Engagement Tab**
- Favorites count
- Shares count
- Phone reveals
- Email reveals
- Detailed engagement breakdown

#### **Performance Tab**
- Conversion rate (leads/views)
- Click-through rate (clicks/views)
- Average views per listing

#### **Devices Tab**
- Bar chart showing views by device type
- Individual device metrics (mobile, tablet, desktop)

### 4. **Filtering & Timeframes**
- Filter by timeframe: 7 days, 30 days, 90 days, all time
- Filter by specific listing or view all listings
- Real-time refresh capability
- Last updated timestamp

### 5. **Data Visualization**
- Area charts for trends over time
- Bar charts for categorical data
- Responsive Recharts implementation
- Gradient fills and smooth animations
- Custom tooltips with theme integration

### 6. **Demo Data Generator**
- Built-in tool to generate 500 sample analytics events
- Useful for testing and demonstration
- Randomized realistic data across 30 days
- Clear all analytics option

## Technical Implementation

### Files Created

1. **`/src/lib/analytics.ts`**
   - Core analytics functions
   - Event tracking logic
   - Analytics data aggregation
   - Session and device detection utilities

2. **`/src/pages/LiveDashboardPage.tsx`**
   - Main dashboard page component
   - Tab-based navigation
   - Real-time data loading
   - Comprehensive stats calculations

3. **`/src/components/analytics/StatCard.tsx`**
   - Reusable stat card component
   - Trend indicators (up/down/neutral)
   - Animated transitions
   - Icon and color customization

4. **`/src/components/analytics/Charts.tsx`**
   - ViewsChart: Area chart for time-series data
   - PerformanceChart: Bar chart for categorical data
   - TrendChart: Line chart for trends
   - All charts theme-aware and responsive

5. **`/src/components/analytics/DemoDataGenerator.tsx`**
   - Demo data generation tool
   - Analytics data management utilities

### Integration Points

**VehicleCard.tsx**: Added click tracking when users click on listing cards
**ListingDetailPage.tsx**: Added view, favorite, and contact tracking
**App.tsx**: Added route for `/live-dashboard`
**LayoutNavbar.tsx**: Added "Live Analytics" link in user dropdown menu

## Usage

### For Dealers/Sellers

1. **Access the Dashboard**
   - Log in to your account
   - Click your username in the top-right
   - Select "Live Analytics" from the dropdown menu

2. **View Your Metrics**
   - The Overview tab shows your key performance indicators
   - Use the timeframe selector to adjust the date range
   - Use the listing filter to focus on specific vehicles

3. **Analyze Performance**
   - Check which listings are getting the most views
   - Monitor your conversion rate (views to leads)
   - Understand device preferences of your audience
   - Identify traffic sources in the referrer data

4. **Generate Demo Data (Development)**
   - Scroll to the bottom of the dashboard
   - Click "Generate 500 Events" to create sample data
   - Use "Clear All Analytics" to reset

### For Developers

**Track Custom Events:**
```typescript
import { trackEvent, generateSessionId, getDeviceType } from '@/lib/analytics'

await trackEvent({
  listingId: 'listing-123',
  userId: 'user-456', // optional
  eventType: 'view',
  metadata: {
    sessionId: generateSessionId(),
    deviceType: getDeviceType(),
    source: 'custom-source',
  }
})
```

**Get Listing Analytics:**
```typescript
import { getListingAnalytics } from '@/lib/analytics'

const analytics = await getListingAnalytics('listing-123', 30) // 30 days
console.log(analytics.totalViews)
console.log(analytics.conversionRate)
```

## Data Storage

- All analytics events are stored in Spark KV storage under the key `analytics-events`
- Maximum 10,000 events are retained (oldest are automatically pruned)
- Events include: id, listingId, userId, eventType, timestamp, metadata
- No personal identifiable information (PII) is stored

## Performance Considerations

- Analytics tracking is non-blocking (async operations)
- Event tracking happens in the background
- Dashboard uses efficient data aggregation
- Charts are memoized for optimal rendering
- Virtual scrolling would be recommended for very large datasets

## Future Enhancements

Based on the original requirements, potential future additions could include:

1. **Export Functionality**: Download analytics reports as CSV/PDF
2. **Email Reports**: Scheduled analytics summaries
3. **Comparative Analytics**: Compare multiple listings side-by-side
4. **Traffic Source Details**: Deep-dive into referrer data
5. **Geographic Analytics**: Show where viewers are located
6. **Time-on-Page Tracking**: Average time spent on listing pages
7. **Heatmaps**: Visual representation of user interactions
8. **A/B Testing**: Compare performance of different listing variations
9. **Real-time Notifications**: Alert sellers of high-interest listings
10. **Predictive Analytics**: ML-based insights and recommendations

## Accessibility

- Keyboard navigation supported throughout
- ARIA labels on interactive elements
- Color contrast meets WCAG AA standards
- Responsive design works on all screen sizes
- Focus states clearly visible

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- LocalStorage/SessionStorage support required
- Recharts library for chart rendering

## Security & Privacy

- No tracking cookies used
- Session IDs are temporary (sessionStorage)
- User IDs only stored if user is authenticated
- No third-party analytics services
- GDPR-friendly implementation
- Data stored locally in Spark KV

## Support

For issues or questions about the Live Analytics Dashboard:
- Check the User Guide for common questions
- Review the code documentation in the source files
- Contact support through the Help Center
