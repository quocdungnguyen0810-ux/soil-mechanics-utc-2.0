// Ch3: Phân bố ứng suất — Source: "5- chuong 3 - Phan bo US.docx"
import { Chapter } from '@/types';
const src = { fileId: 'ch3', fileName: '5- chuong 3 - Phan bo US.docx', fileType: 'chapter' as const, confidence: 'high' as const };

export const chapter3: Chapter = {
  id: 'ch3', chapterNumber: 3, title: 'Phân bố ứng suất trong đất', shortTitle: 'Phân bố US',
  detectedTopic: 'Ứng suất bản thân, ứng suất do tải ngoài, Boussinesq', sourceCoverageOverall: 0.75,
  overview: 'Nghiên cứu phân bố ứng suất trong nền: ứng suất bản thân (trọng lượng đất), ứng suất phụ thêm (tải ngoài — Boussinesq). Cơ sở cho bài toán tính lún và sức chịu tải.',
  learningObjectives: ['Tính ứng suất bản thân trong nền phân lớp có MNN', 'Hiểu bài toán Boussinesq và giả thiết', 'Tính US phụ thêm do tải phân bố hình băng, chữ nhật, tròn', 'Sử dụng bảng K₀', 'Vẽ biểu đồ US theo chiều sâu'],
  detailedSummary: [
    { id: 'ch3-s1', title: '3.1. Ứng suất bản thân', content: `Ứng suất bản thân (σbt) tại độ sâu z là tổng trọng lượng các lớp đất phía trên:
σbt,z = Σ(γᵢ × hᵢ)

**Khi có mực nước ngầm (MNN):**
- Trên MNN: dùng γ (TL thể tích tự nhiên)
- Dưới MNN: dùng γđn (TL thể tích đẩy nổi)
- Tại MNN: σbt liên tục

**Đặc điểm:**
- σbt tăng tuyến tính trong mỗi lớp đồng nhất
- Biểu đồ σbt gãy khúc tại ranh giới lớp và MNN
- σbt tồn tại trước khi có tải trọng công trình

**Áp lực nước lỗ rỗng thủy tĩnh:**
u = γn × hw (hw: chiều sâu dưới MNN)
Ứng suất hữu hiệu: σ' = σbt - u`, sourceRef: src },

    { id: 'ch3-s2', title: '3.2. Bài toán Boussinesq — Lực tập trung', content: `**Giả thiết:** Nền bán không gian đàn hồi, đẳng hướng, đồng nhất.

**Lực tập trung P trên mặt nền:**
Ứng suất phương đứng tại điểm M(r, z):
σz = 3P/(2πz²) × 1/[1+(r/z)²]^(5/2) = K × P/z²

K = 3/(2π) × 1/[1+(r/z)²]^(5/2)

Tại trục tải (r=0): σz = 3P/(2πz²) = 0.4775 × P/z²

**Ứng suất giảm** nhanh theo chiều sâu z (∝ 1/z²) và phân tán theo phương ngang.

**Nguyên lý chồng chất:** Nhiều lực → tổng US = Σ(US từng lực). Một định lý cơ bản cho phép tính US từ tải phân bố bất kỳ.`, sourceRef: src },

    { id: 'ch3-s3', title: '3.3. Ứng suất do tải phân bố đều', content: `**Tải hình băng (chiều dài vô hạn, rộng b):**
σz = K₀ × p₀
K₀ tra bảng theo z/b.

**Tải hình chữ nhật (l × b):**
σz = K₀ × p₀
K₀ tra theo z/b và l/b (bảng Fadum).
Tại tâm: dùng trực tiếp. Tại góc: phương pháp điểm góc. Tại điểm bất kỳ: chia/ghép thành hình chữ nhật có điểm cần tính ở góc.

**Áp lực gây lún p₀:**
p₀ = p - σbt,z=Df
(Áp lực đáy móng trừ US bản thân tại đáy móng)

**Biểu đồ US phụ thêm:**
Vẽ σz theo z dưới đáy móng. US giảm dần, tại vùng hoạt động σz ≤ 0.2σbt → dừng tính lún.

**Phương pháp điểm góc:** Ứng với tải hình chữ nhật, chỉ cho US tại góc. Tại tâm = 4 × US_góc(l/2, b/2). Tại biên = 2 × US_góc(l/2, b).`, sourceRef: src },
  ],

  keyConcepts: [
    { id: 'kc3-1', chapterId: 'ch3', title: 'Ứng suất bản thân', description: 'σbt = Σγᵢhᵢ. Dưới MNN dùng γđn. Biểu đồ tuyến tính từng đoạn.', importance: 'critical', sourceRefs: [src] },
    { id: 'kc3-2', chapterId: 'ch3', title: 'Boussinesq', description: 'Lực tập trung P trên bán KG đàn hồi: σz = K×P/z². Cơ sở tính US phụ thêm.', importance: 'critical', sourceRefs: [src] },
    { id: 'kc3-3', chapterId: 'ch3', title: 'Phương pháp điểm góc', description: 'Chia/ghép tải chữ nhật để điểm tính ở góc → dùng bảng K₀ → cộng/trừ.', importance: 'important', sourceRefs: [src] },
  ],
  formulas: [
    { id: 'f3-1', chapterId: 'ch3', name: 'Ứng suất bản thân', expression: 'σbt = Σ(γᵢ × hᵢ)', variables: [{ symbol: 'σbt', name: 'US bản thân', unit: 'kPa' }, { symbol: 'γᵢ', name: 'TL thể tích lớp i', unit: 'kN/m³' }, { symbol: 'hᵢ', name: 'Dày lớp i', unit: 'm' }], meaning: 'Tổng tích lũy trọng lượng', usageContext: 'Trước khi có tải trọng', sourceRefs: [src] },
    { id: 'f3-2', chapterId: 'ch3', name: 'US phụ thêm', expression: 'σz = K₀ × p₀', variables: [{ symbol: 'K₀', name: 'Hệ số phân bố US' }, { symbol: 'p₀', name: 'Áp lực gây lún', unit: 'kPa' }], meaning: 'K₀ tra bảng theo z/b, l/b', usageContext: 'Tính lún', sourceRefs: [src] },
    { id: 'f3-3', chapterId: 'ch3', name: 'Áp lực gây lún', expression: 'p₀ = p - σbt(z=Df)', variables: [{ symbol: 'p₀', name: 'Áp lực gây lún', unit: 'kPa' }, { symbol: 'p', name: 'Áp lực đáy móng', unit: 'kPa' }], meaning: 'Trừ US bản thân tại đáy móng', usageContext: 'Tính biểu đồ US phụ thêm', sourceRefs: [src] },
  ],
  workedExamples: [],
  importantNotes: [
    'Dưới MNN: σbt dùng γđn, có bước nhảy áp lực nước tại MNN.',
    'p₀ = p - σbt(Df): phải trừ US bản thân tại đáy móng!',
    'K₀ phụ thuộc z/b VÀ l/b: móng vuông ≠ móng băng.',
    'σz phụ thêm giảm nhanh theo chiều sâu. Dừng tính khi σz ≤ 0.2σbt.',
    'Phương pháp điểm góc: mạnh nhất, giải mọi bài toán tải chữ nhật.',
  ],
  commonMistakes: [
    'Quên đổi γ → γđn dưới MNN',
    'Nhầm p₀ = p (quên trừ σbt tại đáy móng)',
    'Tra sai bảng K₀: nhầm l/b và z/b',
  ],
  reviewQuestions: [
    { id: 'rq3-1', chapterId: 'ch3', question: 'Tính σbt trong nền phân lớp có MNN.', sourceRefs: [src] },
    { id: 'rq3-2', chapterId: 'ch3', question: 'Trình bày Boussinesq và phương pháp điểm góc.', sourceRefs: [src] },
  ],
  quizzes: [
    { id: 'q3-1', chapterId: 'ch3', type: 'multiple-choice', difficulty: 'nhận biết', question: 'σbt do yếu tố nào gây ra?', options: ['Tải công trình', 'Trọng lượng bản thân đất', 'Áp lực nước', 'Gió'], correctAnswer: 'Trọng lượng bản thân đất', sourceRefs: [src] },
    { id: 'q3-2', chapterId: 'ch3', type: 'true-false', difficulty: 'thông hiểu', question: 'σbt tuyến tính theo z trong đất đồng nhất.', correctAnswer: 'Đúng', sourceRefs: [src] },
    { id: 'q3-3', chapterId: 'ch3', type: 'multiple-choice', difficulty: 'vận dụng', question: '2 lớp: 3m γ₁=18; 5m γ₂=19 kN/m³. σbt đáy lớp 2?', options: ['149 kPa', '95 kPa', '54 kPa'], correctAnswer: '149 kPa', explanation: '18×3+19×5=149', sourceRefs: [src] },
    { id: 'q3-4', chapterId: 'ch3', type: 'true-false', difficulty: 'thông hiểu', question: 'Dưới MNN phải dùng γđn tính σbt.', correctAnswer: 'Đúng', sourceRefs: [src] },
  ],
  exercises: [],
  sourceRefs: [src],
};
