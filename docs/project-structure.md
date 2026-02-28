# Project Structure

## Classification

- **Repository Type:** Monolith (single cohesive web application)
- **Project Type:** web
- **Primary Language:** TypeScript
- **Architecture Pattern:** Component-based SPA with Server-Side Rendering (SSR)

## Project Parts

### Part: main

| Property | Value |
|----------|-------|
| Part ID | `main` |
| Project Type | `web` |
| Root Path | `C:\Users\Admin\Desktop\GIT CLONE\mae-exam-web` |
| Entry Point | `app/` (Next.js App Router) |

## Repository Layout

```
mae-exam-web/
├── app/                      # Next.js App Router
│   ├── select-exam/          # Exam selection page
│   ├── practice/[id]/        # Practice page with dynamic routing
│   └── results/[id]/         # Results page with dynamic routing
├── components/               # React components
│   └── ui/                   # shadcn/ui base components
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions and configurations
├── public/                   # Static assets
│   └── data/                 # Exam data JSON files
│       ├── manifest.json     # Available exams index
│       └── de*.json          # Individual exam files
├── styles/                   # Global styles
├── .next/                    # Next.js build output (generated)
├── node_modules/             # Dependencies (generated)
├── docs/                     # Project documentation
├── _bmad/                    # BMAD workflow files
├── _bmad-output/             # BMAD output artifacts
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # Project overview
```

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router - contains route handlers, pages, and layouts |
| `components/` | Reusable React components (UI and business logic) |
| `hooks/` | Custom React hooks for state management and side effects |
| `lib/` | Utility functions, helpers, and shared logic |
| `public/data/` | Static exam data stored as JSON files |
| `styles/` | Global CSS and Tailwind directives |

## Technology Detection Summary

The following key files triggered the **web** project type classification:

1. **package.json** - Node.js/Next.js project manifest
2. **tsconfig.json** - TypeScript configuration
3. **next.config.mjs** - Next.js framework configuration
4. **tailwind.config.ts** - Tailwind CSS configuration
5. **app/** directory - Next.js App Router structure

## Documentation Requirements

Based on the **web** project type, the following documentation will be generated:

- ✓ API Contracts (if API routes exist)
- ✓ Data Models (if data schemas exist)
- ✓ State Management Patterns
- ✓ UI Component Inventory
- ✓ Deployment Configuration
