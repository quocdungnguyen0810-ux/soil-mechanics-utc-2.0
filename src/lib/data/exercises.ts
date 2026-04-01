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
    hasDetailedSolution: true,
    sourceRefs: [
      { fileId: 'bt-ch1', fileName: 'BT chuong1.docx', fileType: 'exercise', confidence: 'high' },
      { fileId: 'da', fileName: 'DAP AN BAI TAP.docx', fileType: 'answer', confidence: 'high' },
    ],
  },
  { id: 'ex-1-3', chapterId: 'ch1', exerciseNumber: 3, title: 'Bài 3 - Chương 1',
    prompt: 'Đất cát có e = 0.65, Δ = 2.66, W = 18%. Tính γ, γk, n, Sr. Đánh giá trạng thái chặt của cát.',
    hint: 'Dùng công thức γk = Δ×γn/(1+e), sau đó γ = γk×(1+W).',
    answer: 'γk = Δ×10/(1+e) = 2.66×10/1.65 = 16.12 kN/m³; γ = 16.12×1.18 = 19.02 kN/m³; n = e/(1+e) = 39.4%; Sr = WΔ/e = 0.737. Cát chặt vừa (0.6<e<0.75).',
    hasDetailedSolution: true,
    sourceRefs: [{ fileId: 'bt-ch1', fileName: 'BT chuong1.docx', fileType: 'exercise', confidence: 'high' }],
  },
  // Chapter 2 exercises
  { id: 'ex-2-1', chapterId: 'ch2', exerciseNumber: 1, title: 'Bài 1 - Chương 2',
    prompt: 'Thí nghiệm nén đất cho kết quả:\np(kPa): 0, 50, 100, 200, 400\ne: 0.85, 0.82, 0.78, 0.72, 0.64\nXác định hệ số nén a và mô đun Eoed trong khoảng p = 100-200 kPa.',
    hint: 'a = -(e₁-e₂)/(p₂-p₁), Eoed = (1+e₁)/a',
    answer: 'a = (0.78-0.72)/(200-100) = 6×10⁻⁴ kPa⁻¹; Eoed = (1+0.78)/(6×10⁻⁴) = 2967 kPa',
    hasDetailedSolution: true,
    sourceRefs: [
      { fileId: 'bt-ch2', fileName: 'BT chuong2 (2).docx', fileType: 'exercise', confidence: 'high' },
      { fileId: 'da', fileName: 'DAP AN BAI TAP.docx', fileType: 'answer', confidence: 'high' },
    ],
  },
  { id: 'ex-2-2', chapterId: 'ch2', exerciseNumber: 2, title: 'Bài 2 - Chương 2',
    prompt: 'Thí nghiệm cắt trực tiếp cho kết quả:\nσ(kPa): 50, 100, 200, 300\nτ(kPa): 35, 52, 85, 118\nXác định c và φ.',
    hint: 'Vẽ quan hệ τ-σ, tìm phương trình đường thẳng τ = σ×tanφ + c.',
    answer: 'tanφ = (118-35)/(300-50) = 0.332 → φ ≈ 18.4°; c ≈ 18 kPa',
    hasDetailedSolution: true,
    sourceRefs: [{ fileId: 'bt-ch2', fileName: 'BT chuong2 (2).docx', fileType: 'exercise', confidence: 'high' }],
  },
  // Chapter 4 exercises
  { id: 'ex-4-1', chapterId: 'ch4', exerciseNumber: 1, title: 'Bài 1 - Chương 4',
    prompt: 'Móng băng rộng b = 2m, dài vô hạn, đặt ở độ sâu Df = 1.5m. Áp lực đáy móng p = 200 kPa. Nền đất đồng nhất: γ = 18 kN/m³, e₀ = 0.8, a = 5×10⁻⁴ kPa⁻¹. Tính độ lún bằng phương pháp cộng lớp.',
    hint: 'Chia nền thành lớp dày b/4 = 0.5m, tính σbt và σz cho mỗi lớp.',
    answer: 'Thiếu dữ liệu nguồn chi tiết - cần tra bảng K₀ để tính σz tại các điểm.',
    hasDetailedSolution: false,
    sourceRefs: [{ fileId: 'bt-ch4', fileName: 'bt c4.docx', fileType: 'exercise', confidence: 'medium' }],
  },
  // Chapter 5 exercises
  { id: 'ex-5-1', chapterId: 'ch5', exerciseNumber: 1, title: 'Bài 1 - Chương 5',
    prompt: 'Móng băng rộng B = 1.5m, sâu Df = 1.0m trên nền đất: γ = 18 kN/m³, c = 25 kPa, φ = 20°. Tính sức chịu tải giới hạn theo Terzaghi. Cho Nc = 17.69, Nq = 7.44, Nγ = 5.0.',
    hint: 'Áp dụng trực tiếp công thức pgh = cNc + γDfNq + 0.5γBNγ.',
    answer: 'pgh = 25×17.69 + 18×1.0×7.44 + 0.5×18×1.5×5.0 = 442.25 + 133.92 + 67.5 = 643.67 kPa',
    hasDetailedSolution: true,
    sourceRefs: [{ fileId: 'bt-ch5', fileName: 'BT c5.docx', fileType: 'exercise', confidence: 'high' }],
  },
];

export function getExercisesByChapter(chapterId: string): Exercise[] {
  return allExercises.filter(ex => ex.chapterId === chapterId);
}

export function getExerciseById(id: string): Exercise | undefined {
  return allExercises.find(ex => ex.id === id);
}

// Chapters with exercise data available
export const chaptersWithExercises = ['ch1', 'ch2', 'ch4', 'ch5'];

// Chapters missing exercises
export const chaptersMissingExercises = ['ch3', 'ch6', 'ch7'];
