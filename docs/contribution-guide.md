# Contribution Guide

## Overview

MathPractice is an open-source math practice platform. Contributions are welcome!

## Getting Started

### For New Contributors

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mae-exam-web.git
   cd mae-exam-web
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start development:**
   ```bash
   npm run dev
   ```

5. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Contribution Areas

### 1. Adding Exam Content

The easiest way to contribute is by adding new exam questions.

**How to add a new exam:**

1. **Create exam JSON file:**
   ```bash
   # Create new file in public/data/
   touch public/data/de31.json
   ```

2. **Follow the schema** (see [data-models.md](./data-models.md)):
   ```json
   {
     "examId": "de31",
     "title": "Đề 31",
     "description": "Mô tả đề thi",
     "questions": [
       {
         "id": 1,
         "question": "Question text with \\(formula\\)",
         "image": null,
         "options": ["A. Option 1", "B. Option 2", "C. Option 3"],
         "correctAnswer": "A",
         "explanation": "Detailed explanation",
         "difficulty": "medium",
         "topic": "Algebra",
         "hints": ["Hint 1", "Hint 2"]
       }
     ]
   }
   ```

3. **Update manifest.json:**
   ```json
   {
     "available": [1, 2, ..., 30, 31]
   }
   ```

4. **Test locally** and submit pull request

### 2. Bug Fixes

1. Check [existing issues](https://github.com/YOUR_USERNAME/mae-exam-web/issues)
2. Comment on the issue you want to work on
3. Create a branch: `git checkout -b fix/issue-number`
4. Fix the bug
5. Add tests if applicable
6. Submit PR with description

### 3. Feature Additions

1. **Propose first:** Create an issue to discuss before implementing
2. **Get approval** from maintainers
3. **Follow coding conventions** (see below)
4. **Update documentation** if needed
5. **Submit PR** with clear description

### 4. Documentation

Help improve:
- README.md translation
- Code comments
- User guides
- Technical documentation

## Coding Conventions

### TypeScript

- Use **strict types** - no `any`
- Define **interfaces** for data structures
- Use **type guards** for runtime checks
- Prefer **`const` assertions** for readonly data

```typescript
// Good
interface Question {
  id: number;
  question: string;
}

const question: Question = { id: 1, question: "..." };

// Bad
const question: any = { id: 1, question: "..." };
```

### React Components

- Use **function components** with hooks
- Use **"use client"** directive for interactive components
- **Destructure props** for clarity
- Use **** named exports** for components

```tsx
// Good
"use client"

import { useState } from "react"

interface MyComponentProps {
  title: string;
  onSave: () => void;
}

export function MyComponent({ title, onSave }: MyComponentProps) {
  const [isOpen, setIsOpen] = useState(false)
  return <div>{title}</div>
}
```

### Styling

- Use **Tailwind CSS** utility classes
- Follow **responsive-first** approach
- Use **cn()** helper for conditional classes

```tsx
// Good
<div className="p-4 bg-white dark:bg-gray-800 rounded-lg">

// With conditional
<div className={cn(
  "p-4 rounded-lg",
  isActive && "bg-blue-500",
  isDisabled && "opacity-50"
)}>
```

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `MyComponent.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Hooks | camelCase with `use-` | `use-data.ts` |
| Types | PascalCase with `.types` | `question.types.ts` |

### Git Commit Messages

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Formatting, no logic change
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

**Examples:**
```bash
feat(exam): add support for essay questions
fix(select-exam): resolve pagination bug
docs(readme): update installation instructions
```

## Pull Request Guidelines

### PR Title

Use the same format as commit messages:

```bash
feat(exam): add calculus questions
fix(practice): correct timer calculation
```

### PR Description

Include:

```markdown
## What this PR does

Brief description of changes.

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tested manually
- [ ] Added automated tests
- [ ] Screenshots attached (for UI changes)

## Checklist

- [ ] Code follows project conventions
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] All tests pass
```

### Review Process

1. **Automated checks** (if configured)
   - Linting passes
   - Tests pass
   - Build succeeds

2. **Code review** by maintainers
   - Logic correctness
   - Code quality
   - Documentation completeness

3. **Approval and merge**

## Testing Guidelines

### Manual Testing Checklist

Before submitting PR, test:

- [ ] Login page works
- [ ] Exam selection loads correctly
- [ ] Practice session functions properly
- [ ] Results display accurately
- [ ] MathJax formulas render
- [ ] Theme toggle works
- [ ] No console errors
- [ ] Responsive on mobile

### Writing Tests

Currently, the project has no automated tests. When adding tests:

```typescript
// Example: Vitest unit test
import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn utility', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar')).toBe('foo')
  })
})
```

## Code Style

### Prettier Configuration

The project uses Prettier for formatting:

```bash
# Format all files
npx prettier --write .

# Check formatting
npx prettier --check .
```

### ESLint

```bash
# Run linter
npm run lint

# Auto-fix issues
npm run lint -- --fix
```

## Questions?

- **Open an issue** for questions
- **Check existing docs** in `docs/` folder
- **Review `README.md`** for project overview

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

## Acknowledgments

Thank you for contributing to MathPractice! Your contributions help students learn mathematics effectively.
