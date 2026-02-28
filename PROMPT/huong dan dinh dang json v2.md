

# 📘 **HƯỚNG DẪN ĐỊNH DẠNG TOÁN TRONG JSON VÀ CẤU TRÚC ĐỀ THI**

---

## 1. 🎯 **Mục Tiêu**

Tài liệu này hướng dẫn cách xây dựng một đề thi Toán học sử dụng định dạng **JSON** kết hợp công thức **LaTeX**, hỗ trợ hiển thị tốt trên web nhờ thư viện MathJax hoặc KaTeX. Cách trình bày này phù hợp với các ứng dụng luyện tập trực tuyến, hệ thống kiểm tra tự động hoặc ứng dụng học tập tùy chỉnh.

---

## 2. 📦 **Cấu Trúc JSON cho Đề Thi Toán**

### 2.1. 🎯 **Câu hỏi Trắc nghiệm (Multiple Choice)**

```json
{
  "examId": "de1",
  "title": "Basic Math Practice",
  "description": "Practice on derivatives, integrals, and functions",
  "questions": [
    {
      "id": 1,
      "question": "Find the derivative of \\( f(x) = x^2 \\sin(x) \\)<br />Choose the correct answer.",
      "image": "1.jpg",
      "options": [
        "A. \\( 2x \\sin(x) \\)",
        "B. \\( x^2 \\cos(x) \\)",
        "C. \\( 2x \\sin(x) + x^2 \\cos(x) \\)",
        "D. \\( 2x \\cos(x) + x^2 \\sin(x) \\)"
      ],
      "correctAnswer": "C",
      "explanation": "<b>Sử dụng quy tắc đạo hàm tích:</b><br />\\( f'(x) = 2x \\sin(x) + x^2 \\cos(x) \\)",
      "difficulty": "medium",
      "topic": "Derivatives",
      "hints": [
        "Xét đây là đạo hàm của tích hai hàm số.",
        "Áp dụng công thức: \\( (uv)' = u'v + uv' \\)"
      ],
      "type": "multiple_choice"
    }
  ]
}
```

### 2.2. ✍️ **Câu hỏi Tự luận (Essay Questions)**

```json
{
  "examId": "essay_sample",
  "title": "Essay Math Questions",
  "description": "Mathematical proofs and detailed problem solving",
  "questions": [
    {
      "id": 1,
      "question": "Chứng minh rằng với mọi số nguyên dương n, ta có:<br />\\( 1^2 + 2^2 + 3^2 + \\cdots + n^2 = \\frac{n(n+1)(2n+1)}{6} \\)",
      "image": null,
      "options": [],
      "correctAnswer": "Chứng minh bằng phương pháp quy nạp toán học:<br /><br /><b>Bước 1: Kiểm tra với n = 1</b><br />Vế trái: \\( 1^2 = 1 \\)<br />Vế phải: \\( \\frac{1(1+1)(2\\cdot1+1)}{6} = \\frac{1 \\cdot 2 \\cdot 3}{6} = 1 \\)<br />Vậy đẳng thức đúng với n = 1.<br /><br /><b>Bước 2: Giả sử đẳng thức đúng với n = k</b><br />Tức là: \\( 1^2 + 2^2 + \\cdots + k^2 = \\frac{k(k+1)(2k+1)}{6} \\)<br /><br /><b>Bước 3: Chứng minh đúng với n = k + 1</b><br />Ta cần chứng minh:<br />\\( 1^2 + 2^2 + \\cdots + k^2 + (k+1)^2 = \\frac{(k+1)(k+2)(2k+3)}{6} \\)<br /><br />Vế trái = \\( \\frac{k(k+1)(2k+1)}{6} + (k+1)^2 \\)<br />= \\( (k+1)\\left[\\frac{k(2k+1)}{6} + (k+1)\\right] \\)<br />= \\( (k+1)\\left[\\frac{k(2k+1) + 6(k+1)}{6}\\right] \\)<br />= \\( (k+1)\\left[\\frac{2k^2 + k + 6k + 6}{6}\\right] \\)<br />= \\( (k+1)\\left[\\frac{2k^2 + 7k + 6}{6}\\right] \\)<br />= \\( (k+1)\\left[\\frac{(k+2)(2k+3)}{6}\\right] \\)<br />= \\( \\frac{(k+1)(k+2)(2k+3)}{6} \\)<br /><br />Vậy đẳng thức đúng với n = k + 1.<br /><br /><b>Kết luận:</b> Theo nguyên lý quy nạp, đẳng thức đúng với mọi số nguyên dương n.",
      "explanation": "Đây là một bài toán chứng minh bằng quy nạp toán học kinh điển. Phương pháp quy nạp gồm 3 bước:<br /><br />1. <b>Bước cơ sở:</b> Kiểm tra với giá trị nhỏ nhất (thường là n = 1)<br />2. <b>Bước quy nạp:</b> Giả sử đúng với n = k<br />3. <b>Bước chứng minh:</b> Chứng minh đúng với n = k + 1<br /><br /><b>Mẹo nhớ:</b> Khi làm bài quy nạp, hãy chú ý:<br />- Luôn bắt đầu từ n = 1 (hoặc giá trị nhỏ nhất trong tập xác định)<br />- Trong bước chứng minh, phải sử dụng giả thiết quy nạp<br />- Biến đổi đại số cẩn thận để đưa về dạng cần chứng minh<br /><br /><b>Ứng dụng:</b> Công thức này rất hữu ích trong việc tính tổng bình phương các số tự nhiên, thường xuất hiện trong các bài toán về xác suất, thống kê và giải tích.",
      "difficulty": "hard",
      "topic": "Toán học - Quy nạp",
      "hints": [
        "Hãy nhớ phương pháp quy nạp toán học có 3 bước cơ bản.",
        "Trong bước chứng minh, hãy sử dụng giả thiết quy nạp một cách khéo léo.",
        "Chú ý phân tích đa thức \\( 2k^2 + 7k + 6 \\) thành nhân tử."
      ],
      "type": "essay"
    }
  ]
}
```

