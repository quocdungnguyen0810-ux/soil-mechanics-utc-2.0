import { Material, MaterialType } from '@/types';

// ============================================================
// Materials Library — Tài liệu tham khảo Cơ Học Đất UTC
// ============================================================

export const allMaterials: Material[] = [
  // ---- GIÁO TRÌNH CHÍNH ----
  {
    id: 'mat-01',
    title: 'Cơ học đất',
    type: 'textbook',
    description: 'Giáo trình chính thức môn Cơ học đất, Đại học Giao thông Vận tải. Bao gồm 7 chương từ tính chất vật lý đến ổn định bờ dốc.',
    author: 'Bộ môn Địa Kỹ thuật - ĐH GTVT',
    year: 2020,
    tags: ['giáo trình', 'chính thức', 'bắt buộc'],
    importance: 'essential',
    source: 'NXB GTVT',
  },
  {
    id: 'mat-02',
    title: 'Cơ học đất — Das (bản dịch)',
    type: 'textbook',
    description: 'Bản dịch giáo trình nổi tiếng "Principles of Geotechnical Engineering" của Braja M. Das. Tham khảo bổ sung với nhiều ví dụ từ quốc tế.',
    author: 'Braja M. Das',
    year: 2018,
    tags: ['giáo trình', 'quốc tế', 'nâng cao'],
    importance: 'recommended',
    source: 'Cengage Learning',
  },

  // ---- SLIDE BÀI GIẢNG ----
  {
    id: 'mat-03',
    title: 'Slide Chương 1: Tính chất vật lý của đất',
    type: 'slide',
    chapterId: 'ch1',
    description: 'Slide bài giảng chương 1 trình bày thành phần, cấu trúc, và các chỉ tiêu vật lý cơ bản của đất.',
    author: 'Bộ môn ĐKT',
    tags: ['slide', 'chương 1', 'vật lý đất'],
    importance: 'essential',
    source: 'ĐH GTVT',
  },
  {
    id: 'mat-04',
    title: 'Slide Chương 2: Tính chất cơ học của đất',
    type: 'slide',
    chapterId: 'ch2',
    description: 'Slide bài giảng chương 2 về tính nén lún, sức chống cắt, và thí nghiệm xác định thông số cơ học.',
    author: 'Bộ môn ĐKT',
    tags: ['slide', 'chương 2', 'cơ học đất'],
    importance: 'essential',
    source: 'ĐH GTVT',
  },
  {
    id: 'mat-05',
    title: 'Slide Chương 3: Phân bố ứng suất trong nền đất',
    type: 'slide',
    chapterId: 'ch3',
    description: 'Slide bài giảng chương 3 bao gồm ứng suất bản thân, ứng suất phụ thêm, công thức Boussinesq.',
    author: 'Bộ môn ĐKT',
    tags: ['slide', 'chương 3', 'ứng suất'],
    importance: 'essential',
    source: 'ĐH GTVT',
  },
  {
    id: 'mat-06',
    title: 'Slide Chương 4–5: Lún và Sức chịu tải',
    type: 'slide',
    chapterId: 'ch4',
    description: 'Slide tổng hợp chương 4 (tính lún cố kết) và chương 5 (sức chịu tải nền đất theo Terzaghi, TCVN).',
    author: 'Bộ môn ĐKT',
    tags: ['slide', 'chương 4', 'chương 5', 'lún', 'sức chịu tải'],
    importance: 'essential',
    source: 'ĐH GTVT',
  },
  {
    id: 'mat-07',
    title: 'Slide Chương 6–7: Áp lực đất và Ổn định bờ dốc',
    type: 'slide',
    chapterId: 'ch6',
    description: 'Slide tổng hợp chương 6 (áp lực đất Rankine, Coulomb) và chương 7 (phân tích ổn định mái Fellenius, Bishop).',
    author: 'Bộ môn ĐKT',
    tags: ['slide', 'chương 6', 'chương 7', 'tường chắn', 'mái dốc'],
    importance: 'essential',
    source: 'ĐH GTVT',
  },

  // ---- ĐỀ THI CŨ ----
  {
    id: 'mat-08',
    title: 'Đề thi giữa kỳ Cơ học đất (2023)',
    type: 'past-exam',
    description: 'Đề thi giữa kỳ năm 2023, gồm 3 bài: tính chỉ tiêu vật lý, vẽ biểu đồ ứng suất, và tính lún.',
    year: 2023,
    tags: ['đề thi', 'giữa kỳ', '2023'],
    importance: 'recommended',
    source: 'ĐH GTVT',
  },
  {
    id: 'mat-09',
    title: 'Đề thi cuối kỳ Cơ học đất (2023)',
    type: 'past-exam',
    description: 'Đề thi cuối kỳ năm 2023, gồm 4 bài bao phủ: sức chịu tải Terzaghi, áp lực đất chủ động, kiểm tra ổn định.',
    year: 2023,
    tags: ['đề thi', 'cuối kỳ', '2023'],
    importance: 'recommended',
    source: 'ĐH GTVT',
  },
  {
    id: 'mat-10',
    title: 'Đề thi cuối kỳ Cơ học đất (2022)',
    type: 'past-exam',
    description: 'Đề thi cuối kỳ năm 2022. Đề nhấn mạnh tính lún PP cộng lớp và sức chịu tải theo TCVN.',
    year: 2022,
    tags: ['đề thi', 'cuối kỳ', '2022'],
    importance: 'supplementary',
    source: 'ĐH GTVT',
  },

  // ---- BỘ BÀI TẬP ----
  {
    id: 'mat-11',
    title: 'Bộ bài tập Chương 1 (có đáp án)',
    type: 'exercise-set',
    chapterId: 'ch1',
    description: 'Tập hợp bài tập tự luận chương 1 kèm đáp án chi tiết. Bao gồm: tính γ, W, e, n, Sr, phân loại đất.',
    tags: ['bài tập', 'chương 1', 'có đáp án'],
    importance: 'essential',
    source: 'BT chuong1.docx',
  },
  {
    id: 'mat-12',
    title: 'Bộ bài tập Chương 2 (có đáp án)',
    type: 'exercise-set',
    chapterId: 'ch2',
    description: 'Bài tập chương 2: thí nghiệm nén, cắt trực tiếp, xác định a, Eoed, c, φ.',
    tags: ['bài tập', 'chương 2', 'có đáp án'],
    importance: 'essential',
    source: 'BT chuong2 (2).docx',
  },

  // ---- BẢNG TRA ----
  {
    id: 'mat-13',
    title: 'Bảng tra hệ số K₀ (ứng suất phụ thêm)',
    type: 'chart',
    chapterId: 'ch3',
    description: 'Bảng tra hệ số phân bố ứng suất K₀ theo z/b và l/b cho móng hình chữ nhật và vuông.',
    tags: ['bảng tra', 'K₀', 'ứng suất'],
    importance: 'essential',
  },
  {
    id: 'mat-14',
    title: 'Bảng tra Nc, Nq, Nγ (Terzaghi)',
    type: 'chart',
    chapterId: 'ch5',
    description: 'Bảng tra hệ số sức chịu tải Nc, Nq, Nγ theo φ cho công thức Terzaghi (móng băng, vuông, tròn).',
    tags: ['bảng tra', 'sức chịu tải', 'Terzaghi'],
    importance: 'essential',
  },
  {
    id: 'mat-15',
    title: 'Bảng tra U–Tv (cố kết)',
    type: 'chart',
    chapterId: 'ch4',
    description: 'Bảng tra quan hệ độ cố kết U và nhân tố thời gian Tv cho bài toán lún theo thời gian.',
    tags: ['bảng tra', 'cố kết', 'lún theo thời gian'],
    importance: 'essential',
  },

  // ---- TIÊU CHUẨN ----
  {
    id: 'mat-16',
    title: 'TCVN 9362:2012 – Tiêu chuẩn thiết kế nền nhà và công trình',
    type: 'standard',
    description: 'Tiêu chuẩn Việt Nam quy định phương pháp tính sức chịu tải, kiểm tra lún, và thiết kế nền móng.',
    year: 2012,
    tags: ['tiêu chuẩn', 'TCVN', 'nền móng'],
    importance: 'recommended',
    source: 'Bộ Xây dựng',
  },
  {
    id: 'mat-17',
    title: 'TCVN 4253:2012 – Nền các công trình thủy công',
    type: 'standard',
    description: 'Tiêu chuẩn thiết kế nền cho công trình thủy lợi, thủy điện. Liên quan chương 5, 7.',
    year: 2012,
    tags: ['tiêu chuẩn', 'TCVN', 'thủy công'],
    importance: 'supplementary',
    source: 'Bộ NN&PTNT',
  },

  // ---- TÀI LIỆU THAM KHẢO BỔ SUNG ----
  {
    id: 'mat-18',
    title: 'Sổ tay Địa kỹ thuật',
    type: 'reference',
    description: 'Sổ tay tra cứu nhanh các công thức, bảng số liệu, và tiêu chuẩn liên quan đến địa kỹ thuật.',
    author: 'Nhiều tác giả',
    tags: ['sổ tay', 'tra cứu', 'tổng hợp'],
    importance: 'supplementary',
    source: 'NXB Xây dựng',
  },
];

