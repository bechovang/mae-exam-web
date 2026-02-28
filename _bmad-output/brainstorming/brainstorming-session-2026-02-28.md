---
stepsCompleted: [1, 2, 3]
inputDocuments: ["PROMPT/huong dan dinh dang json.md"]
session_topic: 'Automate exam JSON creation from images (OCR + LLM)'
session_goals: 'Create a separate project that converts exam images to properly formatted JSON'
selected_approach: 'Hybrid: Pix2TeX + Vision Classification + Qwen LLM'
techniques_used: ['Image Classification', 'OCR Pipeline Design', 'LLM Prompting', 'Architecture Design']
ideas_generated: ['Use Pix2TeX for math formulas', 'Use GPT-4o-mini for image type classification', 'Hybrid OCR approach', 'Separate project architecture', 'One-shot with few-shot prompting', 'Validation + Preview layer']
context_file: ''
---

# Brainstorming Session Results

**Facilitator:** Admin
**Date:** 2026-02-28

---

## Session Overview

**Topic:** Automate exam JSON creation from images (OCR + LLM)
**Goals:** Create a separate project that converts exam images to properly formatted JSON for MathPractice

---

## Context Guidance

Working with MathPractice (mae-exam-web) - a Next.js 15 web application for math practice. Currently, exam JSON files are created manually. The goal is to automate this process using:
- OCR (PaddleOCR / Pix2TeX)
- LLM (Qwen3.5 Plus via OpenRouter)
- Image preprocessing and classification

---

## Session Discussion

### Initial Problem Statement

User described manual process of creating exam JSON files and wanted to automate:
- **Input:** Image of exam (scanned or photographed)
- **Output:** Valid JSON matching MathPractice schema
- **Key concern:** Complex graphs/diagrams should be detected and warned about

### Key Discussion Points

#### 1. Graph/Chart Detection

**User's current approach (rule-based):**
- LayoutParser → Detect figure → Edge detection → Heuristic (ratio straight/curved lines)
- **Result:** ~70% accuracy, many false positives

**Facilitator suggestion:**
- Use vision model (GPT-4o-mini / Qwen2-VL) for image classification
- Categories: "text_only", "has_tables", "has_diagrams", "mixed"
- Cost: ~$0.001-0.002 per image

**Decision:** Rule-based not sufficient; will use vision model for better classification

#### 2. Math OCR

**Initial thought:** PaddleOCR
**Refined decision:** **Pix2TeX** (specialized for LaTeX formulas)

**Facilitator insight:** Pix2TeX produces LaTeX output which is more accurate for math formulas than general OCR.

#### 3. LLM Prompting Strategy

**User choice:** Option A - One-shot with full prompt
**Facilitator enhancement:** Add **few-shot examples** to improve accuracy:
- Example 1: Simple multiple choice
- Example 2: Question with table
- Example 3: Essay question

#### 4. Table Handling

**Challenge:** OCR often produces fragmented text from tables
**User confidence:** LLM can reconstruct table structure

**Facilitator validation:** Feasible with proper few-shot examples showing correct HTML table format with borders

#### 5. Project Architecture

**User decision:** **Separate standalone project**
- Not integrated into main MathPractice app initially
- Can be a CLI tool or web service
- Outputs JSON files to be copied to MathPractice's `public/data/`

---

## Ideas Generated

1. **Pix2TeX for Math** - Use specialized LaTeX OCR for mathematical formulas
2. **Vision-based Classification** - Replace rule-based with GPT-4o-mini for accurate image type detection
3. **Hybrid OCR Pipeline** - Pix2TeX for math + PaddleOCR for text, merge outputs
4. **Separate Project Architecture** - Standalone service/tool for maintainability
5. **One-shot + Few-shot Prompting** - Include 3 examples in prompt for better LLM performance
6. **Validation + Preview Layer** - Show preview to user before saving, allow manual edits
7. **Human-in-the-Loop** - User confirms/edits before final JSON is saved
8. **Cost Optimization** - Local OCR (free) + Vision classification (~$0.001/image) + LLM (~$0.01/exam)

---

## Decisions Made

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| **OCR Math** | Pix2TeX | Better LaTeX output for formulas |
| **OCR Text** | PaddleOCR | Good general text OCR |
| **Image Classification** | GPT-4o-mini / Qwen2-VL | More accurate than rule-based |
| **LLM Model** | Qwen 2.5 Coder / Qwen3.5 Plus | Good at structured output |
| **Prompt Strategy** | One-shot with few-shot examples | Improves accuracy |
| **Project Structure** | Separate standalone project | Cleaner separation of concerns |
| **Validation** | Pydantic schema + Preview UI | Catch errors before saving |

---

## Technical Recommendations

### Architecture

```
Image Upload
    ↓
Image Classification (Vision Model)
    ↓
OCR Processing (Pix2TeX + PaddleOCR)
    ↓
LLM JSON Generation (Qwen)
    ↓
Validation (Pydantic)
    ↓
Preview & User Confirmation
    ↓
Save JSON File
```

### Technology Stack

- **Backend:** FastAPI (Python)
- **OCR Math:** Pix2TeX
- **OCR Text:** PaddleOCR
- **Image Classification:** GPT-4o-mini
- **LLM:** Qwen via OpenRouter
- **Validation:** Pydantic
- **Frontend (optional):** Next.js

---

## Output Deliverables

**File Created:** `exam-ocr-to-json-spec.md`

Contains:
- Complete project specification
- Architecture diagrams
- API endpoints
- Data models (Pydantic schemas)
- Implementation plan (3 phases)
- Prompt templates
- Cost estimation (~$0.01 per exam)

---

## Next Steps for Implementation

1. Set up new project structure
2. Install dependencies (Pix2TeX, PaddleOCR, FastAPI)
3. Create CLI prototype for testing
4. Build prompt templates with few-shot examples
5. Implement validation layer
6. Create simple UI (optional)
7. Test with real exam images

---

## Session Metrics

- **Duration:** ~15 minutes
- **Ideas Generated:** 8
- **Decisions Made:** 7
- **Output Files:** 1 specification document

---

*Session completed successfully. User ready to proceed with implementation.*