---

### ✅ Ý nghĩa các trường:

| Trường          | Ý nghĩa                                                                                           | Bắt buộc | Áp dụng cho |
| --------------- | ------------------------------------------------------------------------------------------------- | -------- | ----------- |
| `examId`        | Mã định danh đề thi.                                                                              | ✅       | Tất cả      |
| `title`         | Tiêu đề đề thi (tiếng Anh).                                                                       | ✅       | Tất cả      |
| `description`   | Mô tả đề thi (tiếng Anh).                                                                         | ✅       | Tất cả      |
| `questions`     | Danh sách câu hỏi.                                                                                | ✅       | Tất cả      |
| `id`            | Số thứ tự câu hỏi.                                                                                | ✅       | Tất cả      |
| `question`      | Câu hỏi (tiếng Anh, có thể chứa LaTeX, xuống dòng bằng `<br />`).                                 | ✅       | Tất cả      |
| `image`         | Tên tệp hình ảnh nếu có minh họa. Đặt `null` nếu không có.                                        | ❌       | Tất cả      |
| `options`       | Các lựa chọn (tiếng Anh, có thể chứa LaTeX). **Để mảng rỗng `[]` cho câu tự luận.**               | ✅       | Trắc nghiệm |
| `correctAnswer` | Đáp án đúng. **Trắc nghiệm:** ký tự `"A"`, `"B"`... **Tự luận:** lời giải chi tiết.              | ✅       | Tất cả      |
| `explanation`   | Giải thích bằng tiếng Việt, hỗ trợ LaTeX, **dùng `<br />` để xuống dòng** và **`<b>` để in đậm**. | ✅       | Tất cả      |
| `difficulty`    | Mức độ câu hỏi: `"easy"`, `"medium"`, `"hard"`.                                                   | ✅       | Tất cả      |
| `topic`         | Chủ đề: `"Derivatives"`, `"Integrals"`, v.v.                                                      | ✅       | Tất cả      |
| `hints`         | Gợi ý (tiếng Việt, là array, mỗi dòng là một phần tử, **không cần xuống dòng thêm**). ⚠️ **Xem Section 3: BẮT BUỘC phải có ít nhất 2 hints!** | ⚠️ **BẮT BUỘC (thực tế)** | Tất cả      |
| `type`          | Loại câu hỏi: `"multiple_choice"` hoặc `"essay"`. **Mặc định:** `"multiple_choice"` nếu không có. | ❌       | Tất cả      |

---

## 🔥 **QUICK REFERENCE - CHECKLIST NHANH**

