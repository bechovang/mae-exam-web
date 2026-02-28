# UI Component Inventory

## Overview

MathPractice uses a **hybrid component architecture** combining:
- **shadcn/ui** base components (Radix UI primitives + Tailwind)
- **Custom application components** for business logic
- **Third-party components** (Framer Motion, Recharts, etc.)

## Component Structure

```
components/
├── ui/                      # shadcn/ui base components (40+ files)
├── MathRenderer.tsx        # MathJax rendering wrapper
├── MathTest.tsx            # Math testing component
├── SimpleMath.tsx          # Simplified math display
├── theme-provider.tsx      # Theme context provider
└── theme-toggle.tsx        # Dark/light mode toggle
```

## shadcn/ui Base Components

The following shadcn/ui components are included (installed via copy-paste):

### Layout & Container

| Component | File | Purpose |
|-----------|------|---------|
| Card | `card.tsx` | Container component with header, content, footer |
| Separator | `separator.tsx` | Visual divider |
| Sheet | `sheet.tsx` | Side panel / drawer |
| Tabs | `tabs.tsx` | Tabbed content |

### Form & Input

| Component | File | Purpose |
|-----------|------|---------|
| Input | `input.tsx` | Text input field |
| Textarea | `textarea.tsx` | Multi-line text input |
| Select | `select.tsx` | Dropdown selection |
| Checkbox | `checkbox.tsx` | Checkbox input |
| RadioGroup | `radio-group.tsx` | Radio button group |
| Switch | `switch.tsx` | Toggle switch |
| Slider | `slider.tsx` | Range slider |
| InputOTP | `input-otp.tsx` | One-time password input |
| Form | `form.tsx` | Form with react-hook-form integration |
| Label | `label.tsx` | Form label |

### Buttons & Actions

| Component | File | Purpose |
|-----------|------|---------|
| Button | `button.tsx` | Button with variants (default, ghost, outline, link) |
| Toggle | `toggle.tsx` | Toggle button |
| ToggleGroup | `toggle-group.tsx` | Group of toggle buttons |

### Feedback & Display

| Component | File | Purpose |
|-----------|------|---------|
| Badge | `badge.tsx` | Status indicator / label |
| Alert | `alert.tsx` | Dismissible alert message |
| Alert Dialog | `alert-dialog.tsx` | Modal confirmation dialog |
| Dialog | `dialog.tsx` | Modal dialog |
| Toast | `sonner` | Toast notifications (via sonner package) |
| Progress | `progress.tsx` | Progress bar |
| Skeleton | `skeleton.tsx` | Loading placeholder |

### Navigation

| Component | File | Purpose |
|-----------|------|---------|
| Pagination | `pagination.tsx` | Pagination controls |
| Breadcrumb | `breadcrumb.tsx` | Breadcrumb navigation |
| Menubar | `menubar.tsx` | Application menu bar |
| Navigation Menu | `navigation-menu.tsx` | Dropdown navigation |

### Data Display

| Component | File | Purpose |
|-----------|------|---------|
| Table | `table.tsx` | Data table |
| Avatar | `avatar.tsx` | User avatar |
| Chart | `chart.tsx` | Chart components (Recharts) |
| Calendar | `calendar.tsx` | Calendar widget |
| Carousel | `carousel.tsx` | Image/content carousel |
| Collapsible | `collapsible.tsx` | Expandable content |
| Accordion | `accordion.tsx` | Collapsible sections |

### Overlays & Popovers

| Component | File | Purpose |
|-----------|------|---------|
| Dropdown Menu | `dropdown-menu.tsx` | Context menu |
| Context Menu | `context-menu.tsx` | Right-click menu |
| Popover | `popover.tsx` | Hover/click popover |
| Hover Card | `hover-card.tsx` | Hover-triggered card |
| Tooltip | `tooltip.tsx` | Hover tooltip |

### Other

| Component | File | Purpose |
|-----------|------|---------|
| Command | `command.tsx` | Command palette (cmdk) |
| Scroll Area | `scroll-area.tsx` | Custom scrollable area |
| Resizable | `resizable.tsx` | Resizable panels |
| Aspect Ratio | `aspect-ratio.tsx` | Fixed aspect ratio container |

## Custom Application Components

### Math Rendering

| Component | File | Purpose |
|-----------|------|---------|
| SimpleMath | `SimpleMath.tsx` | MathJax formula display wrapper |
| MathRenderer | `MathRenderer.tsx` | Alternative math renderer |
| MathTest | `MathTest.tsx` | Math component testing |

**Purpose:** Render mathematical formulas using MathJax (loaded via CDN in root layout).

### Theme Components

