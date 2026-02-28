# Architecture Patterns

## Architecture Overview

MathPractice follows a **Component-Based SPA with Server-Side Rendering (SSR)** architecture pattern, leveraging Next.js 15 App Router for optimal performance and developer experience.

## Primary Architecture Pattern

| Aspect | Description |
|--------|-------------|
| **Pattern Name** | Component-Based SPA with SSR |
| **Style** | Client-Server Rendering (Hybrid) |
| **Framework Pattern** | Next.js App Router (File-based routing) |
| **Component Model** | React Server Components + Client Components |
| **Data Flow** | Unidirectional (Top-down props, Bottom-up events) |
| **State Management** | Local component state (React hooks) |

## Architectural Layers

### 1. Presentation Layer (Components)

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Home page
├── select-exam/        # Exam selection flow
├── practice/[id]/      # Practice session flow
└── results/[id]/       # Results display flow

components/
├── ui/                 # Base UI components (shadcn/ui)
└── [feature]/          # Feature-specific components
```

**Characteristics:**
- Server Components by default (rendered on server)
- Client Components for interactivity (marked with `"use client"`)
- Co-located styling with Tailwind CSS
- Composition-based component design

### 2. Data Layer

```
public/data/
├── manifest.json       # Exam index
└── de*.json           # Exam content files
```

**Characteristics:**
- Static JSON files for exam data
- Client-side fetch on demand
- No backend/database required
- Cache-friendly static assets

### 3. Business Logic Layer

```
hooks/                  # Custom React hooks
lib/                    # Utility functions
├── utils.ts           # Helper functions
└── [feature].ts       # Feature-specific logic
```

**Characteristics:**
- Custom hooks for reusable logic
- Utility functions for data manipulation
- Form validation with Zod schemas
- Math rendering with MathJax

## Key Architectural Decisions

### 1. Static JSON Data Storage

**Rationale:**
- Simple content management (JSON files)
- Easy version control
- No database dependency
- Fast static serving

**Trade-offs:**
- Limited to pre-defined content
- No dynamic content generation
- Manual manifest management

### 2. Client-Side Data Fetching

**Rationale:**
- On-demand loading reduces initial bundle
- Works well with static hosting
- Simple implementation

**Trade-offs:**
- Initial loading state required
- No pre-rendering of individual exam content

### 3. App Router (Pages Router Alternative)

**Rationale:**
- Latest Next.js features
- Server Components by default
- Better performance profile
- Improved developer experience

**Trade-offs:**
- Newer ecosystem (fewer examples)
- Migration from Pages Router would be complex

### 4. shadcn/ui Component Library

**Rationale:**
- Full control over component code
- Radix UI primitives (accessible)
- Tailwind integration
- Copy-paste, not npm install

**Trade-offs:**
- Manual updates required
- More boilerplate in codebase

## State Management Strategy

**Local Component State (Primary)**
- `useState` for component-level state
- `useReducer` for complex state logic
- Context API for cross-component state

**Global State (Minimal)**
- `next-themes` for theme (dark/light mode)
- Form state via `react-hook-form`

**No External State Management:**
- No Redux, MobX, or Zustand needed
- Simpler architecture for this use case

## Routing Strategy

**File-Based Routing (App Router):**
```
app/
├── page.tsx                 → /
├── select-exam/page.tsx     → /select-exam
├── practice/[id]/page.tsx   → /practice/1, /practice/2, etc.
└── results/[id]/page.tsx    → /results/1, /results/2, etc.
```

**Dynamic Routes:**
- `[id]` parameter for exam-specific pages
- Client-side navigation with Next.js Link
- Prefetching for performance

## Rendering Strategy

| Page Type | Rendering Method | Purpose |
|-----------|-----------------|---------|
| Home | SSG | Static landing page |
| Exam Selection | SSR | Dynamic exam list |
| Practice Session | CSR | Interactive quiz interface |
| Results | CSR | Score display and review |

## Integration Points

**External Services:**
- MathJax (CDN) - Mathematical formula rendering
- None (fully self-contained application)

**Potential Future Integrations:**
- Analytics (user tracking)
- Authentication (user accounts)
- Backend API (dynamic content)
- PDF Export Service (@react-pdf/renderer included)