> ### **TRƯỚC KHI BẮT ĐẦU - KIỂM TRA 8 ĐIỂM QUAN TRỌNG:**
> 
> | # | Quy tắc | Chi tiết | Section |
> |---|---------|----------|---------|
> | 1️⃣ | **LaTeX inline** | Dùng `\\( ... \\)` KHÔNG phải `$...$` | 5.1 |
> | 2️⃣ | **LaTeX block** | Dùng `\\[ ... \\]` KHÔNG phải `$$...$$` | 5.2 |
> | 3️⃣ | **Xuống dòng** | Dùng `<br />` KHÔNG phải `\\\\` hoặc `\n` | 6 |
> | 4️⃣ | **In đậm** | Dùng `<b>...</b>` KHÔNG phải `**...**` | 6 |
> | 5️⃣ | **Hints** | Ít nhất 2 hints/câu, tiếng Việt, dẫn dắt không spoil | 3 |
> | 6️⃣ | **Bảng (Tables)** | HTML với border từng cell: `style='border:1px solid #ddd; padding:5px;'` | 10 |
> | 7️⃣ | **Ảnh có bảng** | Ghi ra HTML table, KHÔNG nhúng ảnh | 10 |
> | 8️⃣ | **Ngôn ngữ** | Question/Options: English, Explanation/Hints: Tiếng Việt | 8 |
> 
> **💡 Mẹo:** Bookmark section 12 (Checklist cuối) để kiểm tra trước khi submit!

---

## 3. 💡 **HƯỚNG DẪN TRƯỜNG `hints` - GỢI Ý CHO HỌC SINH**

### ⚠️ **QUY TẮC BẮT BUỘC**

> **Dù trường `hints` được đánh dấu là "optional" trong schema, nhưng trong thực tế BẠN PHẢI LUÔN THÊM NÓ CHO MỖI CÂU HỎI.**

### 🎯 **Tại Sao Hints Quan Trọng?**

Hints giúp học sinh:
- Tự giải quyết vấn đề thay vì xem đáp án ngay
- Phát triển tư duy logic từng bước
- Học cách tiếp cận bài toán một cách có hệ thống
- Tăng khả năng ghi nhớ kiến thức

### 📋 **CHECKLIST KHI TẠO HINTS**

✅ **Bắt buộc phải có:**
- [ ] Mỗi câu hỏi PHẢI có ít nhất **2 hints**
- [ ] Hints được sắp xếp theo thứ tự từ **tổng quát → cụ thể**
- [ ] Hint đầu tiên: Gợi ý hướng tiếp cận hoặc khái niệm cần dùng
- [ ] Hint thứ hai: Gợi ý cụ thể hơn, có thể là công thức hoặc bước đầu tiên
- [ ] Viết bằng **tiếng Việt**
- [ ] Có thể chứa **LaTeX** nếu cần công thức
- [ ] Không spoil đáp án trực tiếp, chỉ gợi ý hướng đi

### 🏗️ **CẤU TRÚC CHUẨN**

```json
{
  "hints": [
    "Hint 1: Gợi ý chung về phương pháp/khái niệm",
    "Hint 2: Gợi ý cụ thể hơn hoặc công thức liên quan"
  ]
}
```

### ✅ **VÍ DỤ TỐT (Best Practices)**

#### Ví dụ 1: Câu hỏi Xác suất
```json
{
  "question": "A batch of 500 parts contains 15 defective. What is the probability of selecting 2 defective parts in a sample of 10?",
  "hints": [
    "Đây là bài toán phân phối siêu bội (Hypergeometric Distribution).",
    "Sử dụng công thức: \\( P(X=k) = \\frac{C(K,k) \\cdot C(N-K,n-k)}{C(N,n)} \\)"
  ]
}
```

#### Ví dụ 2: Câu hỏi Phân loại Biến
```json
{
  "question": "Is the weight of students a discrete or continuous variable?",
  "hints": [
    "Hỏi bản thân: Đây là kết quả của phép đếm (counting) hay đo lường (measurement)?",
    "Cân nặng có thể có giá trị thập phân (ví dụ: 65.7 kg) không?"
  ]
}
```

