# Architecture Documentation

## Executive Summary

MathPractice is a **single-page web application** for math practice and exam preparation. Built with **Next.js 15**, **TypeScript**, and **React**, it provides an interactive platform for students to practice math problems with instant feedback and detailed explanations.

**Key Characteristics:**
- **Type:** Client-side web application with Server-Side Rendering
- **Data Source:** Static JSON files (no database)
- **User Authentication:** None (anonymous usage)
- **Deployment:** Static hosting compatible (Vercel, Netlify, etc.)

---

## Technology Stack

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Framework** | Next.js | 15.2.6 | React framework with App Router |
| **Language** | TypeScript | 5.x | Type-safe development |
| **UI Library** | React | 19.2.1 | Component framework |
| **Styling** | Tailwind CSS | 3.4.17 | Utility-first CSS |
| **Components** | shadcn/ui | Latest | Accessible UI components (Radix UI) |
| **Animations** | Framer Motion | 12.19.1 | Declarative animations |
| **Math Rendering** | MathJax | 3.x | Formula rendering (CDN) |
| **State** | React Hooks | - | Local component state |
| **Persistence** | localStorage | - | User preferences |
| **Forms** | react-hook-form | 7.54.1 | Form handling (available) |
| **Validation** | Zod | 3.24.1 | Schema validation (available) |

---

## Architecture Pattern

**Pattern:** Component-Based SPA with Hybrid Rendering

```
┌─────────────────────────────────────────────────────────────┐
│                      User Browser                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Next.js Server (SSR)                    │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Server Components (app/*)                    │  │   │
│  │  │  - layout.tsx                                 │  │   │
│  │  │  - page.tsx (route handlers)                  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  │                       ↓                               │   │
│  │  ┌────────────────────────────────────────────────┐  │   │
│  │  │  Client Components ("use client")             │  │   │
│  │  │  - PracticeClient.tsx                         │  │   │
│  │  │  - SelectExam page                            │  │   │
│  │  │  - Interactive UI                             │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Static JSON Data                       │   │
│  │  public/data/*.json                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Route Structure

```
app/
├── (Server)                    # Server Components (default)
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page (client)
│   ├── loading.tsx             # Loading state
│   │
│   ├── select-exam/            # Exam selection route
│   │   └── page.tsx            # Client component
│   │
│   ├── practice/[id]/          # Dynamic route
│   │   ├── page.tsx            # Server wrapper
│   │   └── PracticeClient.tsx  # Client logic (48KB)
│   │
│   └── results/[id]/           # Dynamic route
│       ├── page.tsx            # Server wrapper
│       └── ResultsClient.tsx   # Client logic
│
└── components/                 # Reusable components
    ├── ui/                     # shadcn/ui base (45 files)
    └── [custom].tsx            # Application components
```

### Component Hierarchy

```
RootLayout (app/layout.tsx)
├── ThemeProvider (next-themes)
├── MathJax Configuration
├── Google Analytics
└── {children}

LoginPage (app/page.tsx)
├── ThemeToggle
├── Motion.div (animations)
├── Card (shadcn/ui)
│   ├── Input (name input)
│   └── Button (start button)

SelectExamPage (app/select-exam/page.tsx)
├── Card (header)
│   ├── ThemeToggle
│   └── Student greeting
├── Controls (search, filter, sort)
├── Exam Grid (paginated)
│   └── ExamCard (for each exam)
└── Pagination (shadcn/ui)

PracticeClient (app/practice/[id]/PracticeClient.tsx)
├── Card (question display)
│   ├── SimpleMath (MathJax wrapper)
│   ├── RadioGroup (answer selection)
│   ├── Button (navigation)
│   └── Progress bar
├── AlertDialog (confirm submit)
└── Result summary

ResultsClient (app/results/[id]/ResultsClient.tsx)
├── Score Card
├── Question Review (Accordion)
│   └── QuestionCard (with explanation)
└── Navigation Buttons
```

---

## Data Architecture

### Data Flow

```
┌──────────────┐     fetch      ┌──────────────┐
│   Browser    │ ───────────────→│  Static JSON │
│              │                 │  public/data/│
│              │                 │              │
│              │←────────────────│              │
│              │   Exam Data     │              │
└──────────────┘                 └──────────────┘
        │
        ↓
