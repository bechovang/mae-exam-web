# MathPractice — Nền tảng luyện tập Toán học

MathPractice is an interactive web app for math practice using exam-like question sets. It delivers instant feedback and detailed explanations, with a modern, responsive UI and dark mode.

## ✨ Tính năng chính

- **Luyện tập tương tác**: Chọn nhiều bộ đề, làm bài, xem giải thích chi tiết.
- **Phản hồi tức thì**: Đúng/sai và giải thích sau mỗi câu hỏi.
- **Không giới hạn thời gian**: Tập trung vào học thay vì đếm giờ.
- **Hỗ trợ công thức**: Hiển thị đẹp công thức với MathJax (\( ... \), \[ ... \]).
- **Giao diện hiện đại**: shadcn/ui + Tailwind, hỗ trợ Dark/Light.

## 🧰 Công nghệ

- **Framework**: Next.js 15
- **Ngôn ngữ**: TypeScript
- **UI**: shadcn/ui, Tailwind CSS
- **Icons**: lucide-react
- **Math**: MathJax

## 📁 Cấu trúc dự án (rút gọn)

```text
app/                # App Router (Next.js)
  select-exam/      # Trang chọn đề
  practice/[id]/    # Trang luyện tập
  results/[id]/     # Trang kết quả
components/         # Component chung + ui/
public/data/        # Dữ liệu đề: de1.json, de2.json, ... + manifest.json
```

## 🔢 Dữ liệu đề thi (JSON)

- Mỗi đề là một tệp `public/data/de<ID>.json` (ví dụ: `de22.json`).
- Trường `examId` bên trong JSON nên khớp với tên file (ví dụ: `"de22"`).

Ví dụ cấu trúc:

```json
{
  "examId": "de1",
  "title": "Đề 1",
  "description": "AI hints and explanations",
  "questions": [
    {
      "id": 1,
      "question": "Nội dung, hỗ trợ \\(...\\) và \\[...\\]",
      "image": null,
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctAnswer": "A",
      "explanation": "Giải thích chi tiết (có thể HTML + MathJax)",
      "difficulty": "easy | medium | hard",
      "topic": "Tên chủ đề",
      "type": "multiple_choice | essay"
    }
  ]
}
```

Lưu ý:

- `options` nên bắt đầu bằng chữ cái phương án + dấu chấm, ví dụ: `"A. ..."`.
- `type: "essay"` biến câu hỏi thành tự luận (hiện đáp án mẫu và giải thích khi bấm kiểm tra).
- `image` (tuỳ chọn) trỏ tới tài nguyên trong `public/`.

## 📄 manifest.json (tối ưu tốc độ)

`public/data/manifest.json` liệt kê các ID đề hiện có để trang `select-exam` chỉ tải đúng tệp, tránh hàng loạt 404.

Ví dụ:

```json
{ "available": [1,2,3,4,5,6,11,12,13,14,15,16,17,18,19,20,21,22,23] }
```

Khi thêm đề mới `deNN.json`, hãy thêm `NN` vào mảng `available`, rồi reload trang.

## 🚀 Chạy dự án

```bash
npm install
npm run dev
# mở http://localhost:3000
```

Build production:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

## 🔍 Tìm kiếm, lọc, sắp xếp

- Tìm theo ID, tiêu đề, mô tả.
- Lọc theo `Chủ đề`, `Độ khó` (sinh từ dữ liệu các đề được tải).
- Sắp xếp: Mới nhất/Cũ nhất, **Tên file ↑/↓ (mặc định ↑)**, Tiêu đề A→Z/Z→A.

## 🧪 Gợi ý kiểm thử nhanh

- Mở DevTools → Network → kiểm tra `deNN.json` trả đúng nội dung mới sửa.
- Khi dữ liệu thay đổi, hard refresh (Ctrl+Shift+R) để chắc chắn không dùng phiên bản cũ trong cache.

## 👥 Tác giả

- Nguyễn Ngọc Phúc
- Mai Thế Duy

— Cảm ơn bạn đã sử dụng MathPractice!