#### Ví dụ 3: Câu hỏi Tính toán
```json
{
  "question": "Find the mean of the probability distribution: X={1,2,3}, P(X)={0.2,0.5,0.3}",
  "hints": [
    "Công thức tính Mean: \\( \\mu = \\sum [x \\cdot P(x)] \\)",
    "Nhân từng giá trị x với xác suất tương ứng, rồi cộng lại."
  ]
}
```

### ❌ **VÍ DỤ SAI (Anti-Patterns)**

#### ❌ Sai 1: Không có hints
```json
{
  "question": "What is the derivative of x²?",
  "hints": []  // ❌ TUYỆT ĐỐI KHÔNG LÀM THẾ NÀY
}
```

#### ❌ Sai 2: Chỉ có 1 hint
```json
{
  "hints": [
    "Dùng quy tắc đạo hàm cơ bản."  // ❌ CẦN ÍT NHẤT 2 HINTS
  ]
}
```

#### ❌ Sai 3: Hints spoil đáp án
```json
{
  "hints": [
    "Đáp án là A.",  // ❌ KHÔNG NÊN TIẾT LỘ ĐÁP ÁN
    "Kết quả bằng 0.5"  // ❌ KHÔNG NÊN CHO KẾT QUẢ TRỰC TIẾP
  ]
}
```

#### ❌ Sai 4: Hints quá chung chung
```json
{
  "hints": [
    "Hãy suy nghĩ kỹ.",  // ❌ QUÁ MƠ HỒ, KHÔNG HỮU ÍCH
    "Đọc lại đề bài."     // ❌ KHÔNG MANG TÍNH XÂY DỰNG
  ]
}
```

### 📝 **MẪU TEMPLATE KHI TẠO HINTS**

Dùng template này làm cơ sở:

**Cho câu hỏi lý thuyết/khái niệm:**
```
Hint 1: "Phân biệt giữa [Khái niệm A] và [Khái niệm B]..."
Hint 2: "[Khái niệm cần dùng] có đặc điểm là..."
```

**Cho câu hỏi tính toán:**
```
Hint 1: "Xác định phân phối/công thức cần dùng: [Tên phân phối/công thức]"
Hint 2: "Công thức: \\( ... \\) với các tham số: [giải thích tham số]"
```

**Cho câu hỏi phân tích:**
```
Hint 1: "Tìm từ khóa trong đề bài: '[từ khóa quan trọng]'"
Hint 2: "Điều này liên quan đến [khái niệm/phương pháp cụ thể]"
```

### 🎯 **QUY TẮC VÀNG**

> **1. MỖI CÂU HỎI = ÍT NHẤT 2 HINTS (có thể 3-4 hints cho câu khó)**

> **2. HINTS PHẢI DẪN DẮT, KHÔNG PHẢI TIẾT LỘ**

> **3. THỨ TỰ: TỔNG QUÁT → CỤ THỂ**

> **4. NGÔN NGỮ: TIẾNG VIỆT, CÓ THỂ KÈM LATEX**

> **5. KIỂM TRA TRƯỚC KHI SUBMIT: "Nếu tôi là học sinh, hints này có giúp tôi tìm ra hướng đi không?"**

---

## 4. 🔄 **So sánh Loại Câu hỏi**

### 4.1. 🎯 **Câu hỏi Trắc nghiệm (`"type": "multiple_choice"`)**

| Đặc điểm | Mô tả |
|----------|-------|
| **Hiển thị** | Hiện các lựa chọn A, B, C, D... để người dùng chọn |
| **Tương tác** | Người dùng click chọn đáp án |
| **Phản hồi** | Hiện ngay kết quả đúng/sai và giải thích |
| **Trường `options`** | **Bắt buộc** - mảng các lựa chọn |
| **Trường `correctAnswer`** | Ký tự đáp án đúng: `"A"`, `"B"`, `"C"`, `"D"` |
| **Trường `type`** | `"multiple_choice"` (hoặc bỏ trống) |

### 4.2. ✍️ **Câu hỏi Tự luận (`"type": "essay"`)**

| Đặc điểm | Mô tả |
|----------|-------|
| **Hiển thị** | Chỉ hiện câu hỏi, không hiện lựa chọn |
| **Tương tác** | Người dùng click "Kiểm tra đáp án" |
| **Phản hồi** | Hiện đáp án chi tiết và giải thích |
| **Trường `options`** | **Bắt buộc** - mảng rỗng `[]` |
| **Trường `correctAnswer`** | Lời giải chi tiết, có thể chứa LaTeX và HTML |
| **Trường `type`** | `"essay"` |

