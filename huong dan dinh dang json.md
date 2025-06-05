

# 📘 **HƯỚNG DẪN ĐỊNH DẠNG TOÁN TRONG JSON VÀ CẤU TRÚC ĐỀ THI**

---

## 1. 🎯 **Mục Tiêu**

Tài liệu này hướng dẫn cách xây dựng một đề thi Toán học sử dụng định dạng **JSON** kết hợp công thức **LaTeX**, hỗ trợ hiển thị tốt trên web nhờ thư viện MathJax hoặc KaTeX. Cách trình bày này phù hợp với các ứng dụng luyện tập trực tuyến, hệ thống kiểm tra tự động hoặc ứng dụng học tập tùy chỉnh.

---

## 2. 📦 **Cấu Trúc JSON cho Đề Thi Toán**

Mỗi đề thi được định nghĩa bằng một đối tượng JSON có các trường thông tin như sau:

```json
{
  "examId": "de1",
  "title": "Basic Math Practice",
  "description": "Practice on derivatives, integrals, and functions",
  "questions": [
    {
      "id": 1,
      "question": "Find the derivative of \\( f(x) = x^2 \\sin(x) \\)",
      "image": "1.jpg",
      "options": [
        "A. \\( 2x \\sin(x) \\)",
        "B. \\( x^2 \\cos(x) \\)",
        "C. \\( 2x \\sin(x) + x^2 \\cos(x) \\)",
        "D. \\( 2x \\cos(x) + x^2 \\sin(x) \\)"
      ],
      "correctAnswer": "C",
      "explanation": "Sử dụng quy tắc đạo hàm tích:\\\\ \\( f'(x) = 2x \\sin(x) + x^2 \\cos(x) \\)",
      "difficulty": "medium",
      "topic": "Derivatives",
      "hints": [
        "Xét đây là đạo hàm của tích hai hàm số.",
        "Áp dụng công thức: \\( (uv)' = u'v + uv' \\)"
      ]
    }
  ]
}
```

### ✅ Ý nghĩa các trường:

| Trường          | Ý nghĩa                                                                |
| --------------- | ---------------------------------------------------------------------- |
| `examId`        | Mã định danh đề thi.                                                   |
| `title`         | Tiêu đề đề thi (tiếng Anh).                                            |
| `description`   | Mô tả đề thi (tiếng Anh).                                              |
| `questions`     | Danh sách câu hỏi.                                                     |
| `id`            | Số thứ tự câu hỏi.                                                     |
| `question`      | Câu hỏi (tiếng Anh, có thể chứa công thức LaTeX).                      |
| `image`         | Tên tệp hình ảnh nếu có minh họa.                                      |
| `options`       | Các lựa chọn (tiếng Anh, có thể chứa LaTeX).                           |
| `correctAnswer` | Đáp án đúng (ký tự: `"A"`, `"B"`...).                                  |
| `explanation`   | Giải thích chi tiết (bằng **tiếng Việt**, hỗ trợ LaTeX và xuống dòng). |
| `difficulty`    | Mức độ câu hỏi: `"easy"`, `"medium"`, `"hard"`.                        |
| `topic`         | Chủ đề: `"Derivatives"`, `"Integrals"`, v.v.                           |
| `hints`         | Danh sách gợi ý (viết bằng **tiếng Việt**, có thể dùng LaTeX).         |

---

## 3. 🧮 **Định Dạng Toán Học Bằng LaTeX trong JSON**

Để viết công thức toán học, sử dụng cú pháp **LaTeX** như sau:

### 3.1. ✅ **Toán inline** (`\\( ... \\)`)

Dùng để chèn công thức vào giữa dòng văn bản.

Ví dụ:

```json
"question": "Find the value of \\( \\int_0^1 x^2 \\, dx \\)"
```

Sẽ hiển thị:
*Find the value of*
\$ \int\_0^1 x^2 , dx \$

---

### 3.2. ✅ **Toán dạng khối (block math)** (`\\[ ... \\]`)

Dùng cho công thức dài hoặc cần trình bày riêng một dòng:

