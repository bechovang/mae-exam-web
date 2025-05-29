# Hướng dẫn bảo trì và phát triển

## Quy trình phát triển

### 1. Cài đặt môi trường phát triển

```bash
# Cài đặt dependencies
npm install

# Cài đặt các công cụ phát triển
npm install -D typescript @types/node @types/react
```

### 2. Cấu trúc dự án

```
mae-exam-web/
├── app/                    # App Router của Next.js
│   ├── exam/              # Trang thi
│   │   ├── [id]/         # Dynamic route cho từng đề
│   │   │   ├── page.tsx  # Server component
│   │   │   └── ExamClient.tsx # Client component
│   ├── results/          # Trang kết quả
│   └── select-exam/      # Trang chọn đề
├── components/           # Shared components
│   └── ui/              # UI components từ shadcn/ui
├── public/              # Static files
│   └── images/         # Hình ảnh đề thi
└── types/              # TypeScript definitions
```

### 3. Quy ước đặt tên

- **Files**: PascalCase cho components, camelCase cho utilities
- **Components**: PascalCase (ví dụ: `ExamClient.tsx`)
- **Functions**: camelCase (ví dụ: `handleSubmit`)
- **Variables**: camelCase (ví dụ: `userAnswers`)
- **Types/Interfaces**: PascalCase với prefix I cho interfaces (ví dụ: `IExamData`)

### 4. State Management

#### Local State
```typescript
const [state, setState] = useState<StateType>(initialValue)
```

#### Persistent State (LocalStorage)
```typescript
// Lưu state
localStorage.setItem(key, JSON.stringify(value))

// Đọc state
const value = JSON.parse(localStorage.getItem(key) || 'defaultValue')
```

### 5. Xử lý ảnh

#### Cấu trúc thư mục ảnh
```
public/
└── images/
    └── de{id}/          # Thư mục cho từng đề
        ├── 1.jpg       # Câu 1
        ├── 2.jpg       # Câu 2
        └── ...
```

#### Quy ước đặt tên ảnh
- Format: `{số_câu}.jpg`
- Kích thước: Tối ưu cho web (max 1200px width)
- Format: JPG cho ảnh, PNG cho ảnh có text

### 6. Testing

#### Unit Tests
```bash
# Chạy tests
npm test

# Chạy tests với coverage
npm test -- --coverage
```

#### E2E Tests
```bash
# Chạy Cypress
npm run cypress:open
```

### 7. Performance Optimization

#### Image Optimization
- Sử dụng Next.js Image component
- Lazy loading cho ảnh
- Tối ưu kích thước ảnh

#### Code Splitting
- Sử dụng dynamic imports
- Tách components lớn thành nhỏ hơn
- Lazy load các components không cần thiết ngay

### 8. Security

#### Data Storage
- Không lưu thông tin nhạy cảm trong localStorage
- Mã hóa dữ liệu quan trọng
- Xóa dữ liệu khi không cần thiết

#### Input Validation
- Validate tất cả input từ người dùng
- Sanitize data trước khi lưu
- Xử lý lỗi gracefully

### 9. Error Handling

#### Global Error Boundary
```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

#### API Error Handling
```typescript
try {
  // API call
} catch (error) {
  console.error('API Error:', error)
  // Handle error appropriately
}
```

### 10. Deployment

#### Production Build
```bash
# Build ứng dụng
npm run build

# Kiểm tra build
npm run start
```

#### Environment Variables
- Tạo file `.env.production` cho production
- Không commit file `.env` vào git
- Sử dụng `.env.example` làm template

### 11. Monitoring

#### Error Tracking
- Sử dụng error boundaries
- Log errors với stack trace
- Gửi error reports đến monitoring service

#### Performance Monitoring
- Track page load times
- Monitor API response times
- Track user interactions

### 12. Maintenance Tasks

#### Regular Tasks
- Cập nhật dependencies
- Kiểm tra và xóa unused code
- Tối ưu performance
- Backup dữ liệu

#### Code Review Checklist
- TypeScript types đầy đủ
- Error handling
- Performance optimization
- Security considerations
- Accessibility
- Responsive design
- Test coverage

### 13. Troubleshooting

#### Common Issues

1. **Images not loading**
   - Kiểm tra đường dẫn
   - Kiểm tra quyền truy cập
   - Kiểm tra format ảnh

2. **State not persisting**
   - Kiểm tra localStorage quota
   - Kiểm tra JSON serialization
   - Kiểm tra error handling

3. **Performance issues**
   - Kiểm tra bundle size
   - Kiểm tra image optimization
   - Kiểm tra code splitting

### 14. Resources

#### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

#### Tools
- VS Code Extensions
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features

#### Development Tools
- Chrome DevTools
- React Developer Tools
- Redux DevTools (nếu sử dụng)
- Network tab for API debugging 