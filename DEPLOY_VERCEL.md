# DEPLOY_VERCEL — Hướng dẫn triển khai lên Vercel

## 📋 Yêu cầu trước khi deploy

- Tài khoản [GitHub](https://github.com)
- Tài khoản [Vercel](https://vercel.com) (free tier đủ)
- Project đã build thành công locally (`npm run build`)

---

## Bước 1: Đẩy code lên GitHub

### 1.1 Tạo repository trên GitHub

1. Đăng nhập [github.com](https://github.com)
2. Click **New repository**
3. Đặt tên: `co-hoc-dat-utc`
4. Chọn **Private** hoặc **Public**
5. **KHÔNG** tick "Add a README" (đã có sẵn)
6. Click **Create repository**

### 1.2 Push code

Mở terminal trong thư mục `co-hoc-dat-app/`:

```bash
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả file
git add .

# Commit
git commit -m "Initial release: Co Hoc Dat UTC learning app"

# Thêm remote
git remote add origin https://github.com/YOUR_ACCOUNT/co-hoc-dat-utc.git

# Push
git push -u origin main
```

> ⚠️ Kiểm tra `.gitignore` đảm bảo `node_modules/` và `.next/` không bị push lên.

---

## Bước 2: Import vào Vercel

### 2.1 Kết nối

1. Truy cập [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Chọn **GitHub** → Authorize Vercel
4. Tìm repository `co-hoc-dat-utc` → Click **Import**

### 2.2 Cấu hình

Vercel sẽ tự động phát hiện Next.js. Kiểm tra:

| Cài đặt | Giá trị |
|---------|---------|
| Framework Preset | **Next.js** (tự động) |
| Root Directory | `.` (mặc định) |
| Build Command | `npm run build` |
| Output Directory | `.next` (mặc định) |
| Install Command | `npm install` |
| Node.js Version | 18.x hoặc 20.x |

### 2.3 Deploy

1. Click **Deploy**
2. Chờ build hoàn tất (~2-3 phút)
3. Vercel cung cấp URL: `https://co-hoc-dat-utc.vercel.app`

---

## Bước 3: Kiểm tra sau deploy

Truy cập URL Vercel và kiểm tra:

- [ ] Trang chủ tải đúng
- [ ] Sidebar navigation hoạt động
- [ ] Chuyển đổi giữa 4 module
- [ ] Chọn chương → hiển thị nội dung
- [ ] Chọn bài TN → nhập dữ liệu → kết quả tự động
- [ ] Báo cáo → nhập thông tin → xem trước → xuất PDF
- [ ] Video YouTube play được
- [ ] Responsive trên mobile

---

## Bước 4: Cập nhật sau này

Mỗi khi push code mới lên GitHub, Vercel tự động re-deploy:

```bash
git add .
git commit -m "Update content"
git push
```

---

## 🔧 Xử lý lỗi thường gặp

### Build fail: Module not found

```
Error: Cannot find module '@/lib/data/chapters'
```

**Giải pháp**: Kiểm tra `tsconfig.json` có path alias `@/*` → `./src/*`.

### Build fail: Type errors

```bash
# Tạm thời bỏ qua type errors
# Thêm vào next.config.js:
module.exports = {
  typescript: { ignoreBuildErrors: true }
}
```

### Deploy chậm

- Free tier Vercel có cold start ~3s cho request đầu tiên
- Sau request đầu: nhanh bình thường

---

## 📌 Custom Domain (tùy chọn)

1. Vercel → Project Settings → Domains
2. Thêm domain: `cohocdat.example.com`
3. Cấu hình DNS theo hướng dẫn Vercel

---

## 📊 Analytics (tùy chọn)

Vercel cung cấp [Analytics](https://vercel.com/analytics) miễn phí:

1. Project Settings → Analytics → Enable
2. Xem lượt truy cập, thời gian tải trang
