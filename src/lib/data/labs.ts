import { Lab } from '@/types';
import { getVideosByLab } from './videos';

const labSrc = { fileId: 'lab-guide', fileName: 'Hướng dẫn thí nghiệm Cơ học đất gửi SV.pdf', fileType: 'lab-guide' as const, confidence: 'high' as const };

export const allLabs: Lab[] = [
  {
    id: 'lab1', labNumber: 1,
    title: 'Xác định độ ẩm tự nhiên của đất',
    objective: 'Xác định độ ẩm tự nhiên W (%) của mẫu đất nguyên dạng bằng phương pháp sấy khô.',
    principle: 'Cân mẫu đất trước và sau khi sấy khô ở 105-110°C đến khối lượng không đổi. Độ ẩm là tỷ số giữa khối lượng nước và khối lượng hạt khô.',
    apparatus: ['Tủ sấy 105-110°C', 'Cân kỹ thuật (0.01g)', 'Hộp nhôm có nắp', 'Bình hút ẩm', 'Dao gọt mẫu'],
    steps: [
      { stepNumber: 1, description: 'Cân hộp nhôm rỗng có nắp, ghi khối lượng m₀ (g).' },
      { stepNumber: 2, description: 'Lấy mẫu đất tự nhiên, cho vào hộp, đậy nắp. Cân được m₁ (g).' },
      { stepNumber: 3, description: 'Mở nắp hộp, đặt vào tủ sấy 105-110°C trong 8 giờ.' },
      { stepNumber: 4, description: 'Lấy hộp ra, đậy nắp, để nguội trong bình hút ẩm 30 phút.' },
      { stepNumber: 5, description: 'Cân lại hộp + đất khô, được m₂ (g).' },
      { stepNumber: 6, description: 'Tính: W = (m₁ - m₂)/(m₂ - m₀) × 100%.' },
    ],
    formulas: [
      { id: 'fl1-1', chapterId: 'ch1', name: 'Độ ẩm', expression: 'W = (m₁ - m₂)/(m₂ - m₀) × 100%', latex: 'W = \\frac{m_1 - m_2}{m_2 - m_0} \\times 100\\%', variables: [{ symbol: 'W', name: 'Độ ẩm', unit: '%' }, { symbol: 'm₀', name: 'KL hộp rỗng', unit: 'g' }, { symbol: 'm₁', name: 'KL hộp + đất ẩm', unit: 'g' }, { symbol: 'm₂', name: 'KL hộp + đất khô', unit: 'g' }], meaning: 'Tỷ lệ nước trên hạt khô.', usageContext: 'TN độ ẩm', sourceRefs: [labSrc] },
    ],
    inputFields: [
      { id: 'lab1-m0-1', label: 'KL hộp (m₀) - Mẫu 1', unit: 'g', type: 'number', required: true, sampleIndex: 0 },
      { id: 'lab1-m1-1', label: 'KL hộp+đất ẩm (m₁) - Mẫu 1', unit: 'g', type: 'number', required: true, sampleIndex: 0 },
      { id: 'lab1-m2-1', label: 'KL hộp+đất khô (m₂) - Mẫu 1', unit: 'g', type: 'number', required: true, sampleIndex: 0 },
      { id: 'lab1-m0-2', label: 'KL hộp (m₀) - Mẫu 2', unit: 'g', type: 'number', required: true, sampleIndex: 1 },
      { id: 'lab1-m1-2', label: 'KL hộp+đất ẩm (m₁) - Mẫu 2', unit: 'g', type: 'number', required: true, sampleIndex: 1 },
      { id: 'lab1-m2-2', label: 'KL hộp+đất khô (m₂) - Mẫu 2', unit: 'g', type: 'number', required: true, sampleIndex: 1 },
    ],
    calculatedFields: [
      { id: 'lab1-mn-1', label: 'KL nước (mẫu 1)', unit: 'g', formula: 'm1_1 - m2_1', dependsOn: ['lab1-m1-1', 'lab1-m2-1'] },
      { id: 'lab1-mh-1', label: 'KL hạt khô (mẫu 1)', unit: 'g', formula: 'm2_1 - m0_1', dependsOn: ['lab1-m2-1', 'lab1-m0-1'] },
      { id: 'lab1-W-1', label: 'W (mẫu 1)', unit: '%', formula: '(m1-m2)/(m2-m0)*100', dependsOn: ['lab1-m0-1', 'lab1-m1-1', 'lab1-m2-1'] },
      { id: 'lab1-W-2', label: 'W (mẫu 2)', unit: '%', formula: '(m1-m2)/(m2-m0)*100', dependsOn: ['lab1-m0-2', 'lab1-m1-2', 'lab1-m2-2'] },
    ],
    resultTableSchema: [
      { key: 'sample', header: 'Mẫu', isInput: false },
      { key: 'm0', header: 'm₀ (g)', isInput: true },
      { key: 'm1', header: 'm₁ (g)', isInput: true },
      { key: 'm2', header: 'm₂ (g)', isInput: true },
      { key: 'mn', header: 'KL nước (g)', isInput: false },
      { key: 'mh', header: 'KL khô (g)', isInput: false },
      { key: 'W', header: 'W (%)', unit: '%', isInput: false },
    ],
    reportTemplateMapping: { templateSection: 'Bài 1', fieldMappings: { 'm0': 'Cột 2', 'm1': 'Cột 3', 'm2': 'Cột 4', 'W': 'Cột 7' } },
    youtubeVideos: getVideosByLab('lab1'),
    questions: [
      { id: 'lq1-1', question: 'Tại sao sấy ở 105-110°C?', suggestedAnswer: 'Nước tự do bay hơi hết, không phá hủy khoáng vật sét.', sourceRefs: [labSrc] },
      { id: 'lq1-2', question: 'Tại sao để nguội trong bình hút ẩm?', suggestedAnswer: 'Tránh hấp thụ ẩm từ không khí.', sourceRefs: [labSrc] },
    ],
    sourceRefs: [labSrc],
  },
  {
    id: 'lab2', labNumber: 2,
    title: 'Xác định giới hạn chảy và giới hạn dẻo',
    objective: 'Xác định WL (Casagrande) và WP (ve que φ3mm).',
    principle: 'WL: 25 nhát gõ Casagrande. WP: que φ3mm nứt.',
    apparatus: ['Casagrande', 'Dao xẻ rãnh', 'Kính phẳng', 'Cân', 'Tủ sấy'],
    steps: [
      { stepNumber: 1, description: 'Nhào đất, đặt vào chén, xẻ rãnh, gõ đều.' },
      { stepNumber: 2, description: 'Ghi N khi rãnh khép 13mm. Lấy mẫu sấy tính W.' },
      { stepNumber: 3, description: 'Lặp 3-4 lần, vẽ W-lgN, nội suy WL tại N=25.' },
      { stepNumber: 4, description: 'Ve que φ3mm, sấy tính WP.' },
    ],
    formulas: [
      { id: 'fl2-1', chapterId: 'ch1', name: 'Chỉ số dẻo', expression: 'IP = WL - WP', variables: [{ symbol: 'IP', name: 'Chỉ số dẻo', unit: '%' }, { symbol: 'WL', name: 'Giới hạn chảy', unit: '%' }, { symbol: 'WP', name: 'Giới hạn dẻo', unit: '%' }], meaning: 'Phạm vi trạng thái dẻo.', usageContext: 'Phân loại đất.', sourceRefs: [labSrc] },
    ],
    inputFields: [
      { id: 'lab2-wl', label: 'WL', unit: '%', type: 'number', required: true },
      { id: 'lab2-wp', label: 'WP', unit: '%', type: 'number', required: true },
    ],
    calculatedFields: [{ id: 'lab2-ip', label: 'IP', unit: '%', formula: 'WL-WP', dependsOn: ['lab2-wl', 'lab2-wp'] }],
    resultTableSchema: [
      { key: 'WL', header: 'WL (%)', isInput: true },
      { key: 'WP', header: 'WP (%)', isInput: true },
      { key: 'IP', header: 'IP (%)', isInput: false },
    ],
    reportTemplateMapping: { templateSection: 'Bài 2+3', fieldMappings: {} },
    youtubeVideos: getVideosByLab('lab2'),
    questions: [{ id: 'lq2-1', question: 'Tại sao N chuẩn = 25?', suggestedAnswer: 'Cu ≈ 2.5 kPa tại N=25.', sourceRefs: [labSrc] }],
    sourceRefs: [labSrc],
  },
  {
    id: 'lab4', labNumber: 4,
    title: 'Xác định tỷ trọng của đất',
    objective: 'Xác định Δ bằng picnometer.',
    principle: 'So sánh KL nước bị đất chiếm chỗ.',
    apparatus: ['Bình tỷ trọng', 'Cân', 'Bếp cách thủy', 'Tủ sấy', 'Nước cất'],
    steps: [
      { stepNumber: 1, description: 'Cân bình + nước cất: m₁.' },
      { stepNumber: 2, description: 'Lấy đất khô 10-15g: mh.' },
      { stepNumber: 3, description: 'Cho đất vào bình, đun sôi 30 phút đuổi khí.' },
      { stepNumber: 4, description: 'Nguội, thêm nước đầy, cân: m₂.' },
      { stepNumber: 5, description: 'Δ = mh/(m₁ + mh - m₂).' },
    ],
    formulas: [
      { id: 'fl4-1', chapterId: 'ch1', name: 'Tỷ trọng hạt', expression: 'Δ = mh/(m₁ + mh - m₂)', variables: [{ symbol: 'Δ', name: 'Tỷ trọng' }, { symbol: 'mh', name: 'KL đất khô', unit: 'g' }, { symbol: 'm₁', name: 'KL bình+nước', unit: 'g' }, { symbol: 'm₂', name: 'KL bình+nước+đất', unit: 'g' }], meaning: 'Tỷ số KL riêng hạt/nước.', usageContext: 'TN bình tỷ trọng.', sourceRefs: [labSrc] },
    ],
    inputFields: [
      { id: 'lab4-m1-1', label: 'KL bình+nước (m₁)', unit: 'g', type: 'number', required: true },
      { id: 'lab4-mh-1', label: 'KL đất khô (mh)', unit: 'g', type: 'number', required: true },
      { id: 'lab4-m2-1', label: 'KL bình+nước+đất (m₂)', unit: 'g', type: 'number', required: true },
    ],
    calculatedFields: [{ id: 'lab4-delta', label: 'Δ', unit: '', formula: 'mh/(m1+mh-m2)', dependsOn: ['lab4-m1-1', 'lab4-mh-1', 'lab4-m2-1'] }],
    resultTableSchema: [
      { key: 'sample', header: 'Mẫu', isInput: false },
      { key: 'm1', header: 'm₁ (g)', isInput: true },
      { key: 'mh', header: 'mh (g)', isInput: true },
      { key: 'm2', header: 'm₂ (g)', isInput: true },
      { key: 'delta', header: 'Δ', isInput: false },
    ],
    reportTemplateMapping: { templateSection: 'Bài 4', fieldMappings: {} },
    youtubeVideos: getVideosByLab('lab4'),
    questions: [{ id: 'lq4-1', question: 'Tại sao đun sôi?', suggestedAnswer: 'Đuổi bọt khí bám hạt đất gây sai số.', sourceRefs: [labSrc] }],
    sourceRefs: [labSrc],
  },
  {
    id: 'lab5', labNumber: 5,
    title: 'Xác định khối lượng thể tích của đất',
    objective: 'Xác định ρ và ρk bằng dao vòng.',
    principle: 'Dao vòng đã biết V, cắt mẫu nguyên dạng, cân KL.',
    apparatus: ['Dao vòng', 'Cân', 'Kích đẩy', 'Dao gạt', 'Vaselin'],
    steps: [
      { stepNumber: 1, description: 'Cân dao vòng: m₀. Ghi V.' },
      { stepNumber: 2, description: 'Bôi vaselin, ấn vào mẫu đất.' },
      { stepNumber: 3, description: 'Gạt phẳng, cân: m₁.' },
      { stepNumber: 4, description: 'ρ = (m₁-m₀)/V. ρk = ρ/(1+W).' },
    ],
    formulas: [
      { id: 'fl5-1', chapterId: 'ch1', name: 'KL thể tích', expression: 'ρ = (m₁ - m₀)/V', variables: [{ symbol: 'ρ', name: 'KL thể tích', unit: 'g/cm³' }, { symbol: 'm₁', name: 'KL dao+đất', unit: 'g' }, { symbol: 'm₀', name: 'KL dao rỗng', unit: 'g' }, { symbol: 'V', name: 'Thể tích dao', unit: 'cm³' }], meaning: 'KL đất/đơn vị thể tích.', usageContext: 'Tính γ = ρ×g.', sourceRefs: [labSrc] },
    ],
    inputFields: [
      { id: 'lab5-m0', label: 'KL dao (m₀)', unit: 'g', type: 'number', required: true },
      { id: 'lab5-V', label: 'Thể tích V', unit: 'cm³', type: 'number', required: true },
      { id: 'lab5-m1', label: 'KL dao+đất (m₁)', unit: 'g', type: 'number', required: true },
      { id: 'lab5-W', label: 'Độ ẩm W', unit: '%', type: 'number', required: true },
    ],
    calculatedFields: [
      { id: 'lab5-rho', label: 'ρ', unit: 'g/cm³', formula: '(m1-m0)/V', dependsOn: ['lab5-m0', 'lab5-V', 'lab5-m1'] },
      { id: 'lab5-gamma', label: 'γ', unit: 'kN/m³', formula: 'rho*10', dependsOn: ['lab5-rho'] },
    ],
    resultTableSchema: [
      { key: 'm0', header: 'm₀ (g)', isInput: true },
      { key: 'V', header: 'V (cm³)', isInput: true },
      { key: 'm1', header: 'm₁ (g)', isInput: true },
      { key: 'rho', header: 'ρ (g/cm³)', isInput: false },
      { key: 'gamma', header: 'γ (kN/m³)', isInput: false },
    ],
    reportTemplateMapping: { templateSection: 'Bài 5', fieldMappings: {} },
    youtubeVideos: getVideosByLab('lab5'),
    questions: [],
    sourceRefs: [labSrc],
  },
  {
    id: 'lab6', labNumber: 6,
    title: 'Xác định sức chống cắt của đất',
    objective: 'Xác định c và φ bằng cắt trực tiếp.',
    principle: 'Gia tải σ, tăng lực cắt đến phá hoại → 3 cặp (σ,τ) → c, φ.',
    apparatus: ['Máy cắt trực tiếp', 'Hộp cắt', 'Đồng hồ đo', 'Cân', 'Dao gọt'],
    steps: [
      { stepNumber: 1, description: 'Đặt mẫu vào hộp cắt.' },
      { stepNumber: 2, description: 'Gia tải σ₁, tăng lực cắt đến phá hoại → τ₁.' },
      { stepNumber: 3, description: 'Lặp với σ₂, σ₃ (100, 200, 300 kPa).' },
      { stepNumber: 4, description: 'Vẽ τ-σ → tìm c, φ.' },
    ],
    formulas: [
      { id: 'fl6-1', chapterId: 'ch2', name: 'Mohr-Coulomb', expression: 'τ = σ×tanφ + c', variables: [{ symbol: 'τ', name: 'Sức chống cắt', unit: 'kPa' }, { symbol: 'σ', name: 'Ứng suất pháp', unit: 'kPa' }, { symbol: 'c', name: 'Lực dính', unit: 'kPa' }, { symbol: 'φ', name: 'Góc ma sát', unit: '°' }], meaning: 'Tiêu chuẩn phá hoại cắt.', usageContext: 'Cắt trực tiếp, nền móng.', sourceRefs: [labSrc] },
    ],
    inputFields: [
      { id: 'lab6-s1', label: 'σ₁', unit: 'kPa', type: 'number', required: true, sampleIndex: 0 },
      { id: 'lab6-t1', label: 'τ₁', unit: 'kPa', type: 'number', required: true, sampleIndex: 0 },
      { id: 'lab6-s2', label: 'σ₂', unit: 'kPa', type: 'number', required: true, sampleIndex: 1 },
      { id: 'lab6-t2', label: 'τ₂', unit: 'kPa', type: 'number', required: true, sampleIndex: 1 },
      { id: 'lab6-s3', label: 'σ₃', unit: 'kPa', type: 'number', required: true, sampleIndex: 2 },
      { id: 'lab6-t3', label: 'τ₃', unit: 'kPa', type: 'number', required: true, sampleIndex: 2 },
    ],
    calculatedFields: [],
    resultTableSchema: [
      { key: 'sigma', header: 'σ (kPa)', isInput: true },
      { key: 'tau', header: 'τ (kPa)', isInput: true },
    ],
    reportTemplateMapping: { templateSection: 'Bài 6', fieldMappings: {} },
    youtubeVideos: getVideosByLab('lab6'),
    questions: [{ id: 'lq6-1', question: 'Tại sao cần 3 mẫu?', suggestedAnswer: '3 điểm (σ,τ) xác định đường Coulomb.', sourceRefs: [labSrc] }],
    sourceRefs: [labSrc],
  },
  {
    id: 'lab7', labNumber: 7,
    title: 'Xác định tính nén lún của đất',
    objective: 'Xác định a, Eoed bằng nén cố kết.',
    principle: 'Nén 1 trục không nở hông, tăng dần p, đo ΔH.',
    apparatus: ['Máy nén cố kết', 'Hộp nén', 'Đồng hồ biến dạng', 'Quả cân'],
    steps: [
      { stepNumber: 1, description: 'Đặt mẫu, ghi H₀, e₀.' },
      { stepNumber: 2, description: 'Gia tải p₁, đọc ΔH khi ổn định.' },
      { stepNumber: 3, description: 'Tăng p₂, p₃, p₄.' },
      { stepNumber: 4, description: 'eᵢ = e₀ - (1+e₀)ΔHᵢ/H₀.' },
      { stepNumber: 5, description: 'Vẽ e-p, tính a, Eoed.' },
    ],
    formulas: [
      { id: 'fl7-1', chapterId: 'ch2', name: 'Hệ số rỗng theo biến dạng', expression: 'eᵢ = e₀ - (1+e₀)×ΔHᵢ/H₀', variables: [{ symbol: 'eᵢ', name: 'HR cấp i' }, { symbol: 'e₀', name: 'HR ban đầu' }, { symbol: 'ΔHᵢ', name: 'Biến dạng tổng', unit: 'mm' }, { symbol: 'H₀', name: 'Chiều cao đầu', unit: 'mm' }], meaning: 'Tính e từ biến dạng.', usageContext: 'TN nén cố kết.', sourceRefs: [labSrc] },
    ],
    inputFields: [
      { id: 'lab7-e0', label: 'e₀', unit: '', type: 'number', required: true },
      { id: 'lab7-H0', label: 'H₀', unit: 'mm', type: 'number', required: true },
      { id: 'lab7-p1', label: 'p₁', unit: 'kPa', type: 'number', required: true, sampleIndex: 0 },
      { id: 'lab7-dH1', label: 'ΔH₁', unit: 'mm', type: 'number', required: true, sampleIndex: 0 },
      { id: 'lab7-p2', label: 'p₂', unit: 'kPa', type: 'number', required: true, sampleIndex: 1 },
      { id: 'lab7-dH2', label: 'ΔH₂', unit: 'mm', type: 'number', required: true, sampleIndex: 1 },
      { id: 'lab7-p3', label: 'p₃', unit: 'kPa', type: 'number', required: true, sampleIndex: 2 },
      { id: 'lab7-dH3', label: 'ΔH₃', unit: 'mm', type: 'number', required: true, sampleIndex: 2 },
      { id: 'lab7-p4', label: 'p₄', unit: 'kPa', type: 'number', required: true, sampleIndex: 3 },
      { id: 'lab7-dH4', label: 'ΔH₄', unit: 'mm', type: 'number', required: true, sampleIndex: 3 },
    ],
    calculatedFields: [],
    resultTableSchema: [
      { key: 'p', header: 'p (kPa)', isInput: true },
      { key: 'dH', header: 'ΔH (mm)', isInput: true },
      { key: 'e', header: 'e', isInput: false },
      { key: 'a', header: 'a (kPa⁻¹)', isInput: false },
    ],
    reportTemplateMapping: { templateSection: 'Bài 7', fieldMappings: {} },
    youtubeVideos: getVideosByLab('lab7'),
    questions: [{ id: 'lq7-1', question: 'Tại sao gọi nén 1 trục không nở hông?', suggestedAnswer: 'Hộp cứng giữ mẫu, chỉ biến dạng đứng.', sourceRefs: [labSrc] }],
    sourceRefs: [labSrc],
  },
];

export function getLabById(id: string): Lab | undefined {
  return allLabs.find(l => l.id === id);
}

export function getLabByNumber(num: number): Lab | undefined {
  return allLabs.find(l => l.labNumber === num);
}