┌─────────────────────────────────────┐
│         React State                  │
│  ┌─────────────────────────────┐    │
│  │ useState (component state)  │    │
│  │  - examData                 │    │
│  │  - currentQuestion          │    │
│  │  - userAnswers              │    │
│  │  - results                  │    │
│  └─────────────────────────────┘    │
│                 ↓                     │
│  ┌─────────────────────────────┐    │
│  │ useMemo (derived state)     │    │
│  │  - filteredExams            │    │
│  │  - pageItems                │    │
│  └─────────────────────────────┘    │
│                 ↓                     │
│  ┌─────────────────────────────┐    │
│  │ localStorage (persistence)  │    │
│  │  - studentName              │    │
│  │  - preferences              │    │
│  │  - selectedExam             │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### Data Schema

See [data-models.md](./data-models.md) for complete schema definitions.

---

## State Management

### State Architecture

```
Local Component State (useState)
    ↓
Derived State (useMemo)
    ↓
Persistent State (localStorage)
```

**No external state management** (Redux, MobX, Zustand) is used.

### State Examples

```typescript
// Practice Session State
interface PracticeState {
  examData: ExamData | null;           // Loaded exam
  currentQuestionIndex: number;         // Current position
  selectedAnswers: Record<number, string>;  // User answers
  answeredQuestions: Set<number>;      // Tracks answered
  questionResults: Record<number, boolean>;  // Correct/incorrect
  isSubmitted: boolean;                // Submission status
  showExplanation: boolean;             // Explanation visibility
  timeElapsed: number;                 // Timer
}
```

---

## Routing Architecture

### File-Based Routing (App Router)

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `app/page.tsx` | Login/landing page |
| `/select-exam` | `app/select-exam/page.tsx` | Exam selection |
| `/practice/[id]` | `app/practice/[id]/page.tsx` | Practice session |
| `/results/[id]` | `app/results/[id]/page.tsx` | Results display |

### Dynamic Routes

- `[id]` parameter for exam-specific pages
- Server component wraps client component for interactivity
- ID passed as prop to client component

```typescript
// Server wrapper (app/practice/[id]/page.tsx)
export default async function PracticePage({ params }) {
  const { id } = await params
  return <PracticeClient practiceId={id} />
}
```

---

## API Layer

**No backend API** exists. All data is served as static JSON files.

### Data Endpoints

| Endpoint | Method | Response |
|----------|--------|----------|
| `/data/manifest.json` | GET | List of available exam IDs |
| `/data/de{id}.json` | GET | Individual exam content |

### Fetch Pattern

```typescript
const response = await fetch(`/data/de${id}.json`, { cache: 'no-cache' })
const data = await response.json()
```

---

## Rendering Strategy

| Page Type | Rendering Method | Reason |
|-----------|-----------------|--------|
| Home | CSR (Client) | Interactive form with animations |
| Exam Selection | CSR (Client) | Complex filtering/sorting state |
| Practice | CSR (Client) | Real-time quiz interaction |
| Results | CSR (Client) | Dynamic result display |

**Server Components** used for:
- Route wrappers (minimal logic)
- Root layout (providers, scripts)

**Client Components** used for:
- All interactive pages
- Form handling
- State management

---

## Security Considerations

| Aspect | Status | Notes |
|--------|--------|-------|
| Authentication | None | Anonymous usage |
| Authorization | None | No user roles |
| Input Validation | Client-side | TypeScript + basic checks |
| XSS Prevention | React auto-escaping | MathJax sanitization |
| CSRF | N/A | No backend |
| CORS | Same-origin | Static file serving |
| CSP | Not configured | Recommended addition |

---

## Performance Optimization

### Current Optimizations

1. **Code Splitting:** Next.js automatic splitting
2. **Image Optimization:** Next.js Image component
3. **Lazy Loading:** Dynamic imports not heavily used
4. **Static Assets:** Served via CDN

