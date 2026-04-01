// Ch5-7 with updated schema
import { Chapter } from '@/types';
const s5 = { fileId: 'ch5', fileName: '7- Chuong 5- Suc chiu tai.docx', fileType: 'chapter' as const, confidence: 'high' as const };
const s6 = { fileId: 'ch6', fileName: '8- Chuong 6- Ap luc dat.docx', fileType: 'chapter' as const, confidence: 'high' as const };
const s7 = { fileId: 'ch7', fileName: '9- Chuong 7- on dinh bo doc.docx', fileType: 'chapter' as const, confidence: 'high' as const };

export const chapter5: Chapter = {
  id: 'ch5', chapterNumber: 5, title: 'Sức chịu tải của nền đất', shortTitle: 'Sức chịu tải', detectedTopic: 'Terzaghi, Meyerhof, áp lực tiêu chuẩn', sourceCoverageOverall: 0.72,
  overview: 'Các phương pháp xác định sức chịu tải: dạng phá hoại, công thức Terzaghi, Meyerhof, Hansen. Áp lực tiêu chuẩn theo TCVN.',
  learningObjectives: ['Hiểu 3 dạng phá hoại nền', 'Nắm CT Terzaghi và ý nghĩa Nc, Nq, Nγ', 'Tính áp lực tiêu chuẩn theo TCVN', 'Áp dụng hệ số an toàn Fs'],
  detailedSummary: [
    { id: 'ch5-s1', title: '5.1. Các dạng phá hoại nền',
      content: `**3 dạng phá hoại:**
1. **Cắt tổng quát (general shear):** Đất chặt/cứng. Mặt trượt rõ ràng, phía bên trồi lên. Biểu đồ p-S có đỉnh rõ.
2. **Cắt cục bộ (local shear):** Đất trung bình. Mặt trượt không hoàn chỉnh. Dùng c' = 2c/3, tanφ' = 2tanφ/3.
3. **Cắt xuyên (punching):** Đất rời xốp, đất yếu. Móng lún thẳng xuống, không trồi bên. Biểu đồ p-S không có đỉnh.

Dạng phá hoại phụ thuộc: mật độ đất (chặt/xốp), chiều sâu chôn móng Df/B, khả năng nén.`, sourceRef: s5 },
    { id: 'ch5-s2', title: '5.2. Công thức Terzaghi',
      content: `**Sức chịu tải giới hạn — móng băng:**
pgh = c×Nc + γ×Df×Nq + 0.5×γ×B×Nγ

**Ý nghĩa 3 thành phần:**
- c×Nc: ảnh hưởng lực dính của đất
- γ×Df×Nq: ảnh hưởng chiều sâu chôn móng (áp lực đất bên)
- 0.5×γ×B×Nγ: ảnh hưởng bề rộng móng

Nc, Nq, Nγ: hệ số sức chịu tải — phụ thuộc φ (tra bảng)

**Móng vuông:** pgh = 1.3cNc + γDfNq + 0.4γBNγ
**Móng tròn:** pgh = 1.3cNc + γDfNq + 0.3γBNγ

**Áp lực cho phép:** [p] = pgh / Fs (Fs = 2-3)

**Áp lực tiêu chuẩn (TCVN):**
Rtc = m₁m₂/Ktc × (A×b×γ + B×h×γ' + D×c)
- m₁, m₂: hệ số điều kiện làm việc
- Ktc: hệ số tin cậy
- A, B, D: tra bảng theo φ`, sourceRef: s5 },
  ],
  keyConcepts: [
    { id: 'kc5-1', chapterId: 'ch5', title: 'Phá hoại nền', description: '3 dạng: cắt tổng quát, cục bộ (dùng c\'=2c/3), xuyên.', importance: 'critical', sourceRefs: [s5] },
    { id: 'kc5-2', chapterId: 'ch5', title: 'Terzaghi', description: 'pgh = cNc + γDfNq + 0.5γBNγ. Ba thành phần: dính, sâu, rộng.', importance: 'critical', sourceRefs: [s5] },
  ],
  formulas: [
    { id: 'f5-1', chapterId: 'ch5', name: 'Terzaghi (băng)', expression: 'pgh = c×Nc + γ×Df×Nq + 0.5γ×B×Nγ', variables: [{ symbol: 'pgh', name: 'SCT giới hạn', unit: 'kPa' }, { symbol: 'Nc,Nq,Nγ', name: 'HS SCT (theo φ)' }, { symbol: 'B', name: 'Bề rộng', unit: 'm' }, { symbol: 'Df', name: 'Sâu chôn móng', unit: 'm' }], meaning: '3 thành phần: dính + sâu + rộng', usageContext: 'Thiết kế nền móng nông', sourceRefs: [s5] },
  ],
  workedExamples: [], importantNotes: ['B: bề rộng (cạnh ngắn), không phải chiều dài.', 'Phá hoại cục bộ: dùng c\'=2c/3, φ\'=arctan(2tanφ/3).', 'Fs thường 2-3 cho công trình dân dụng.'],
  commonMistakes: ['Nhầm B là chiều dài', 'Dùng sai NC cho phá hoại cục bộ', 'Quên Fs'],
  reviewQuestions: [{ id: 'rq5-1', chapterId: 'ch5', question: 'Trình bày CT Terzaghi và ý nghĩa.', sourceRefs: [s5] }],
  quizzes: [
    { id: 'q5-1', chapterId: 'ch5', type: 'multiple-choice', difficulty: 'nhận biết', question: 'Mấy dạng phá hoại nền?', options: ['2', '3', '4'], correctAnswer: '3', sourceRefs: [s5] },
    { id: 'q5-2', chapterId: 'ch5', type: 'true-false', difficulty: 'thông hiểu', question: 'Tăng Df tăng SCT.', correctAnswer: 'Đúng', explanation: 'Thành phần γDfNq tăng.', sourceRefs: [s5] },
    { id: 'q5-3', chapterId: 'ch5', type: 'multiple-choice', difficulty: 'vận dụng', question: '[p] liên hệ pgh qua?', options: ['[p]=pgh', '[p]=pgh×Fs', '[p]=pgh/Fs'], correctAnswer: '[p]=pgh/Fs', sourceRefs: [s5] },
  ],
  exercises: [], sourceRefs: [s5],
};

