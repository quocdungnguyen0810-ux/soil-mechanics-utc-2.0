import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'CƠ HỌC ĐẤT UTC | Trường ĐH Giao thông Vận tải',
  description:
    'Ứng dụng học tập CƠ HỌC ĐẤT — Trường Đại học Giao thông Vận tải · Bộ môn Địa Kỹ thuật. Lý thuyết, bài tập, thí nghiệm, báo cáo tự động.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#111827',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-dark-950 text-white antialiased" suppressHydrationWarning>
        {/* Background decorations */}
        <div
          className="bg-glow"
          style={{
            top: '-200px',
            left: '-200px',
            background: 'radial-gradient(circle, #3b8ff6, transparent)',
          }}
        />
        <div
          className="bg-glow"
          style={{
            bottom: '-200px',
            right: '-200px',
            background: 'radial-gradient(circle, #a855f7, transparent)',
          }}
        />
        <div className="bg-grid fixed inset-0 pointer-events-none z-0" />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
