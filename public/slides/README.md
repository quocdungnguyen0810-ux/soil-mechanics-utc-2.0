# Thư mục Slide Bài giảng

Đặt file slide vào đây với tên theo quy ước sau:

| File | Chương |
|------|--------|
| `ch1.pdf` | Chương 1: Tính chất vật lý của đất |
| `ch2.pdf` | Chương 2: Cơ học đất (nén, thấm, cắt) |
| `ch3.pdf` | Chương 3: Ứng suất và độ lún |
| `ch4.pdf` | Chương 4: Cố kết |
| `ch5.pdf` | Chương 5: Sức chịu tải |
| `ch6.pdf` | Chương 6: Áp lực đất |
| `ch7.pdf` | Chương 7: Ổn định bờ dốc |

## Hỗ trợ định dạng

- `.pdf` — Khuyến nghị (tương thích mọi trình duyệt)
- `.pptx` — Xem qua Microsoft Office Online
- `.ppt` — Xem qua Microsoft Office Online

## Quy trình

1. Export PowerPoint → PDF
2. Đặt file vào thư mục này
3. `git add . && git commit -m "Add ch1 slides" && git push`
4. Vercel tự động deploy

## Hỗ trợ cả PPTX

Đặt file `.pptx` cùng tên (ví dụ: `ch1.pptx`) — ứng dụng tự động dùng Microsoft Office Online để hiển thị.