export const chapter6: Chapter = {
  id: 'ch6', chapterNumber: 6, title: 'Áp lực đất lên tường chắn', shortTitle: 'Áp lực đất', detectedTopic: 'Rankine, Coulomb, tường chắn', sourceCoverageOverall: 0.71,
  overview: 'Lý thuyết áp lực đất: tĩnh, chủ động (Ka), bị động (Kp). PP Rankine, Coulomb. Tính toán tường chắn với đất dính/rời, có tải trọng.',
  learningObjectives: ['Phân biệt AT tĩnh, chủ động, bị động', 'Nắm CT Rankine', 'Tính biểu đồ áp lực đất đơn giản', 'Hiểu PP Coulomb'],
  detailedSummary: [
    { id: 'ch6-s1', title: '6.1. Khái niệm áp lực đất',
      content: `**3 trạng thái áp lực:**
- **Áp lực tĩnh (at rest, K₀):** Tường không chuyển vị. K₀ ≈ 1 - sinφ (Jaky). σh = K₀×σv.
- **Áp lực chủ động (active, Ka):** Tường dời ra xa đất (1-5‰H). Áp lực giảm đến min → chủ động.
- **Áp lực bị động (passive, Kp):** Tường ép vào đất (5-10%H). Áp lực tăng đến max → bị động.

Ka < K₀ < Kp (luôn đúng)

**Lý thuyết Rankine:**
Ka = tan²(45° - φ/2) = (1-sinφ)/(1+sinφ)
Kp = tan²(45° + φ/2) = (1+sinφ)/(1-sinφ)

**Đất rời (c=0):**
σa = Ka × γ × z
σp = Kp × γ × z
Biểu đồ tam giác.

**Đất dính (c>0):**
σa = Ka×γ×z - 2c×√Ka
Có thể < 0 (vùng kéo). Chiều sâu vùng kéo zc = 2c/(γ√Ka).

**Lực tổng:**
Ea = ∫σa dz = 0.5×Ka×γ×H² (cát, không tải)
Điểm đặt: H/3 từ đáy.

**Có tải q trên mặt:**
σa = Ka×(γ×z + q) - 2c×√Ka`, sourceRef: s6 },
  ],
  keyConcepts: [
    { id: 'kc6-1', chapterId: 'ch6', title: 'Ka, K₀, Kp', description: 'Ka = tan²(45-φ/2), Kp = tan²(45+φ/2). Ka < K₀ < Kp.', importance: 'critical', sourceRefs: [s6] },
  ],
  formulas: [
    { id: 'f6-1', chapterId: 'ch6', name: 'Hệ số Rankine chủ động', expression: 'Ka = tan²(45° - φ/2)', variables: [{ symbol: 'Ka', name: 'HS chủ động' }, { symbol: 'φ', name: 'Góc MS trong', unit: '°' }], meaning: 'HS áp lực nhỏ nhất', usageContext: 'Thiết kế tường chắn', sourceRefs: [s6] },
    { id: 'f6-2', chapterId: 'ch6', name: 'Áp lực chủ động (đất dính)', expression: 'σa = Ka×γ×z - 2c√Ka', variables: [{ symbol: 'σa', name: 'Áp lực chủ động', unit: 'kPa' }], meaning: 'Có thành phần dính giảm áp lực', usageContext: 'Đất dính', sourceRefs: [s6] },
  ],
  workedExamples: [], importantNotes: ['Ka<K₀<Kp luôn đúng.', 'Đất dính: vùng kéo zc = 2c/(γ√Ka) — không tính lực trong vùng này.', 'Coulomb: xét ma sát tường-đất (δ) → chính xác hơn Rankine.'],
  commonMistakes: ['Nhầm Ka và Kp', 'Quên thành phần c với đất dính', 'Nhầm điểm đặt tổng lực'],
  reviewQuestions: [{ id: 'rq6-1', chapterId: 'ch6', question: 'Phân biệt áp lực chủ động, bị động, tĩnh.', sourceRefs: [s6] }],
  quizzes: [
    { id: 'q6-1', chapterId: 'ch6', type: 'multiple-choice', difficulty: 'nhận biết', question: 'Áp lực chủ động xảy ra khi?', options: ['Tường ép vào đất', 'Tường dời xa đất', 'Tường đứng yên'], correctAnswer: 'Tường dời xa đất', sourceRefs: [s6] },
    { id: 'q6-2', chapterId: 'ch6', type: 'true-false', difficulty: 'thông hiểu', question: 'Ka < K₀ < Kp.', correctAnswer: 'Đúng', sourceRefs: [s6] },
  ],
  exercises: [], sourceRefs: [s6],
};

