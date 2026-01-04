# Wishlist App

A modern wishlist application built with Next.js 16, TypeScript, Tailwind CSS, and Zustand for state management. Browse products from a fake store API and save your favorites to a persistent wishlist.

## Features

- 📱 **Responsive Design** - Mobile-first design that works on all devices (1 column mobile, 2 tablet, 3-4 desktop)
- ❤️ **Wishlist Management** - Add and remove products with interactive heart buttons
- 💾 **LocalStorage Persistence** - Your wishlist is saved locally and persists across sessions
- 🎨 **Modern UI** - Clean interface with Tailwind CSS and Inter font
- 🔄 **Real-time Updates** - Wishlist counter updates automatically in the sticky header
- ⚡ **Fast & Optimized** - Built with Next.js 16 App Router and Turbopack

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand with persist middleware
- **Data Source**: [Fake Store API](https://fakestoreapi.com)
- **Font**: Inter (Google Fonts)

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm check-types` - Run TypeScript type checking

## Project Structure

```
wishlist-app/
├── app/
│   ├── layout.tsx              # Root layout with Navigation
│   ├── page.tsx                # Products list page (/)
│   ├── wishlist/
│   │   └── page.tsx            # Wishlist page (/wishlist)
│   └── product/[id]/
│       └── page.tsx            # Product detail page (/product/[id])
├── components/
│   ├── Navigation.tsx          # Sticky header with navigation
│   ├── ProductCard.tsx         # Product card with wishlist toggle
│   └── LoadingSpinner.tsx      # Loading state component
├── store/
│   └── wishlistStore.ts        # Zustand store with localStorage
└── types/
    └── product.ts              # Product interface definition
```

## Pages

### 1. Products List (`/`)

- Fetches products from Fake Store API
- Displays products in responsive grid
- Heart icon to add/remove from wishlist
- Loading and error states

### 2. Wishlist (`/wishlist`)

- Shows all saved wishlist items
- Remove button for each item
- Empty state with link back to products
- Item count in title

### 3. Product Detail (`/product/[id]`)

- Full product information with image
- Price, category, description, and rating
- Add/Remove from wishlist button
- Back to products link

## State Management

The app uses Zustand for global state management with the following features:

- `items: Product[]` - Array of wishlist items
- `addItem(product)` - Add a product to wishlist
- `removeItem(productId)` - Remove a product from wishlist
- `isInWishlist(productId)` - Check if product is in wishlist
- `clearWishlist()` - Clear entire wishlist

All wishlist data is automatically persisted to localStorage.

## Design Decisions

- **Strict TypeScript**: Enabled for better type safety and code quality
- **ESLint Configuration**: Custom rules including suppression of `set-state-in-effect` for hydration patterns
- **Responsive Images**: Next.js Image component with proper sizing and optimization
- **Sticky Navigation**: Header remains visible while scrolling
- **Reactive UI**: Components re-render automatically when wishlist state changes

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
