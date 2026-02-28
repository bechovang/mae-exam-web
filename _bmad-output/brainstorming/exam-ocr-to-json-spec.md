# 🚀 Exam OCR to JSON - Project Specification

**Project Type:** Separate standalone service/tool
**Owner:** Admin
**Created:** 2026-02-28
**Parent Project:** MathPractice (mae-exam-web)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Pipeline Flow](#pipeline-flow)
4. [Technical Stack](#technical-stack)
5. [API Specification](#api-specification)
6. [Data Models](#data-models)
7. [Implementation Plan](#implementation-plan)
8. [Error Handling](#error-handling)

---

## 1. Overview

### Problem Statement

Manual creation of exam JSON files is time-consuming. This project automates the conversion from exam images (scanned or photographed) to properly formatted JSON following the MathPractice schema.

### Goals

| Goal | Description |
|------|-------------|
| **Input** | Image file (JPG, PNG) containing exam questions |
| **Output** | Valid JSON file matching MathPractice schema |
| **Quality** | ~80%+ accuracy for text+table+math exams |
| **Speed** | Process 1 exam in <30 seconds |
| **Cost** | Minimize API costs (prefer local processing) |

### Scope

**IN Scope:**
- Exams with text + math formulas
- Exams with data tables
- Multiple choice questions
- Essay questions
- Vietnamese + English content

**OUT of Scope (Phase 1):**
- Complex diagrams/graphs/charts (warn user, require manual handling)
- Handwriting recognition
- Multi-page PDFs (single image only initially)

---

## 2. Architecture

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     EXAM OCR TO JSON SERVICE                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────┐    ┌──────────────┐    ┌───────────┐             │
│  │  Image  │───▶│  Image Type  │───▶│   OCR     │             │
│  │  Upload │    │ Classifier   │    │   Engine  │             │
│  └─────────┘    └──────────────┘    └───────────┘             │
│                      │                    │                      │
│                      ▼                    ▼                      │
│                 ┌──────────┐      ┌──────────────┐               │
│                 │ has_     │      │   Text +     │               │
│                 │ diagrams? │      │   LaTeX      │               │
│                 │ = true   │      │   Output     │               │
│                 └────┬─────┘      └──────────────┘               │
│                      │                    │                      │
│                      ▼                    ▼                      │
│              ┌─────────────┐      ┌──────────────┐               │
│              │   WARN      │      │  LLM (Qwen   │               │
│              │   USER      │      │  3.5 Plus)   │               │
│              └─────────────┘      └──────┬───────┘               │
│                                          │                       │
│                                          ▼                       │
│                                  ┌──────────────┐                 │
│                                  │   JSON       │                 │
│                                  │   Output     │                 │
│                                  └──────┬───────┘                 │
│                                         │                        │
│                                         ▼                        │
│                                  ┌──────────────┐                 │
│                                  │  Validate    │                 │
│                                  │  + Preview    │                 │
│                                  └──────┬───────┘                 │
│                                         │                        │
│                                         ▼                        │
│                                  ┌──────────────┐                 │
│                                  │  User        │                 │
│                                  │  Confirm/    │                 │
│                                  │  Edit        │                 │
│                                  └──────┬───────┘                 │
│                                         │                        │
│                                         ▼                        │
│                                  ┌──────────────┐                 │
│                                  │  Save JSON   │                 │
│                                  └──────────────┘                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 3. Pipeline Flow

### Step 1: Image Upload & Preprocessing

```python
# Input: Image file
# Operations:
- Validate format (JPG, PNG)
- Resize if too large (max 4000px width/height)
- Enhance contrast if needed (cv2.equalizeHist)
- Remove noise (cv2.fastNlMeansDenoising)
```

### Step 2: Image Type Classification

```python
# Using Vision Model (GPT-4o-mini or Qwen2-VL)
response = vision_model.classify(
    image,
    categories=["text_only", "has_tables", "has_diagrams", "mixed"]
)

# Decision:
if classification in ["has_diagrams", "mixed"]:
    return WARNING("This image contains complex diagrams.
                  Please process manually or use a different method.")
```

### Step 3: OCR Processing

#### 3a. Math Formula Extraction (Pix2TeX)

```python
# For regions containing math formulas
from pix2tex.cli import LatexOCR

model = LatexOCR()
latex_output = model(img_region)  # Returns LaTeX string

# Example: "Find the derivative of \\( f(x) = x^2 \\)"
```

#### 3b. Text Extraction (PaddleOCR or Tesseract)

```python
from paddleocr import PaddleOCR

ocr = PaddleOCR(use_angle_cls=True, lang='en')
result = ocr.ocr(img_path, cls=True)

# Returns structured text with bounding boxes
```

#### 3c: Merge OCR Outputs

```python
def merge_ocr_outputs(paddle_result, pix2tex_result):
    """
    Combine text OCR and formula LaTeX into structured format
    """
    merged = []
    for region in paddle_result:
        if is_math_region(region):
            merged.append(pix2tex_result[region.id])
        else:
            merged.append(region.text)
    return merged
```

### Step 4: LLM JSON Generation

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
)

def generate_json(ocr_output, exam_metadata=None):
    """
    One-shot LLM generation with few-shot examples
    """
    prompt = build_prompt_with_few_shots(ocr_output, exam_metadata)

    response = client.chat.completions.create(
        model="qwen/qwen-2.5-coder-32b-instruct",  # or Qwen3.5 Plus
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        temperature=0.1,  # Low temperature for consistent output
        response_format={"type": "json_object"}
    )

    return json.loads(response.choices[0].message.content)
```

### Step 5: Validation & Preview

```python
def validate_and_preview(json_output):
    """
    Validate against schema and show preview to user
    """
    # Schema validation
    errors = validate_schema(json_output)

    if errors:
        return {"valid": False, "errors": errors}

    # Generate preview HTML
    preview = generate_preview_html(json_output)

    return {
        "valid": True,
        "preview": preview,
        "json": json_output,
        "stats": {
            "total_questions": len(json_output.get("questions", [])),
            "multiple_choice": count_by_type(json_output, "multiple_choice"),
            "essay": count_by_type(json_output, "essay")
        }
    }
```

---

## 4. Technical Stack

### Core Components

| Component | Technology | Purpose |
|------------|-----------|---------|
| **Backend** | FastAPI (Python) | API server |
| **OCR - Math** | Pix2TeX | LaTeX formula extraction |
| **OCR - Text** | PaddleOCR | General text extraction |
| **OCR - Tables** | PaddleOCR + Table structure recognition |
| **Image Classification** | GPT-4o-mini / Qwen2-VL | Detect complex diagrams |
| **LLM** | Qwen 2.5 Coder / Qwen3.5 Plus | JSON generation |
| **Validation** | Pydantic | Schema validation |
| **Frontend** | Next.js 15 | Preview & edit interface |

### Python Dependencies

```python
# OCR
paddleocr>=2.7.0
paddlepaddle>=2.5.0
pix2tex>=0.1.0

# Image Processing
opencv-python>=4.8.0
pillow>=10.0.0
numpy>=1.24.0

# LLM
openai>=1.0.0  # For OpenRouter compatibility
python-dotenv>=1.0.0

# API
fastapi>=0.104.0
uvicorn>=0.24.0
python-multipart>=0.0.6

# Validation
pydantic>=2.5.0

# Utilities
pydantic-settings>=2.1.0
aiofiles>=23.2.1
```

---

## 5. API Specification

### Endpoints

#### POST /api/classify

Classify image type before processing.

```python
# Request
{
    "image_url": "string or base64"
}

# Response
{
    "type": "text_only | has_tables | has_diagrams | mixed",
    "confidence": 0.95,
    "can_process": true/false,
    "warning": "string (if can_process = false)"
}
```

#### POST /api/process

Main endpoint to process image and generate JSON.

```python
# Request (multipart/form-data)
image: File
exam_id: string (optional, auto-generated if not provided)
exam_title: string (optional)

# Response
{
    "success": true/false,
    "json_output": { ... },  # Generated exam JSON
    "preview_url": "string",  # URL to preview HTML
    "stats": {
        "total_questions": 10,
        "multiple_choice": 8,
        "essay": 2,
        "has_tables": true,
        "processing_time_seconds": 15.3
    },
    "warnings": [],
    "errors": []
}
```

#### POST /api/validate

Validate generated JSON without processing new image.

```python
# Request
{
    "json": { ... }  # Exam JSON to validate
}

# Response
{
    "valid": true/false,
    "errors": [
        {
            "field": "questions[0].options",
            "message": "Options array is empty for multiple_choice type"
        }
    ]
}
```

---

## 6. Data Models

### JSON Schema (Pydantic)

```python
from typing import Literal, Optional
from pydantic import BaseModel, Field, field_validator

class Question(BaseModel):
    id: int
    question: str
    image: Optional[str] = None
    options: list[str] = []
    correctAnswer: str
    explanation: str
    difficulty: Literal["easy", "medium", "hard"]
    topic: str
    hints: list[str] = []
    type: Literal["multiple_choice", "essay"] = "multiple_choice"

    @field_validator('options', 'correctAnswer')
    def validate_question_type(cls, v, info):
        question_type = info.data.get('type', 'multiple_choice')
        if info.field_name == 'options':
            if question_type == 'multiple_choice' and len(v) == 0:
                raise ValueError('Options required for multiple_choice')
            if question_type == 'essay' and len(v) != 0:
                raise ValueError('Options must be empty for essay')
        return v

class ExamData(BaseModel):
    examId: str = Field(pattern=r'^de\d+$')
    title: str
    description: str
    questions: list[Question] = Field(min_length=1)

    @field_validator('questions')
    def validate_question_ids(cls, v):
        ids = [q.id for q in v]
        if len(ids) != len(set(ids)):
            raise ValueError('Duplicate question IDs')
        return v
```

---

## 7. Implementation Plan

### Phase 1: MVP (Minimum Viable Product)

**Duration:** 1-2 weeks

| Feature | Description | Priority |
|---------|-------------|----------|
| Basic OCR | PaddleOCR + Pix2TeX integration | P0 |
| LLM Generation | One-shot JSON generation | P0 |
| Simple Validation | Schema check with Pydantic | P0 |
| CLI Tool | Command-line interface for testing | P0 |
| Image Classification | Basic rule-based (skip diagrams) | P1 |

### Phase 2: Web Interface

**Duration:** 1 week

| Feature | Description |
|---------|-------------|
| FastAPI Backend | RESTful API |
| Next.js Frontend | Upload + Preview interface |
| Real-time Preview | Show generated JSON in MathPractice format |
| Edit Capability | Manual edit before saving |

### Phase 3: Enhancement

**Duration:** 1-2 weeks

| Feature | Description |
|---------|-------------|
| Vision-based Classification | GPT-4o-mini for accurate image type detection |
| Batch Processing | Process multiple images at once |
| Quality Scoring | Confidence score for each generated question |
| Iterative Refinement | Allow LLM to fix its own mistakes |

---

## 8. Error Handling

### Error Categories

| Error Type | Handling |
|------------|----------|
| **Invalid Image** | Return 400 with specific error message |
| **OCR Failed** | Retry with different preprocessing, then fail gracefully |
| **LLM Timeout** | Retry up to 3 times, then ask user to try again |
| **Invalid JSON** | Ask LLM to fix, or return partial result with warnings |
| **Schema Validation Failed** | Show specific errors to user, allow manual edit |

### Fallback Strategy

```python
def process_with_fallback(image_path):
    try:
        # Primary method
        result = primary_pipeline(image_path)
    except OCSError:
        try:
            # Fallback 1: Different OCR settings
            result = fallback_ocr(image_path)
        except Exception:
            # Fallback 2: Ask for manual processing
            return {
                "success": False,
                "error": "Could not process image automatically",
                "suggestion": "Please try a clearer image or process manually"
            }

    # Validate result
    if not validate(result):
        return {
            "success": False,
            "partial_result": result,
            "validation_errors": get_validation_errors(result)
        }

    return {"success": True, "data": result}
```

---

## 9. Project Structure

```
exam-ocr-to-json/
├── backend/
│   ├── main.py                 # FastAPI app entry point
│   ├── api/
│   │   ├── classify.py          # Image classification
│   │   ├── process.py           # Main processing endpoint
│   │   └── validate.py          # Validation endpoint
│   ├── core/
│   │   ├── ocr/
│   │   │   ├── pix2tex_wrapper.py
│   │   │   ├── paddle_wrapper.py
│   │   │   └── merger.py
│   │   ├── llm/
│   │   │   ├── prompts.py       # Prompt templates
│   │   │   └── qwen_client.py
│   │   ├── validation/
│   │   │   └── schemas.py
│   │   └── preprocessing/
│   │       └── image.py
│   └── models/
│       └── exam_schema.py
├── frontend/
│   └── (Next.js app)
├── tests/
│   ├── unit/
│   └── integration/
├── docs/
│   └── API.md
├── requirements.txt
├── .env.example
└── README.md
```

---

## 10. Prompt Engineering

### System Prompt (for LLM)

```markdown
You are an expert at converting exam images into structured JSON format for a math practice application.

Your task is to extract exam questions from OCR output and format them according to the provided schema.

**CRITICAL RULES:**
1. Output MUST be valid JSON
2. Math formulas MUST use LaTeX with \(...\) for inline and \[...\] for display
3. Tables MUST be HTML with proper borders
4. Use <br /> for line breaks, NOT \n or \\
5. Use <b>...</b> for bold, NOT **...**
6. Question text must be in English
7. Explanation and hints must be in Vietnamese
8. For multiple choice: options array must have 2-6 items, correctAnswer is "A", "B", etc.
9. For essay: options must be empty [], correctAnswer is the full solution

**Output Schema:**
{
  "examId": "de{number}",
  "title": "string",
  "description": "string",
  "questions": [
    {
      "id": 1,
      "question": "string with \\(latex\\) and <br />",
      "image": null or "filename.jpg",
      "options": ["A. option1", "B. option2", ...],
      "correctAnswer": "A" or "full solution for essay",
      "explanation": "Vietnamese explanation with <b>bold</b> and <br />",
      "difficulty": "easy" or "medium" or "hard",
      "topic": "string",
      "hints": ["hint1", "hint2"],
      "type": "multiple_choice" or "essay"
    }
  ]
}
```

### Few-Shot Examples

Include 3 examples in prompt:
1. Simple multiple choice with math
2. Question with data table
3. Essay question with proof

---

## 11. Configuration

### Environment Variables

```bash
# OpenRouter API
OPENROUTER_API_KEY=sk-...
OPENROUTER_MODEL=qwen/qwen-2.5-coder-32b-instruct

# Alternative: Direct Qwen endpoint
QWEN_API_KEY=...
QWEN_BASE_URL=https://api.qwen.com/v1

# OCR Settings
PIX2TEX_MODEL_PATH=./models/pix2tex/checkpoints
PADDLEOCR_USE_GPU=True

# Processing
MAX_IMAGE_SIZE_MB=10
TIMEOUT_SECONDS=120
MAX_RETRIES=3

# Output
DEFAULT_OUTPUT_DIR=./output
PREVIEW_TTL_SECONDS=3600
```

---

## 12. Cost Estimation

| Component | Cost per 1000 exams |
|-----------|---------------------|
| Image Classification (GPT-4o-mini) | ~$2-3 |
| OCR (local, free) | $0 |
| LLM Generation (Qwen via OpenRouter) | ~$5-10 |
| **Total per 1000 exams** | **~$7-13** |

**Cost per exam:** ~$0.01 (1 cent)

---

## 13. Next Steps

1. **Set up project structure** - Create the new repository
2. **Install dependencies** - Pix2TeX, PaddleOCR, FastAPI
3. **Create CLI prototype** - Test OCR + LLM pipeline
4. **Build prompt templates** - Few-shot examples
5. **Implement validation** - Pydantic schemas
6. **Create simple UI** - Upload + Preview
7. **Test with real exam images** - Iterate on quality

---

## 14. References

- [Pix2TeX GitHub](https://github.com/lukas-blecher/LaTeX-OCR)
- [PaddleOCR Documentation](https://github.com/PaddlePaddle/PaddleOCR)
- [OpenRouter API](https://openrouter.ai/)
- [MathPractice JSON Schema](../PROMPT/huong-dan-dinh-dang-json.md)

---

**Document Version:** 1.0
**Last Updated:** 2026-02-28
**Status:** Ready for Implementation