// ---- HELPER FUNCTIONS ----

export function getMaterialsByType(type: MaterialType): Material[] {
  return allMaterials.filter(m => m.type === type);
}

export function getMaterialsByChapter(chapterId: string): Material[] {
  return allMaterials.filter(m => m.chapterId === chapterId);
}

export function searchMaterials(query: string): Material[] {
  const q = query.toLowerCase();
  return allMaterials.filter(m =>
    m.title.toLowerCase().includes(q) ||
    m.description.toLowerCase().includes(q) ||
    m.tags.some(t => t.toLowerCase().includes(q))
  );
}

export const materialTypeLabels: Record<MaterialType, { label: string; icon: string; color: string }> = {
  'textbook':     { label: 'Giáo trình',      icon: '📚', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  'slide':        { label: 'Slide bài giảng',  icon: '📊', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  'reference':    { label: 'Tham khảo',        icon: '📖', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  'past-exam':    { label: 'Đề thi cũ',        icon: '📝', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  'exercise-set': { label: 'Bộ bài tập',       icon: '✏️', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  'chart':        { label: 'Bảng tra',          icon: '📋', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  'standard':     { label: 'Tiêu chuẩn',       icon: '📐', color: 'bg-teal-500/20 text-teal-300 border-teal-500/30' },
};
