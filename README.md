# Cơ Học Đất UTC — Ứng dụng Học tập

> Ứng dụng web tương tác cho sinh viên môn **Cơ học đất** — Trường Đại học Giao thông Vận tải (UTC).

---

## 🎯 Mục đích

Ứng dụng cung cấp nền tảng học tập tích hợp cho môn Cơ học đất:

- **Lý thuyết**: 7 chương đầy đủ với nội dung chi tiết, công thức, ví dụ minh họa
- **Bài tập**: Bài tập theo chương kèm đáp án và lời giải chi tiết
- **Thí nghiệm**: 6 bài thí nghiệm với nhập dữ liệu, tính toán tự động
- **Báo cáo**: Tạo báo cáo thí nghiệm tự động theo mẫu UTC, xuất PDF
- **Trắc nghiệm**: Hệ thống quiz kiểm tra kiến thức theo từng chương

---

## ✨ Tính năng

| Module | Mô tả |
|--------|-------|
| 📖 Lý thuyết | 7 chương với nội dung chi tiết ≥70%, công thức, khái niệm trọng tâm |
| ✏️ Bài tập | Bài tập chương 1, 2, 4, 5 — kèm đáp án từ tài liệu gốc |
| 🔬 Thí nghiệm | 6 bài TN: độ ẩm, Atterberg, tỷ trọng, KL thể tích, cắt, nén cố kết |
| 📋 Báo cáo | Tạo báo cáo TN theo mẫu — nhập thông tin SV + dữ liệu → xuất PDF |
| ❓ Trắc nghiệm | Trắc nghiệm nhận biết/thông hiểu/vận dụng |
| 🎬 Video | 12 video YouTube minh họa thí nghiệm |
| 📌 Đánh dấu | Bookmark công thức, theo dõi tiến độ học tập |

---

## 🛠️ Công nghệ

- [Next.js 14](https://nextjs.org/) — React framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe codebase
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first styling
- [Zustand](https://zustand-demo.pmnd.rs/) — State management with persistence
- [Recharts](https://recharts.org/) — Charts & data visualization
- [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) — PDF export
- [KaTeX](https://katex.org/) — Math formula rendering

---

## 🚀 Cài đặt & Chạy

### Yêu cầu

- Node.js ≥ 18.x
- npm ≥ 9.x

### Cài đặt

```bash
# Clone hoặc giải nén source code
cd co-hoc-dat-app

# Cài đặt dependencies
npm install
```

### Chạy local (development)

```bash
npm run dev
```

Truy cập: [http://localhost:3000](http://localhost:3000)

### Build production

```bash
npm run build
npm run start
```

---

## 📁 Cấu trúc dự án

```
co-hoc-dat-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── globals.css         # Design system & CSS components
│   │   ├── layout.tsx          # Root layout (SEO, fonts)
│   │   └── page.tsx            # Main page (module router)
│   ├── components/             # Reusable UI components
│   │   ├── FormulaCard.tsx     # Formula display + bookmark
│   │   ├── Header.tsx          # Top header bar
│   │   ├── QuizSection.tsx     # Quiz/test engine
│   │   └── Sidebar.tsx         # Navigation sidebar
│   ├── features/               # Feature modules
│   │   ├── chapters/TheoryModule.tsx   # Theory/chapter viewer
│   │   ├── exercises/ExerciseModule.tsx # Exercise viewer
│   │   ├── labs/LabModule.tsx          # Lab experiment module
│   │   └── reports/ReportModule.tsx     # Report generator
│   ├── lib/                    # Utilities & data
│   │   ├── data/
│   │   │   ├── chapters/       # Chapter data (ch1–ch7)
│   │   │   ├── exercises.ts    # Exercise data with answers
│   │   │   ├── labs.ts         # Lab experiment definitions
│   │   │   └── videos.ts      # YouTube video catalog
│   │   └── labCalculations.ts  # Shared lab calculation engine
│   ├── store/
│   │   └── useAppStore.ts      # Zustand state store
│   └── types/
│       ├── index.ts            # All type definitions
│       └── html2pdf.d.ts       # html2pdf.js type declarations
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── README.md                   # ← Bạn đang đọc file này
├── SOURCE_MAP.md               # Bản đồ nguồn tài liệu
├── USER_GUIDE.md               # Hướng dẫn sử dụng cho sinh viên
├── DEPLOY_VERCEL.md            # Hướng dẫn deploy Vercel
└── RELEASE_CHECKLIST.md        # Checklist kiểm tra trước release
```

---

## 📚 Ghi chú học thuật

Nội dung được trích xuất trực tiếp từ tài liệu giảng dạy chính thức:

- 7 chương lý thuyết từ giáo trình Cơ học đất UTC
- Bài tập từ các file BT chuong1-5
- Đáp án từ file DAP AN BAI TAP
- Hướng dẫn thí nghiệm từ tài liệu gửi sinh viên
- Mẫu báo cáo theo template chính thức

Xem chi tiết tại [SOURCE_MAP.md](./SOURCE_MAP.md).

---

## 🔗 Triển khai

Xem hướng dẫn chi tiết tại [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md).

Nhanh:

```bash
# Push lên GitHub
git init
git add .
git commit -m "Initial release"
git remote add origin https://github.com/YOUR_ACCOUNT/co-hoc-dat-utc.git
git push -u origin main

# Import vào Vercel tại https://vercel.com/new
```

---

## 📝 License

Tài liệu học thuật thuộc bản quyền Trường Đại học Giao thông Vận tải (UTC).  
Mã nguồn ứng dụng: MIT License.