### 4.3. 📋 **Quy tắc Chung**

- **Tương thích ngược**: Nếu không có trường `type`, hệ thống mặc định là `"multiple_choice"`
- **Trường `options`**: Luôn phải có, nhưng để rỗng `[]` cho câu tự luận
- **Trường `correctAnswer`**: Luôn bắt buộc, nhưng định dạng khác nhau tùy loại câu hỏi
- **Tất cả các trường khác**: Giống nhau cho cả hai loại câu hỏi

---

## 5. 🧮 **Viết Công Thức Toán bằng LaTeX**

### 5.1. ✅ **Toán inline** (`\\( ... \\)`)

Dùng để chèn công thức giữa dòng.

**Ví dụ:**

```json
"question": "Tính \\( \\int x^2 dx \\)"
```

---

### 5.2. ✅ **Toán block** (`\\[ ... \\]`)

Dành cho công thức dài, hiển thị riêng dòng.

**Ví dụ:**

```json
"explanation": "<b>Áp dụng công thức:</b><br />\\[ \\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C \\]"
```

---

### 5.3. 🔢 **Một số cú pháp LaTeX hữu ích**

| Biểu thức   | Cú pháp LaTeX        |
| ----------- | -------------------- |
| Phân số     | `\\frac{a}{b}`       |
| Căn bậc hai | `\\sqrt{x}`          |
| Đạo hàm     | `\\frac{d}{dx}`      |
| Tích phân   | `\\int`, `\\int_a^b` |
| Giới hạn    | `\\lim_{x \\to 0}`   |
| Lũy thừa    | `e^{x}`, `x^2`       |
| Nhân        | `\\cdot`, `*`        |

---

### 5.4. ✨ **Khối mã (code) và inline code bằng backticks**

Hệ thống hỗ trợ hiển thị thuật toán/đoạn mã đẹp mắt bằng backticks.

- Sử dụng khối mã (fenced code) với ba dấu backtick: ``` ... ```
- Có thể chỉ định ngôn ngữ ngay sau ba backtick đầu (tùy chọn): `pascal`, `text`, `pseudo`, v.v.
- Dùng `<br />` để xuống dòng trong JSON; hệ thống sẽ tự chuyển thành xuống dòng thực trong khối mã.
- Khoảng trắng được giữ nguyên, nên bạn có thể thụt đầu dòng (2 dấu cách hoặc 1 tab) cho đẹp.
- Để thụt dòng BÊN TRONG code block khi viết trong JSON: đặt khoảng trắng ngay sau `<br />`.
  - Dùng tab: `\t` (hoặc tab thật). Không dùng `\\t` vì sẽ ra đúng chữ "\t".
  - Dùng dấu cách: thêm 2 dấu cách sau `<br />`.
  - Renderer giữ nguyên tab/khoảng trắng sau `<br />` và hiển thị tab với độ rộng 2.

Ví dụ trong `question`:

```json
"question": "Given the algorithm:<br />```pseudo<br />procedure XYZ(a₁,...,aₙ: integers)<br />\tk:=0<br />\tfor i:=1 to n do<br />\t\tif aᵢ mod 2 = 0 then k:=aᵢ<br />```<br />Find the output value of k?"
```

Ví dụ thụt sâu hơn (2 tab):

```json
"question": "...<br />```text<br />\t\tinner-level example<br />```"
```

Ví dụ inline code trong `hints`/`explanation`:

```json
"hints": [
  "Mẹo: Câu lệnh `k:=aᵢ` là phép gán (override)."
]
```

Ghi chú hiển thị:

- Khối mã được bo góc, nền tối, có viền và kéo ngang khi dài.
- Inline code có nền nhẹ, chữ mono; hỗ trợ dark mode.
- Không cần tự bọc `<pre>`/`<code>`; chỉ dùng backticks là đủ.

---

## 6. ↩️ **Quy Tắc Xuống Dòng và In Đậm**

| Trường        | Cách xuống dòng                                            | In đậm             |
| ------------- | ---------------------------------------------------------- | ------------------ |
| `question`    | Dùng `<br />`                                              | Dùng `<b>`         |
| `explanation` | Dùng `<br />`                                              | Dùng `<b>`         |
| `correctAnswer` (tự luận) | Dùng `<br />` cho xuống dòng, `<b>` cho in đậm | Dùng `<b>`         |
| `hints`       | Không cần xuống dòng<br>(mỗi phần tử array hiển thị riêng) | Dùng `<b>` nếu cần |