### Optimization Opportunities

1. **Enable caching** for JSON data
2. **Implement pagination** for large exam lists
3. **Add service worker** for offline support
4. **Optimize bundle size** (currently large)
5. **Add loading skeletons** for better UX

---

## Deployment Architecture

### Deployment Options

| Platform | Compatibility | Notes |
|----------|---------------|-------|
| Vercel | ✅ Native | Recommended |
| Netlify | ✅ Supported | Requires plugin |
| GitHub Pages | ⚠️ Static export only | Requires config |
| AWS S3 | ✅ Static hosting | Manual setup |
| Custom Server | ✅ Node.js | Dockerfile available |

### Build Process

```bash
npm run build    # Creates .next/ directory
npm start         # Production server (Node.js required)
```

### Static Export (Optional)

For fully static hosting, modify `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }
}
```

---

## Testing Strategy

**Current Status:** No automated tests

**Recommended Testing:**

| Type | Tool | Purpose |
|------|------|---------|
| Unit | Vitest | Component logic |
| Integration | React Testing Library | Component interactions |
| E2E | Playwright | User flows |
| Visual | Chromatic | UI regression |

---

## Monitoring & Analytics

### Current Implementation

**Google Analytics:** Integrated (Measurement ID: G-Y4F55BYWHD)

```html
<!-- In app/layout.tsx -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Y4F55BYWHD"></script>
```

### Recommended Additions

1. **Error Tracking:** Sentry
2. **Performance:** Vercel Analytics
3. **User Behavior:** Hotjar or Clarity

---

## Third-Party Dependencies

### External Services

| Service | Purpose | Required |
|---------|---------|----------|
| MathJax CDN | Formula rendering | Yes |
| Google Analytics | Usage tracking | Optional |
| Vercel/Netlify | Hosting | Deployment |

### Key Libraries

See [technology-stack.md](./technology-stack.md) for complete list.

---

## Development Workflow

### Local Development

```bash
npm install
npm run dev    # http://localhost:3000
```

### Code Organization

```
mae-exam-web/
├── app/              # Routes and pages
├── components/       # Reusable components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── public/data/     # Static JSON data
└── styles/          # Global styles
```

See [source-tree-analysis.md](./source-tree-analysis.md) for details.

---

## Architecture Decision Records

### 1. Static JSON Data Storage

**Decision:** Store exam data as static JSON files

**Rationale:**
- Simple content management
- Easy version control
- No database dependency
- Fast static serving

**Trade-offs:**
- No dynamic content generation
- Manual manifest management
- Larger bundle size

### 2. Client-Side Rendering

**Decision:** Use CSR for all interactive pages

**Rationale:**
- Real-time user interactions
- Complex state management
- Better UX for quiz interface

**Trade-offs:**
- Slower initial load
- SEO impact (minimal for this use case)

### 3. No Authentication

**Decision:** Anonymous usage only

**Rationale:**
- Simplifies deployment
- Reduces development time
- No privacy concerns

**Trade-offs:**
- No user progress tracking
- No personalized learning
- No admin features

### 4. shadcn/ui Components

**Decision:** Copy-paste shadcn/ui components

**Rationale:**
- Full control over component code
- No additional dependencies
- Easy customization
- Accessible by default (Radix UI)

**Trade-offs:**
- Manual updates required
- More boilerplate in codebase

---

## Future Architectural Considerations

### Potential Improvements

1. **Backend API:**
   - Add Express/Next.js API routes
   - Implement authentication (NextAuth.js)
   - Add database (PostgreSQL with Prisma)

2. **Real-time Features:**
   - WebSocket for live competitions
   - Server-sent events for updates

3. **Performance:**
   - Implement Redis caching
   - Add CDN for static assets
   - Optimize bundle size

4. **Analytics:**
   - Track user progress
   - Generate insights
   - Personalized recommendations

### Scalability

**Current Capacity:**
- Suitable for small to medium deployments
- No server-side scaling needed
- CDN handles static asset delivery

**Scaling Options:**
- Move to managed backend (Vercel/Netlify functions)
- Add database for user data
- Implement distributed caching