| Component | File | Purpose |
|-----------|------|---------|
| ThemeProvider | `theme-provider.tsx` | Context provider for dark/light theme |
| ThemeToggle | `theme-toggle.tsx` | Toggle button for theme switching |

**Implementation:** Uses `next-themes` for theme persistence and system preference detection.

## Page Components (app/ directory)

These are route-level components, not reusable:

| Component | Location | Purpose |
|-----------|----------|---------|
| LoginPage | `app/page.tsx` | Landing page with name input |
| SelectPracticePage | `app/select-exam/page.tsx` | Exam selection with filters |
| PracticeClient | `app/practice/[id]/PracticeClient.tsx` | Practice session interface |
| ExamClient | `app/exam/[id]/ExamClient.tsx` | Alternative exam view |
| ResultsClient | `app/results/[id]/ResultsClient.tsx` | Results display |
| RootLayout | `app/layout.tsx` | Root layout with providers |

## Third-Party Component Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| Framer Motion | 12.19.1 | Animation library (motion.div) |
| Recharts | 2.15.0 | Chart components |
| Sonner | 1.7.1 | Toast notifications |
| embla-carousel-react | 8.5.1 | Carousel/slider |
| react-day-picker | 8.10.1 | Date picker (unused?) |
| react-resizable-panels | 2.1.7 | Resizable layouts |
| react-zoom-pan-pinch | 3.7.0 | Image zoom/pan |
| lucide-react | 0.454.0 | Icon library |

## Component Usage by Feature

### Login Page

**Components Used:**
- Button (shadcn/ui)
- Input (shadcn/ui)
- Card (shadcn/ui)
- ThemeToggle (custom)
- Framer Motion (animations)
- Icons (lucide-react)

### Exam Selection Page

**Components Used:**
- Card (shadcn/ui)
- Button (shadcn/ui)
- Input (shadcn/ui)
- Select (shadcn/ui)
- Pagination (shadcn/ui)
- ThemeToggle (custom)
- Icons (lucide-react)
- Badge (shadcn/ui)

### Practice Page

**Components Used:**
- Card (shadcn/ui)
- Button (shadcn/ui)
- RadioGroup (shadcn/ui)
- Progress (shadcn/ui)
- Textarea (shadcn/ui)
- AlertDialog (shadcn/ui)
- Badge (shadcn/ui)
- Label (shadcn/ui)
- Input (shadcn/ui)
- SimpleMath (custom)
- ThemeToggle (custom)
- confetti (canvas-confetti)
- Icons (lucide-react)

### Results Page

**Components Used:**
- Card (shadcn/ui)
- Button (shadcn/ui)
- Badge (shadcn/ui)
- Progress (shadcn/ui)
- Accordion (shadcn/ui)
- SimpleMath (custom)
- Icons (lucide-react)

## Design System

### Color Palette (Tailwind + Radix)

| Color | Light | Dark |
|-------|-------|------|
| Primary | blue-600 | blue-500 |
| Background | gray-50 | gray-950 |
| Surface | white | gray-800 |
| Border | gray-200 | gray-700 |
| Text | gray-800 | gray-100 |
| Muted | gray-500 | gray-400 |

### Typography

| Element | Font | Size |
|---------|------|------|
| Body | Inter | 14px (base) |
| Heading | Inter | 24px+ (xl+) |
| Small | Inter | 12px (xs/sm) |
| Mono | - | Code/formulas |

### Spacing Scale

Tailwind's default spacing scale (0.25rem increments):
- `p-4` = 1rem = 16px
- `gap-6` = 1.5rem = 24px
- `mb-8` = 2rem = 32px

### Border Radius

| Size | Class | Value |
|------|-------|-------|
| Small | `rounded-sm` | 0.125rem |
| Default | `rounded` | 0.25rem |
| Medium | `rounded-md` | 0.375rem |
| Large | `rounded-lg` | 0.5rem |
| Full | `rounded-full` | 9999px |

## Icon System

**Library:** lucide-react

**Common Icons Used:**
- User, Computer, BrainCircuit, Server, BarChart3 (features)
- FileText, BookOpen, Clock, Target, AlertTriangle (actions)
- CheckCircle, XCircle, Lightbulb, HelpCircle (feedback)
- ChevronLeft, ChevronRight, Home, LogOut (navigation)
- Info, Loader2, Trophy, Sparkles (status)

## Component Accessibility

shadcn/ui components are built on **Radix UI primitives**, which provide:
- Keyboard navigation
- ARIA attributes
- Focus management
- Screen reader support

## Unused Components

The following shadcn/ui components may be included but not actively used:
- Calendar
- Chart (Recharts integration)
- DayPicker
- Drawer
- Resizable
- ScrollArea
- Sheet
- Table
- ToggleGroup

These can be removed to reduce bundle size if confirmed unused.
