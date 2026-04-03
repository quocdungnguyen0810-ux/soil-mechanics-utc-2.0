// Ch4: Dự tính độ lún — Source: "6- Chuong 4- Tinh lun.docx"
import { Chapter } from '@/types';
const src = { fileId: 'ch4', fileName: '6- Chuong 4- Tinh lun.docx', fileType: 'chapter' as const, confidence: 'high' as const };

export const chapter4: Chapter = {
  id: 'ch4', chapterNumber: 4, title: 'Dự tính độ lún của nền đất', shortTitle: 'Tính lún', detectedTopic: 'PP cộng lớp, lớp tương đương, cố kết Terzaghi', sourceCoverageOverall: 0.75,
  overview: 'Các phương pháp dự tính lún: cộng lớp phân tố (chính), lớp tương đương, lý thuyết cố kết 1 chiều Terzaghi. Xác định lún cuối cùng và lún theo thời gian.',
  learningObjectives: ['Phân biệt lún tức thời, cố kết, thứ cấp', 'Tính lún bằng PP cộng lớp phân tố', 'Xác định giới hạn vùng hoạt động', 'Nắm lý thuyết cố kết Terzaghi', 'Tính lún theo thời gian qua độ cố kết U'],
  detailedSummary: [
    { id: 'ch4-s1', title: '4.1. Phương pháp cộng lớp phân tố',
      content: `Phương pháp phổ biến nhất, áp dụng cho nền phân lớp.

**Nguyên tắc:**
1. Chia nền dưới đáy móng thành nhiều lớp mỏng hi (≤ b/4, b: bề rộng móng)
2. Tính σbt,i và σz,i tại giữa mỗi lớp (σbt: US bản thân, σz: US phụ thêm)
3. Giới hạn vùng hoạt động: dừng khi σz ≤ 0.2×σbt (đất tốt) hoặc 0.1×σbt (đất yếu)
4. Tính lún mỗi lớp, cộng tổng

**Công thức tính lún 1 lớp:**
Si = (e₁i - e₂i)/(1 + e₁i) × hi [dùng đường cong nén]
Si = (a_i × Δσz,i)/(1 + e₁i) × hi [dùng hệ số nén]
Si = σz,i × hi / Eoed,i [dùng mô đun biến dạng]

Tổng lún: S = Σ Si

**Trong đó:**
- e₁i: hệ số rỗng ứng với σbt (đọc từ đường cong e-p)
- e₂i: hệ số rỗng ứng với σbt + σz (đọc từ đường cong e-p)
- Eoed,i: mô đun biến dạng ứng với khoảng áp lực σbt → σbt+σz`, sourceRef: src },

    { id: 'ch4-s2', title: '4.2. Lý thuyết cố kết thấm 1 chiều Terzaghi',
      content: `Mô tả quá trình thoát nước lỗ rỗng → giảm áp lực nước thặng dư → tăng ứng suất hữu hiệu → lún theo thời gian.

**Giả thiết:**
- Đất bão hòa hoàn toàn, đồng nhất
- Nước và hạt không nén được
- Nước thấm theo phương đứng (1 chiều)
- Darcy áp dụng
- Tải đặt tức thời

**Phương trình cố kết:**
∂u/∂t = Cv × ∂²u/∂z²

Cv = k/(mv × γw): hệ số cố kết (m²/s)

**Độ cố kết trung bình U:**
U = 1 - u_avg/u₀
U tăng từ 0 → 1 (0% → 100%)

Lún tại thời điểm t: St = U × S∞

**Nhân tố thời gian Tv:**
Tv = Cv × t / H²
H: chiều dài thoát nước (= chiều dày lớp nếu thoát 1 phía, = nửa chiều dày nếu thoát 2 phía)

**Bảng U-Tv (khi tải tức thời đều):**
| U (%) | Tv |
|-------|------|
| 10 | 0.008 |
| 20 | 0.031 |
| 30 | 0.071 |
| 50 | 0.197 |
| 60 | 0.287 |
| 70 | 0.403 |
| 80 | 0.567 |
| 90 | 0.848 |
| 95 | 1.129 |`, sourceRef: src },
  ],

  keyConcepts: [
    { id: 'kc4-1', chapterId: 'ch4', title: 'PP cộng lớp phân tố', description: 'Chia lớp mỏng, tính lún từng lớp → cộng. PP phổ biến nhất, dùng bảng e-p hoặc Eoed.', importance: 'critical', sourceRefs: [src] },
    { id: 'kc4-2', chapterId: 'ch4', title: 'Cố kết Terzaghi', description: 'St = U × S∞. U phụ thuộc Tv = Cv×t/H². Nước thoát → US hữu hiệu tăng → đất nén.', importance: 'critical', sourceRefs: [src] },
  ],
  formulas: [
    { id: 'f4-1', chapterId: 'ch4', name: 'Lún cộng lớp (đường nén)', expression: 'S = Σ[(e₁ᵢ-e₂ᵢ)/(1+e₁ᵢ)] × hᵢ', latex: 'S = \\sum \\frac{e_{1i} - e_{2i}}{1 + e_{1i}} \\cdot h_i', variables: [{ symbol: 'S', name: 'Độ lún', unit: 'm' }, { symbol: 'e₁ᵢ', name: 'HR đầu', }, { symbol: 'e₂ᵢ', name: 'HR cuối' }, { symbol: 'hᵢ', name: 'Dày lớp', unit: 'm' }], meaning: 'Tổng lún tất cả phân tố', usageContext: 'PP cộng lớp', sourceRefs: [src] },
    { id: 'f4-2', chapterId: 'ch4', name: 'Lún cộng lớp (Eoed)', expression: 'S = Σ(σz,i × hᵢ / Eoed,i)', latex: 'S = \\sum \\frac{\\sigma_{z,i} \\cdot h_i}{E_{oed,i}}', variables: [{ symbol: 'Eoed,i', name: 'Mô đun BD', unit: 'kPa' }], meaning: 'Dùng khi có Eoed', usageContext: 'PP cộng lớp đơn giản hơn', sourceRefs: [src] },
    { id: 'f4-3', chapterId: 'ch4', name: 'Lún theo thời gian', expression: 'St = U × S∞', latex: 'S_t = U \\cdot S_{\\infty}', variables: [{ symbol: 'St', name: 'Lún tại t', unit: 'm' }, { symbol: 'U', name: 'Độ cố kết' }, { symbol: 'S∞', name: 'Lún cuối cùng', unit: 'm' }], meaning: 'St tăng dần đến S∞', usageContext: 'Dự đoán tiến trình lún', sourceRefs: [src] },
    { id: 'f4-4', chapterId: 'ch4', name: 'Nhân tố thời gian', expression: 'Tv = Cv × t / H²', latex: 'T_v = \\frac{C_v \\cdot t}{H^2}', variables: [{ symbol: 'Tv', name: 'Nhân tố TG' }, { symbol: 'Cv', name: 'HS cố kết', unit: 'm²/s' }, { symbol: 'H', name: 'Chiều dài thoát nước', unit: 'm' }], meaning: 'Tra bảng U-Tv', usageContext: 'Tính U hoặc t', sourceRefs: [src] },
    { id: 'f4-5', chapterId: 'ch4', name: 'Hệ số cố kết', expression: 'Cv = k/(mv × γw)', latex: 'C_v = \\frac{k}{m_v \\cdot \\gamma_w}', variables: [{ symbol: 'Cv', name: 'HS cố kết', unit: 'm²/s' }, { symbol: 'k', name: 'HS thấm', unit: 'm/s' }, { symbol: 'mv', name: 'HS nén TT', unit: 'kPa⁻¹' }], meaning: 'Tốc độ cố kết = thấm / nén', usageContext: 'Tính Tv', sourceRefs: [src] },
  ],
  workedExamples: [
    { id: 'ex4-1', chapterId: 'ch4', title: 'Tính lún PP cộng lớp phân tố', problem: 'Lớp 1 dày 1m, σbt=30, σz=100. Từ bảng e-p: p=30→e=1.2, p=130→e=1.0. Tính S lớp này.', solution: 'S = (e₁ - e₂)/(1+e₁) * h\nS = (1.2 - 1.0)/(1 + 1.2) * 1.0 = 0.2/2.2 = 0.091 m = 9.1 cm', steps: ['Tra e1 ứng với σbt', 'Tra e2 ứng với σbt+σz', 'Áp dụng công thức S'], sourceRefs: [src] },
    { id: 'ex4-2', chapterId: 'ch4', title: 'Tính thời gian cố kết', problem: 'Móng đặt trên lớp sét dày 4m thoát nước 2 phía. Cv=1.2 m²/năm. Lún cuối S∞=20cm. Tính thời gian lún đạt 10cm?', solution: 'Độ cố kết: U = 10/20 = 0.5 (50%)\nTra bảng với U=50% → Tv = 0.197\nThoát nước 2 phía → H = 4/2 = 2m\nTv = Cv*t/H² → t = Tv*H²/Cv = 0.197*2² / 1.2\nt = 0.197 * 4 / 1.2 = 0.657 năm (khoảng 8 tháng)', steps: ['Tính U', 'Tra bảng U-Tv', 'Xác định H', 'Giải phương trình tìm t'], sourceRefs: [src] },
  ],
  importantNotes: [
    'Chia lớp: hᵢ ≤ b/4 (b: bề rộng móng) để đảm bảo chính xác.',
    'Giới hạn vùng hoạt động: σz ≤ 0.2σbt → dừng cộng lún.',
    'H thoát nước: thoát 2 phía → H = chiều dày/2; 1 phía → H = chiều dày.',
    'Cv có đơn vị m²/s → chú ý quy đổi thời gian (ngày, năm).',
    'U = 50% khi Tv ≈ 0.197; U = 90% khi Tv ≈ 0.848.',
  ],
  commonMistakes: ['Chia lớp quá dày → thiếu chính xác', 'Quên trừ σbt khi tính p₀', 'Nhầm H thoát nước 1 phía / 2 phía'],
  reviewQuestions: [
    { id: 'rq4-1', chapterId: 'ch4', question: 'Trình bày PP cộng lớp phân tố.', sourceRefs: [src] },
    { id: 'rq4-2', chapterId: 'ch4', question: 'Giải thích lý thuyết cố kết Terzaghi. Cách tính lún theo t.', sourceRefs: [src] },
  ],
  quizzes: [
    { id: 'q4-1', chapterId: 'ch4', type: 'multiple-choice', difficulty: 'nhận biết', question: 'PP tính lún phổ biến nhất?', options: ['Lớp tương đương', 'Cộng lớp phân tố', 'PTHH', 'Đàn hồi'], correctAnswer: 'Cộng lớp phân tố', sourceRefs: [src] },
    { id: 'q4-2', chapterId: 'ch4', type: 'multiple-choice', difficulty: 'thông hiểu', question: 'U=50% nghĩa là?', options: ['Lún 50% tổng lún', 'Chịu 50% tải', 'Cv=50%'], correctAnswer: 'Lún 50% tổng lún', sourceRefs: [src] },
    { id: 'q4-3', chapterId: 'ch4', type: 'true-false', difficulty: 'thông hiểu', question: 'Chiều dày lớp phân tố ≤ b/4.', correctAnswer: 'Đúng', sourceRefs: [src] },
    { id: 'q4-4', chapterId: 'ch4', type: 'multiple-choice', difficulty: 'vận dụng', question: 'Cv có đơn vị?', options: ['m/s', 'm²/s', 'kPa', '—'], correctAnswer: 'm²/s', sourceRefs: [src] },
    { id: 'q4-5', chapterId: 'ch4', type: 'multiple-choice', difficulty: 'thông hiểu', question: 'Thoát nước 2 phía thì H =?', options: ['Chiều dày lớp', 'Nửa chiều dày', 'Gấp đôi chiều dày'], correctAnswer: 'Nửa chiều dày', explanation: 'H = half-drainage path. Thoát 2 phía → H = d/2.', sourceRefs: [src] },
    { id: 'q4-6', chapterId: 'ch4', type: 'true-false', difficulty: 'thông hiểu', question: 'Lún cố kết là phần chính của độ lún đất sét.', correctAnswer: 'Đúng', explanation: 'Với đất sét, lún cố kết sơ cấp (Sc) chiếm phần lớn tổng lún.', sourceRefs: [src] },
    { id: 'q4-7', chapterId: 'ch4', type: 'multiple-choice', difficulty: 'vận dụng', question: 'S∞=10cm, U=60%. Lún tại thời điểm đó?', options: ['6 cm', '4 cm', '16 cm'], correctAnswer: '6 cm', explanation: 'St = U × S∞ = 0.6 × 10 = 6 cm.', sourceRefs: [src] },
    { id: 'q4-8', chapterId: 'ch4', type: 'true-false', difficulty: 'nhận biết', question: 'Tv = 0.197 ứng với U = 50%.', correctAnswer: 'Đúng', sourceRefs: [src] },
  ],
  exercises: [], sourceRefs: [src, { fileId: 'bt-ch4', fileName: 'bt c4.docx', fileType: 'exercise', confidence: 'high' }],
};
