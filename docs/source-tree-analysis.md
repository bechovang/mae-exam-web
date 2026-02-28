# Source Tree Analysis

## Complete Directory Structure

```
mae-exam-web/
│
├── 📁 app/                          # Next.js App Router (Entry Point)
│   ├── layout.tsx                   # Root layout with MathJax & Analytics
│   ├── page.tsx                     # Home page (login form)
│   ├── loading.tsx                  # Global loading state
│   ├── globals.css                  # Global styles
│   │
│   ├── select-exam/                 # Exam Selection Route
│   │   └── page.tsx                 # Exam list with filters & search
│   │
│   ├── practice/[id]/               # Practice Session Route (Dynamic)
│   │   ├── page.tsx                 # Server component wrapper
│   │   └── PracticeClient.tsx       # Client component (48KB) - Main practice logic
│   │
│   ├── exam/[id]/                   # Alternative Exam View (Dynamic)
│   │   ├── page.tsx                 # Server component wrapper
│   │   └── ExamClient.tsx           # Client component - Alternative exam view
│   │
│   └── results/[id]/                # Results Display Route (Dynamic)
│       ├── page.tsx                 # Server component wrapper
│       └── ResultsClient.tsx        # Client component - Results & review
│
├── 📁 components/                   # React Components
│   ├── theme-provider.tsx           # Theme context provider (next-themes)
│   ├── theme-toggle.tsx             # Dark/light mode toggle button
│   ├── SimpleMath.tsx               # MathJax formula display wrapper
│   ├── MathRenderer.tsx             # Alternative math renderer
│   ├── MathTest.tsx                 # Math component testing
│   │
│   └── ui/                          # shadcn/ui Base Components (45 files)
│       ├── accordion.tsx            # Collapsible sections
│       ├── alert-dialog.tsx         # Modal confirmation
│       ├── alert.tsx                # Dismissible alerts
│       ├── aspect-ratio.tsx         # Fixed aspect ratio
│       ├── avatar.tsx               # User avatar
│       ├── badge.tsx                # Status labels
│       ├── breadcrumb.tsx           # Breadcrumb navigation
│       ├── button.tsx               # Button variants
│       ├── calendar.tsx             # Date picker
│       ├── card.tsx                 # Container component
│       ├── carousel.tsx             # Image/content slider
│       ├── chart.tsx                # Recharts integration
│       ├── checkbox.tsx             # Checkbox input
│       ├── collapsible.tsx          # Expandable content
│       ├── command.tsx              # Command palette (cmdk)
│       ├── context-menu.tsx         # Right-click menu
│       ├── dialog.tsx               # Modal dialog
│       ├── drawer.tsx               # Side panel
│       ├── dropdown-menu.tsx        # Dropdown menu
│       ├── form.tsx                 # Form with react-hook-form
│       ├── hover-card.tsx           # Hover-triggered card
│       ├── input-otp.tsx            # OTP input
│       ├── input.tsx                # Text input
│       ├── label.tsx                # Form label
│       ├── menubar.tsx              # Application menu bar
│       ├── navigation-menu.tsx      # Dropdown navigation
│       ├── pagination.tsx           # Pagination controls
│       ├── popover.tsx              # Hover/click popover
│       ├── progress.tsx             # Progress bar
│       ├── radio-group.tsx          # Radio button group
│       ├── resizable.tsx            # Resizable panels
│       ├── scroll-area.tsx          # Custom scrollbar
│       ├── select.tsx               # Dropdown selection
│       ├── separator.tsx            # Visual divider
│       ├── sheet.tsx                # Side drawer
│       ├── sidebar.tsx              # Sidebar component
│       ├── skeleton.tsx             # Loading placeholder
│       ├── slider.tsx               # Range slider
│       ├── sonner.tsx               # Toast (sonner wrapper)
│       ├── switch.tsx               # Toggle switch
│       ├── table.tsx                # Data table
│       ├── tabs.tsx                 # Tabbed content
│       ├── textarea.tsx             # Multi-line input
│       ├── toast.tsx                # Toast notification
│       ├── toaster.tsx              # Toast container
│       ├── toggle-group.tsx         # Toggle button group
│       ├── toggle.tsx               # Toggle button
│       ├── tooltip.tsx              # Hover tooltip
│       ├── use-mobile.tsx           # Mobile detection hook
│       └── use-toast.ts             # Toast hook
│
├── 📁 hooks/                        # Custom React Hooks
│   ├── use-mobile.tsx               # Mobile viewport detection (768px breakpoint)
│   └── use-toast.ts                 # Toast notification management
│
├── 📁 lib/                          # Utility Functions
│   └── utils.ts                     # cn() - className merging (clsx + tailwind-merge)
│
├── 📁 styles/                       # Global Styles
│   └── globals.css                  # Global CSS with Tailwind directives
│
├── 📁 public/                       # Static Assets
│   ├── bechovang.webp               # Logo/brand image
│   │
│   └── data/                        # Exam Data (Static JSON)
│       ├── manifest.json            # Index of available exam IDs
│       ├── danhsachsinhvien.json    # Student list data
│       ├── sample_tu_luan.json      # Sample essay questions
│       │
│       ├── de1.json through de29.json  # Exam content files
│       │   # Size range: ~18KB - 133KB
│       │   # Total: ~1.7MB
│       │
│       └── image_exam/              # Exam-related images (if any)
│
├── 📁 src/                          # Alternative Source Directory (Minimal usage)
│   └── data/
│       └── danhsachsinhvien.json    # Duplicate student list
│
├── 📁 docs/                         # Project Documentation (Generated)
│   ├── index.md                     # Master documentation index
│   ├── project-structure.md         # Repository structure
│   ├── project-parts.json           # Parts metadata
│   ├── existing-documentation-inventory.md
│   ├── user-provided-context.md
│   ├── technology-stack.md          # Full tech stack details
│   ├── architecture-patterns.md     # Architecture decisions
│   ├── state-management-patterns.md # State management analysis
│   ├── data-models.md               # Data schema documentation
│   ├── ui-component-inventory.md    # Component catalog
│   ├── api-contracts.md             # API documentation (static files)
│   ├── comprehensive-analysis.md    # Full project analysis
│   ├── development-guide.md         # Development setup
│   └── project-scan-report.json     # Scan state file
│
├── 📁 PROMPT/                       # Internal Prompts (Vietnamese)
│   ├── QUY TRÌNH PROMPT HỌC MAS.txt
│   ├── huong dan dinh dang json v2.md
│   ├── huong dan dinh dang json.md
│   └── prompt lay cau hoi ve 1 chu de.txt
│
├── 📁 _bmad/                        # BMAD Workflow Files
│   └── ...
│
├── 📁 _bmad-output/                 # BMAD Output Artifacts
│   └── ...
│
├── 📁 .claude/                      # Claude Code Configuration
│   └── ...
│
├── 📁 .cursor/                      # Cursor IDE Configuration
│   └── ...
│
├── 📁 .git/                         # Git Repository
│   └── ...
│
├── 📁 .next/                        # Next.js Build Output (Generated)
│   └── ...
│
├── 📁 node_modules/                 # NPM Dependencies (Generated)
│   └── ...
│
├── 📄 Configuration Files
│   ├── package.json                 # Dependencies and scripts
│   ├── package-lock.json            # NPM lock file (198KB)
│   ├── pnpm-lock.yaml               # PNPM lock file (unused?)
│   ├── tsconfig.json                # TypeScript configuration
│   ├── next.config.mjs              # Next.js configuration
│   ├── tailwind.config.ts           # Tailwind CSS configuration
│   ├── postcss.config.mjs           # PostCSS configuration
│   ├── components.json              # shadcn/ui configuration
│   ├── next-env.d.ts                # Next.js TypeScript definitions
│   └── .gitignore                   # Git ignore patterns
│
├── 📄 Documentation Files (Root)
│   ├── README.md                    # Project overview (Vietnamese)
│   ├── MAINTAIN.md                  # Maintenance guide (Vietnamese)
│   └── ResultsClient.tsx            # Orphan file (should be in app/results/)
│
└── 📄 Other Files
    └── ...
```

