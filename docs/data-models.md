# Data Models

## Overview

MathPractice uses a **static JSON file-based data model** for exam content. All exam data is stored as individual JSON files in `public/data/`, with a manifest file for efficient discovery.

## Data Architecture

```
public/data/
├── manifest.json           # Index of available exam IDs
├── de1.json                # Exam 1 content
├── de2.json                # Exam 2 content
├── ...
├── de29.json               # Exam 29 content
└── danhsachsinhvien.json   # Student list data
```

## Schema Definitions

### Manifest Schema

**File:** `public/data/manifest.json`

```typescript
interface ExamsManifest {
  available: number[];  // Array of available exam IDs
}
```

**Example:**
```json
{
  "available": [1, 2, 3, 4, 5, 6, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
}
```

**Purpose:** Prevents 404 errors by listing only valid exam IDs before fetching.

### Exam Data Schema

**File:** `public/data/de{ID}.json`

```typescript
interface ExamData {
  examId: string;           // Unique exam identifier (e.g., "de1")
  title: string;            // Exam title (e.g., "Đề 1")
  description: string;      // Exam description
  questions: Question[];    // Array of questions
}

interface Question {
  id: number;                      // Question number/ID
  question: string;                // Question text (supports MathJax)
  image: string | null;            // Optional image path (relative to public/)
  options: string[];               // Answer options (A, B, C, D, E...)
  correctAnswer: string;           // Correct option letter ("A", "B", etc.)
  explanation: string;             // Detailed explanation (HTML + MathJax)
  difficulty: "easy" | "medium" | "hard";  // Difficulty level
  topic: string;                   // Topic/category (e.g., "Linear Algebra")
  hints: string[];                 // Array of hints for the question
  type?: "multiple_choice" | "essay";  // Question type (default: multiple_choice)
}
```

**Example (de1.json - abbreviated):**
```json
{
  "examId": "de1",
  "title": "Đề 1",
  "description": "AI hints and explanations",
  "questions": [
    {
      "id": 1,
      "question": "Find the characteristic polynomial of the matrix \\( A = \\begin{bmatrix} 1 & 0 & 2 \\\\ -2 & 3 & -3 \\\\ 0 & 2 & 2 \\end{bmatrix} \\).",
      "image": null,
      "options": [
        "A. (i)",
        "B. (iii)",
        "C. All of the other choices are incorrect"
      ],
      "correctAnswer": "A",
      "explanation": "Để giải siêu tốc, ta dùng mẹo tìm các hệ số quan trọng...",
      "difficulty": "medium",
      "topic": "Linear Algebra",
      "hints": [
        "Mẹo nhanh nhất: Đa thức đặc trưng của ma trận 3x3 có dạng...",
        "Hệ số của `x²` chính là Vết (tổng đường chéo chính)",
        "Hằng số tự do chính là Định thức của A"
      ]
    }
  ]
}
```

### Student Data Schema

**File:** `public/data/danhsachsinhvien.json`

```typescript
interface StudentList {
  students?: Student[];
  [key: string]: any;  // Additional fields possible
}

interface Student {
  id: string;
  name: string;
  [key: string]: any;
}
```

**Note:** This file exists but its exact schema and usage should be verified.

## Data Relationships

```
┌──────────────────┐
│  manifest.json   │
│  available: []   │
└────────┬─────────┘
         │
         │ references (by ID)
         │
    ┌────┴─────┬─────────┬─────────┬─────┐
    │          │         │         │     │
┌───▼───┐ ┌───▼───┐ ┌───▼───┐ ┌───▼───┐ ...
│ de1   │ │ de2   │ │ de3   │ │ de4   │
│ .json │ │ .json │ │ .json │ │ .json │
└───────┘ └───────┘ └───────┘ └───────┘
```

## Content Format

### MathJax Support

Questions and explanations support **MathJax** syntax:

| Type | Delimiters | Example |
|------|------------|---------|
| Inline Math | `\\(` ... `\\)` | `\\( x^2 + y^2 = r^2 \\)` |
| Display Math | `\\[` ... `\\]` | `\\[ \\int_0^1 x^2 dx \\]` |
| Line Break | `<br>` or `<br/>` | HTML line breaks |
| Bold | `<b>` ... `</b>` | Bold text |
| Italic | `<i>` ... `</i>` | Italic text |

### Option Format Convention

Options should follow the pattern: `{Letter}. {Text}`