---

### 📌 Ví dụ `explanation` hoàn chỉnh:

```json
"explanation": "<b>Bước 1:</b> Đặt \\( u = x^2 \\), \\( dv = e^x dx \\)<br /><b>Bước 2:</b> Tính \\( du = 2x dx \\), \\( v = e^x \\)"
```

### 📌 Ví dụ `correctAnswer` cho câu tự luận:

```json
"correctAnswer": "Chứng minh bằng phương pháp quy nạp:<br /><br /><b>Bước 1:</b> Kiểm tra với n = 1<br />Vế trái: \\( 1^2 = 1 \\)<br />Vế phải: \\( \\frac{1(1+1)(2\\cdot1+1)}{6} = 1 \\)<br /><br /><b>Bước 2:</b> Giả sử đúng với n = k<br />..."
```

Hiển thị:

> **Bước 1:** Đặt \$u = x^2\$, \$dv = e^x dx\$
> **Bước 2:** Tính \$du = 2x dx\$, \$v = e^x\$

---

## 7. 🌐 **Tích Hợp MathJax hoặc KaTeX trên Web**

### MathJax (phổ biến)

```html
<script async src="https://cdn.jsdelivr.net/npm/mathjax@2.7.7/MathJax.js?config=TeX-MML-AM_CHTML"></script>
```

### KaTeX (nhẹ, nhanh)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css">
<script src="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.js"></script>
```

---

## 8. 🌏 **Quy Ước Ngôn Ngữ**

| Trường                                                               | Ngôn ngữ        |
| -------------------------------------------------------------------- | --------------- |
| `question`, `options`, `title`, `topic`, `description`, `difficulty` | 🇬🇧 Tiếng Anh  |
| `explanation`, `hints`, `correctAnswer` (tự luận)                    | 🇻🇳 Tiếng Việt |

> 🎯 Mục tiêu: luyện kỹ năng tiếng Anh, hiểu sâu bằng tiếng Việt.

---

## 9. 📝 **Ví dụ Hoàn Chỉnh**

### 9.1. 🎯 **Đề thi hỗn hợp (Trắc nghiệm + Tự luận)**

```json
{
  "examId": "mixed_exam",
  "title": "Mixed Math Exam",
  "description": "Combination of multiple choice and essay questions",
  "questions": [
    {
      "id": 1,
      "question": "What is the derivative of \\( f(x) = x^3 \\)?",
      "image": null,
      "options": [
        "A. \\( 3x^2 \\)",
        "B. \\( 3x \\)",
        "C. \\( x^2 \\)",
        "D. \\( 2x^2 \\)"
      ],
      "correctAnswer": "A",
      "explanation": "<b>Áp dụng quy tắc đạo hàm:</b><br />\\( \\frac{d}{dx}(x^n) = nx^{n-1} \\)<br />Với \\( n = 3 \\): \\( \\frac{d}{dx}(x^3) = 3x^{3-1} = 3x^2 \\)",
      "difficulty": "easy",
      "topic": "Calculus",
      "hints": [
        "Nhớ quy tắc đạo hàm cơ bản cho lũy thừa.",
        "Công thức: \\( \\frac{d}{dx}(x^n) = nx^{n-1} \\)"
      ],
      "type": "multiple_choice"
    },
    {
      "id": 2,
      "question": "Prove that \\( \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 \\)",
      "image": null,
      "options": [],
      "correctAnswer": "Chứng minh bằng định lý kẹp:<br /><br />Với \\( x \\) gần 0, ta có:<br />\\( \\cos x < \\frac{\\sin x}{x} < 1 \\)<br /><br />Khi \\( x \\to 0 \\):<br />- \\( \\cos x \\to 1 \\)<br />- \\( 1 \\to 1 \\)<br /><br />Theo định lý kẹp: \\( \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 \\)",
      "explanation": "Đây là giới hạn cơ bản và quan trọng trong giải tích. Nó được sử dụng để:<br /><br />1. <b>Chứng minh đạo hàm của sin(x):</b> \\( \\frac{d}{dx}\\sin x = \\cos x \\)<br />2. <b>Tính các giới hạn khác:</b> Nhiều giới hạn phức tạp có thể quy về dạng này<br />3. <b>Ứng dụng trong chuỗi Taylor:</b> Mở rộng sin(x) thành chuỗi lũy thừa<br /><br /><b>Lưu ý:</b> Giới hạn này chỉ đúng khi x tính bằng radian, không phải độ.",
      "difficulty": "hard",
      "topic": "Limits",
      "hints": [
        "Sử dụng định lý kẹp (Squeeze Theorem).",
        "Nhớ rằng \\( \\cos x < \\frac{\\sin x}{x} < 1 \\) khi x gần 0.",
        "Chú ý đơn vị đo góc phải là radian."
      ],
      "type": "essay"
    }
  ]
}
```

---

## 10. 📊 **Hướng Dẫn Xử Lý Bảng (Tables)**

### ⚠️ **LƯU Ý QUAN TRỌNG KHI TẠO BẢNG**

Khi tạo câu hỏi có chứa bảng dữ liệu (ví dụ: từ ảnh hoặc đề bài):

#### 1. **KHÔNG trích xuất ảnh - Hãy GHI RA bảng HTML**
- ❌ **KHÔNG LÀM**: Chỉ nhúng link ảnh hoặc mô tả bảng bằng chữ
- ✅ **NÊN LÀM**: Viết lại toàn bộ bảng dưới dạng HTML table

#### 2. **CẤU TRÚC BẢNG CHUẨN**

Bảng phải có đầy đủ các thành phần sau:

```html
<table border='1' cellpadding='5' style='border-collapse:collapse; text-align:center;'>
  <tr>
    <th style='border:1px solid #ddd; padding:5px;'>Header 1</th>
    <th style='border:1px solid #ddd; padding:5px;'>Header 2</th>
  </tr>
  <tr>
    <td style='border:1px solid #ddd; padding:5px;'>Data 1</td>
    <td style='border:1px solid #ddd; padding:5px;'>Data 2</td>
  </tr>
