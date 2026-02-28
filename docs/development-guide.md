# Development Guide

## Prerequisites

| Requirement | Minimum Version | Recommended |
|-------------|-----------------|-------------|
| Node.js | 18.x | 20.x LTS |
| npm | 9.x | Latest |
| TypeScript | 5.x | (Installed via npm) |

## Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd mae-exam-web
```

### 2. Install Dependencies

```bash
npm install
```

**Note:** The project contains both `package-lock.json` (198KB) and `pnpm-lock.yaml`. Use npm for consistency.

### 3. Environment Setup

No environment variables are required for basic functionality. The application works out of the box.

Optional environment variables (if needed in future):

```env
# No .env file required currently
# Future: Add API keys, analytics IDs, etc.
```

## Development Commands

### Start Development Server

```bash
npm run dev
```

- **URL:** http://localhost:3000
- **Hot Reload:** Enabled
- **Port:** 3000 (default)

### Build for Production

```bash
npm run build
```

Output: `.next/` directory with optimized production build

### Start Production Server

```bash
npm start
```

- **URL:** http://localhost:3000
- **Mode:** Production (optimized)
- **Note:** Run `npm run build` first

### Run Linting

```bash
npm run lint
```

Checks code quality using Next.js ESLint configuration.

## Project Structure

```
mae-exam-web/
├── app/              # Next.js App Router
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── public/          # Static assets
└── styles/          # Global styles
```

See [source-tree-analysis.md](./source-tree-analysis.md) for complete structure.

## Development Workflow

### 1. Adding a New Exam

1. **Create JSON file:**
   ```bash
   # Create new exam file
   touch public/data/de30.json
   ```

2. **Add exam content** (follow schema in [data-models.md](./data-models.md)):
   ```json
   {
     "examId": "de30",
     "title": "Đề 30",
     "description": "Mô tả đề thi",
     "questions": [
       {
         "id": 1,
         "question": "Câu hỏi với công thức \\(x^2\\)",
         "options": ["A. Đáp án A", "B. Đáp án B"],
         "correctAnswer": "A",
         "explanation": "Giải thích chi tiết",
         "difficulty": "medium",
         "topic": "Chủ đề",
         "hints": ["Gợi ý 1", "Gợi ý 2"]
       }
     ]
   }
   ```

3. **Update manifest:**
   ```bash
   # Edit public/data/manifest.json
   # Add 30 to available array
   ```

4. **Test:**
   - Start dev server: `npm run dev`
   - Navigate to http://localhost:3000/select-exam
   - Verify new exam appears

### 2. Adding a New Page

1. **Create route directory:**
   ```bash
   mkdir -p app/new-page
   ```

2. **Create page component:**
   ```tsx
   // app/new-page/page.tsx
   export default function NewPage() {
     return <div>New Page Content</div>
   }
   ```

3. **Access at:** http://localhost:3000/new-page

### 3. Adding a New Component

1. **Create component file:**
   ```tsx
   // components/MyComponent.tsx
   export function MyComponent({ prop }: { prop: string }) {
     return <div>{prop}</div>
   }
   ```

2. **Import and use:**
   ```tsx
   import { MyComponent } from "@/components/MyComponent"
   ```

### 4. Adding shadcn/ui Component

```bash
npx shadcn-ui@latest add [component-name]
```

Example:
```bash
npx shadcn-ui@latest add dialog
```

## Coding Conventions

### TypeScript

- Use **strict mode** (enabled in tsconfig.json)
- Define **interfaces** for data structures
- Use **type assertions** sparingly
- Prefer **const** over **let**

Example:
```typescript
interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

const currentQuestion: Question = { /* ... */ }
```

### React Components

- Use **function components** (no class components)
- Use **hooks** for state and side effects
- Use **"use client"** directive for interactive components
- Use **async/await** for server components

Example:
```tsx
"use client"

import { useState } from "react"

export function MyComponent() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

### Styling

- Use **Tailwind CSS** utility classes
- Use **cn()** helper for conditional classes
- Follow **mobile-first** responsive design

