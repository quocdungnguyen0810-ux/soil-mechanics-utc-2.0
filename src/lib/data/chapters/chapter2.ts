// Chapter 2: TÍNH CHẤT CƠ HỌC CỦA ĐẤT
// Source: "4- Chuong 2 - TC co hoc cua dat.docx" — Coverage ≥ 70%
import { Chapter } from '@/types';
const src = { fileId: 'ch2', fileName: '4- Chuong 2 - TC co hoc cua dat.docx', fileType: 'chapter' as const, confidence: 'high' as const };

export const chapter2: Chapter = {
  id: 'ch2', chapterNumber: 2,
  title: 'Tính chất cơ học của đất', shortTitle: 'TC Cơ học',
  detectedTopic: 'Tính nén lún, tính thấm, sức chống cắt',
  sourceCoverageOverall: 0.78,
  overview: 'Chương 2 trình bày ba tính chất cơ học cơ bản: tính nén lún (biến dạng khi chịu tải), tính thấm (nước chảy qua lỗ rỗng), sức chống cắt (khả năng chống lại phá hoại). Đây là nền tảng toàn bộ cơ học đất ứng dụng: tính lún, sức chịu tải, áp lực đất, ổn định mái dốc.',
  learningObjectives: [
    'Hiểu bản chất tính nén lún: đất biến dạng do giảm thể tích lỗ rỗng',
    'Nắm thí nghiệm nén 1 trục không nở hông: đường cong e-p, e-lgp',
    'Xác định các chỉ tiêu nén: a, mv, Eoed, Cc, Cs',
    'Hiểu khái niệm áp lực tiền cố kết và phân loại đất theo lịch sử ứng suất',
    'Phát biểu định luật Darcy, xác định hệ số thấm k',
    'Nắm vững tiêu chuẩn phá hoại Mohr-Coulomb: τ = σtanφ + c',
    'Biết các phương pháp TN xác định c, φ: cắt trực tiếp, nén 3 trục',
  ],
  detailedSummary: [
    { id: 'ch2-s1', title: '2.1. Tính nén lún của đất — Bản chất',
      content: `Khi đất chịu tải trọng, hạt đất xếp lại gần nhau hơn, thể tích lỗ rỗng giảm → đất bị nén chặt. Đây là nguyên nhân chính gây lún công trình.

**Đặc điểm nén lún đất:**
- Đất rời (cát, sỏi): nén lún nhanh, hoàn thành gần như tức thời khi đặt tải
- Đất dính (sét): nén lún chậm do nước thoát ra chậm qua lỗ rỗng nhỏ → quá trình cố kết

**Biến dạng đất gồm 3 phần:**
1. Lún tức thời (S₀): biến dạng đàn hồi, xảy ra ngay khi đặt tải (không thoát nước)
2. Lún cố kết sơ cấp (Sc): do nước thoát khỏi lỗ rỗng, là phần chính
3. Lún thứ cấp (Ss): do từ biến của khung hạt, xảy ra sau khi áp lực nước lỗ rỗng tiêu tán

**Thí nghiệm nén một trục không nở hông (oedometer test):**
Mẫu đất đặt trong hộp cứng (không nở ngang), gia tải từng cấp (25, 50, 100, 200, 400 kPa). Mỗi cấp chờ ổn định (24h). Đo biến dạng ΔH ứng với mỗi cấp p.

Tính hệ số rỗng ở mỗi cấp tải:
eᵢ = e₀ - (1 + e₀) × ΔHᵢ/H₀

**Đường cong nén e-p:** quan hệ giữa e và p, có dạng đường cong lõm. Đường dỡ tải cho thấy đất không phục hồi hoàn toàn → biến dạng dẻo.
**Đường cong e-lgp:** quan hệ e và lgp, hai đoạn thẳng: đường nén nguyên (NCL) và đường nở (unloading).`, sourceRef: src },

    { id: 'ch2-s2', title: '2.2. Các chỉ tiêu nén lún',
      content: `**Hệ số nén lún a (coefficient of compressibility):**
a = -(e₁ - e₂)/(p₂ - p₁) = Δe/Δp
Đơn vị: kPa⁻¹ (hoặc cm²/kG). a phản ánh mức độ nén lún.
- a > 0.01 kPa⁻¹: đất nén lún mạnh
- 0.005 < a < 0.01: nén lún TB
- a < 0.005: nén lún yếu (đất tốt)

**Hệ số nén thể tích mv:**
mv = a/(1+e₁)
Biến dạng thể tích tương đối dưới áp lực đơn vị.

**Mô đun biến dạng nén một trục Eoed:**
Eoed = 1/mv = (1+e₁)/a = (1+e₁)×Δp/Δe
Đơn vị: kPa. Eoed càng lớn → đất càng cứng.

**Chỉ số nén Cc (compression index):**
Cc = (e₁ - e₂)/(lgp₂ - lgp₁) = Δe/Δlgp
Dùng cho đường cong e-lgp. Tương quan: Cc ≈ 0.009(WL - 10)

**Chỉ số nở Cs (swelling index):**
Cs ≈ Cc/5 đến Cc/10. Dùng khi đất ở trạng thái quá cố kết.

**Áp lực tiền cố kết (pc):**
Áp lực lớn nhất đất từng chịu trong lịch sử.
- p < pc: đất quá cố kết (OC) → nén lún ít
- p = pc: đất cố kết thường (NC)
- p > pc: đất thiếu cố kết (UC) → nén lún nhiều
OCR = pc/p₀ (hệ số quá cố kết)`, sourceRef: src },

    { id: 'ch2-s3', title: '2.3. Tính thấm của đất — Định luật Darcy',
      content: `Nước thấm qua lỗ rỗng đất dưới tác dụng chênh lệch cột nước (gradient thủy lực).

**Định luật Darcy:**
v = k × i
Q = k × i × A

Trong đó:
- v: vận tốc thấm biểu kiến (m/s)
- k: hệ số thấm (m/s) — đặc trưng cho khả năng cho nước đi qua
- i: gradient thủy lực = ΔH/L (chênh lệch cột nước / chiều dài thấm)
- Q: lưu lượng thấm (m³/s)
- A: tiết diện thấm (m²)

**Điều kiện áp dụng:** dòng chảy tầng (laminar flow), tức Re < 1. Với đất sỏi cuội lớn có thể chảy rối → Darcy không chính xác.

**Giá trị hệ số thấm điển hình:**
| Loại đất | k (m/s) |
|----------|---------|
| Sỏi | 10⁻² – 10⁰ |
| Cát thô | 10⁻³ – 10⁻¹ |
| Cát mịn | 10⁻⁵ – 10⁻³ |
| Bụi (silt) | 10⁻⁷ – 10⁻⁵ |
| Sét | 10⁻¹⁰ – 10⁻⁷ |

**Phương pháp xác định k:**
1. Cột nước không đổi (constant head): cho cát, sỏi. k = Q×L/(A×ΔH×t)
2. Cột nước thay đổi (falling head): cho sét. k = (a×L)/(A×Δt) × ln(h₁/h₂)
3. Thí nghiệm hiện trường: bơm hút nước, đo mực nước theo thời gian

**Hệ số thấm phụ thuộc:**
- Hệ số rỗng e (e lớn → k lớn)
- Kích thước hạt (hạt lớn → k lớn)
- Nhiệt độ (ảnh hưởng độ nhớt nước)
- Tính dị hướng (kh ≠ kv: thấm ngang ≠ thấm đứng)`, sourceRef: src },

    { id: 'ch2-s4', title: '2.4. Sức chống cắt — Tiêu chuẩn Mohr-Coulomb',
      content: `Sức chống cắt là khả năng chống lại biến dạng trượt của đất. Khi ứng suất cắt τ vượt quá sức chống cắt → đất bị phá hoại.

**Tiêu chuẩn phá hoại Mohr-Coulomb:**
τf = σ × tan(φ) + c

Trong đó:
- τf: sức chống cắt (cường độ chống cắt) (kPa)
- σ: ứng suất pháp trên mặt trượt (kPa)
- φ: góc ma sát trong (°) — đặc trưng cho ma sát giữa các hạt
- c: lực dính (kPa) — đặc trưng cho liên kết giữa các hạt

**Ý nghĩa vật lý:**
- Đất rời (cát): c ≈ 0, sức chống cắt chủ yếu do ma sát → τ = σ×tanφ
- Đất dính (sét): có cả c và φ. Đất bão hòa không thoát nước: φu = 0, τ = cu
- c và φ phụ thuộc: loại đất, trạng thái, điều kiện thoát nước

**Vòng tròn Mohr:**
Biểu diễn trạng thái ứng suất tại một điểm. Tâm: (σ₁+σ₃)/2, bán kính: (σ₁-σ₃)/2.
Khi vòng tròn Mohr tiếp xúc đường Coulomb → đất bị phá hoại.

**Thí nghiệm xác định c, φ:**

*1. Cắt trực tiếp (direct shear test):*
- Mẫu đặt trong hộp cắt, gia tải pháp σ, tăng lực cắt T đến phá hoại → τ = T/A
- Lặp với 3-4 giá trị σ khác nhau (50, 100, 200, 300 kPa)
- Vẽ quan hệ τ-σ → đường thẳng → c = tung độ gốc, tanφ = hệ số góc

*2. Nén ba trục (triaxial test):*
- Mẫu trụ φ38mm × H76mm, đặt trong buồng áp lực
- Gia áp cell σ₃, tăng σ₁ đến phá hoại
- Lặp 3 mẫu: σ₃ = 50, 100, 200 kPa
- Vẽ 3 vòng tròn Mohr → tiếp tuyến chung → c, φ
- Ưu điểm: kiểm soát điều kiện thoát nước (CU, CD, UU)

**Các điều kiện thí nghiệm:**
- CD (Consolidated Drained): đo c', φ' hữu hiệu — cho bài toán dài hạn
- CU (Consolidated Undrained): đo c, φ tổng hoặc c', φ' (nếu đo áp lực nước)
- UU (Unconsolidated Undrained): đo cu — cho bài toán ngắn hạn`, sourceRef: src },
  ],

  keyConcepts: [
    { id: 'kc2-1', chapterId: 'ch2', title: 'Tính nén lún', description: 'Đất nén lún do giảm Vr. TN nén 1 trục cho đường cong e-p. Chỉ tiêu: a, Eoed, Cc.', importance: 'critical', sourceRefs: [src] },
    { id: 'kc2-2', chapterId: 'ch2', title: 'Định luật Darcy', description: 'v = k×i. k phụ thuộc loại đất (sét: 10⁻¹⁰, cát: 10⁻³ m/s). Điều kiện: dòng chảy tầng.', importance: 'critical', sourceRefs: [src] },
    { id: 'kc2-3', chapterId: 'ch2', title: 'Tiêu chuẩn Mohr-Coulomb', description: 'τ = σtanφ + c. Hai thông số: c (lực dính), φ (góc ma sát). Xác định bằng cắt trực tiếp hoặc nén 3 trục.', importance: 'critical', sourceRefs: [src] },
    { id: 'kc2-4', chapterId: 'ch2', title: 'Áp lực tiền cố kết', description: 'pc là áp lực lớn nhất đất từng chịu. OCR = pc/p₀. NC: OCR=1, OC: OCR>1.', importance: 'important', sourceRefs: [src] },
  ],

  formulas: [
    { id: 'f2-1', chapterId: 'ch2', name: 'Hệ số nén lún', expression: 'a = (e₁ - e₂)/(p₂ - p₁)', latex: 'a = \\frac{e_1 - e_2}{p_2 - p_1}', variables: [{ symbol: 'a', name: 'Hệ số nén lún', unit: 'kPa⁻¹' }, { symbol: 'e₁', name: 'HR ở p₁' }, { symbol: 'e₂', name: 'HR ở p₂' }], meaning: 'Mức độ giảm e khi tăng p', usageContext: 'Tính mô đun biến dạng', sourceRefs: [src] },
    { id: 'f2-2', chapterId: 'ch2', name: 'Mô đun biến dạng', expression: 'Eoed = (1+e₁)/a', latex: 'E_{oed} = \\frac{1+e_1}{a}', variables: [{ symbol: 'Eoed', name: 'Mô đun BD', unit: 'kPa' }, { symbol: 'e₁', name: 'HR đầu khoảng' }, { symbol: 'a', name: 'HS nén lún', unit: 'kPa⁻¹' }], meaning: 'Độ cứng nén 1 trục', usageContext: 'Tính lún bằng PP cộng lớp', sourceRefs: [src] },
    { id: 'f2-3', chapterId: 'ch2', name: 'Định luật Darcy', expression: 'v = k × i', latex: 'v = k \\cdot i', variables: [{ symbol: 'v', name: 'Vận tốc thấm', unit: 'm/s' }, { symbol: 'k', name: 'Hệ số thấm', unit: 'm/s' }, { symbol: 'i', name: 'Gradient thủy lực' }], meaning: 'Vận tốc thấm tỷ lệ gradient', usageContext: 'Tính lưu lượng thấm, cố kết', sourceRefs: [src] },
    { id: 'f2-4', chapterId: 'ch2', name: 'Mohr-Coulomb', expression: 'τ = σ × tan(φ) + c', latex: '\\tau_f = \\sigma \\tan\\varphi + c', variables: [{ symbol: 'τf', name: 'Sức chống cắt', unit: 'kPa' }, { symbol: 'σ', name: 'Ứng suất pháp', unit: 'kPa' }, { symbol: 'φ', name: 'Góc ma sát trong', unit: '°' }, { symbol: 'c', name: 'Lực dính', unit: 'kPa' }], meaning: 'Tiêu chuẩn phá hoại cắt', usageContext: 'SCT, ổn định mái', sourceRefs: [src] },
    { id: 'f2-5', chapterId: 'ch2', name: 'Chỉ số nén Cc', expression: 'Cc = Δe / Δlgp', latex: 'C_c = \\frac{\\Delta e}{\\Delta \\lg p}', variables: [{ symbol: 'Cc', name: 'Chỉ số nén' }], meaning: 'Độ dốc đường NCL trên e-lgp', usageContext: 'Tính lún đất NC', sourceRefs: [src] },
    { id: 'f2-6', chapterId: 'ch2', name: 'Hệ số rỗng theo biến dạng', expression: 'eᵢ = e₀ - (1+e₀)×ΔHᵢ/H₀', latex: 'e_i = e_0 - (1+e_0) \\frac{\\Delta H_i}{H_0}', variables: [{ symbol: 'eᵢ', name: 'Hệ số rỗng cấp i' }, { symbol: 'ΔHᵢ', name: 'Biến dạng tổng', unit: 'mm' }, { symbol: 'H₀', name: 'Chiều cao ban đầu', unit: 'mm' }], meaning: 'Tính e từ biến dạng đo', usageContext: 'TN nén cố kết', sourceRefs: [src] },
  ],

  workedExamples: [
    { id: 'ex2-1', chapterId: 'ch2', title: 'Tính a và Eoed từ TN nén', problem: 'Kết quả nén: p₁=100kPa → e₁=0.78; p₂=200kPa → e₂=0.72. Tính a, mv, Eoed.', solution: 'a = (0.78-0.72)/(200-100) = 6×10⁻⁴ kPa⁻¹\nmv = a/(1+e₁) = 6×10⁻⁴/1.78 = 3.37×10⁻⁴ kPa⁻¹\nEoed = 1/mv = 2967 kPa', steps: ['a = Δe/Δp', 'mv = a/(1+e₁)', 'Eoed = 1/mv'], sourceRefs: [src] },
  ],
  importantNotes: [
    'Eoed = (1+e₁)/a — nhớ e₁ là hệ số rỗng đầu khoảng áp lực.',
    'Cắt trực tiếp: cần ít nhất 3 mẫu với σ khác nhau để xác định đường Coulomb.',
    'Đất cát: c ≈ 0, chỉ có φ. Đất sét bão hòa UU: φ = 0° (φu), chỉ có cu.',
    'Hệ số thấm sét nhỏ gấp 10⁶-10⁸ lần cát → nước thoát rất chậm → cố kết lâu.',
    'Phân biệt ứng suất tổng (σ) và hữu hiệu (σ\'): σ\' = σ - u. c\' và φ\' là thông số hữu hiệu.',
  ],
  commonMistakes: [
    'Nhầm dấu a: lấy e₁-e₂ chia p₂-p₁ (e giảm, p tăng → a > 0)',
    'Nhầm ứng suất tổng/hữu hiệu khi dùng Mohr-Coulomb',
    'Quên (1+e₁) khi tính Eoed = (1+e₁)/a',
    'Dùng sai đơn vị gradient thủy lực (i không thứ nguyên)',
  ],
  reviewQuestions: [
    { id: 'rq2-1', chapterId: 'ch2', question: 'Trình bày nguyên lý TN nén 1 trục. Vẽ đường cong e-p.', sourceRefs: [src] },
    { id: 'rq2-2', chapterId: 'ch2', question: 'Phát biểu định luật Darcy. Nêu điều kiện áp dụng.', sourceRefs: [src] },
    { id: 'rq2-3', chapterId: 'ch2', question: 'Trình bày tiêu chuẩn Mohr-Coulomb. Cách xác định c, φ.', sourceRefs: [src] },
  ],
  quizzes: [
    { id: 'q2-1', chapterId: 'ch2', type: 'multiple-choice', difficulty: 'nhận biết', question: 'Hệ số nén lún a có đơn vị?', options: ['kPa', 'kPa⁻¹', 'm/s', '—'], correctAnswer: 'kPa⁻¹', sourceRefs: [src] },
    { id: 'q2-2', chapterId: 'ch2', type: 'true-false', difficulty: 'thông hiểu', question: 'Vận tốc thấm tỷ lệ thuận với cột nước.', correctAnswer: 'Sai', explanation: 'v tỷ lệ gradient i = ΔH/L, không phải cột nước H.', sourceRefs: [src] },
    { id: 'q2-3', chapterId: 'ch2', type: 'multiple-choice', difficulty: 'thông hiểu', question: 'Hai thông số Mohr-Coulomb?', options: ['a và E', 'c và φ', 'k và i', 'e và n'], correctAnswer: 'c và φ', sourceRefs: [src] },
    { id: 'q2-4', chapterId: 'ch2', type: 'multiple-choice', difficulty: 'vận dụng', question: 'c=20kPa, φ=15°. Sức chống cắt ở σ=100kPa?', options: ['46.8 kPa', '26.8 kPa', '120 kPa'], correctAnswer: '46.8 kPa', explanation: 'τ=100×tan15°+20=100×0.268+20=46.8', sourceRefs: [src] },
    { id: 'q2-5', chapterId: 'ch2', type: 'multiple-choice', difficulty: 'nhận biết', question: 'Loại đất có hệ số thấm nhỏ nhất?', options: ['Sỏi', 'Cát', 'Bụi', 'Sét'], correctAnswer: 'Sét', sourceRefs: [src] },
    { id: 'q2-6', chapterId: 'ch2', type: 'multiple-choice', difficulty: 'vận dụng', question: 'e₁=0.80, e₂=0.72, p₁=100kPa, p₂=200kPa. Eoed=?', options: ['2250 kPa', '1800 kPa', '3000 kPa'], correctAnswer: '2250 kPa', explanation: 'a=(0.80-0.72)/(200-100)=8×10⁻⁴. Eoed=(1+0.80)/(8×10⁻⁴)=2250kPa.', sourceRefs: [src] },
    { id: 'q2-7', chapterId: 'ch2', type: 'true-false', difficulty: 'thông hiểu', question: 'Đất cát bão hòa thí nghiệm UU cho φu = 0.', correctAnswer: 'Sai', explanation: 'φu=0 chỉ áp dụng cho đất sét bão hòa. Đất cát bão hòa thoát nước nhanh → vẫn có φ.', sourceRefs: [src] },
    { id: 'q2-8', chapterId: 'ch2', type: 'multiple-choice', difficulty: 'thông hiểu', question: 'Thí nghiệm CD cho thông số gì?', options: ['cu, φu', 'c\', φ\' (hữu hiệu)', 'c, φ tổng'], correctAnswer: 'c\', φ\' (hữu hiệu)', explanation: 'CD: Consolidated Drained → cho thông số hữu hiệu c\' và φ\'.', sourceRefs: [src] },
  ],
  exercises: [],
  sourceRefs: [src],
};
