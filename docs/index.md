# MathPractice - Project Documentation Index

## Project Overview

- **Type:** Monolith Web Application
- **Primary Language:** TypeScript
- **Architecture:** Component-Based SPA with Server-Side Rendering
- **Data Source:** Static JSON files (~1.7MB total, 29 exams)

## Quick Reference

**Tech Stack:** Next.js 15 + React 19 + TypeScript 5.x + Tailwind CSS + shadcn/ui

**Entry Point:** `app/layout.tsx`

**Architecture Pattern:** Client-side interactivity with Server-Side Rendering (Next.js App Router)

---

## Generated Documentation

### Core Documentation

| Document | Description |
|----------|-------------|
| [Project Overview](./project-overview.md) | Executive summary and quick start guide |
| [Architecture](./architecture.md) | Complete architecture documentation |
| [Project Structure](./project-structure.md) | Repository structure and classification |
| [Source Tree Analysis](./source-tree-analysis.md) | Complete annotated directory tree |

### Technical Documentation

| Document | Description |
|----------|-------------|
| [Technology Stack](./technology-stack.md) | Full technology details and versions |
| [Architecture Patterns](./architecture-patterns.md) | Architectural decisions and patterns |
| [State Management Patterns](./state-management-patterns.md) | State architecture and data flow |
| [Data Models](./data-models.md) | Exam JSON schema and data structures |
| [UI Component Inventory](./ui-component-inventory.md) | Complete component catalog |
| [API Contracts](./api-contracts.md) | Static data endpoints (no backend API) |

### Development Documentation

| Document | Description |
|----------|-------------|
| [Development Guide](./development-guide.md) | Setup, workflow, and coding conventions |
| [Deployment Guide](./deployment-guide.md) | Deployment instructions for various platforms |
| [Contribution Guide](./contribution-guide.md) | Guidelines for contributing |

### Analysis Documentation

| Document | Description |
|----------|-------------|
| [Comprehensive Analysis](./comprehensive-analysis.md) | Full project analysis and recommendations |
| [Existing Documentation Inventory](./existing-documentation-inventory.md) | Scanned existing docs |
| [User Provided Context](./user-provided-context.md) | Additional context from user |

### Metadata Files

| File | Description |
|------|-------------|
| [project-parts.json](./project-parts.json) | Parts metadata (monolith structure) |
| [project-scan-report.json](./project-scan-report.json) | Workflow state file |

---

## Existing Documentation

| Document | Location | Description |
|----------|----------|-------------|
| [README](../README.md) | Project root | Project overview (Vietnamese) |
| [MAINTAIN](../MAINTAIN.md) | Project root | Maintenance guide (Vietnamese) |

---

## Getting Started

### For Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

See [Development Guide](./development-guide.md) for complete setup.

### For Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

See [Deployment Guide](./deployment-guide.md) for platform-specific instructions.

---

## AI-Assisted Development

When using AI tools (like Claude Code) for brownfield PRD creation:

1. **Point the PRD workflow to this index:** `docs/index.md`
2. **Reference [Architecture](./architecture.md)** for system constraints
3. **Reference [Data Models](./data-models.md)** for schema understanding
4. **Reference [Component Inventory](./ui-component-inventory.md)** for reusable components

---

## Project Structure Summary

```
mae-exam-web/
├── app/                    # Next.js App Router (Entry Point)
│   ├── layout.tsx          # Root layout + providers
│   ├── page.tsx            # Login/landing page
│   ├── select-exam/        # Exam selection
│   ├── practice/[id]/      # Practice session
│   └── results/[id]/       # Results display
│
├── components/             # React components
│   ├── ui/                 # shadcn/ui base (45 files)
│   └── [custom].tsx        # Application components
│
├── hooks/                  # Custom React hooks
│   ├── use-mobile.tsx      # Mobile detection
│   └── use-toast.ts        # Toast notifications
│
├── lib/                    # Utilities
│   └── utils.ts            # cn() className helper
│
├── public/data/            # Static exam data
│   ├── manifest.json       # Available exams index
│   └── de*.json            # 29 exam files (~1.7MB)
│
└── docs/                   # This documentation
    └── index.md            # You are here
```

---

## Key Technologies

| Category | Technology | Purpose |
|----------|-----------|---------|
| Framework | Next.js 15 | React framework with App Router |
| Language | TypeScript 5.x | Type-safe development |
| UI Library | shadcn/ui | Accessible components (Radix UI + Tailwind) |
| Styling | Tailwind CSS | Utility-first CSS framework |
| Math | MathJax 3 | Formula rendering (CDN) |
| State | React Hooks | Component state management |
| Persistence | localStorage | User preference storage |
| Animations | Framer Motion | Declarative animations |

---

## Documentation Statistics

| Metric | Value |
|--------|-------|
| Total Documents | 17 files |
| Total Lines | ~4,500+ |
| Files Analyzed | 60+ TypeScript/TSX files |
| Scan Level | Deep (with batching) |
| Scan Duration | ~30 minutes |
| Generated On | 2026-02-28 |

---

## Quick Links by Topic

### For New Developers
- [Development Guide](./development-guide.md) - Start here
- [Project Overview](./project-overview.md) - Understand the project
- [Source Tree Analysis](./source-tree-analysis.md) - Learn the structure

### For Architects
- [Architecture](./architecture.md) - System design
- [Architecture Patterns](./architecture-patterns.md) - Design decisions
- [State Management](./state-management-patterns.md) - Data flow

### For Content Creators
- [Data Models](./data-models.md) - Exam JSON schema
- [MAINTAIN.md](../MAINTAIN.md) - Content management procedures

### For Deployers
- [Deployment Guide](./deployment-guide.md) - Platform instructions
- [Technology Stack](./technology-stack.md) - Version requirements

### For Contributors
- [Contribution Guide](./contribution-guide.md) - How to contribute
- [Development Guide](./development-guide.md) - Coding conventions

---

## Notes

- This documentation was auto-generated by the BMAD document-project workflow
- Last updated: 2026-02-28
- Scan level: Deep (read critical files, pattern matching for others)
- Workflow version: 1.2.0

For the most up-to-date project scan state, see [project-scan-report.json](./project-scan-report.json).
