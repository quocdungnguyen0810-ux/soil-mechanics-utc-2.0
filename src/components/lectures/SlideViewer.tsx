'use client';

import { useState } from 'react';

interface SlideViewerProps {
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  slideFile?: string; // e.g. 'ch1.pdf' or 'ch1.pptx'
}

type ViewMode = 'embed' | 'google' | 'placeholder';

export function SlideViewer({ chapterId, chapterNumber, chapterTitle, slideFile }: SlideViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<'embed' | 'fallback'>('embed');

  // Determine file type and build URL
  const isPdf = slideFile?.toLowerCase().endsWith('.pdf');
  const isPptx = slideFile?.toLowerCase().endsWith('.pptx') || slideFile?.toLowerCase().endsWith('.ppt');
  const localUrl = slideFile ? `/slides/${slideFile}` : null;

  // Google Docs viewer URL (for PPTX or PDF fallback)
  const absoluteUrl = slideFile
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://soil-mechanics-utc-2-0.vercel.app'}/slides/${slideFile}`
    : null;
  const googleViewerUrl = absoluteUrl
    ? `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`
    : null;
  const officeViewerUrl = absoluteUrl && isPptx
    ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(absoluteUrl)}`
    : null;

  const embedUrl = isPptx
    ? (officeViewerUrl || googleViewerUrl)
    : (viewMode === 'embed' ? localUrl : googleViewerUrl);

  if (!slideFile) {
    return <SlideUploadPlaceholder chapterNumber={chapterNumber} chapterTitle={chapterTitle} />;
  }

  return (
    <div className={`flex flex-col gap-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-dark-950 p-4' : ''}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-display font-semibold text-lg">
            📽️ Bài giảng — Chương {chapterNumber}
          </h3>
          <p className="text-xs text-dark-400 mt-0.5">
            {slideFile} •{' '}
            {isPdf ? '📄 PDF Document' : '📊 PowerPoint Presentation'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Download */}
          {localUrl && (
            <a
              href={localUrl}
              download
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-dark-300 hover:text-white border border-white/10 transition-all flex items-center gap-1.5"
            >
              ⬇ Tải xuống
            </a>
          )}
          {/* PDF fallback toggle */}
          {isPdf && (
            <button
              onClick={() => setViewMode(viewMode === 'embed' ? 'fallback' : 'embed')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 text-dark-300 hover:text-white border border-white/10 transition-all"
            >
              {viewMode === 'embed' ? '🌐 Google Viewer' : '📄 Direct PDF'}
            </button>
          )}
          {/* Fullscreen */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 border border-primary-500/20 transition-all"
          >
            {isFullscreen ? '✕ Thoát' : '⛶ Toàn màn hình'}
          </button>
        </div>
      </div>

      {/* Viewer frame */}
      <div
        className="relative overflow-hidden rounded-xl border border-white/10 bg-dark-900"
        style={{ height: isFullscreen ? 'calc(100vh - 100px)' : 'min(75vh, 700px)' }}
      >
        {embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            title={`Bài giảng Chương ${chapterNumber}`}
            allowFullScreen
            loading="lazy"
            style={{ border: 'none' }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-dark-400">
            <p>Không thể tải file. Thử chuyển sang Google Viewer.</p>
          </div>
        )}

        {/* Loading overlay hint */}
        <div
          className="absolute bottom-3 right-3 px-2 py-1 rounded text-[10px] text-dark-500 bg-dark-900/80"
          style={{ pointerEvents: 'none' }}
        >
          {isPptx ? 'Office Online Viewer' : 'PDF Viewer'}
        </div>
      </div>

      {/* Navigation tips */}
      <div
        className="p-3 rounded-lg text-xs text-dark-400 flex items-center gap-2"
        style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)' }}
      >
        <span>💡</span>
        <span>
          {isPdf
            ? 'Dùng thanh cuộn hoặc phím ← → để điều hướng. Nhấn nút toàn màn hình để xem tốt hơn.'
            : 'Dùng mũi tên hoặc click để chuyển slide. Bấm nút tải xuống để mở bằng PowerPoint.'}
        </span>
      </div>
    </div>
  );
}

function SlideUploadPlaceholder({ chapterNumber, chapterTitle }: { chapterNumber: number; chapterTitle: string }) {
  const expectedFile = `ch${chapterNumber}.pdf`;

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Animated illustration */}
      <div className="relative mb-8">
        <div
          className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl mb-2"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
            border: '1px solid rgba(99,102,241,0.2)',
            boxShadow: '0 0 40px rgba(99,102,241,0.08)',
          }}
        >
          📊
        </div>
        <div
          className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{ background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.3)' }}
        >
          ⏳
        </div>
      </div>

      <h3 className="font-display font-semibold text-xl mb-2">
        Slide bài giảng chưa được upload
      </h3>
      <p className="text-dark-400 text-sm max-w-md mb-8">
        Chương {chapterNumber}: <span className="text-white">{chapterTitle}</span>
        {' '}chưa có file slide. Giáo viên vui lòng upload file bài giảng.
      </p>

      {/* Upload instructions */}
      <div
        className="text-left max-w-lg w-full rounded-xl p-5 space-y-3"
        style={{ background: 'rgba(15,20,40,0.8)', border: '1px solid rgba(99,102,241,0.15)' }}
      >
        <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">
          📋 Hướng dẫn thêm slide bài giảng
        </p>

        {[
          { step: '1', desc: 'Export PowerPoint thành PDF (File → Export → PDF)' },
          { step: '2', desc: `Đặt tên file: ${expectedFile} (hoặc ch${chapterNumber}.pptx)` },
          { step: '3', desc: 'Copy file vào thư mục: public/slides/' },
          { step: '4', desc: 'git add . && git commit -m "Add ch' + chapterNumber + ' slides" && git push' },
        ].map(({ step, desc }) => (
          <div key={step} className="flex items-start gap-3">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
              style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}
            >
              {step}
            </span>
            <p className="text-sm text-dark-300 leading-relaxed">{desc}</p>
          </div>
        ))}

        <div
          className="mt-4 p-3 rounded-lg font-mono text-xs"
          style={{ background: 'rgba(0,0,0,0.4)', color: '#67e8f9', border: '1px solid rgba(6,182,212,0.1)' }}
        >
          public/slides/<span className="text-amber-400">{expectedFile}</span>
        </div>
      </div>

      {/* Supported formats */}
      <div className="flex gap-3 mt-6">
        {['PDF', 'PPTX', 'PPT'].map(fmt => (
          <span
            key={fmt}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}
          >
            .{fmt.toLowerCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
