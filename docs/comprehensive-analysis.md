# Comprehensive Analysis

## Overview

This document summarizes the findings from the deep codebase scan of MathPractice (mae-exam-web).

## Project Summary

| Attribute | Value |
|-----------|-------|
| **Name** | MathPractice (mae-exam-web) |
| **Type** | Web Application (Monolith) |
| **Purpose** | Math practice platform with exam-like question sets |
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.x |
| **Architecture** | Component-based SPA with SSR |
| **Data Storage** | Static JSON files |
| **State Management** | React hooks + localStorage |

## Directory Structure Analysis

### app/ (Next.js App Router)

**Files:** 10 TypeScript/TSX files

| File | Purpose | Type |
|------|---------|------|
| `layout.tsx` | Root layout with MathJax & Analytics | Server Component |
| `page.tsx` | Landing/login page | Client Component |
| `loading.tsx` | Loading state | Server Component |
| `select-exam/page.tsx` | Exam selection interface | Client Component |
| `practice/[id]/page.tsx` | Practice page wrapper | Server Component |
| `practice/[id]/PracticeClient.tsx` | Practice session logic | Client Component (48KB) |
| `exam/[id]/page.tsx` | Alternative exam view wrapper | Server Component |
| `exam/[id]/ExamClient.tsx` | Alternative exam view logic | Client Component |
| `results/[id]/page.tsx` | Results page wrapper | Server Component |
| `results/[id]/ResultsClient.tsx` | Results display logic | Client Component |

**Key Findings:**
- Hybrid rendering: Server Components for route handlers, Client Components for interactivity
- Dynamic routing with `[id]` parameter for exam-specific pages
- MathJax configuration in root layout
- Google Analytics integration

### components/ (UI Components)

**Files:** 40+ TypeScript/TSX files

**Subdirectories:**
- `ui/` - shadcn/ui base components (40+ files)
- Root - Custom application components (5 files)

**Custom Components:**

| Component | Purpose |
|-----------|---------|
| `SimpleMath.tsx` | MathJax formula display wrapper |
| `MathRenderer.tsx` | Alternative math renderer |
| `MathTest.tsx` | Math component testing |
| `theme-provider.tsx` | Theme context provider (next-themes) |
| `theme-toggle.tsx` | Dark/light mode toggle button |

**shadcn/ui Components:** 40+ base components from Radix UI + Tailwind

### lib/ (Utilities)

**Files:** 1 TypeScript file

| File | Purpose |
|------|---------|
| `utils.ts` | `cn()` function for className merging (clsx + tailwind-merge) |

### hooks/ (Custom React Hooks)

**Files:** 2 TypeScript files

| Hook | Purpose |
|------|---------|
| `use-mobile.tsx` | Mobile viewport detection (768px breakpoint) |
| `use-toast.ts` | Toast notification management |

### public/data/ (Static Data)

**Files:** 30 JSON files

| File | Purpose |
|------|---------|
| `manifest.json` | Index of available exam IDs |
| `de1.json` through `de29.json` | Exam content files |
| `danhsachsinhvien.json` | Student list data |

**Total Data Size:** ~1.7MB

## Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `next.config.mjs` | Next.js configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `components.json` | shadcn/ui component configuration |
| `postcss.config.mjs` | PostCSS configuration |
| `.gitignore` | Git ignore patterns |

## Technology Stack Deep Dive

### Core Framework

**Next.js 15.2.6**
- App Router (not Pages Router)
- React Server Components
- File-based routing
- Hybrid rendering (SSR + CSR)

**React 19.2.1**
- Latest React with concurrent features
- Client Components for interactivity
- Server Components for performance

### Styling

**Tailwind CSS 3.4.17**
- Utility-first CSS framework
- Custom theme extensions
- Dark mode support
- Responsive design

**shadcn/ui**
- Accessible Radix UI components
- Copy-paste installation (not npm)
- Tailwind styling
- Customizable

### State Management

**React Hooks**
- `useState` - Local component state
- `useEffect` - Side effects
- `useMemo` - Derived state
- `useCallback` - Memoized callbacks
- `useContext` - Context consumption
- `useRef` - DOM references

**localStorage**
- User preferences persistence
- Filter/sort state
- Student name storage

**No external state management** (Redux, MobX, Zustand)

### Form Handling

**react-hook-form 7.54.1**
- Not heavily utilized in current codebase
- Available for future form features

**Zod 3.24.1**
- Schema validation library
- Available for future validation

### Animations

