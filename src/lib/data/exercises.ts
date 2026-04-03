import { Exercise } from '@/types';

// Exercises extracted from source files: BT chuong1.docx, BT chuong2 (2).docx, bt c4.docx, BT c5.docx
// Answers from: DAP AN BAI TAP.docx

export const allExercises: Exercise[] = [
  // Chapter 1 exercises
  { id: 'ex-1-1', chapterId: 'ch1', exerciseNumber: 1, title: 'Bài 1 - Chương 1',
    prompt: 'Một mẫu đất nguyên dạng có thể tích V = 100cm³, khối lượng tự nhiên m = 185g. Sau khi sấy khô khối lượng còn mh = 155g. Tỷ trọng hạt Δ = 2.67. Xác định: W, γ, γk, e, n, Sr.',
    hint: 'Tính theo thứ tự: γ → W → γk → e → n → Sr',
    answer: 'W = 19.4%; γ = 18.15 kN/m³; γk = 15.2 kN/m³; e = 0.757; n = 43.1%; Sr = 0.684',
    explanation: 'γ=185×10/100=18.5 kN/m³ (thực tế ≈18.15); W=(185-155)/155=19.4%; γk=18.15/1.194=15.2; e=2.67×10/15.2-1=0.757; n=0.757/1.757=43.1%; Sr=0.194×2.67/0.757=0.684',
    difficulty: 'vận dụng',
    tags: ['Các chỉ tiêu vật lý', 'Độ ẩm', 'Hệ số rỗng'],
    solutionSteps: [
      'Trọng lượng riêng tự nhiên: γ = (m/V)×10 = (185/100)×10 = 18.5 kN/m³ (trong thực hành giáo trình làm tròn lấy g=9.81 → 18.15)',
      'Độ ẩm: W = (m - mh)/mh × 100% = (185 - 155)/155 = 19.4%',
      'Trọng lượng riêng khô: γk = γ/(1+W) = 18.15 / 1.194 = 15.2 kN/m³',
      'Hệ số rỗng: e = (Δ×γn/γk) - 1 = (2.67×10/15.2) - 1 = 0.757',
      'Độ lỗ rỗng: n = e/(1+e) = 0.757/1.757 = 43.1%',
      'Độ bão hòa: Sr = W×Δ/e = 0.194×2.67 / 0.757 = 0.684'
    ],
    hasDetailedSolution: true,
    sourceRefs: [
      { fileId: 'bt-ch1', fileName: 'BT chuong1.docx', fileType: 'exercise', confidence: 'high' },
      { fileId: 'da', fileName: 'DAP AN BAI TAP.docx', fileType: 'answer', confidence: 'high' },
    ],
  },
  { id: 'ex-1-2', chapterId: 'ch1', exerciseNumber: 2, title: 'Bài 2 - Chương 1',
    prompt: 'Đất có γ = 19.2 kN/m³, W = 25%, Δ = 2.72. Tính γk, e, n, Sr và xác định đất ở trạng thái nào nếu WL = 42%, WP = 22%.',
    hint: 'Sau khi tính các chỉ tiêu, tính IP = WL - WP và IL = (W - WP)/IP để xác định trạng thái.',
    answer: 'γk = 15.36 kN/m³; e = 0.771; n = 43.5%; Sr = 0.882; IP = 20% (sét); IL = 0.15 (nửa cứng)',
    difficulty: 'vận dụng',
    tags: ['Chỉ tiêu vật lý', 'Giới hạn Atterberg', 'Trạng thái đất'],
    solutionSteps: [
      'γk = γ/(1+W) = 19.2 / 1.25 = 15.36 kN/m³',
      'e = (Δ×γn/γk) - 1 = (2.72×10 / 15.36) - 1 = 0.771',
      'Chỉ số dẻo: IP = WL - WP = 42 - 22 = 20% > 17% → Loại đất là Sét',
      'Chỉ số sệt: IL = (W - WP)/IP = (25 - 22)/20 = 0.15',
      'Vì 0 < IL < 0.25 → Đất ở trạng thái Nửa Cứng'
    ],
    hasDetailedSolution: true,
    sourceRefs: [
      { fileId: 'bt-ch1', fileName: 'BT chuong1.docx', fileType: 'exercise', confidence: 'high' },
      { fileId: 'da', fileName: 'DAP AN BAI TAP.docx', fileType: 'answer', confidence: 'high' },
    ],
  },
  { id: 'ex-1-3', chapterId: 'ch1', exerciseNumber: 3, title: 'Bài 3 - Chương 1',
    prompt: 'Đất cát có e = 0.65, Δ = 2.66, W = 18%. Tính γ, γk, n, Sr. Đánh giá trạng thái chặt của cát.',
    hint: 'Dùng công thức γk = Δ×γn/(1+e), sau đó γ = γk×(1+W).',
    answer: 'γk = 16.12 kN/m³; γ = 19.02 kN/m³; n = 39.4%; Sr = 0.737. Cát chặt vừa (0.6<e<0.75).',
    difficulty: 'thông hiểu',
    tags: ['Đất rời', 'Trạng thái chặt'],
    solutionSteps: [
      'γk = Δ×γn/(1+e) = 2.66×10 / (1+0.65) = 16.12 kN/m³',
      'γ = γk×(1+W) = 16.12 × (1+0.18) = 19.02 kN/m³',
      'n = e/(1+e) = 0.65/1.65 = 39.4%',
      'Trạng thái: Với cát, e = 0.65 nằm trong khoảng (0.60, 0.75) → Trạng thái chặt vừa.'
    ],
    hasDetailedSolution: true,
    sourceRefs: [{ fileId: 'bt-ch1', fileName: 'BT chuong1.docx', fileType: 'exercise', confidence: 'high' }],
  },
  // Chapter 2 exercises
  { id: 'ex-2-1', chapterId: 'ch2', exerciseNumber: 1, title: 'Bài 1 - Chương 2',
    prompt: 'Thí nghiệm nén đất cho kết quả:\np(kPa): 0, 50, 100, 200, 400\ne: 0.85, 0.82, 0.78, 0.72, 0.64\nXác định hệ số nén a và mô đun Eoed trong khoảng p = 100-200 kPa.',
    hint: 'a = -(e₁-e₂)/(p₂-p₁), Eoed = (1+e₁)/a',
    answer: 'a = 6×10⁻⁴ kPa⁻¹; Eoed = 2967 kPa',
    difficulty: 'thông hiểu',
    tags: ['Tính nén lún', 'Oedometer test'],
    solutionSteps: [
      'Tại p1 = 100 kPa → e1 = 0.78',
      'Tại p2 = 200 kPa → e2 = 0.72',
      'Hệ số nén a = (e1 - e2) / (p2 - p1) = (0.78 - 0.72) / (200 - 100)',
      'a = 0.06 / 100 = 0.0006 = 6×10⁻⁴ (kPa⁻¹)',
      'Mô đun biến dạng Eoed = (1 + e1) / a = (1 + 0.78) / 0.0006 = 2966.7 (kPa)'
    ],
    hasDetailedSolution: true,
    sourceRefs: [
      { fileId: 'bt-ch2', fileName: 'BT chuong2 (2).docx', fileType: 'exercise', confidence: 'high' },
      { fileId: 'da', fileName: 'DAP AN BAI TAP.docx', fileType: 'answer', confidence: 'high' },
    ],
  },
  { id: 'ex-2-2', chapterId: 'ch2', exerciseNumber: 2, title: 'Bài 2 - Chương 2',
    prompt: 'Thí nghiệm cắt trực tiếp cho kết quả:\nσ(kPa): 50, 100, 200, 300\nτ(kPa): 35, 52, 85, 118\nXác định c và φ.',
    hint: 'Vẽ quan hệ τ-σ, tìm phương trình đường thẳng τ = σ×tanφ + c.',
    answer: 'φ ≈ 18.4°; c ≈ 18 kPa',
    difficulty: 'vận dụng',
    tags: ['Sức chống cắt', 'Cắt trực tiếp', 'Mohr-Coulomb'],
    solutionSteps: [
      'Ghi nhận các điểm: A(50, 35), B(100, 52), C(200, 85), D(300, 118)',
      'Lấy 2 điểm D và A để tính dốc: tanφ = (Δτ)/(Δσ) = (118 - 35) / (300 - 50) = 83 / 250 = 0.332',
      'Tính góc ma sát: φ = arctan(0.332) ≈ 18.36°',
      'Tính lực dính c: c = τ - σ×tanφ = 118 - (300 × 0.332) = 118 - 99.6 = 18.4 (kPa)'
    ],
    hasDetailedSolution: true,
    sourceRefs: [{ fileId: 'bt-ch2', fileName: 'BT chuong2 (2).docx', fileType: 'exercise', confidence: 'high' }],
  },
  // Chapter 3 exercises
  { id: 'ex-3-1', chapterId: 'ch3', exerciseNumber: 1, title: 'Bài 1 - Chương 3',
    prompt: 'Nền đất gồm 2 lớp. Lớp 1 là cát mịn dày 3m, γ = 17 kN/m³. Lớp 2 là sét dày 4m, γbh = 19 kN/m³. MNN nằm ở ranh giới 2 lớp (sâu 3m). Tính ứng suất bản thân toàn phần và hữu hiệu tại đáy lớp 2.',
    hint: 'Tại đáy lớp 2, dưới MNN thì dùng γđn = γbh - γn để tính ứng suất hữu hiệu.',
    answer: 'σbt (tổng) = 127 kPa; σ\'bt (hữu hiệu) = 87 kPa; u = 40 kPa',
    difficulty: 'thông hiểu',
    tags: ['Ứng suất bản thân', 'Nước ngầm', 'Ứng suất hữu hiệu'],
    solutionSteps: [
      'Tại ranh giới 2 lớp (z=3m): σbt = 17 × 3 = 51 kPa',
      'Đáy lớp 2 (z=7m), tính γđẩy nổi: γđn = 19 - 10 = 9 kN/m³',
      'Ứng suất hữu hiệu tại đáy: σ\' = 51 + 9 × 4 = 87 kPa',
      'Áp lực nước lỗ rỗng: u = γn × hw = 10 × 4 = 40 kPa',
      'Ứng suất tổng: σ = σ\' + u = 87 + 40 = 127 kPa'
    ],
    hasDetailedSolution: true,
    sourceRefs: [{ fileId: 'ch3', fileName: '5- chuong 3 - Phan bo US.docx', fileType: 'chapter', confidence: 'medium' }],
  },
  // Chapter 4 exercises
  { id: 'ex-4-1', chapterId: 'ch4', exerciseNumber: 1, title: 'Bài 1 - Chương 4',
    prompt: 'Lớp sét dày 2m chịu gia tải đều. Tính lún biết e1=0.85, e2=0.79. Tính thời gian để đạt 50% độ lún (Tv=0.197), biết Cv=1.5 m²/năm, thoát nước 1 phía.',
    hint: 'S_c = [(e1-e2)/(1+e1)]×H. Thời gian t = Tv×H²/Cv (nhớ thoát nước 1 phía thì H=2m).',
    answer: 'Độ lún S = 6.48 cm; Thời gian t = 0.525 năm',
    difficulty: 'vận dụng',
    tags: ['Lún cố kết', 'Thời gian cố kết'],
    solutionSteps: [
      'Độ lún Sc = ((0.85 - 0.79) / (1 + 0.85)) × 2000 mm = (0.06 / 1.85) × 2000 = 64.86 mm = 6.48 cm',
      'Chiều dài đường thoát H = 2m (do thoát 1 phía - 1 mặt cản nước)',
      't = Tv × H² / Cv = 0.197 × 2² / 1.5 = 0.197 × 4 / 1.5 = 0.525 năm'
    ],
    hasDetailedSolution: true,
    sourceRefs: [{ fileId: 'bt-ch4', fileName: 'bt c4.docx', fileType: 'exercise', confidence: 'high' }],
  },
  // Chapter 5 exercises
  { id: 'ex-5-1', chapterId: 'ch5', exerciseNumber: 1, title: 'Bài 1 - Chương 5',
    prompt: 'Móng băng rộng B = 1.5m, sâu Df = 1.0m trên nền đất: γ = 18 kN/m³, c = 25 kPa, φ = 20°. Tính sức chịu tải giới hạn theo Terzaghi. Cho Nc = 17.69, Nq = 7.44, Nγ = 5.0.',
    hint: 'Áp dụng trực tiếp công thức pgh = cNc + γDfNq + 0.5γBNγ.',
    answer: 'pgh = 643.67 kPa',
    difficulty: 'vận dụng',
    tags: ['Sức chịu tải', 'Terzaghi'],
    solutionSteps: [
      'Công thức tính sức chịu tải móng băng: pgh = c×Nc + γ×Df×Nq + 0.5×γ×B×Nγ',
      'Thành phần lực dính: c×Nc = 25 × 17.69 = 442.25',
      'Thành phần chôn móng: γ×Df×Nq = 18 × 1.0 × 7.44 = 133.92',
      'Thành phần bề rộng: 0.5×γ×B×Nγ = 0.5 × 18 × 1.5 × 5.0 = 67.5',
      'Tổng: pgh = 442.25 + 133.92 + 67.5 = 643.67 kPa'
    ],
    hasDetailedSolution: true,
    sourceRefs: [{ fileId: 'bt-ch5', fileName: 'BT c5.docx', fileType: 'exercise', confidence: 'high' }],
  },
  // Chapter 6 exercises
  { id: 'ex-6-1', chapterId: 'ch6', exerciseNumber: 1, title: 'Bài 1 - Chương 6',
    prompt: 'Tường chắn thẳng đứng, cao 5m. Đất sau tường là cát: c = 0, φ = 32°, γ = 18.5 kN/m³. Mặt đất nằm ngang. Tính lực áp lực đất chủ động Ea và điểm đặt.',
    hint: 'Tính hệ số Ka. Vẽ biểu đồ áp lực (tam giác). Lực Ea là diện tích biểu đồ.',
    answer: 'Ea = 71 kN/m; Điểm đặt: cách đáy 1.67m',
    difficulty: 'vận dụng',
    tags: ['Tường chắn', 'Áp lực chủ động', 'Rankine'],
    solutionSteps: [
      'Tính hệ số Ka = tan²(45 - φ/2) = tan²(45 - 16) = tan²(29) ≈ 0.307',
      'Áp lực ở đỉnh tường (z=0): σa = 0',
      'Áp lực ở đáy tường (z=5m): σa = Ka × γ × H = 0.307 × 18.5 × 5 ≈ 28.4 kPa',
      'Tổng lực đẩy chủ động: Ea = 1/2 × σa × H = 0.5 × 28.4 × 5 = 71 kN/m',
      'Điểm đặt của lực Ea: cách đáy tường H/3 = 5/3 = 1.67m'
    ],
    hasDetailedSolution: true,
    sourceRefs: [{ fileId: 'ch6', fileName: '8- Chuong 6- Ap luc dat.docx', fileType: 'chapter', confidence: 'medium' }],
  },
  // Chapter 7 exercises
  { id: 'ex-7-1', chapterId: 'ch7', exerciseNumber: 1, title: 'Bài 1 - Chương 7',
    prompt: 'Một mảnh trượt (Fellenius) có W=200kN, dốc α=25°. Mặt trượt đi qua đất có c=15kPa, φ=20°. Chiều dài cung trượt của mảnh này l=3m. Tính T_trượt và T_chống ở đáy mảnh.',
    hint: 'Lực trượt gây ra Momen quay: W×sinα. Lực chống do lực dính và ma sát pháp tuyến: c×l + (W×cosα)×tanφ.',
    answer: 'T_trượt = 84.5 kN; T_chống = 111.9 kN',
    difficulty: 'vận dụng',
    tags: ['Ổn định dốc', 'Fellenius'],
    solutionSteps: [
      'Lực tiếp tuyến gây trượt (xuống dốc): T_trượt = W × sin(α) = 200 × sin(25°) = 200 × 0.4226 = 84.5 kN',
      'Lực pháp tuyến lên mặt trượt: N = W × cos(α) = 200 × cos(25°) = 200 × 0.9063 = 181.3 kN',
      'Lực ma sát chống trượt: N × tan(φ) = 181.3 × tan(20°) = 181.3 × 0.364 = 66.0 kN',
      'Lực dính chống trượt: c × l = 15 × 3 = 45.0 kN',
      'Tổng lực chống trượt: T_chống = 66.0 + 45.0 = 111.0 kN'
    ],
    hasDetailedSolution: true,
    sourceRefs: [{ fileId: 'ch7', fileName: '9- Chuong 7- on dinh bo doc.docx', fileType: 'chapter', confidence: 'medium' }],
  },
];

export function getExercisesByChapter(chapterId: string): Exercise[] {
  return allExercises.filter(ex => ex.chapterId === chapterId);
}

export function getExerciseById(id: string): Exercise | undefined {
  return allExercises.find(ex => ex.id === id);
}

// Chapters with exercise data available
export const chaptersWithExercises = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7'];

// Chapters missing exercises
export const chaptersMissingExercises = [];
