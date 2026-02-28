# Project Overview

## MathPractice - Nền tảng luyện tập toán học

MathPractice is an **interactive web application** for math practice and exam preparation. It provides students with exam-like question sets, instant feedback, and detailed explanations for mathematical problems.

## Executive Summary

| Attribute | Value |
|-----------|-------|
| **Project Name** | MathPractice (mae-exam-web) |
| **Type** | Web Application |
| **Purpose** | Math practice platform with exam simulations |
| **Language** | TypeScript (Next.js 15) |
| **Primary Users** | Students, learners |
| **Deployment** | Static hosting compatible |

## Key Features

### ✨ Learning Features

- **Interactive Practice:** Multiple exam sets with instant feedback
- **Detailed Explanations:** Step-by-step solutions for each question
- **No Time Limits:** Focus on learning rather than speed
- **Math Formula Support:** Beautiful math rendering via MathJax
- **Difficulty Levels:** Easy, medium, and hard questions
- **Topic Categorization:** Organized by mathematical topics

### 🎨 User Experience

- **Modern UI:** Clean, responsive interface built with shadcn/ui
- **Dark Mode:** Toggle between light and dark themes
- **Mobile-Friendly:** Works on all device sizes
- **Fast Loading:** Optimized static content delivery
- **Vietnamese Language:** Full Vietnamese interface

### 📚 Content

- **29 Exam Sets:** Covering various mathematical topics
- **Multiple Question Types:** Multiple choice and essay
- **Rich Explanations:** HTML + MathJax formatted solutions
- **Hint System:** Optional hints for difficult problems

## Technology Stack Summary

```
Frontend:  Next.js 15 (App Router) + React 19
Language:  TypeScript 5.x
Styling:   Tailwind CSS + shadcn/ui (Radix UI)
State:     React hooks + localStorage
Data:      Static JSON files (~1.7MB total)
Math:      MathJax 3 (CDN)
```

See [technology-stack.md](./technology-stack.md) for complete details.

## Repository Structure

**Type:** Monolith (single cohesive codebase)

```
mae-exam-web/
├── app/              # Next.js App Router (pages)
├── components/       # React components (shadcn/ui + custom)
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── public/data/     # Exam JSON files (29 exams)
└── docs/            # Generated documentation
```

See [source-tree-analysis.md](./source-tree-analysis.md) for complete structure.

## Architecture Type

**Pattern:** Component-Based SPA with Server-Side Rendering

- **App Router:** File-based routing with dynamic routes
- **Hybrid Rendering:** Server Components for routes, Client Components for interactivity
- **Static Data:** No database - JSON files for exam content
- **Client State:** React hooks with localStorage persistence

See [architecture.md](./architecture.md) for details.

## Quick Reference

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Key Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with MathJax config |
| `app/page.tsx` | Login/home page |
| `app/select-exam/page.tsx` | Exam selection interface |
| `app/practice/[id]/PracticeClient.tsx` | Main practice logic |
| `public/data/manifest.json` | Available exams index |
| `public/data/de{id}.json` | Individual exam files |

### Important Links

| Document | Description |
|----------|-------------|
| [Architecture](./architecture.md) | Complete architecture documentation |
| [Development Guide](./development-guide.md) | Setup and development workflow |
| [Deployment Guide](./deployment-guide.md) | Deployment instructions |
| [Data Models](./data-models.md) | Exam JSON schema |
| [Component Inventory](./ui-component-inventory.md) | UI component catalog |
| [State Management](./state-management-patterns.md) | State architecture |
| [API Contracts](./api-contracts.md) | Data endpoints (static) |

## Project Purpose

MathPractice addresses the need for **accessible math practice** with:

1. **Immediate Feedback:** Students learn from mistakes instantly
2. **Detailed Explanations:** Understand the "why" behind answers
3. **Self-Paced Learning:** No time pressure, learn at your speed
4. **Exam Simulation:** Practice with real exam-like questions
5. **Topic Coverage:** Various mathematical disciplines

## Development Status

| Aspect | Status |
|--------|--------|
| Core Features | ✅ Complete |
| Exam Content | ✅ 29 exams |
| UI/UX | ✅ Polished |
| Testing | ❌ Not implemented |
| Documentation | ✅ Complete |
| Deployment Ready | ✅ Yes |

## Next Steps for AI-Assisted Development

When creating new features for this project using AI:

1. **Reference this documentation** for context
2. **Follow existing patterns** for consistency
3. **Use the same tech stack** (Next.js, TypeScript, Tailwind)
4. **Maintain data schema** compatibility
5. **Test on mobile devices**

For brownfield PRD creation, point the workflow to:
```
C:\Users\Admin\Desktop\GIT CLONE\mae-exam-web\docs\index.md
```

## Metrics

| Metric | Value |
|--------|-------|
| Total Documentation Files | 17 |
| Total Lines Generated | ~4,000+ |
| Exam Files | 29 |
| Questions in Database | ~500+ (estimated) |
| Project Size | ~1.7MB data + dependencies |
| Code Files Scanned | 60+ TypeScript/TSX files |