## Critical Folders Explained

| Folder | Purpose | Entry Point | Notes |
|--------|---------|-------------|-------|
| `app/` | Next.js App Router | `app/layout.tsx` | Main application routes and pages |
| `components/` | React components | `components/ui/` | shadcn/ui base components |
| `hooks/` | Custom hooks | `hooks/use-mobile.tsx` | Reusable React hooks |
| `lib/` | Utilities | `lib/utils.ts` | Helper functions |
| `public/data/` | Static content | `public/data/manifest.json` | Exam JSON files |
| `docs/` | Documentation | `docs/index.md` | Generated project docs |

## Entry Points

| Entry Point | Location | Purpose |
|-------------|----------|---------|
| **Application** | `app/layout.tsx` | Root layout with providers |
| **Home Page** | `app/page.tsx` | Landing/login page |
| **Theme Provider** | `components/theme-provider.tsx` | Dark/light theme context |
| **MathJax Config** | `app/layout.tsx` | Math rendering configuration |

## File Organization Patterns

### Route Organization (App Router)

```
app/
├── page.tsx              → /
├── select-exam/page.tsx  → /select-exam
├── practice/[id]/page.tsx → /practice/1, /practice/2, etc.
└── results/[id]/page.tsx  → /results/1, /results/2, etc.
```

