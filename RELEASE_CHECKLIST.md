# RELEASE_CHECKLIST — Kiểm tra trước khi chia sẻ/triển khai

---

## 🧹 Chuẩn bị Source Package

- [ ] Xóa `node_modules/`
- [ ] Xóa `.next/`
- [ ] Xóa `out/` (nếu có)
- [ ] Kiểm tra `.gitignore` đã bao gồm: `node_modules/`, `.next/`, `out/`, `.env*`, `*.tsbuildinfo`

---

## 🏗️ Build & Run

- [ ] `npm install` — cài đặt thành công, không lỗi
- [ ] `npm run build` — build production thành công
- [ ] `npm run start` — chạy production server, truy cập http://localhost:3000
- [ ] `npm run dev` — dev server chạy bình thường

---

## 📖 Module Lý thuyết

- [ ] Chọn chương 1 → hiển thị nội dung đầy đủ
- [ ] Chọn chương 7 → hiển thị nội dung (kiểm tra ch5_6_7.ts)
- [ ] Tab "Nội dung chi tiết" → mở/thu section hoạt động
- [ ] Tab "Công thức" → hiển thị công thức + bookmark
- [ ] Tab "Ví dụ" → hiển thị, mở lời giải
- [ ] Tab "Trắc nghiệm" → trả lời, xem kết quả
- [ ] Nút "Đánh dấu hoàn thành" → cập nhật progress bar

---

## ✏️ Module Bài tập

- [ ] Chương 1 → 3 bài tập hiển thị
- [ ] Click "Gợi ý" → hiện gợi ý
- [ ] Click "Đáp án" → hiện đáp án
- [ ] Chương 3 → hiển thị thông báo thiếu dữ liệu

---

## 🔬 Module Thí nghiệm

- [ ] Chọn bài 1 (Độ ẩm) → tab Thông tin đầy đủ
- [ ] Tab "Quy trình" → các bước hiển thị
- [ ] Tab "Nhập dữ liệu" → nhập m₀, m₁, m₂
- [ ] Tab "Kết quả" → bảng tính W tự động
- [ ] Nút "Xóa dữ liệu" → xóa thành công
- [ ] Tab "Video" → YouTube embed play được
- [ ] Tab "Câu hỏi" → hiển thị + gợi ý trả lời
- [ ] Kiểm tra bài 4, 5, 6, 7 tương tự

---

## 📋 Module Báo cáo

- [ ] Nhập thông tin sinh viên → lưu
- [ ] Chọn bài TN → xem trước báo cáo
- [ ] Báo cáo hiển thị đúng format UTC
- [ ] Click "Xuất PDF" → tải file .pdf
- [ ] Click "In báo cáo" → mở print dialog
- [ ] Báo cáo có bảng số liệu (nếu đã nhập dữ liệu TN)

---

## 📱 Responsive

- [ ] Desktop (1200px+) → layout đúng
- [ ] Tablet (768px) → sidebar thu gọn
- [ ] Mobile (375px) → sử dụng được, text rõ ràng

---

## 📁 Documentation

- [ ] `README.md` — đầy đủ
- [ ] `SOURCE_MAP.md` — bản đồ nguồn
- [ ] `USER_GUIDE.md` — hướng dẫn SV
- [ ] `DEPLOY_VERCEL.md` — hướng dẫn deploy
- [ ] `RELEASE_CHECKLIST.md` — file này
- [ ] `.gitignore` — đầy đủ

---

## 📦 Package để chia sẻ

### Source package (cho developer/giáo viên):

```
co-hoc-dat-app/
├── src/              ✅
├── package.json      ✅
├── package-lock.json ✅
├── tsconfig.json     ✅
├── tailwind.config.ts ✅
├── postcss.config.js ✅
├── next.config.js    ✅
├── README.md         ✅
├── SOURCE_MAP.md     ✅
├── USER_GUIDE.md     ✅
├── DEPLOY_VERCEL.md  ✅
├── RELEASE_CHECKLIST.md ✅
├── .gitignore        ✅
├── node_modules/     ❌ KHÔNG bao gồm
├── .next/            ❌ KHÔNG bao gồm
└── out/              ❌ KHÔNG bao gồm
```

### Student package (cho sinh viên):

Gửi link Vercel deploy: `https://co-hoc-dat-utc.vercel.app`  
Hoặc kèm USER_GUIDE.md

### Reviewer package (cho giáo viên/reviewer):

- Source package + SOURCE_MAP.md
- Link demo deploy
- USER_GUIDE.md

---

## ✅ Sign-off

| Hạng mục | Trạng thái | Người kiểm tra | Ngày |
|----------|-----------|----------------|------|
| Build thành công | ☐ | | |
| Lab module hoạt động | ☐ | | |
| Report export hoạt động | ☐ | | |
| Documentation đầy đủ | ☐ | | |
| Deploy Vercel thành công | ☐ | | |
