# API Contracts

## Overview

MathPractice is a **static client-side application** with **no backend API routes**. All data is served as static JSON files from the `public/` directory.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    MathPractice Application                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │   Browser    │         │   public/    │                  │
│  │              │◄───────►│   data/      │                  │
│  │              │ fetch   │              │                  │
│  │              │         │  *.json      │                  │
│  └──────────────┘         └──────────────┘                  │
│                                                               │
│  No server-side API routes                                   │
│  No database connections                                     │
│  No authentication endpoints                                 │
│  No CRUD operations                                          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Endpoints (Static Files)

The application serves the following static endpoints:

| Method | Endpoint | Response Type | Purpose |
|--------|----------|---------------|---------|
| GET | `/data/manifest.json` | `ExamsManifest` | List of available exam IDs |
| GET | `/data/de{ID}.json` | `ExamData` | Individual exam content |
| GET | `/data/danhsachsinhvien.json` | `StudentList` | Student list (usage unclear) |

### Example: Fetch Manifest

```typescript
const response = await fetch('/data/manifest.json', { cache: 'no-cache' })
const manifest: ExamsManifest = await response.json()
// { available: [1, 2, 3, 4, 5, 6, 11, 12, ...] }
```

### Example: Fetch Exam

```typescript
const examId = 1
const response = await fetch(`/data/de${examId}.json`, { cache: 'no-cache' })
const examData: ExamData = await response.json()
// { examId: "de1", title: "Đề 1", questions: [...] }
```

## No API Routes Directory

The `app/api/` directory **does not exist** in this project.

```
app/
├── page.tsx              # Home page
├── layout.tsx            # Root layout
├── select-exam/          # Exam selection
├── practice/[id]/        # Practice session
├── results/[id]/         # Results display
├── exam/[id]/            # Alternative exam view
└── loading.tsx           # Loading state
❌ api/                   # DOES NOT EXIST
```

## Why No API Routes?

Given the application's use case:
- **Content is static** - Exam questions don't change frequently
- **No user authentication** - Anonymous usage
- **No database** - All content in JSON files
- **Simple deployment** - Can be hosted anywhere (Vercel, Netlify, GitHub Pages)
- **Fast performance** - Static file serving via CDN

## Potential API Additions

If the application were to expand, these API routes might be useful:

| Potential Route | Purpose |
|-----------------|---------|
| `POST /api/auth/login` | User authentication |
| `POST /api/practice/submit` | Save practice results |
| `GET /api/results/history` | Fetch user history |
| `GET /api/search/questions` | Full-text question search |
| `POST /api/admin/exams` | Admin exam management |
| `GET /api/analytics` | Usage analytics |

## Client-Side "API" Layer

The application has internal functions that act as an API layer:

**Location:** `app/select-exam/page.tsx`

```typescript
const loadAllExamData = async () => {
  // Fetch manifest
  const manifestResp = await fetch('/data/manifest.json', { cache: 'no-cache' })
  const manifest = await manifestResp.json()

  // Fetch all exams in parallel
  const settledPromises = await Promise.allSettled(
    manifest.available.map(async (id) => {
      const response = await fetch(`/data/de${id}.json`, { cache: 'no-cache' })
      return await response.json()
    })
  )

  return settledPromises
}
```

## Request/Response Patterns

### Fetch Options

```typescript
{
  cache: 'no-cache',  // Bypass HTTP cache for fresh data
  // No headers needed (CORS not an issue for same-origin)
  // No authentication (no user accounts)
}
```

### Error Handling

```typescript
try {
  const response = await fetch(`/data/de${id}.json`)
  if (!response.ok) {
    throw new Error(`File de${id}.json not found or not accessible`)
  }
  const data = await response.json()
} catch (error) {
  // Handle 404 or parse errors
  console.error('Failed to load exam:', error)
}
```

## CORS Considerations

Since all data is served from the same origin:
- **No CORS issues** - Same-origin requests
- **No preflight requests** - Simple GET requests
- **No CORS headers needed**

## Caching Strategy

### Current Strategy: No Cache

```typescript
fetch('/data/manifest.json', { cache: 'no-cache' })
fetch(`/data/de${id}.json`, { cache: 'no-cache' })
```

**Pros:**
- Always fresh data
- Updates reflected immediately

**Cons:**
- Slower load times
- More server requests

### Alternative: Cache with Revalidation

```typescript
fetch('/data/manifest.json', {
  next: { revalidate: 3600 }  // Cache for 1 hour
})
```

## Security Considerations

### Static File Serving

- **No authentication** - All files publicly accessible
- **No rate limiting** - Could be abused
- **No input validation** - Client-side only
- **No SQL injection** - No database

### Recommendations for Production:

1. **Add rate limiting** if deploying to a custom server
2. **Validate JSON schema** on client side (use Zod)
3. **Consider authentication** if adding user-specific features
4. **Add CSP headers** to prevent XSS
5. **Use SRI** for MathJax CDN if possible

## Third-Party Services

### Google Analytics

```html
<!-- In app/layout.tsx -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Y4F55BYWHD"></script>
```

**Purpose:** Usage tracking
**Tracking ID:** G-Y4F55BYWHD

### MathJax CDN

```html
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

**Purpose:** Mathematical formula rendering
**Version:** MathJax 3
**CDN:** jsDelivr

## Summary

| Aspect | Status |
|--------|--------|
| API Routes | None (static files only) |
| Database | None (JSON files) |
| Authentication | None |
| Real-time Features | None |
| Server-Side Logic | Minimal (Next.js SSR for routes) |
| Data Fetching | Client-side `fetch()` |

The application is a **pure static web app** with no server-side API endpoints.