```json
"options": [
  "A. First option",
  "B. Second option",
  "C. Third option",
  "D. Fourth option"
]
```

The application parses the letter from the option text for answer validation.

### Question Types

#### Multiple Choice (Default)

```json
{
  "type": "multiple_choice",  // Optional, default
  "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
  "correctAnswer": "A"
}
```

- User selects from predefined options
- Auto-graded on submission
- Shows correct/incorrect feedback

#### Essay

```json
{
  "type": "essay",
  "options": [],
  "correctAnswer": "Model answer here"
}
```

- User enters free-form text
- Self-graded (user compares with model answer)
- Shows explanation and model answer on check

## Derived Data Structures

### Display Data Model

**Location:** `app/select-exam/page.tsx`

```typescript
interface ExamCardDisplayData {
  id: number;              // Numeric ID
  examIdToDisplay: string;  // examId from JSON
  titleToDisplay: string;   // title from JSON
  descriptionToDisplay: string;  // description from JSON
  isLoading: boolean;       // Loading state
  isAvailable: boolean;     // Successfully loaded
  topics: string[];         // Aggregated topics from questions
  difficulties: string[];   // Aggregated difficulties from questions
  questionCount: number;    // Number of questions
  modifiedAt: number;       // Last modified timestamp
}
```

### Practice Session State

**Location:** `app/practice/[id]/PracticeClient.tsx`

```typescript
interface PracticeSessionState {
  examData: ExamData | null;
  currentQuestionIndex: number;
  selectedAnswers: Record<number, string>;
  answeredQuestions: Set<number>;
  questionResults: Record<number, boolean>;
  isSubmitted: boolean;
  showExplanation: boolean;
  timeElapsed: number;
}
```

## Data Access Patterns

### Client-Side Fetching

```typescript
// Fetch manifest
const manifestResp = await fetch('/data/manifest.json', { cache: 'no-cache' })
const manifest: ExamsManifest = await manifestResp.json()

// Fetch exam data
const response = await fetch(`/data/de${id}.json`, { cache: 'no-cache' })
const examData: ExamData = await response.json()
```

### Caching Strategy

- **No HTTP caching** for exam data (`cache: 'no-cache'`)
- Ensures fresh data on each load
- Trade-off: slower load times vs. stale data prevention

### Data Loading Flow

```
1. Load manifest.json
   ↓
2. Get list of available IDs
   ↓
3. Create placeholder cards for each ID
   ↓
4. Fetch individual exam files in parallel (Promise.allSettled)
   ↓
5. Update UI with loaded data
   ↓
6. Aggregate topics/difficulties for filters
```

## Data Validation

No runtime schema validation is performed. JSON structure is assumed to be correct.

**Recommended:** Consider adding Zod schema validation for runtime safety:

```typescript
import { z } from "zod";

const QuestionSchema = z.object({
  id: z.number(),
  question: z.string(),
  image: z.string().nullable(),
  options: z.array(z.string()),
  correctAnswer: z.string(),
  explanation: z.string(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  topic: z.string(),
  hints: z.array(z.string()),
  type: z.enum(["multiple_choice", "essay"]).optional(),
});

const ExamDataSchema = z.object({
  examId: z.string(),
  title: z.string(),
  description: z.string(),
  questions: z.array(QuestionSchema),
});
```

## File Naming Convention

| Pattern | Example | Description |
|---------|---------|-------------|
| `de{ID}.json` | `de1.json`, `de29.json` | Exam data files |
| `manifest.json` | `manifest.json` | Exam index file |

**Important:** The numeric ID in the filename should match the `examId` field content for consistency.

## Data Migration

No migration strategy is defined. Adding new exam files simply involves:
1. Creating `de{N}.json` file
2. Adding `N` to `manifest.json` available array
3. Hard refresh the application

## Data Storage Requirements

| Metric | Value |
|--------|-------|
| Total Exam Files | 29 files |
| File Size Range | ~18KB - 133KB per file |
| Total Data Size | ~1.7MB |
| Questions per Exam | Variable (5-50+ questions) |

## Future Considerations

### Potential Improvements

1. **Add Zod validation** for runtime schema checking
2. **Add data versioning** in JSON files for migration support
3. **Consider compression** for large exam files
4. **Add question metadata** (tags, author, creation date)
5. **Support for media assets** (images, audio, video)
6. **Add result schema** for tracking user performance
