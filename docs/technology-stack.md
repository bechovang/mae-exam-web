# Technology Stack

## Overview

MathPractice is a modern web application built with Next.js 15, TypeScript, and contemporary React ecosystem tools.

## Technology Table

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| **Framework** | Next.js | 15.2.6 | React framework with App Router for SSR/SSG |
| **Language** | TypeScript | 5.x | Type-safe JavaScript for better developer experience |
| **UI Library** | React | 19.2.1 | Latest React with concurrent features |
| **UI Components** | shadcn/ui | Latest | Accessible Radix UI components with Tailwind styling |
| **Styling** | Tailwind CSS | 3.4.17 | Utility-first CSS framework |
| **Animations** | Framer Motion | 12.19.1 | Declarative motion and animation library |
| **Forms** | react-hook-form | 7.54.1 | Performant form handling with validation |
| **Validation** | Zod | 3.24.1 | TypeScript-first schema validation |
| **Icons** | lucide-react | 0.454.0 | Consistent icon library |
| **Charts** | recharts | 2.15.0 | Composable charting library |
| **Date Handling** | date-fns | 4.1.0 | Modern date utility library |
| **Carousels** | embla-carousel-react | 8.5.1 | Carousel/slider component |
| **Theme** | next-themes | 0.4.4 | Dark mode theme management |
| **PDF Generation** | @react-pdf/renderer | 4.3.1 | PDF document generation |
| **Math Rendering** | MathJax | - | Mathematical formula rendering (via CDN) |
| **Notifications** | sonner | 1.7.1 | Toast notifications |
| **Zoom/Pan** | react-zoom-pan-pinch | 3.7.0 | Image zoom and pan functionality |
| **Resizable Panels** | react-resizable-panels | 2.1.7 | Resizable layout components |
| **Command Palette** | cmdk | 1.0.4 | Command menu component |
| **Scroll Utilities** | tailwind-scrollbar | 4.0.2 | Custom scrollbar styling |

## Development Dependencies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Type Definitions** | @types/node | 22.x | Node.js type definitions |
| **Type Definitions** | @types/react | 19.x | React type definitions |
| **Type Definitions** | @types/react-dom | 19.x | React DOM type definitions |
| **Build Tool** | TypeScript | 5.x | TypeScript compiler |
| **PostCSS** | postcss | 8.x | CSS transformation |
| **Linting** | ESLint (via Next.js) | - | Code linting |

## Architecture Pattern

**Pattern:** Component-Based SPA with Server-Side Rendering (SSR)

### Characteristics

- **App Router Structure:** Next.js 15 App Router with file-based routing
- **Server Components:** React Server Components for optimal performance
- **Client Components:** Selective client-side interactivity using `"use client"`
- **Dynamic Routing:** Dynamic routes for exam ID handling (`practice/[id]/`, `results/[id]/`)
- **Data Fetching:** Static JSON files for exam content, fetched client-side
- **State Management:** React hooks (useState, useContext) for local state
- **Form Handling:** react-hook-form with Zod validation schemas

## Package Management

- **Package Manager:** npm (package-lock.json present)
- **Lock File:** package-lock.json (198KB)
- **Scripts:**
  - `npm run dev` - Development server
  - `npm run build` - Production build
  - `npm start` - Production server
  - `npm run lint` - ESLint check

## Build Configuration

### Next.js Configuration (next.config.mjs)
- Standard Next.js 15 configuration
- Default compiler settings

### TypeScript Configuration (tsconfig.json)
- Strict type checking enabled
- Path aliases configured
- Next.js plugin integration

### Tailwind Configuration (tailwind.config.ts)
- Full Tailwind CSS setup
- Custom theme extensions
- Dark mode support via next-themes

## Data Storage

**Static JSON Files:** Exam data stored as static JSON in `public/data/`

- `manifest.json` - Index of available exam IDs
- `de*.json` - Individual exam files with questions, options, answers, explanations

No database or backend API required - pure static content approach.