```json
"explanation": "Áp dụng công thức tích phân:\\\\ \\[ \\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\]"
```

Sẽ hiển thị:

> Áp dụng công thức tích phân
>
> $$
> \int x^n \, dx = \frac{x^{n+1}}{n+1} + C
> $$

---

### 3.3. 🔢 **Một số lệnh LaTeX phổ biến**

| Biểu thức   | Cú pháp LaTeX        |
| ----------- | -------------------- |
| Phân số     | `\\frac{a}{b}`       |
| Căn bậc hai | `\\sqrt{x}`          |
| Đạo hàm     | `\\frac{d}{dx}`      |
| Tích phân   | `\\int`, `\\int_a^b` |
| Giới hạn    | `\\lim_{x \\to 0}`   |
| Lũy thừa    | `e^{x}`, `x^2`       |
| Nhân        | `\\cdot` hoặc `*`    |

---

## 4. ↩️ **Quy Ước Xuống Dòng trong Phần `explanation` và `hints`**

Bạn có thể sử dụng `\\\\` để biểu diễn xuống dòng, vì hệ thống frontend sử dụng:

```js
{currentQuestionData.explanation.replace(/\\\\/g, '<br />')}
```

### 📌 Cách dùng:

```json
"explanation": "Bước 1: Đặt \\( u = x^2 \\), \\( dv = e^x dx \\)\\\\
Bước 2: Tính \\( du = 2x dx \\), \\( v = e^x \\)\\\\
Kết quả: \\[ \\int x^2 e^x dx = x^2 e^x - \\int 2x e^x dx \\]"
```

Hiển thị như:

> Bước 1: Đặt $u = x^2$, $dv = e^x dx$
> Bước 2: Tính $du = 2x dx$, $v = e^x$
> Kết quả:
> \$ \int x^2 e^x dx = x^2 e^x - \int 2x e^x dx \$

---

## 5. 🌐 **Tích Hợp Frontend với MathJax hoặc KaTeX**

Để hiển thị công thức toán học đẹp mắt trên trình duyệt, bạn nên dùng một trong hai thư viện sau:

### 5.1. 📚 MathJax (phổ biến hơn)

```html
<script type="text/javascript" async 
  src="https://cdn.jsdelivr.net/npm/mathjax@2.7.7/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
```

### 5.2. 💨 KaTeX (nhẹ và nhanh)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.js"></script>
```

---

## 6. 🌏 **Quy Ước Ngôn Ngữ trong JSON**

| Trường          | Ngôn ngữ                                        |
| --------------- | ----------------------------------------------- |
| `question`      | 🇬🇧 Tiếng Anh                                  |
| `options`       | 🇬🇧 Tiếng Anh                                  |
| `correctAnswer` | 🇬🇧 Tiếng Anh (ký tự A–E)                      |
| `title`         | 🇬🇧 Tiếng Anh                                  |
| `description`   | 🇬🇧 Tiếng Anh                                  |
| `topic`         | 🇬🇧 Tiếng Anh                                  |
| `difficulty`    | 🇬🇧 Tiếng Anh (`"easy"`, `"medium"`, `"hard"`) |
| `explanation`   | 🇻🇳 Tiếng Việt                                 |
| `hints`         | 🇻🇳 Tiếng Việt                                 |

> 🔎 Lý do: Câu hỏi và lựa chọn bằng tiếng Anh giúp luyện đọc hiểu, trong khi phần giải thích và gợi ý bằng tiếng Việt giúp học sâu, tránh hiểu sai bản chất.

---

## ✅ **Tổng Kết Hướng Dẫn**

* Dùng **LaTeX** để viết công thức toán học với `\\( ... \\)` hoặc `\\[ ... \\]`.
* Dùng `\\\\` để xuống dòng trong phần `"explanation"` và `"hints"`.
* Tích hợp **MathJax/KaTeX** để hiển thị công thức.
* Duy trì quy ước ngôn ngữ: tiếng Anh cho câu hỏi, tiếng Việt cho giải thích.

