# State Management Patterns

## Overview

MathPractice uses a **lightweight, component-based state management** approach with React hooks and localStorage for persistence. No external state management library (Redux, MobX, Zustand) is used.

## State Management Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    State Management Layers                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Component State (useState)                           │  │
│  │  - Local component state                              │  │
│  │  - Form inputs                                        │  │
│  │  - UI toggles                                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Derived State (useMemo)                             │  │
│  │  - Computed values                                    │  │
│  │  - Filtered/sorted lists                              │  │
│  │  - Pagination                                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Global State (localStorage)                         │  │
│  │  - Student name                                       │  │
│  │  - User preferences (filters, sort, page)            │  │
│  │  - Selected exam ID                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## State Management Patterns by Feature

### 1. User Authentication State

**Location:** `app/page.tsx` (LoginPage)

| State | Type | Purpose | Persistence |
|-------|------|---------|-------------|
| `name` | `useState` | Student name input | Saved to localStorage as `studentName` |

```typescript
const [name, setName] = useState("")
const handleStartPractice = () => {
  const studentName = name.trim() || "Người dùng ẩn danh"
  localStorage.setItem("studentName", studentName)
  router.push("/select-exam")
}
```

### 2. Exam Selection State

**Location:** `app/select-exam/page.tsx`

| State | Type | Purpose | Persistence |
|-------|------|---------|-------------|
| `practiceSets` | `useState` | List of available exams | - |
| `allTopics` | `useState` | Aggregated topic filters | - |
| `allDifficulties` | `useState` | Aggregated difficulty filters | - |
| `searchText` | `useState` | Search query | localStorage + URL params |
| `topicFilter` | `useState` | Topic filter | localStorage + URL params |
| `difficultyFilter` | `useState` | Difficulty filter | localStorage + URL params |
| `sortBy` | `useState` | Sort preference | localStorage + URL params |
| `pageSize` | `useState` | Pagination size | localStorage + URL params |
| `page` | `useState` | Current page | localStorage + URL params |

**Key Pattern:** URL state sync with localStorage fallback

```typescript
// Initialize from URL or localStorage
const prefsRaw = localStorage.getItem("select-exam:prefs")
const prefs = prefsRaw ? JSON.parse(prefsRaw) : {}
const pageParam = Number((searchParams && searchParams.get("page")) || prefs.page || 1)

// Sync state to both URL and localStorage
useEffect(() => {
  const params = new URLSearchParams()
  params.set("page", String(currentPage))
  router.push(`/select-exam?${params.toString()}`)
  localStorage.setItem("select-exam:prefs", JSON.stringify({...}))
}, [currentPage, pageSize, searchText, ...])
```

### 3. Practice Session State

**Location:** `app/practice/[id]/PracticeClient.tsx`

| State | Type | Purpose | Persistence |
|-------|------|---------|-------------|
| `examData` | `useState` | Current exam questions | - |
| `currentQuestionIndex` | `useState` | Current question number | - |
| `selectedAnswers` | `useState` | User's answers | - |
| `isSubmitted` | `useState` | Submission status | - |
| `showExplanation` | `useState` | Explanation visibility | - |
| `timeElapsed` | `useState` | Time tracking | - |

**Key Pattern:** Complex state with multiple arrays

```typescript
const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
const [questionResults, setQuestionResults] = useState<Record<number, boolean>>({})
```

### 4. Results State

**Location:** `app/results/[id]/ResultsClient.tsx`

| State | Type | Purpose | Persistence |
|-------|------|---------|-------------|
| `examData` | `useState` | Exam data for review | - |
| `userAnswers` | `useState` | User's submitted answers | Passed from localStorage |

## Global State Keys

The application uses the following localStorage keys:

| Key | Type | Purpose |
|-----|------|---------|
| `studentName` | string | Student's name for display |
| `selectedPractice` | string | Selected exam ID (numeric) |
| `select-exam:prefs` | object | Exam selection preferences |
| `practice-progress-{examId}` | object | Practice session state (potential) |

## Theme State

**Location:** `components/theme-provider.tsx`

| Provider | Purpose |
|----------|---------|
| `ThemeProvider` | Manages dark/light theme via `next-themes` |
| `theme` | Stored in localStorage by next-themes |

## Custom Hooks

| Hook | Location | Purpose |
|------|----------|---------|
| `useIsMobile` | `hooks/use-mobile.tsx` | Detect mobile viewport (breakpoint: 768px) |
| `use-toast` | `hooks/use-toast.ts` | Toast notifications (sonner) |

## Derived State Patterns

The application extensively uses `useMemo` for computed values:

```typescript
// Filter, search, and sort exams
const filteredSorted = useMemo(() => {
  let arr = practiceSets.filter(e => e.isAvailable && !e.isLoading)
  if (term) arr = arr.filter(e => /* search logic */)
  if (topicFilter) arr = arr.filter(e => e.topics.includes(topicFilter))
  // Sort based on sortBy state
  return arr
}, [practiceSets, searchText, topicFilter, difficultyFilter, sortBy])

// Pagination
const pageItems = useMemo(() => {
  const start = (currentPage - 1) * pageSize
  return filteredSorted.slice(start, start + pageSize)
}, [filteredSorted, currentPage, pageSize])
```

## State Updates

**Immutable Updates:** State updates use spread operators for immutability:

```typescript
setSelectedAnswers(prev => ({
  ...prev,
  [questionId]: answer
}))

setAnsweredQuestions(prev => new Set([...prev, questionId]))
```

**Batched Updates:** Multiple state updates are grouped in useEffect:

```typescript
useEffect(() => {
  if (!isPracticeComplete) return
  // Save results
  const resultData = { /* ... */ }
  localStorage.setItem(`result-${examId}`, JSON.stringify(resultData))
  router.push(`/results/${examId}`)
}, [isPracticeComplete, examId, userAnswers, timeElapsed])
```

## External State Libraries

| Library | Purpose |
|---------|---------|
| `next-themes` | Theme management (dark/light mode) |
| `react-hook-form` | Form state with validation (if used) |

## No Backend State

The application is **fully client-side** for state management:
- No server session
- No database connection
- No API calls for state persistence
- All persistence via localStorage

## State Reset Patterns

State is reset when:
- User navigates between pages (component unmount)
- User refreshes the page (localStorage persists)
- User clears browser data

No explicit "reset" or "logout" functionality - session state is transient.