Example:
```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "p-4 bg-white dark:bg-gray-800",
  isActive && "ring-2 ring-blue-500"
)}>
```

### File Naming

- **Components:** PascalCase (e.g., `MyComponent.tsx`)
- **Utilities:** camelCase (e.g., `utils.ts`)
- **Hooks:** camelCase with `use` prefix (e.g., `use-mobile.tsx`)
- **Pages:** lowercase (e.g., `page.tsx`, `layout.tsx`)

## Testing

### Manual Testing Checklist

1. **Login Page:**
   - [ ] Enter name and click start
   - [ ] Empty name defaults to "Người dùng ẩn danh"
   - [ ] Theme toggle works

2. **Exam Selection:**
   - [ ] All exams load from manifest
   - [ ] Search filters correctly
   - [ ] Topic/difficulty filters work
   - [ ] Pagination works
   - [ ] Clicking exam navigates to practice page

3. **Practice Session:**
   - [ ] Questions display correctly
   - [ ] MathJax formulas render
   - [ ] Answer selection works
   - [ ] Submit shows correct/incorrect
   - [ ] Explanations display
   - [ ] Navigation between questions works
   - [ ] Timer works
   - [ ] Completion redirects to results

4. **Results Page:**
   - [ ] Score displays correctly
   - [ ] Review shows all questions
   - [ ] Navigation back to home works

### No Automated Tests

The project currently has **no test files**. Consider adding:

- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright

## Common Development Tasks

### Change MathJax Configuration

Edit `app/layout.tsx`:

```tsx
<Script id="mathjax-config" strategy="beforeInteractive">
  {`
    window.MathJax = {
      tex: {
        inlineMath: [['\\\\(', '\\\\)']],
        displayMath: [['\\\\[', '\\\\]']],
        // Add your config here
      }
    };
  `}
</Script>
```

### Add Google Analytics

Edit `app/layout.tsx` and update measurement ID:

```tsx
<Script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_ID"
/>
```

### Customize Theme

Edit `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: { /* your colors */ }
      }
    }
  }
}
```

### Debug Common Issues

**Problem:** Math formulas not rendering
- **Solution:** Check browser console for MathJax errors
- **Check:** MathJax CDN is loading in network tab

**Problem:** Exam not loading
- **Solution:** Check JSON syntax in `public/data/de{id}.json`
- **Check:** ID is in `manifest.json`

**Problem:** Styling not working
- **Solution:** Ensure `globals.css` has Tailwind directives
- **Check:** Tailwind config is correct

**Problem:** Build fails
- **Solution:** Check TypeScript errors
- **Run:** `npm run lint` to see errors

## Performance Optimization

### Current Performance

- **Bundle Size:** Large (many dependencies)
- **Load Time:** Moderate (no caching for data)
- **Runtime:** Fast (React Server Components)

### Optimization Tips

1. **Code Splitting:**
   ```tsx
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <Skeleton />
   })
   ```

2. **Image Optimization:**
   ```tsx
   import Image from "next/image"
   <Image src="/path" width={500} height={300} />
   ```

3. **Cache Data Fetches:**
   ```tsx
   fetch('/data/de1.json', { next: { revalidate: 3600 } })
   ```

4. **Remove Unused Dependencies:**
   - Run `npx next-bundle-analyzer`
   - Identify large packages
   - Remove unused imports

## Troubleshooting

### Port Already in Use

```bash
# Find process on port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill process or use different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### TypeScript Errors

```bash
# Check types
npx tsc --noEmit
```

### Build Fails

```bash
# Clear build cache
rm -rf .next
npm run build
```

## IDE Recommendations

### VS Code Extensions

- **TypeScript** - Microsoft
- **Tailwind CSS IntelliSense** - Tailwind Labs
- **ESLint** - Microsoft
- **Prettier** - Prettier
- **Import Cost** - Wix
- **GitLens** - GitKraken

### VS Code Settings

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [MathJax Documentation](https://docs.mathjax.org)

## Support

For issues or questions:
1. Check existing documentation in `docs/`
2. Review `MAINTAIN.md` for maintenance procedures
3. Check `README.md` for project overview