export const chapter7: Chapter = {
  id: 'ch7', chapterNumber: 7, title: 'Ổn định bờ dốc đất', shortTitle: 'Ổn định bờ dốc', detectedTopic: 'Fellenius, Bishop, mặt trượt tròn', sourceCoverageOverall: 0.70,
  overview: 'Phân tích ổn định mái dốc: mặt trượt phẳng, mặt trượt tròn (Fellenius, Bishop). Hệ số an toàn Fs. Biện pháp gia cố.',
  learningObjectives: ['Hiểu nguyên nhân mất ổn định', 'Nắm PP mặt trượt tròn', 'Tính Fs bằng Fellenius', 'Hiểu PP Bishop đơn giản'],
  detailedSummary: [
    { id: 'ch7-s1', title: '7.1. Phương pháp mặt trượt tròn — Fellenius',
      content: `**Nguyên lý:** Giả thiết mặt trượt dạng cung tròn, chia khối đất trượt thành n mảnh thẳng đứng.

**Hệ số an toàn Fellenius:**
Fs = Σ(cᵢlᵢ + Nᵢ×tanφᵢ) / Σ(Wᵢ×sinαᵢ)

Trong đó:
- Wᵢ: trọng lượng mảnh i
- αᵢ: góc nghiêng đáy mảnh i (dương khi đáy dốc về phía mặt trượt)
- Nᵢ = Wᵢ×cosαᵢ: lực pháp trên đáy mảnh
- lᵢ: chiều dài đáy mảnh = bᵢ/cosαᵢ
- cᵢ, φᵢ: thông số chống cắt lớp đất chứa đáy mảnh

**Phương pháp Bishop đơn giản:**
Xét cân bằng lực ngang giữa các mảnh. Chính xác hơn Fellenius 5-20%.

**Tìm mặt trượt nguy hiểm nhất:**
Thử nhiều cung tròn (tâm-bán kính khác nhau) → tìm Fs_min. Dùng lưới tâm trượt.

**Tiêu chuẩn ổn định:** Fs > [Fs]
- Công trình tạm: [Fs] = 1.1-1.2
- Công trình vĩnh cửu: [Fs] = 1.3-1.5
- Đập lớn: [Fs] = 1.5-2.0

**Biện pháp gia cố:** Giảm dốc (thoải mái), bệ phản áp, neo đất, cọc, rãnh thoát nước.`, sourceRef: s7 },
  ],
  keyConcepts: [
    { id: 'kc7-1', chapterId: 'ch7', title: 'Mặt trượt tròn Fellenius', description: 'Fs = ΣM_chống/ΣM_trượt. Chia mảnh, tính mô men. Tìm Fs_min bằng thử nhiều cung.', importance: 'critical', sourceRefs: [s7] },
  ],
  formulas: [
    { id: 'f7-1', chapterId: 'ch7', name: 'Fellenius', expression: 'Fs = Σ(cᵢlᵢ + Nᵢtanφᵢ) / Σ(Wᵢsinαᵢ)', variables: [{ symbol: 'Fs', name: 'Hệ số an toàn' }, { symbol: 'Wᵢ', name: 'TL mảnh', unit: 'kN' }, { symbol: 'αᵢ', name: 'Góc đáy', unit: '°' }, { symbol: 'Nᵢ', name: 'Lực pháp = Wᵢcosαᵢ', unit: 'kN' }], meaning: 'Tỷ số mô men chống/gây trượt', usageContext: 'Kiểm tra ổn định mái', sourceRefs: [s7] },
  ],
  workedExamples: [], importantNotes: ['Fs > 1: ổn định. Fs < 1: trượt. Fs = 1: cân bằng giới hạn.', 'Fellenius bảo thủ hơn Bishop 5-20%.', 'Nước ngầm giảm ổn định: tăng W, giảm sức chống cắt, tạo áp lực thấm.', 'Phải tìm Fs_min — không chỉ kiểm tra 1 cung trượt.'],
  commonMistakes: ['Chọn sai tâm trượt (chỉ kiểm tra 1 cung)', 'Sai dấu αᵢ khi mảnh phía đối diện', 'Quên áp lực nước lỗ rỗng'],
  reviewQuestions: [{ id: 'rq7-1', chapterId: 'ch7', question: 'Trình bày PP Fellenius.', sourceRefs: [s7] }],
  quizzes: [
    { id: 'q7-1', chapterId: 'ch7', type: 'multiple-choice', difficulty: 'nhận biết', question: 'Mái dốc ổn định khi?', options: ['Fs<1', 'Fs=1', 'Fs>1'], correctAnswer: 'Fs>1', sourceRefs: [s7] },
    { id: 'q7-2', chapterId: 'ch7', type: 'true-false', difficulty: 'thông hiểu', question: 'Nước ngầm giảm ổn định mái dốc.', correctAnswer: 'Đúng', sourceRefs: [s7] },
  ],
  exercises: [], sourceRefs: [s7],
};
