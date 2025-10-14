# Hướng dẫn Bảo trì và Phát triển

Tài liệu dành cho người duy trì (maintainers) để cập nhật dữ liệu đề, tối ưu hiệu năng, và phát hành.

## 1) Cấu trúc thư mục

```text
app/                # App Router (Next.js)
components/         # Component chung + ui/
public/data/        # Dữ liệu đề: de1.json, de2.json, ... + manifest.json
styles/, lib/       # CSS, tiện ích
```

## 2) Dữ liệu đề (JSON)

- Mỗi đề: `public/data/de<ID>.json`.
- Khuyến nghị: `examId` khớp tên file (ví dụ: `de20.json` → `"examId": "de20"`).

Mẫu tối thiểu:

```json
{
  "examId": "de1",
  "title": "Đề 1",
  "description": "...",
  "questions": [
    {
      "id": 1,
      "question": "...",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctAnswer": "A"
    }
  ]
}
```

Quy ước nội dung:

- Trắc nghiệm: `options` bắt đầu bằng `A.`, `B.`, ... để app suy luận đáp án.
- Tự luận: `type: "essay"` và dùng `correctAnswer` làm đáp án mẫu.
- Hỗ trợ MathJax: inline `\( ... \)` và block `\[ ... \]` trong `question`/`explanation`.

## 3) manifest.json và hiệu năng

- Tệp `public/data/manifest.json` chứa danh sách số ID có sẵn:

```json
{ "available": [1,2,3,4,5,6,11,12,13,14,15,16,17,18,19,20,21,22,23] }
```

- Trang `select-exam` đọc manifest để chỉ fetch các đề hợp lệ, tránh 404 hàng loạt.
- Khi thêm đề mới `deNN.json`, thêm `NN` vào `available` rồi hard refresh.
- Nếu muốn tự động hoá:
  - Viết script Node quét `public/data` và sinh `manifest.json` (chạy khi dev hoặc build).
  - Hoặc tạo API route để trả danh sách động (ít phù hợp nếu deploy static).

## 4) Quy trình thêm/cập nhật đề

1. Tạo/sửa `public/data/deNN.json` theo schema.
2. Cập nhật `public/data/manifest.json` (thêm `NN`).
3. Chạy `npm run dev` (hoặc reload nếu đang chạy).
4. Hard refresh trang `/select-exam` (Ctrl+Shift+R).
5. Kiểm tra Network → `deNN.json` phản hồi đúng dữ liệu mới.

## 5) Trải nghiệm người dùng khi tải dữ liệu

- Đề xuất (đã thống nhất có thể triển khai):
  - Thanh loading trên đầu trang khi fetch.
  - Spinner nhỏ trong các Select khi đang cập nhật.
  - Badge “Loaded N exams” hoặc "Đã tải N đề" khi hoàn tất.
  - Transition mượt cho grid khi thay đổi sort/filter.

## 6) Cấu hình sắp xếp và lọc

- Mặc định: sắp xếp theo **Tên file ↑ (id-asc)**.
- Các tuỳ chọn khác: newest, oldest, title-asc, title-desc.
- Bộ lọc chủ đề/độ khó sinh tự động từ dữ liệu đã tải; mục “Tất cả …” dùng sentinel nội bộ, không dùng value rỗng.

## 7) Scripts và môi trường

```bash
npm run dev     # Dev server
npm run build   # Build production
npm start       # Chạy server production
npm run lint    # Kiểm tra lint
```

- Node LTS khuyến nghị. Dùng một trình quản lý gói thống nhất (npm hoặc pnpm) trong CI.

## 8) Kiểm thử & chẩn đoán

- Mở DevTools → Network kiểm tra `deNN.json` có response đúng.
- Khi không thấy thay đổi, hard refresh hoặc xoá cache site.
- Dùng `console.time`/`timeEnd` tạm thời để đo thời gian tải nếu cần.

## 9) Phát hành

- Kiểm tra lại manifest, cập nhật README/MAINTAIN nếu có thay đổi quy trình.
- Build, chạy smoke test: mở `/`, `/select-exam`, làm một bài mẫu, xem `/results`.
- Tag phiên bản và ghi chú thay đổi (CHANGELOG nếu muốn bổ sung quy trình).

---

Cảm ơn bạn đã đóng góp duy trì dự án!