</table>
```

#### 3. **CHECKLIST KHI TẠO BẢNG**

✅ **Bắt buộc phải có:**
- `border='1'` ở thẻ `<table>`
- `cellpadding='5'` ở thẻ `<table>`
- `style='border-collapse:collapse; text-align:center;'` ở thẻ `<table>`
- **`style='border:1px solid #ddd; padding:5px;'` ở MỖI thẻ `<th>` và `<td>`** ← Điều này RẤT QUAN TRỌNG!

#### 4. **LỖI THƯỜNG GẶP**

❌ **Lỗi 1: Quên thêm border cho từng cell**
```html
<!-- SAI - Thiếu border cho cell -->
<td>70</td>
```

✅ **Đúng - Có border đầy đủ:**
```html
<!-- ĐÚNG - Có border rõ ràng -->
<td style='border:1px solid #ddd; padding:5px;'>70</td>
```

❌ **Lỗi 2: Chỉ có border ở `<table>` mà không có ở từng cell**
```html
<!-- SAI - Border chỉ ở table, cells không có border riêng -->
<table border='1' cellpadding='5' style='border-collapse:collapse;'>
  <tr>
    <th>Header</th>  <!-- ❌ Thiếu style ở đây -->
    <td>Data</td>    <!-- ❌ Thiếu style ở đây -->
  </tr>
