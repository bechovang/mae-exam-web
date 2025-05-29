# MAE Exam Web Application

Ứng dụng web thi trắc nghiệm trực tuyến được xây dựng với Next.js 14, TypeScript và Tailwind CSS.

## Tính năng chính

- 🎯 Thi trắc nghiệm trực tuyến
- ⏱️ Đếm ngược thời gian làm bài
- 📝 Lưu trữ kết quả và đáp án
- 🔍 Xem lại bài làm và đáp án
- 📊 Thống kê kết quả
- 📱 Responsive trên mọi thiết bị
- 🔄 Tự động lưu tiến độ làm bài
- 📥 Tải kết quả dưới dạng file text

## Yêu cầu hệ thống

- Node.js 18.0.0 trở lên
- npm hoặc yarn
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)

## Cài đặt

1. Clone repository:
```bash
git clone https://github.com/your-username/mae-exam-web.git
cd mae-exam-web
```

2. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Tạo file môi trường:
```bash
cp .env.example .env.local
```

4. Chạy ứng dụng ở môi trường development:
```bash
npm run dev
# hoặc
yarn dev
```

5. Mở trình duyệt và truy cập `http://localhost:3000`

## Cấu trúc thư mục

```
mae-exam-web/
├── app/                    # Thư mục chính của ứng dụng
│   ├── exam/              # Trang thi
│   ├── results/           # Trang kết quả
│   └── select-exam/       # Trang chọn đề
├── components/            # Components tái sử dụng
│   └── ui/               # UI components
├── public/               # Static files
│   └── images/          # Hình ảnh đề thi
├── styles/              # Global styles
└── types/               # TypeScript type definitions
```

## Công nghệ sử dụng

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Hooks
- **Storage**: LocalStorage
- **Image Handling**: react-zoom-pan-pinch

## Cách sử dụng

### 1. Chọn đề thi
- Truy cập trang chủ
- Nhập tên thí sinh
- Chọn đề thi từ danh sách

### 2. Làm bài thi
- Đọc câu hỏi và chọn đáp án
- Sử dụng nút điều hướng để chuyển câu
- Có thể xem lại các câu đã làm
- Thời gian làm bài được hiển thị ở góc phải

### 3. Xem kết quả
- Sau khi nộp bài hoặc hết thời gian
- Xem tổng điểm và số câu đúng
- Xem chi tiết từng câu
- Tải kết quả về máy

## Tính năng đặc biệt

### Zoom và Pan ảnh
- Click nút Zoom In/Out để phóng to/thu nhỏ
- Kéo ảnh để di chuyển
- Sử dụng chuột giữa hoặc trackpad để zoom
- Double click để reset về kích thước ban đầu

### Lưu trữ tự động
- Tự động lưu đáp án khi chọn
- Lưu thời gian còn lại
- Khôi phục tiến độ khi tải lại trang

### Responsive Design
- Tương thích với mọi kích thước màn hình
- Tối ưu hiển thị trên mobile
- UI thân thiện với người dùng

## Contributing

Xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết thêm chi tiết về cách đóng góp vào dự án.

## License

MIT License - Xem [LICENSE](LICENSE) để biết thêm chi tiết.