### Component Organization

```
components/
├── [feature].tsx         # Feature-specific components
└── ui/                   # Base UI components (shadcn/ui)
```

### Data Organization

```
public/data/
├── manifest.json         # Data index
├── de{id}.json           # Individual exams
└── [other].json          # Additional data files
```

## Key Files by Size

| File | Size | Notes |
|------|------|-------|
| `PracticeClient.tsx` | ~48KB | Largest component - contains all practice logic |
| `package-lock.json` | 198KB | NPM dependency lock file |
| `de17.json` | 112KB | Largest exam file |
| `de2.json` | 123KB | Second largest exam file |

## Orphan Files

| File | Expected Location | Action |
|------|-------------------|--------|
| `ResultsClient.tsx` | `app/results/[id]/` | Already exists there - root copy is duplicate |

## Unused/Directories

| Directory | Status | Notes |
|-----------|--------|-------|
| `src/` | Minimal | Contains only duplicate `danhsachsinhvien.json` |
| `styles/` | Partial | Some files may be unused (`globals.css` is in `app/`) |

## Configuration File Summary

| File | Purpose |
|------|---------|
| `package.json` | Dependencies: Next.js 15, React 19, TypeScript, Tailwind, shadcn/ui |
| `tsconfig.json` | Strict mode, path aliases, Next.js plugin |
| `tailwind.config.ts` | Custom theme, dark mode, animations |
| `next.config.mjs` | Standard Next.js 15 config |
| `components.json` | shadcn/ui configuration (CSS variables, etc.) |

## Asset Locations

| Asset Type | Location |
|------------|----------|
| Images | `public/` (root level) |
| Exam Data | `public/data/` |
| Icons | lucide-react (npm package) |
| Logo | `public/bechovang.webp` |

## Build Artifacts

Generated directories (not in source control):

| Directory | Purpose |
|-----------|---------|
| `.next/` | Next.js build output |
| `node_modules/` | NPM dependencies |

## Configuration Summary

```yaml
Project Structure:
  Type: Monolith Web Application
  Routing: File-based (Next.js App Router)
  Styling: Tailwind CSS utility classes
  Components: shadcn/ui (copy-paste installation)
  State: React hooks + localStorage
  Data: Static JSON files
  Build: Next.js 15 with Turbopack
```

## Next.js App Router Specifics

- **Server Components** by default
- **Client Components** marked with `"use client"`
- **Dynamic Routes** using `[id]` syntax
- **Parallel Routes** not used
- **Route Groups** not used
- **Middleware** not configured
- **API Routes** not implemented