</table>
```

❌ **Lỗi 3: Nhúng ảnh thay vì ghi ra HTML**
```json
{
  "question": "See the table in the image below:<br /><img src='table.jpg' />"  // ❌ TUYỆT ĐỐI KHÔNG LÀM THẾ NÀY
}
```

❌ **Lỗi 4: Dùng Markdown table thay vì HTML**
```json
{
  "question": "| Header | Data |\n|--------|------|\n| A | 1 |"  // ❌ Markdown không render tốt trong JSON
}
```

#### 5. **VÍ DỤ HOÀN CHỈNH**

```json
{
  "question": "The results from 100 samples are summarized as follows:<br /><br /><table border='1' cellpadding='5' style='border-collapse:collapse; text-align:center;'><tr><th style='border:1px solid #ddd; padding:5px;'></th><th style='border:1px solid #ddd; padding:5px;'>Category A</th><th style='border:1px solid #ddd; padding:5px;'>Category B</th></tr><tr><td style='border:1px solid #ddd; padding:5px;'><b>Type 1</b></td><td style='border:1px solid #ddd; padding:5px;'>70</td><td style='border:1px solid #ddd; padding:5px;'>9</td></tr><tr><td style='border:1px solid #ddd; padding:5px;'><b>Type 2</b></td><td style='border:1px solid #ddd; padding:5px;'>16</td><td style='border:1px solid #ddd; padding:5px;'>5</td></tr></table><br /><br />Find the probability..."
}
```

#### 6. **QUY TẮC VÀNG**

> 🎯 **Khi gặp ảnh có bảng → Luôn ghi ra HTML table với border đầy đủ cho từng cell!**

> 🎯 **Mỗi `<th>` và `<td>` PHẢI có: `style='border:1px solid #ddd; padding:5px;'`**

---

## 11. ✅ **Tổng Kết**

| Nội dung                       | Quy ước                                             |
| ------------------------------ | --------------------------------------------------- |
| **Loại câu hỏi**               | `"multiple_choice"` (mặc định) hoặc `"essay"`       |
| **Trường `options`**           | Mảng các lựa chọn cho trắc nghiệm, `[]` cho tự luận |
| **Trường `correctAnswer`**     | Ký tự A,B,C,D cho trắc nghiệm, lời giải cho tự luận |
| **Toán inline**                | `\\( ... \\)`                                       |
| **Toán block**                 | `\\[ ... \\]`                                       |
| **Khối mã (code block)**       | Dùng backticks: ```lang ... ``` (lang tùy chọn)     |
| **Inline code**                | Dùng backtick đơn: ``...``                          |
| **Xuống dòng trong `question`** | `<br />`                                            |
| **Xuống dòng trong `explanation`** | `<br />`                                        |
| **Xuống dòng trong `correctAnswer` (tự luận)** | `<br />`                    |
| **Không dùng `\\\\` trong JSON** | Vì đã chuyển sang dùng `<br />`                     |
| **In đậm**                     | Dùng HTML `<b>...</b>` thay vì `**...**` (Markdown) |
| **⚠️ Trường `hints`**          | **BẮT BUỘC:** Ít nhất 2 hints cho MỖI câu hỏi. Array tiếng Việt, có thể chứa LaTeX. |
| **Bảng dữ liệu (Tables)**      | Dùng HTML `<table>` với border cho MỖI cell: `style='border:1px solid #ddd; padding:5px;'` |
| **Kết xuất toán học**          | Tích hợp MathJax hoặc KaTeX                         |
| **Ngôn ngữ**                   | Câu hỏi bằng tiếng Anh – Giải thích bằng tiếng Việt |

---

**Lưu ý cuối cùng**: Sau khi xóa đoạn `currentQuestionData.explanation.replace(/\\\\/g, '<br />')`, bạn chỉ cần đảm bảo rằng:

* Mọi xuống dòng trong `"explanation"` đã được viết bằng `<br />`.
* Frontend sẽ hiển thị nguyên văn HTML (có nội dung `<br />`, `<b>...</b>`, LaTeX trong `\\[ ... \\]` hoặc `\\( ... \\)`).
* MathJax/KaTeX nhận diện và render công thức LaTeX tự động.

---

## 12. 🚨 **CHECKLIST TRƯỚC KHI HOÀN THÀNH CÂU HỎI**

Trước khi submit bất kỳ câu hỏi nào, hãy kiểm tra:

- [ ] ✅ **Có trường `hints` với ít nhất 2 gợi ý?**
- [ ] ✅ **Hints có hữu ích và dẫn dắt học sinh không?**
- [ ] ✅ **Nếu có bảng, mỗi cell đã có `style='border:1px solid #ddd; padding:5px;'`?**
- [ ] ✅ **Bảng được viết bằng HTML thay vì trích ảnh?**
- [ ] ✅ **Các công thức LaTeX đã đúng cú pháp `\\( ... \\)` hoặc `\\[ ... \\]`?**
- [ ] ✅ **Xuống dòng dùng `<br />` thay vì `\\\\`?**
- [ ] ✅ **In đậm dùng `<b>...</b>` thay vì `**...**`?**

> **Nhớ:** Hints và Tables là hai phần thường bị quên nhất. Luôn kiểm tra kỹ!

