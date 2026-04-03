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
    { id: 'f5-1', chapterId: 'ch5', name: 'Terzaghi (băng)', expression: 'pgh = c×Nc + γ×Df×Nq + 0.5γ×B×Nγ', latex: 'p_{gh} = c \\cdot N_c + \\gamma \\cdot D_f \\cdot N_q + 0.5 \\gamma \\cdot B \\cdot N_\\gamma', variables: [{ symbol: 'pgh', name: 'SCT giới hạn', unit: 'kPa' }, { symbol: 'Nc,Nq,Nγ', name: 'HS SCT (theo φ)' }, { symbol: 'B', name: 'Bề rộng', unit: 'm' }, { symbol: 'Df', name: 'Sâu chôn móng', unit: 'm' }], meaning: '3 thành phần: dính + sâu + rộng', usageContext: 'Thiết kế nền móng nông', sourceRefs: [s5] },
    { id: 'f5-2', chapterId: 'ch5', name: 'Áp lực tiêu chuẩn (TCVN)', expression: 'Rtc = m₁m₂/Ktc × (A×b×γ + B×h×γ\' + D×c)', latex: 'R^{tc} = \\frac{m_1 m_2}{k^{tc}} (A \\cdot b \\cdot \\gamma + B \\cdot h \\cdot \\gamma^\\prime + D \\cdot c)', variables: [{ symbol: 'Rtc', name: 'Áp lực tiêu chuẩn', unit: 'kPa' }, { symbol: 'm₁,m₂', name: 'HS điều kiện LV' }, { symbol: 'b', name: 'Bề rộng móng', unit: 'm' }, { symbol: 'h', name: 'Chiều sâu độn', unit: 'm' }], meaning: 'Tính theo phương pháp trạng thái giới hạn', usageContext: 'TCVN 9362:2012', sourceRefs: [s5] },
  ],
  workedExamples: [
    { id: 'ex5-1', chapterId: 'ch5', title: 'Sức chịu tải theo Terzaghi', problem: 'Móng băng rộng B=1.5m, chôn sâu Df=1m. Đất nền có c=20kPa, φ=20°, γ=18kN/m³. Tra bảng có Nc=17.7, Nq=7.4, Nγ=5.0. Tính sức chịu tải giới hạn pgh.', solution: 'pgh = c×Nc + γ×Df×Nq + 0.5×γ×B×Nγ\n= (20 × 17.7) + (18 × 1 × 7.4) + (0.5 × 18 × 1.5 × 5)\n= 354 + 133.2 + 67.5 = 554.7 kPa.', steps: ['Tra hệ số an toàn theo φ', 'Thế vào công thức pgh'], sourceRefs: [s5] },
  ], importantNotes: ['B: bề rộng (cạnh ngắn), không phải chiều dài.', 'Phá hoại cục bộ: dùng c\'=2c/3, φ\'=arctan(2tanφ/3).', 'Fs thường 2-3 cho công trình dân dụng.'],
  commonMistakes: ['Nhầm B là chiều dài', 'Dùng sai NC cho phá hoại cục bộ', 'Quên Fs'],
  reviewQuestions: [{ id: 'rq5-1', chapterId: 'ch5', question: 'Trình bày CT Terzaghi và ý nghĩa.', sourceRefs: [s5] }],
  quizzes: [
    { id: 'q5-1', chapterId: 'ch5', type: 'multiple-choice', difficulty: 'nhận biết', question: 'Mấy dạng phá hoại nền?', options: ['2', '3', '4'], correctAnswer: '3', sourceRefs: [s5] },
    { id: 'q5-2', chapterId: 'ch5', type: 'true-false', difficulty: 'thông hiểu', question: 'Tăng Df tăng SCT.', correctAnswer: 'Đúng', explanation: 'Thành phần γDfNq tăng.', sourceRefs: [s5] },
    { id: 'q5-3', chapterId: 'ch5', type: 'multiple-choice', difficulty: 'vận dụng', question: '[p] liên hệ pgh qua?', options: ['[p]=pgh', '[p]=pgh×Fs', '[p]=pgh/Fs'], correctAnswer: '[p]=pgh/Fs', sourceRefs: [s5] },
    { id: 'q5-4', chapterId: 'ch5', type: 'multiple-choice', difficulty: 'thông hiểu', question: 'Theo Terzaghi, móng hình tròn so với móng băng thì độ bám dính (thành phần c) chịu tác động bởi hệ số nào?', options: ['1.0', '1.2', '1.3'], correctAnswer: '1.3', explanation: 'Với móng tròn, công thức là pgh = 1.3cNc + ...', sourceRefs: [s5] },
    { id: 'q5-5', chapterId: 'ch5', type: 'true-false', difficulty: 'nhận biết', question: 'Biểu đồ p-S của phá hoại cắt xuyên có đỉnh rõ ràng.', correctAnswer: 'Sai', explanation: 'Chỉ cắt tổng quát mới có đỉnh rõ. Cắt xuyên đường cong đi lên liên tục.', sourceRefs: [s5] },
    { id: 'q5-6', chapterId: 'ch5', type: 'multiple-choice', difficulty: 'vận dụng', question: 'Đất cát rời có c = 0. SCT giới hạn phụ thuộc vào các thành phần nào?', options: ['Chỉ γBNγ', 'cNc và γDfNq', 'γDfNq và 0.5γBNγ'], correctAnswer: 'γDfNq và 0.5γBNγ', explanation: 'Vì c = 0 nên thành phần cNc = 0.', sourceRefs: [s5] },
    { id: 'q5-7', chapterId: 'ch5', type: 'multiple-choice', difficulty: 'nhận biết', question: 'Trong công thức Terzaghi, Nq phụ thuộc vào?', options: ['c', 'φ', 'γ', 'Df'], correctAnswer: 'φ', explanation: 'Nc, Nq, Nγ chỉ phụ thuộc vào góc ma sát trong φ.', sourceRefs: [s5] },
    { id: 'q5-8', chapterId: 'ch5', type: 'true-false', difficulty: 'thông hiểu', question: 'Hệ số an toàn Fs trong tính SCT thường từ 2 đến 3.', correctAnswer: 'Đúng', sourceRefs: [s5] },
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
    { id: 'f6-1', chapterId: 'ch6', name: 'Hệ số Rankine chủ động', expression: 'Ka = tan²(45° - φ/2)', latex: 'K_a = \\tan^2\\left(45^\\circ - \\frac{\\varphi}{2}\\right)', variables: [{ symbol: 'Ka', name: 'HS chủ động' }, { symbol: 'φ', name: 'Góc MS trong', unit: '°' }], meaning: 'HS áp lực nhỏ nhất', usageContext: 'Thiết kế tường chắn', sourceRefs: [s6] },
    { id: 'f6-2', chapterId: 'ch6', name: 'Áp lực chủ động (đất dính)', expression: 'σa = Ka×γ×z - 2c√Ka', latex: '\\sigma_a = K_a \\cdot \\gamma \\cdot z - 2c\\sqrt{K_a}', variables: [{ symbol: 'σa', name: 'Áp lực chủ động', unit: 'kPa' }], meaning: 'Có thành phần dính giảm áp lực', usageContext: 'Đất dính', sourceRefs: [s6] },
    { id: 'f6-3', chapterId: 'ch6', name: 'Hệ số Rankine bị động', expression: 'Kp = tan²(45° + φ/2)', latex: 'K_p = \\tan^2\\left(45^\\circ + \\frac{\\varphi}{2}\\right)', variables: [{ symbol: 'Kp', name: 'HS bị động' }], meaning: 'HS áp lực lớn nhất', usageContext: 'Lực kháng ở chân tường chắn', sourceRefs: [s6] },
  ],
  workedExamples: [
    { id: 'ex6-1', chapterId: 'ch6', title: 'Tính áp lực chủ động', problem: 'Tường cao 4m giữ đất cát c=0, φ=30°, γ=18. Tính tổng lực chủ động Ea.', solution: 'Ka = tan²(45-30/2) = 1/3.\nÁp lực tại đáy: σa = (1/3) × 18 × 4 = 24 kPa.\nTổng lực: Ea = 1/2 × σa × H = 0.5 × 24 × 4 = 48 kN/m.', steps: ['Tính Ka', 'Tính σa mặt đất (0) và đáy', 'Tính diện tích biểu đồ'], sourceRefs: [s6] },
  ], importantNotes: ['Ka<K₀<Kp luôn đúng.', 'Đất dính: vùng kéo zc = 2c/(γ√Ka) — không tính lực trong vùng này.', 'Coulomb: xét ma sát tường-đất (δ) → chính xác hơn Rankine.'],
  commonMistakes: ['Nhầm Ka và Kp', 'Quên thành phần c với đất dính', 'Nhầm điểm đặt tổng lực'],
  reviewQuestions: [{ id: 'rq6-1', chapterId: 'ch6', question: 'Phân biệt áp lực chủ động, bị động, tĩnh.', sourceRefs: [s6] }],
  quizzes: [
    { id: 'q6-1', chapterId: 'ch6', type: 'multiple-choice', difficulty: 'nhận biết', question: 'Áp lực chủ động xảy ra khi?', options: ['Tường ép vào đất', 'Tường dời xa đất', 'Tường đứng yên'], correctAnswer: 'Tường dời xa đất', sourceRefs: [s6] },
    { id: 'q6-2', chapterId: 'ch6', type: 'true-false', difficulty: 'thông hiểu', question: 'Ka < K₀ < Kp.', correctAnswer: 'Đúng', sourceRefs: [s6] },
    { id: 'q6-3', chapterId: 'ch6', type: 'multiple-choice', difficulty: 'vận dụng', question: 'φ = 30°. Hệ số Ka bằng bao nhiêu?', options: ['0.33', '0.5', '3.0'], correctAnswer: '0.33', explanation: 'Ka = tan²(45-15) = tan²(30) = 1/3 ≈ 0.333', sourceRefs: [s6] },
    { id: 'q6-4', chapterId: 'ch6', type: 'true-false', difficulty: 'nhận biết', question: 'Hệ số áp lực đất tĩnh K₀ được tính bằng công thức Jaky: K₀ = 1 - sinφ', correctAnswer: 'Đúng', sourceRefs: [s6] },
    { id: 'q6-5', chapterId: 'ch6', type: 'multiple-choice', difficulty: 'thông hiểu', question: 'Tại sao đất dính lại có vùng kéo khi tính áp lực chủ động?', options: ['Do ma sát lớn', 'Do lực dính giữ đất không đổ', 'Do trọng lượng đất nhỏ'], correctAnswer: 'Do lực dính giữ đất không đổ', explanation: 'Lực dính c làm biểu đồ σa bị trừ đi 2c√Ka, nên ở mặt đất σa < 0 (vùng kéo).', sourceRefs: [s6] },
    { id: 'q6-6', chapterId: 'ch6', type: 'multiple-choice', difficulty: 'thông hiểu', question: 'Phương pháp Coulomb khác Rankine ở điểm nào?', options: ['Bỏ qua lực dính', 'Xét ma sát giữa tường và đất', 'Cho rằng mặt trượt là mặt cong'], correctAnswer: 'Xét ma sát giữa tường và đất', explanation: 'Coulomb xét góc ma sát tường chắn (δ), trong khi Rankine coi tường trơn nhẵn (δ=0).', sourceRefs: [s6] },
    { id: 'q6-7', chapterId: 'ch6', type: 'vận dụng', difficulty: 'vận dụng', question: 'Tính chiều sâu vùng kéo zc khi c=10kPa, γ=18, φ=30°', options: ['1.92m', '0.96m', '2.5m'], correctAnswer: '1.92m', explanation: 'Ka=1/3. zc = 2c/(γ√Ka) = 2×10 / (18×√(1/3)) = 20 / 10.39 ≈ 1.92m', sourceRefs: [s6] },
    { id: 'q6-8', chapterId: 'ch6', type: 'true-false', difficulty: 'thông hiểu', question: 'Biểu đồ áp lực bị động của đất rời có dạng tam giác tương tự áp lực chủ động.', correctAnswer: 'Đúng', explanation: 'Chỉ khác hệ số (Kp thay vì Ka) và phân bố tăng dần tuyến tính theo chiều sâu.', sourceRefs: [s6] },
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
    { id: 'f7-1', chapterId: 'ch7', name: 'Fellenius', expression: 'Fs = Σ(cᵢlᵢ + Nᵢtanφᵢ) / Σ(Wᵢsinαᵢ)', latex: 'F_s = \\frac{\\sum(c_i l_i + N_i \\tan\\varphi_i)}{\\sum W_i \\sin\\alpha_i}', variables: [{ symbol: 'Fs', name: 'Hệ số an toàn' }, { symbol: 'Wᵢ', name: 'TL mảnh', unit: 'kN' }, { symbol: 'αᵢ', name: 'Góc đáy', unit: '°' }, { symbol: 'Nᵢ', name: 'Lực pháp = Wᵢcosαᵢ', unit: 'kN' }], meaning: 'Tỷ số mô men chống/gây trượt', usageContext: 'Kiểm tra ổn định mái', sourceRefs: [s7] },
    { id: 'f7-2', chapterId: 'ch7', name: 'Bishop đơn giản', expression: 'Fs = Σ[cᵢbᵢ + (Wᵢ - uᵢbᵢ)tanφᵢ] / [Σ(Wᵢsinαᵢ)] × [1/Mα]', latex: 'F_s = \\frac{\\sum \\frac{c_i b_i + (W_i - u_i b_i)\\tan\\varphi_i}{M_\\alpha}}{\\sum W_i \\sin\\alpha_i}', variables: [{ symbol: 'uᵢ', name: 'Áp lực nước', unit: 'kPa' }, { symbol: 'Mα', name: 'cosα(1+tanαtanφ/Fs)' }], meaning: 'Tính ổn định chính xác hơn', usageContext: 'Mặt trượt cung tròn', sourceRefs: [s7] },
  ],
  workedExamples: [
    { id: 'ex7-1', chapterId: 'ch7', title: 'Xác định thành phần mảnh trượt', problem: 'Mảnh số 3 có trọng lượng W=150kN, bề rộng b=2m, góc nghiêng mặt trượt α=30°. Đất nền c=15kPa, φ=20°. Tra u=0. Tính mô men chống trượt của mảnh này.', solution: 'Chiều dài mặt đáy mảnh: l = b/cosα = 2 / cos(30) = 2.31m.\nThành phần lực pháp tuyến: N = W×cosα = 150 × cos(30) = 130 kN.\nLực chống cắt trên đáy: Tf = c*l + N*tanφ = 15*2.31 + 130*tan(20) = 34.6 + 47.3 = 81.9 kN.\nMô men chống trượt bằng lực nhân bán kính mặt trượt R: M = (81.9)*R', steps: ['Tính l và N', 'Tính sức chống cắt'], sourceRefs: [s7] },
  ], importantNotes: ['Fs > 1: ổn định. Fs < 1: trượt. Fs = 1: cân bằng giới hạn.', 'Fellenius bảo thủ hơn Bishop 5-20%.', 'Nước ngầm giảm ổn định: tăng W, giảm sức chống cắt, tạo áp lực thấm.', 'Phải tìm Fs_min — không chỉ kiểm tra 1 cung trượt.'],
  commonMistakes: ['Chọn sai tâm trượt (chỉ kiểm tra 1 cung)', 'Sai dấu αᵢ khi mảnh phía đối diện', 'Quên áp lực nước lỗ rỗng'],
  reviewQuestions: [{ id: 'rq7-1', chapterId: 'ch7', question: 'Trình bày PP Fellenius.', sourceRefs: [s7] }],
  quizzes: [
    { id: 'q7-1', chapterId: 'ch7', type: 'multiple-choice', difficulty: 'nhận biết', question: 'Mái dốc ổn định khi?', options: ['Fs<1', 'Fs=1', 'Fs>1'], correctAnswer: 'Fs>1', sourceRefs: [s7] },
    { id: 'q7-2', chapterId: 'ch7', type: 'true-false', difficulty: 'thông hiểu', question: 'Nước ngầm giảm ổn định mái dốc.', correctAnswer: 'Đúng', sourceRefs: [s7] },
    { id: 'q7-3', chapterId: 'ch7', type: 'multiple-choice', difficulty: 'thông hiểu', question: 'Tính ổn định theo Fellenius so với Bishop đơn giản thường cho kết quả?', options: ['Lớn hơn', 'Bảo thủ hơn (nhỏ hơn)', 'Bằng nhau'], correctAnswer: 'Bảo thủ hơn (nhỏ hơn)', explanation: 'Fellenius thường an toàn và bảo thủ hơn Bishop từ 5-20%.', sourceRefs: [s7] },
    { id: 'q7-4', chapterId: 'ch7', type: 'true-false', difficulty: 'nhận biết', question: 'Công trình vĩnh cửu có yêu cầu hệ số an toàn Fs nhỏ hơn công trình tạm.', correctAnswer: 'Sai', explanation: 'Công trình vĩnh cửu (1.3-1.5) yêu cầu Fs cao hơn tạm thời (1.1-1.2).', sourceRefs: [s7] },
    { id: 'q7-5', chapterId: 'ch7', type: 'multiple-choice', difficulty: 'thông hiểu', question: 'Tại sao Fellenius lại chia khối trượt thành các mảnh nhỏ?', options: ['Để tích phân dễ dàng', 'Do thuộc tính nền đất dưới dọc cung trượt là thay đổi gãy khúc', 'Để tiện việc dùng máy tính'], correctAnswer: 'Do thuộc tính nền đất dưới dọc cung trượt là thay đổi gãy khúc', explanation: 'Chia mảnh đứng giúp biến mặt trượt cong thành các phân tố nhỏ tuyến tính, xử lý nền phi đồng nhất dễ hơn.', sourceRefs: [s7] },
    { id: 'q7-6', chapterId: 'ch7', type: 'true-false', difficulty: 'vận dụng', question: 'Áp lực nước lỗ rỗng tác động xấu là do nó làm tăng Momen chống trượt.', correctAnswer: 'Sai', explanation: 'Nó làm giảm sức chống cắt do làm giảm ứng suất hữu hiệu (Nᵢ - Uᵢ), từ đó giảm mô men chống trượt.', sourceRefs: [s7] },
    { id: 'q7-7', chapterId: 'ch7', type: 'multiple-choice', difficulty: 'vận dụng', question: 'Biện pháp nào KHÔNG làm tăng hệ số an toàn mái dốc?', options: ['Bạt thoải mái dốc', 'Bố trí rãnh thoát nước', 'Chất tải trên đỉnh sườn'], correctAnswer: 'Chất tải trên đỉnh sườn', explanation: 'Chất tải ở đỉnh sẽ làm tăng mô men trượt, gây mất ổn định.', sourceRefs: [s7] },
    { id: 'q7-8', chapterId: 'ch7', type: 'nhận biết', difficulty: 'nhận biết', question: 'Chữ số Nᵢ trong công thức Fellenius được tính bằng?', options: ['Wᵢ × sinαᵢ', 'Wᵢ × cosαᵢ', 'Wᵢ × tanαᵢ'], correctAnswer: 'Wᵢ × cosαᵢ', explanation: 'Nᵢ là thành phần lực pháp tuyến trên mặt trượt = Wᵢcosαᵢ.', sourceRefs: [s7] },
  ],
  exercises: [], sourceRefs: [s7],
};