**Framer Motion 12.19.1**
- Declarative motion components
- Used in landing page animations
- Page transitions

**canvas-confetti**
- Celebration effects on completion

### Data Visualization

**Recharts 2.15.0**
- Chart components
- Available for future analytics features

### Icons

**lucide-react 0.454.0**
- Consistent icon library
- 150+ icons available

### Theme Management

**next-themes 0.4.4**
- Dark/light mode toggle
- System preference detection
- Theme persistence

### PDF Generation

**@react-pdf/renderer 4.3.1**
- Included but usage unclear
- Potential for exam export feature

## Data Flow

### Exam Discovery Flow

```
1. Load manifest.json
   ↓
2. Get available IDs
   ↓
3. Create placeholder cards
   ↓
4. Fetch exam files in parallel
   ↓
5. Update UI with loaded data
   ↓
6. Aggregate topics/difficulties
```

### Practice Session Flow

```
1. User selects exam
   ↓
2. Load exam JSON data
   ↓
3. Initialize session state
   ↓
4. Display questions one by one
   ↓
5. Track answers and results
   ↓
6. Show explanations on submit
   ↓
7. Redirect to results page
```

## Key Patterns

### Component Architecture

```
Server Component (route handler)
  ↓
Client Component (interactivity)
  ↓
shadcn/ui Components (UI primitives)
  ↓
Tailwind CSS (styling)
```

### State Architecture

```
useState (component state)
  ↓
useMemo (derived state)
  ↓
localStorage (persistence)
```

### Data Access

```
fetch() API
  ↓
Static JSON files
  ↓
TypeScript interfaces
```

## Performance Considerations

### Current Approach

- **No code splitting** beyond Next.js defaults
- **No caching** for data fetches (cache: 'no-cache')
- **Parallel loading** for exam data
- **Client-side rendering** for most interactive pages

### Optimization Opportunities

1. **Enable caching** for static data
2. **Add image optimization** (Next.js Image component used)
3. **Implement code splitting** for large components
4. **Add loading skeletons** (shadcn/ui Skeleton available)
5. **Consider static generation** for exam listing

## Security Notes

| Aspect | Status |
|--------|--------|
| Authentication | None (anonymous usage) |
| Input Validation | Client-side only |
| XSS Prevention | React escaping + MathJax sanitization |
| CSRF | Not applicable (no backend) |
| CORS | Same-origin only |
| CSP | Not configured |
| Rate Limiting | Not implemented |

## Accessibility

**Built-in via shadcn/ui:**
- Keyboard navigation (Radix UI)
- ARIA attributes
- Focus management
- Screen reader support

**Areas to improve:**
- Alt text for images
- Focus indicators
- Skip navigation links
- ARIA live regions for dynamic content

## Internationalization

**Current Status:** Vietnamese language only

**No i18n framework** is configured. The application is hardcoded in Vietnamese.

**Future consideration:** Could add `next-intl` or similar for multi-language support.

## Deployment Compatibility

**Compatible with:**
- Vercel (recommended)
- Netlify
- GitHub Pages (with static export)
- Any static hosting provider

**Requirements:**
- Node.js for build
- No server-side runtime needed
- Can be fully static exported

## Missing Features

Based on the codebase scan, the following features could be added:

1. **User Authentication** - No login system
2. **Result Persistence** - No history tracking
3. **Social Sharing** - No share functionality
4. **Offline Support** - No PWA features
5. **Real-time Updates** - No WebSocket/Server-Sent Events
6. **Admin Panel** - No content management UI
7. **Analytics Dashboard** - No usage insights
8. **Export/Print** - PDF library included but unused

## Code Quality Observations

| Aspect | Assessment |
|--------|------------|
| TypeScript Usage | Good - types defined for data structures |
| Component Organization | Good - clear separation of concerns |
| Error Handling | Basic - try-catch in data fetching |
| Testing | None detected - no test files |
| Documentation | Minimal - existing README/MAINTAIN files |
| Code Style | Consistent - uses Prettier/ESLint |

## Recommendations

### Immediate
1. Add error boundaries for better error handling
2. Implement proper loading states
3. Add 404 page for invalid exam IDs
4. Optimize large PracticeClient.tsx file (48KB)

### Short-term
1. Add Zod schema validation for JSON data
2. Implement result persistence (localStorage/backend)
3. Add comprehensive testing
4. Improve accessibility (ARIA labels, focus management)

### Long-term
1. Consider adding user authentication
2. Build admin panel for exam management
3. Add analytics for learning insights
4. Implement PWA for offline support
