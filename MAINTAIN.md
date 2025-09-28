# Hướng dẫn Bảo trì và Phát triển Ứng dụng

Tài liệu này cung cấp các hướng dẫn cần thiết để bảo trì, cập nhật và mở rộng ứng dụng MathPractice.

## 1) Cấu trúc dự án

Mô tả nhanh các thư mục và tệp quan trọng:

```
/
├── app/                  # Next.js App Router
│   ├── page.tsx          # Trang chủ (nhập tên)
│   ├── select-exam/      # Trang chọn đề luyện tập
│   ├── practice/         # Trang làm bài luyện tập
│   ├── results/          # Trang xem kết quả
│   └── layout.tsx        # Layout chung, ThemeProvider
├── components/           # Component tái sử dụng
│   ├── SimpleMath.tsx    # Render MathJax (inline/block)
│   ├── MathRenderer.tsx  # Trình render toán học
│   └── ui/               # Thư viện shadcn/ui
├── public/
│   ├── data/             # Bộ đề JSON: de1.json, de2.json, ...
│   └── images/           # (tuỳ chọn) ảnh đề cho trang kết quả
├── styles/               # CSS toàn cục
├── lib/                  # Tiện ích (nếu có)
├── README.md             # Giới thiệu dự án
└── MAINTAIN.md           # Tài liệu bảo trì (tệp này)
```

## 2) Dữ liệu đề thi (JSON)

- Mỗi bộ đề là một tệp `.json` trong `public/data/` với tên: `de<ID>.json` (ví dụ: `de1.json`).
- Trường `examId` phải khớp với tên tệp (ví dụ: `de1`).

### 2.1. Cấu trúc JSON khuyến nghị

```json
{
  "examId": "de1",
  "title": "Đề 1",
  "description": "AI hints and explanations",
  "questions": [
    {
      "id": 1,
      "question": "Nội dung. Hỗ trợ \\( ... \\) và \\[ ... \\]",
      "image": null,
      "options": [
        "A. Lựa chọn 1",
        "B. Lựa chọn 2",
        "C. Lựa chọn 3",
        "D. Lựa chọn 4"
      ],
      "correctAnswer": "A",
      "explanation": "Giải thích chi tiết (HTML + MathJax)",
      "difficulty": "easy | medium | hard",
      "topic": "Chủ đề",
      "hints": ["Gợi ý 1", "Gợi ý 2"],
      "type": "multiple_choice | essay"  
    }
  ]
}
```

Lưu ý:
- `options` phải bắt đầu bằng chữ cái phương án viết hoa + dấu chấm, ví dụ: `"A. ..."`. Ứng dụng suy luận phương án từ ký tự đầu tiên.
- `type` là tuỳ chọn. Nếu `type: "essay"`, câu hỏi là tự luận:
  - Nút “Kiểm tra đáp án” sẽ hiển thị `correctAnswer` như nội dung đáp án mẫu.
  - `explanation` vẫn được hiển thị ở phần giải thích chi tiết.
- `image` có thể là đường dẫn trong `public/` (ví dụ: `/images/de1/1.jpg`).
- Có thể dùng HTML cơ bản trong `explanation` và MathJax với `\\( ... \\)` (inline), `\\[ ... \\]` (block).

### 2.2. Thêm bộ đề mới

1. Tạo tệp `de<ID>.json` theo cấu trúc trên và đặt vào `public/data/`.
2. Đảm bảo `examId` khớp với tên tệp (ví dụ: `de20.json` có `examId: "de20"`).
3. Ứng dụng tự quét dải đề từ `de1.json` đến `deN.json`. Nếu cần mở rộng dải quét, cập nhật hằng số bên dưới.

```ts
// app/select-exam/page.tsx
const MAX_EXAMS_TO_CHECK = 25; // Tăng nếu thêm đề có ID lớn hơn 25
```

Trang chọn đề sẽ hiển thị thẻ đề có tiêu đề và mô tả lấy trực tiếp từ JSON.

## 3) Trang luyện tập (Practice)

- Tải dữ liệu từ `/data/de{practiceId}.json` theo tham số URL.
- Lưu tiến độ vào `localStorage` theo các khoá:
  - `practiceAnswers_{id}`: đáp án người dùng
  - `practiceResults_{id}`: trạng thái đúng/sai, thời gian mỗi câu
  - `practiceNotes_{id}`: ghi chú mỗi câu
  - `practiceTime_{id}`: tổng thời gian đã luyện tập
- Hỗ trợ “Học với AI”: sinh prompt và mở `aistudio.google.com/prompts/new_chat`.
- Câu tự luận (`type: "essay"`): khi “Kiểm tra đáp án”, coi là đã trả lời; hiển thị `correctAnswer` và `explanation`.

### 3.1. Phím tắt (Keyboard Shortcuts)

- A/B/C/D/E/F hoặc 1/2/3/4/5/6: Chọn phương án
- N, Space, →: Câu tiếp theo
- P, ←: Câu trước
- H: Hiện/ẩn gợi ý
- T: Hiện/ẩn ghi chú
- R: Làm lại câu hiện tại
- Ctrl/Cmd + G: Đi đến câu số…
- ?: Mở bảng phím tắt
- Esc: Hộp thoại thoát

## 4) Trang kết quả (Results)

- Đọc dữ liệu kết quả từ `localStorage` khoá `results_de{examId}` (định dạng do trang thi tạo ra).
- Nếu thiếu mảng `questions`, trang sẽ tự sinh danh sách mặc định (ảnh: `/images/de{examId}/{i}.jpg`).
- Cho phép tải kết quả (.txt) và phóng to/thu nhỏ ảnh câu hỏi.

## 5) Giao diện (Styling)

- Sử dụng Tailwind CSS. Chỉnh sửa utility classes trực tiếp trong component.
- Dark Mode thông qua `ThemeProvider` trong `app/layout.tsx` và `ThemeToggle`.
- Style toàn cục: `app/globals.css` hoặc `styles/globals.css` (tuỳ cấu hình hiện tại).

## 6) Chạy và build

Script chính (tham chiếu `package.json`):

```bash
npm run dev     # Chạy chế độ phát triển
npm run build   # Build production
npm start       # Chạy server production sau khi build
npm run lint    # Kiểm tra lint
```

Lưu ý: Khoá phụ thuộc hiện dùng Next.js 15, React 19, TypeScript 5. Có thể dùng npm hoặc pnpm tuỳ môi trường (repo có cả `package-lock.json` và `pnpm-lock.yaml`). Nên thống nhất một công cụ quản lý gói trong CI/CD.

## 7) Quy ước và lưu ý quan trọng

- Tên tệp đề: `de<ID>.json` (liền, không dấu cách). `examId` phải trùng quy tắc này.
- Phương án lựa chọn phải theo định dạng `"A. ..."`, `"B. ..."`, ... để ứng dụng nhận diện chữ cái phương án.
- Với đề lớn hơn `MAX_EXAMS_TO_CHECK`, tăng hằng số để trang chọn đề phát hiện đề mới.
- Tham khảo thêm tệp `huong dan dinh dang json.md` để định dạng nội dung tốt hơn.

Cảm ơn bạn đã đóng góp vào việc bảo trì và phát triển dự án!