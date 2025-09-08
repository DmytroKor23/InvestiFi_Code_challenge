# InvestiFi Cryptocurrency Dashboard

A modern, responsive cryptocurrency dashboard built with Next.js 15 and React 19. This application provides real-time cryptocurrency data with interactive features including purchase simulation, sorting, filtering, and multiple view modes.

## Features

- **Real-time Crypto Data**: Live cryptocurrency prices from CoinMarketCap API
- **Interactive Purchase Form**: Simulate cryptocurrency purchases with validation
- **Multiple View Modes**: Switch between boxed grid and list layouts
- **Advanced Sorting**: Sort by name, symbol, or price with ascending/descending options
- **Auto-refresh**: Automatic data updates every 60 seconds with countdown timer
- **Dark Mode Support**: Built-in dark/light theme support
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Type Safety**: Full TypeScript implementation with strict type checking

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript 5.9
- **Styling**: Tailwind CSS 4.1
- **Package Manager**: pnpm 9.15
- **API**: CoinMarketCap Pro API
- **Development**: ESLint, Prettier, Turbopack

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- CoinMarketCap API key

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# CoinMarketCap API Configuration
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key_here
```

### Getting a CoinMarketCap API Key

1. Visit [CoinMarketCap API](https://coinmarketcap.com/api/)
2. Sign up for a free account
3. Navigate to your dashboard and copy your API key
4. Add the key to your `.env.local` file

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd InvestiFi_Code_challenge
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your COINMARKETCAP_API_KEY to .env.local
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm preview      # Build and start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint issues automatically
pnpm type-check   # Run TypeScript compiler check
pnpm format       # Format code with Prettier
pnpm format:check # Check code formatting
pnpm check-all    # Run type-check, lint, and format:check

# Utilities
pnpm clean        # Clean build artifacts
pnpm analyze      # Analyze bundle size
```

## Project Structure

```
app/
├── api/crypto/          # API routes for cryptocurrency data
├── components/          # Reusable React components
│   ├── CryptoCard.tsx   # Individual crypto display component
│   ├── ErrorBoundary.tsx # Error handling wrapper
│   ├── Header.tsx       # Main header with controls
│   ├── ListHeader.tsx   # List view header with sorting
│   ├── Notification.tsx # Toast notifications
│   └── PurchaseForm.tsx # Crypto purchase simulation form
├── hooks/               # Custom React hooks
│   ├── useCryptoData.ts # Crypto data fetching and management
│   ├── useNotification.ts # Notification system
│   └── usePurchaseForm.ts # Purchase form logic
├── constants/           # App constants and configuration
├── types/               # TypeScript type definitions
├── globals.css          # Global styles and Tailwind imports
└── page.tsx             # Main application page
```

## API Integration

The application uses the CoinMarketCap Pro API to fetch real-time cryptocurrency data. The API endpoint is configured to:

- Fetch top cryptocurrencies by market cap
- Return USD pricing information
- Update every 60 seconds automatically
- Handle rate limiting and error responses

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add your `COINMARKETCAP_API_KEY` environment variable
3. Deploy automatically on git push

### Other Platforms

1. Build the application: `pnpm build`
2. Set environment variables on your hosting platform
3. Deploy the `.next` folder and `package.json`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and run tests: `pnpm check-all`
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to branch: `git push origin feature-name`
6. Submit a pull request

## Suggested Improvements

### Performance Optimizations
- [ ] Implement virtual scrolling for large cryptocurrency lists
- [ ] Add service worker for offline functionality and caching
- [ ] Optimize images with Next.js Image component
- [ ] Implement lazy loading for cryptocurrency cards
- [ ] Add React.memo optimization for expensive components

### Features & Functionality
- [ ] Add cryptocurrency search and filtering capabilities
- [ ] Implement user portfolio tracking and persistence
- [ ] Add price alerts and notifications system
- [ ] Create detailed cryptocurrency pages with charts and history
- [ ] Add comparison tool for multiple cryptocurrencies
- [ ] Implement favorites/watchlist functionality
- [ ] Add export functionality for portfolio data (CSV, PDF)

### User Experience
- [ ] Add skeleton loading states for better perceived performance
- [ ] Implement keyboard shortcuts for power users
- [ ] Add accessibility improvements (ARIA labels, keyboard navigation)
- [ ] Create onboarding tour for new users
- [ ] Add customizable dashboard layouts
- [ ] Implement drag-and-drop sorting for cryptocurrency list

### Technical Improvements
- [ ] Add comprehensive unit and integration tests (Jest, React Testing Library)
- [ ] Implement error logging and monitoring (Sentry, LogRocket)
- [ ] Add API response caching with Redis or similar
- [ ] Create Storybook for component documentation
- [ ] Add end-to-end testing with Playwright or Cypress
- [ ] Implement progressive web app (PWA) features
- [ ] Add database integration for user data persistence

### Security & Reliability
- [ ] Implement rate limiting for API calls
- [ ] Add input sanitization and validation
- [ ] Create comprehensive error boundaries
- [ ] Add CSRF protection for forms
- [ ] Implement API key rotation strategy
- [ ] Add health checks and monitoring endpoints

### Developer Experience
- [ ] Add pre-commit hooks with Husky
- [ ] Implement automated dependency updates with Dependabot
- [ ] Create Docker containerization for consistent environments
- [ ] Add GitHub Actions CI/CD pipeline
- [ ] Create comprehensive API documentation
- [ ] Add performance monitoring and analytics

## License

This project is licensed under the MIT License - see the LICENSE file for details.
