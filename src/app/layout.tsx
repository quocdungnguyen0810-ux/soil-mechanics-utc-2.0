import type { Metadata } from 'next';
import 'katex/dist/katex.min.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cơ Học Đất UTC | Ứng dụng học tập',
  description:
    'Ứng dụng học tập Cơ học đất - Trường Đại học Giao thông Vận tải. Lý thuyết, bài tập, thí nghiệm, báo cáo tự động.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-dark-950 text-white antialiased">
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
