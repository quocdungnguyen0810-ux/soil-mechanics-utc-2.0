// ============================================================
// Chapter 1: TÍNH CHẤT VẬT LÝ CỦA ĐẤT
// Source: "3- Chuong 1-TC vat ly.docx"
// Coverage target: ≥ 70%
// ============================================================
import { Chapter } from '@/types';

const src = { fileId: 'ch1', fileName: '3- Chuong 1-TC vat ly.docx', fileType: 'chapter' as const, confidence: 'high' as const };

export const chapter1: Chapter = {
  id: 'ch1',
  chapterNumber: 1,
  title: 'Tính chất vật lý của đất',
  shortTitle: 'TC Vật lý',
  detectedTopic: 'Thành phần, cấu trúc, các chỉ tiêu vật lý và phân loại đất',
  sourceCoverageOverall: 0.82,

  overview: `Chương 1 là nền tảng của toàn bộ môn Cơ học đất, trình bày chi tiết các tính chất vật lý cơ bản của đất. Nội dung bao gồm: nguồn gốc hình thành đất, thành phần hạt rắn (khoáng vật, cỡ hạt), thành phần nước và khí trong đất, các đặc trưng vật lý cơ bản (khối lượng riêng, khối lượng thể tích, hệ số rỗng, độ rỗng, độ ẩm, độ bão hòa), quan hệ giữa các chỉ tiêu, phân loại đất dính và đất rời, trạng thái đất theo giới hạn Atterberg. Mỗi chỉ tiêu đều có ý nghĩa vật lý rõ ràng và ảnh hưởng trực tiếp đến khả năng chịu tải, biến dạng của nền đất trong xây dựng.`,

  learningObjectives: [
    'Nắm được nguồn gốc hình thành đất, phân biệt đất tàn tích và đất trầm tích',
    'Hiểu mô hình 3 pha của đất: pha rắn, pha lỏng, pha khí',
    'Biết thành phần khoáng vật sét và ảnh hưởng đến tính chất đất',
    'Xác định các chỉ tiêu vật lý: γ, γs, γk, γđn, e, n, W, Sr, Δ',
    'Thiết lập và vận dụng các công thức quan hệ giữa các chỉ tiêu',
    'Phân loại đất dính theo chỉ số dẻo IP',
    'Xác định trạng thái đất dính theo độ sệt IL',
    'Phân loại đất rời theo hệ số rỗng e',
    'Hiểu ý nghĩa thí nghiệm phân tích thành phần hạt (rây, tỷ trọng kế)',
  ],

  // ===== DETAILED SUMMARY: subsections preserving ≥70% content =====
  detailedSummary: [
    {
      id: 'ch1-s1',
      title: '1.1. Nguồn gốc hình thành đất',
      content: `Đất được hình thành từ quá trình phong hóa đá gốc dưới tác động của khí hậu, nước, sinh vật và thời gian. Có hai nhóm chính:

**Đất tàn tích (residual soil):** Sản phẩm phong hóa nằm ngay tại vị trí đá gốc bị phong hóa, không bị vận chuyển. Đặc điểm: thành phần không đồng nhất, tính chất thay đổi theo chiều sâu, phía trên phong hóa mạnh hơn.

**Đất trầm tích (transported soil):** Sản phẩm phong hóa bị vận chuyển đi nơi khác rồi lắng đọng. Phân theo tác nhân vận chuyển:
- Đất bồi tích (alluvial): do sông suối vận chuyển, phân lớp rõ, hạt tròn cạnh
- Đất sườn tích (colluvial): do trọng lực trượt theo sườn dốc
- Đất phong tích (aeolian): do gió vận chuyển, hạt đều, tròn cạnh
- Đất băng tích (glacial): do băng hà vận chuyển, hạt to nhỏ lẫn lộn
- Đất biển (marine): lắng đọng trong môi trường biển, thường là bùn sét

Nguồn gốc hình thành quyết định thành phần hạt, kết cấu và tính chất cơ lý của đất.`,
      sourceRef: src,
    },
    {
      id: 'ch1-s2',
      title: '1.2. Thành phần hạt của đất',
      content: `Thành phần hạt của đất mô tả sự phân bố theo kích thước các hạt rắn, là cơ sở quan trọng để phân loại và dự đoán tính chất đất.

**Phân nhóm cỡ hạt:**
| Nhóm hạt | Kích thước (mm) | Đặc điểm |
|-----------|-----------------|----------|
| Tảng, cuội | > 200 / 10-200 | Hạt thô, cứng |
| Sỏi | 2 – 10 | Hạt thô |
| Cát | 0.05 – 2 | Hạt nhìn thấy bằng mắt |
| Bụi (silt) | 0.005 – 0.05 | Hạt mịn |
| Sét (clay) | < 0.005 | Hạt rất mịn, có tính dẻo |

**Phương pháp xác định:**
- Phương pháp rây (sieve analysis): dùng cho hạt > 0.1mm. Bộ rây tiêu chuẩn có lỗ từ lớn đến nhỏ.
- Phương pháp tỷ trọng kế (hydrometer): dùng cho hạt < 0.1mm. Dựa vào định luật Stokes về vận tốc lắng trong nước.

**Đường cong cấp phối hạt:** Vẽ trên trục bán logarit, trục hoành là đường kính hạt (lgd), trục tung là phần trăm lọt rây (tích lũy). Từ đường cong xác định:
- d₁₀ (đường kính hữu hiệu): 10% hạt nhỏ hơn
- d₃₀: 30% hạt nhỏ hơn
- d₆₀: 60% hạt nhỏ hơn
- Hệ số đồng nhất: Cu = d₆₀/d₁₀ (Cu < 5: đất đồng nhất, Cu > 10: đất cấp phối tốt)
- Hệ số cấp phối: Cc = d₃₀²/(d₁₀ × d₆₀) (tốt khi 1 ≤ Cc ≤ 3)`,
      formulas: [
        { id: 'f1-cu', chapterId: 'ch1', name: 'Hệ số đồng nhất', expression: 'Cu = d₆₀ / d₁₀', variables: [{ symbol: 'Cu', name: 'Hệ số đồng nhất' }, { symbol: 'd₆₀', name: 'Đường kính 60% lọt', unit: 'mm' }, { symbol: 'd₁₀', name: 'Đường kính hữu hiệu', unit: 'mm' }], meaning: 'Đánh giá mức độ đồng nhất cỡ hạt', usageContext: 'Phân loại đất rời', sourceRefs: [src] },
      ],
      sourceRef: src,
    },
    {
      id: 'ch1-s3',
      title: '1.3. Thành phần khoáng vật của đất',
      content: `Hạt đất chứa các khoáng vật ảnh hưởng mạnh đến tính chất cơ lý. Phân thành hai nhóm:

**Khoáng vật nguyên sinh:** Thạch anh (SiO₂), fenspat,... có trong đất cát, sỏi. Bề mặt trơn, không hút nước → không có tính dẻo.

**Khoáng vật thứ sinh (khoáng vật sét):** Hình thành do phong hóa hóa học. Có cấu trúc lớp, bề mặt tích điện âm → hút nước, có tính dẻo. Ba nhóm chính:
- **Kaolinite:** 2 lớp (SiO₄ + Al₂O₃), liên kết mạnh, ít trương nở, IP = 10-20%
- **Illite (hydromica):** 3 lớp, liên kết trung bình, IP = 15-40%
- **Montmorillonite:** 3 lớp, liên kết yếu, rất trương nở, IP = 50-700%

Hàm lượng khoáng vật sét quyết định:
- Tính dẻo (IP lớn → đất dẻo hơn)
- Khả năng trương nở
- Tính thấm (nhiều sét → hệ số thấm nhỏ)
- Sức chống cắt (ảnh hưởng đến c và φ)`,
      sourceRef: src,
    },
    {
      id: 'ch1-s4',
      title: '1.4. Nước trong đất',
      content: `Nước trong đất tồn tại ở nhiều dạng, mỗi dạng có ảnh hưởng khác nhau đến tính chất cơ học:

**Nước liên kết chặt (nước hấp phụ):** Lớp nước mỏng bao quanh bề mặt hạt sét, bị hút bởi lực phân tử rất mạnh. Đặc tính: mật độ lớn (≈ 1.2-1.4 g/cm³), không chuyển động, không hòa tan muối, không đóng băng ở 0°C. Không thể loại bỏ bằng sấy ở 105°C nhưng thường bỏ qua trong tính toán do lượng rất nhỏ.

**Nước liên kết yếu (nước màng):** Lớp nước bao ngoài lớp hấp phụ, tính chất gần nước tự do hơn. Có thể chuyển động chậm từ chỗ màng dày sang chỗ mỏng.

**Nước tự do:** Nước chứa trong lỗ rỗng, tự do chuyển động dưới tác dụng trọng lực hoặc chênh lệch áp lực. Phân thành:
- Nước mao dẫn: dâng lên trong lỗ rỗng nhỏ do sức căng bề mặt. Chiều cao mao dẫn: hc ≈ 0.3/d₁₀ (cm), trong đó d₁₀ tính bằng cm.
- Nước trọng lực: thấm qua đất dưới tác dụng gradient thủy lực.

**Nước trong khoáng vật:** Nước cấu trúc nằm trong mạng tinh thể, chỉ thoát ra khi nung > 300°C. Không ảnh hưởng đến tính toán thông thường.

Hàm lượng nước trong đất được đặc trưng bởi độ ẩm W:
W = Gn/Gh × 100% (Gn = trọng lượng nước, Gh = trọng lượng hạt khô)`,
      sourceRef: src,
    },
    {
      id: 'ch1-s5',
      title: '1.5. Mô hình 3 pha và sơ đồ tính toán',
      content: `Đất tự nhiên là hệ ba pha: rắn (hạt), lỏng (nước), khí (khí trong lỗ rỗng).

**Sơ đồ tính toán ba pha:**
Tổng thể tích: V = Vh + Vn + Vk = Vh + Vr (Vr = Vn + Vk: thể tích lỗ rỗng)
Tổng trọng lượng: G = Gh + Gn (trọng lượng khí ≈ 0)

Từ sơ đồ ba pha, thiết lập tất cả các chỉ tiêu vật lý. Khi đất bão hòa (Sr = 1): Vk = 0, Vr = Vn. Khi đất khô (Sr = 0): Vn = 0, Vr = Vk.

**Quy ước hệ đơn vị:**
- Hệ SI: khối lượng (kg, g), lực (N, kN), ứng suất (Pa, kPa)
- γ = ρ × g (g = 9.81 ≈ 10 m/s²), nên γ(kN/m³) ≈ ρ(g/cm³) × 10
- γn = 10 kN/m³ (trọng lượng riêng nước)`,
      sourceRef: src,
    },
    {
      id: 'ch1-s6',
      title: '1.6. Các chỉ tiêu vật lý cơ bản',
      content: `Các chỉ tiêu vật lý cơ bản được xác định trực tiếp từ thí nghiệm hoặc tính toán từ các đại lượng đo:

**1. Khối lượng riêng hạt (ρs) / Trọng lượng riêng hạt (γs):**
Đặc trưng cho thành phần khoáng vật. Đất cát thạch anh: Δ ≈ 2.65. Đất sét: Δ ≈ 2.70-2.80. Đất chứa hữu cơ: Δ < 2.60.

**2. Tỷ trọng hạt (Δ):** Δ = γs / γn

**3. Khối lượng thể tích tự nhiên (ρ) / Trọng lượng thể tích (γ):**
γ = G/V = (Gh + Gn)/V
Giá trị thường gặp: 16–22 kN/m³. Đất cát chặt: 18-20. Đất sét: 17-21.

**4. Khối lượng thể tích khô (ρk) / Trọng lượng thể tích khô (γk):**
γk = Gh/V = γ/(1+W)
Đặc trưng cho mức độ chặt của đất. Dùng kiểm soát chất lượng đầm nén.

**5. Trọng lượng thể tích bão hòa (γbh):**
γbh = (Δ + e)/(1+e) × γn
Khi tất cả lỗ rỗng chứa đầy nước (Sr = 1).

**6. Trọng lượng thể tích đẩy nổi (γđn):**
γđn = γbh - γn = (Δ - 1)/(1+e) × γn
Dùng cho đất dưới mực nước ngầm (MNN). Lực đẩy Archimedes làm giảm trọng lượng.

**7. Độ ẩm (W):**
W = Gn/Gh (hoặc W% = Gn/Gh × 100%)
Xác định bằng sấy ở 105-110°C. Đất cát: W = 5-15%. Đất sét: W = 20-60%.

**8. Hệ số rỗng (e):**
e = Vr/Vh
Đặc trưng cho mức độ rỗng xốp. Có thể > 1 (bùn sét: e = 1-3). Đất cát chặt: e < 0.6.

**9. Độ rỗng (n):**
n = Vr/V = e/(1+e)
Tỷ lệ thể tích rỗng trong tổng thể tích. Luôn < 1 (hoặc < 100%).

**10. Độ bão hòa (Sr):**
Sr = Vn/Vr = W×Δ/e
Mức độ lấp đầy nước: Sr = 0 (khô hoàn toàn) → Sr = 1 (bão hòa hoàn toàn).`,
      sourceRef: src,
    },
    {
      id: 'ch1-s7',
      title: '1.7. Quan hệ giữa các chỉ tiêu vật lý',
      content: `Các chỉ tiêu vật lý liên hệ chặt chẽ với nhau. Từ 3 đại lượng cơ bản (γ, W, Δ), có thể tính tất cả:

**Từ γ và W:**
γk = γ/(1+W)

**Từ γk và Δ:**
e = Δ×γn/γk - 1 = γs/γk - 1

**Từ e:**
n = e/(1+e) → e = n/(1-n)

**Từ W, Δ, e:**
Sr = W×Δ/e

**Công thức tổng hợp:**
γ = (1+W)×Δ×γn/(1+e)
γk = Δ×γn/(1+e)
γbh = (Δ+e)/(1+e) × γn
γđn = (Δ-1)/(1+e) × γn

**Bảng tóm tắt giá trị các chỉ tiêu:**
| Loại đất | γ (kN/m³) | e | W (%) | Δ |
|----------|-----------|------|------|------|
| Cát chặt | 19-21 | 0.4-0.6 | 8-15 | 2.65 |
| Cát xốp | 16-18 | 0.7-0.9 | 15-25 | 2.65 |
| Á sét | 18-20 | 0.5-0.9 | 15-30 | 2.68-2.72 |
| Sét | 16-20 | 0.6-1.5 | 25-60 | 2.70-2.80 |`,
      sourceRef: src,
    },
    {
      id: 'ch1-s8',
      title: '1.8. Giới hạn Atterberg và trạng thái đất dính',
      content: `Đất dính (sét, á sét) thay đổi trạng thái theo độ ẩm. Các giới hạn Atterberg xác định ranh giới chuyển trạng thái:

**Giới hạn chảy (WL - Liquid Limit):**
Độ ẩm tại đó đất chuyển từ trạng thái dẻo sang trạng thái chảy. Xác định bằng dụng cụ Casagrande: WL ứng với 25 nhát gõ. Hoặc dùng quả nón rơi (cone test).

**Giới hạn dẻo (WP - Plastic Limit):**
Độ ẩm tại đó đất chuyển từ trạng thái nửa cứng sang trạng thái dẻo. Xác định bằng phương pháp ve đất thành que φ3mm — khi que bắt đầu nứt nẻ thì đạt WP.

**Giới hạn co (Ws - Shrinkage Limit):**
Độ ẩm tại đó đất ngừng co khi tiếp tục giảm ẩm.

**Chỉ số dẻo (IP):**
IP = WL - WP
Phạm vi độ ẩm mà đất ở trạng thái dẻo. IP phản ánh hàm lượng hạt sét.
- Á cát: 1 < IP ≤ 7
- Á sét: 7 < IP ≤ 17
- Sét: IP > 17

**Độ sệt (IL - Liquidity Index):**
IL = (W - WP) / IP
Xác định trạng thái hiện tại của đất dính:
| IL | Trạng thái |
|-----|-----------|
| IL < 0 | Cứng |
| 0 ≤ IL < 0.25 | Nửa cứng |
| 0.25 ≤ IL < 0.50 | Dẻo cứng |
| 0.50 ≤ IL < 0.75 | Dẻo mềm |
| 0.75 ≤ IL < 1.00 | Dẻo chảy |
| IL ≥ 1 | Chảy |

IL càng lớn → đất càng mềm yếu → sức chịu tải càng nhỏ.`,
      sourceRef: src,
    },
    {
      id: 'ch1-s9',
      title: '1.9. Phân loại đất',
      content: `Mục đích phân loại: đặt tên đất, dự đoán sơ bộ tính chất, chọn phương pháp thiết kế phù hợp.

**Phân loại đất dính (theo TCVN):**
Dựa vào chỉ số dẻo IP:
- IP ≤ 1: Cát
- 1 < IP ≤ 7: Á cát (sandy silt/clay)
- 7 < IP ≤ 17: Á sét (silty clay)
- IP > 17: Sét (clay)

**Phân loại đất rời (cát, sỏi):**
- Theo thành phần hạt: cát thô, cát vừa, cát mịn, cát bụi
- Theo trạng thái (hệ số rỗng e):
  | Loại cát | Chặt | Chặt vừa | Xốp |
  |----------|------|----------|------|
  | Cát sỏi, thô | e < 0.55 | 0.55-0.70 | e > 0.70 |
  | Cát vừa | e < 0.60 | 0.60-0.75 | e > 0.75 |
  | Cát mịn | e < 0.60 | 0.60-0.80 | e > 0.80 |
  | Cát bụi | e < 0.60 | 0.60-0.80 | e > 0.80 |

**Hệ thống phân loại USCS (Unified Soil Classification System):**
Dùng phổ biến quốc tế. Ký hiệu 2 chữ cái:
- G (gravel), S (sand), M (silt), C (clay), O (organic), Pt (peat)
- W (well-graded), P (poorly-graded), H (high plasticity), L (low plasticity)
VD: SW = cát cấp phối tốt, CH = sét dẻo cao, ML = bụi dẻo thấp.`,
      sourceRef: src,
    },
    {
      id: 'ch1-s10',
      title: '1.10. Kết cấu và cấu trúc đất',
      content: `**Kết cấu đất (soil fabric/structure):** Cách sắp xếp hạt đất trong không gian.

- Kết cấu hạt rời: Hạt tiếp xúc trực tiếp, không có lực liên kết. Đặc trưng cho cát, sỏi.
- Kết cấu tổ ong: Hạt nhỏ tạo cầu nối giữa hạt lớn, tạo lỗ rỗng lớn. Đất á cát, bụi.
- Kết cấu bông: Hạt sét liên kết bởi lực tĩnh điện, cạnh-mặt, tạo kết cấu xốp. Đất sét trầm tích biển.

**Cấu trúc đất (macro-structure):** Đặc điểm phân bố ở quy mô lớn:
- Cấu trúc phân lớp: các lớp đất xen kẽ nhau
- Cấu trúc đồng nhất: tính chất tương đối đều
- Cấu trúc có khe nứt: đất khô co ngót tạo khe nứt

Kết cấu ảnh hưởng lớn đến tính thấm, tính nén lún, sức chống cắt. Đất nguyên dạng (undisturbed) giữ kết cấu tự nhiên; đất phá hủy kết cấu (remolded) mất liên kết, sức chống cắt giảm đáng kể.`,
      sourceRef: src,
    },
  ],

  keyConcepts: [
    { id: 'kc1-1', chapterId: 'ch1', title: 'Mô hình 3 pha', description: 'Đất = pha rắn (hạt) + pha lỏng (nước) + pha khí. Tỷ lệ các pha quyết định tính chất cơ lý. Sơ đồ 3 pha là công cụ cơ bản để thiết lập tất cả quan hệ giữa các chỉ tiêu vật lý.', importance: 'critical', sourceRefs: [src] },
    { id: 'kc1-2', chapterId: 'ch1', title: 'Thành phần hạt & đường cong cấp phối', description: 'Phân nhóm cỡ hạt: cuội, sỏi, cát, bụi, sét. Đường cong cấp phối hạt cho Cu, Cc để đánh giá sự đồng nhất. Cu > 10 → cấp phối tốt.', importance: 'critical', sourceRefs: [src] },
    { id: 'kc1-3', chapterId: 'ch1', title: 'Khoáng vật sét', description: '3 nhóm khoáng vật sét: Kaolinite (2 lớp, ít trương nở), Illite (3 lớp), Montmorillonite (3 lớp, trương nở mạnh). Quyết định tính dẻo IP.', importance: 'important', sourceRefs: [src] },
    { id: 'kc1-4', chapterId: 'ch1', title: 'Nước trong đất', description: 'Nước liên kết chặt (hấp phụ), nước liên kết yếu (màng), nước tự do (mao dẫn + trọng lực). Chỉ nước tự do ảnh hưởng đến thấm và cố kết.', importance: 'important', sourceRefs: [src] },
    { id: 'kc1-5', chapterId: 'ch1', title: 'Giới hạn Atterberg', description: 'WL (giới hạn chảy), WP (giới hạn dẻo), IP = WL - WP (chỉ số dẻo), IL = (W-WP)/IP (độ sệt). Dùng phân loại đất dính và xác định trạng thái.', importance: 'critical', sourceRefs: [src] },
    { id: 'kc1-6', chapterId: 'ch1', title: 'Hệ số rỗng & trạng thái đất rời', description: 'e = Vr/Vh. Đất cát: chặt (e<0.6), chặt vừa (0.6-0.75), xốp (e>0.75). Hệ số rỗng ảnh hưởng trực tiếp đến sức chịu tải.', importance: 'critical', sourceRefs: [src] },
  ],

  formulas: [
    { id: 'f1-1', chapterId: 'ch1', name: 'Trọng lượng thể tích tự nhiên', expression: 'γ = G/V = (Gh + Gn)/V', latex: '\\gamma = \\frac{G}{V}', variables: [{ symbol: 'γ', name: 'TL thể tích tự nhiên', unit: 'kN/m³' }, { symbol: 'G', name: 'Trọng lượng đất', unit: 'kN' }, { symbol: 'V', name: 'Thể tích', unit: 'm³' }], meaning: 'Trọng lượng đất tự nhiên trên một đơn vị thể tích', usageContext: 'Tính ứng suất bản thân, thiết kế nền', sourceRefs: [src] },
    { id: 'f1-2', chapterId: 'ch1', name: 'Trọng lượng riêng hạt', expression: 'γs = Gs/Vs', variables: [{ symbol: 'γs', name: 'TL riêng hạt', unit: 'kN/m³' }, { symbol: 'Gs', name: 'TL phần rắn', unit: 'kN' }], meaning: 'Đặc trưng cho thành phần khoáng vật', usageContext: 'Tính tỷ trọng, hệ số rỗng', sourceRefs: [src] },
    { id: 'f1-3', chapterId: 'ch1', name: 'Tỷ trọng hạt', expression: 'Δ = γs / γn', variables: [{ symbol: 'Δ', name: 'Tỷ trọng hạt' }, { symbol: 'γn', name: 'TL riêng nước', unit: '10 kN/m³' }], meaning: 'Tỷ số TL riêng hạt / TL riêng nước', usageContext: 'Xác định bằng TN bình tỷ trọng', sourceRefs: [src] },
    { id: 'f1-4', chapterId: 'ch1', name: 'Độ ẩm', expression: 'W = Gn/Gh × 100%', latex: 'W = \\frac{G_n}{G_h} \\times 100\\%', variables: [{ symbol: 'W', name: 'Độ ẩm', unit: '%' }, { symbol: 'Gn', name: 'TL nước', unit: 'kN' }, { symbol: 'Gh', name: 'TL hạt khô', unit: 'kN' }], meaning: 'Tỷ lệ nước/hạt khô', usageContext: 'Xác định bằng sấy 105-110°C', sourceRefs: [src] },
    { id: 'f1-5', chapterId: 'ch1', name: 'TL thể tích khô', expression: 'γk = γ/(1+W) = Δ×γn/(1+e)', latex: '\\gamma_k = \\frac{\\gamma}{1+W}', variables: [{ symbol: 'γk', name: 'TL thể tích khô', unit: 'kN/m³' }], meaning: 'Đặc trưng mức độ chặt', usageContext: 'Kiểm soát đầm nén', sourceRefs: [src] },
    { id: 'f1-6', chapterId: 'ch1', name: 'Hệ số rỗng', expression: 'e = Vr/Vh = Δ×γn/γk - 1', latex: 'e = \\frac{V_r}{V_h}', variables: [{ symbol: 'e', name: 'Hệ số rỗng' }], meaning: 'Mức độ rỗng xốp. Có thể > 1', usageContext: 'Phân loại trạng thái cát, tính lún', sourceRefs: [src] },
    { id: 'f1-7', chapterId: 'ch1', name: 'Độ rỗng', expression: 'n = Vr/V = e/(1+e)', variables: [{ symbol: 'n', name: 'Độ rỗng', unit: '%' }], meaning: 'Tỷ lệ lỗ rỗng/tổng thể tích (luôn < 1)', usageContext: 'Ước tính lượng nước bão hòa', sourceRefs: [src] },
    { id: 'f1-8', chapterId: 'ch1', name: 'Độ bão hòa', expression: 'Sr = Vn/Vr = W×Δ/e', variables: [{ symbol: 'Sr', name: 'Độ bão hòa' }], meaning: 'Sr=0: khô, Sr=1: bão hòa', usageContext: 'Đánh giá mức bão hòa, phân loại', sourceRefs: [src] },
    { id: 'f1-9', chapterId: 'ch1', name: 'TL thể tích đẩy nổi', expression: 'γđn = (Δ-1)/(1+e) × γn', latex: '\\gamma_{dn} = \\frac{\\Delta - 1}{1+e} \\gamma_n', variables: [{ symbol: 'γđn', name: 'TL thể tích đẩy nổi', unit: 'kN/m³' }], meaning: 'Dùng cho đất dưới MNN', usageContext: 'Tính ứng suất bản thân dưới MNN', sourceRefs: [src] },
    { id: 'f1-10', chapterId: 'ch1', name: 'Chỉ số dẻo', expression: 'IP = WL - WP', variables: [{ symbol: 'IP', name: 'Chỉ số dẻo', unit: '%' }, { symbol: 'WL', name: 'Giới hạn chảy', unit: '%' }, { symbol: 'WP', name: 'Giới hạn dẻo', unit: '%' }], meaning: 'Phạm vi trạng thái dẻo', usageContext: 'Phân loại: á cát (1-7), á sét (7-17), sét (>17)', sourceRefs: [src] },
    { id: 'f1-11', chapterId: 'ch1', name: 'Độ sệt', expression: 'IL = (W - WP) / IP', variables: [{ symbol: 'IL', name: 'Độ sệt' }, { symbol: 'W', name: 'Độ ẩm TN', unit: '%' }], meaning: 'Trạng thái đất dính hiện tại', usageContext: 'Cứng (IL<0) → chảy (IL≥1)', sourceRefs: [src] },
    { id: 'f1-12', chapterId: 'ch1', name: 'Công thức tổng hợp γ', expression: 'γ = (1+W)×Δ×γn/(1+e)', variables: [{ symbol: 'γ', name: 'TL thể tích', unit: 'kN/m³' }], meaning: 'Tính γ khi biết W, Δ, e', usageContext: 'Bài tập tính chỉ tiêu vật lý', sourceRefs: [src] },
  ],

  workedExamples: [
    {
      id: 'ex1-1', chapterId: 'ch1',
      title: 'Tính toàn bộ chỉ tiêu vật lý từ thí nghiệm',
      problem: 'Một mẫu đất có: khối lượng tự nhiên m = 180g, thể tích V = 95cm³, sau sấy khô mh = 152g. Tỷ trọng Δ = 2.68. Tính: γ, W, γk, e, n, Sr, γđn. Biết WL = 38%, WP = 20%. Phân loại đất và xác định trạng thái.',
      solution: `**Bước 1: γ** = m×g/V = (180/1000)×10 / (95/10⁶) = 18.95 kN/m³
**Bước 2: W** = (180-152)/152 = 28/152 = 0.184 = 18.4%
**Bước 3: γk** = 18.95/(1+0.184) = 16.0 kN/m³
**Bước 4: e** = (Δ×γn)/γk - 1 = (2.68×10)/16.0 - 1 = 0.675
**Bước 5: n** = e/(1+e) = 0.675/1.675 = 40.3%
**Bước 6: Sr** = W×Δ/e = 0.184×2.68/0.675 = 0.730 = 73%
**Bước 7: γđn** = (2.68-1)/(1+0.675)×10 = 10.03 kN/m³
**Phân loại:** IP = WL-WP = 38-20 = 18% > 17 → Sét
**Trạng thái:** IL = (18.4-20)/18 = -0.089 < 0 → Cứng`,
      steps: ['Tính γ = m×g/V', 'Tính W = (m-mh)/mh', 'Tính γk = γ/(1+W)', 'Tính e = Δ×γn/γk - 1', 'Tính n = e/(1+e)', 'Tính Sr = W×Δ/e', 'Tính γđn = (Δ-1)/(1+e)×γn', 'IP = WL - WP → phân loại', 'IL = (W-WP)/IP → trạng thái'],
      sourceRefs: [src],
    },
  ],

  importantNotes: [
    'Ba đại lượng thí nghiệm cơ bản: γ, W, Δ — từ đó tính được tất cả chỉ tiêu còn lại.',
    'γk luôn < γ (vì γk = γ/(1+W)). Chỉ khi W = 0 thì γk = γ.',
    'Hệ số rỗng e CÓ THỂ > 1 (bùn sét: e = 1-3). Nhưng độ rỗng n LUÔN < 1.',
    'Dưới MNN: phải dùng γđn thay cho γ khi tính ứng suất bản thân.',
    'Tỷ trọng Δ phụ thuộc thành phần khoáng. Cát thạch anh: Δ ≈ 2.65. Sét: Δ ≈ 2.70-2.80.',
    'Khi Sr = 1 (bão hòa): e = W×Δ, nên γbh = (Δ+e)/(1+e)×γn.',
    'Phân loại đất dính theo IP: á cát (1<IP≤7), á sét (7<IP≤17), sét (IP>17).',
    'Trạng thái đất dính: IL < 0 (cứng) → IL ≥ 1 (chảy). IL càng lớn → đất càng yếu.',
  ],

  commonMistakes: [
    'Nhầm lẫn ρ (kg/m³) và γ (kN/m³): γ = ρ × g ≈ ρ × 10',
    'Quên chia (1+W) khi tính γk từ γ — kết quả sai hoàn toàn',
    'Nhầm n và e: n luôn < 1 nhưng e có thể > 1',
    'Dùng sai công thức: e = Δ×γn/γk - 1 (không phải γ/γk - 1)',
    'Nhầm WL và WP khi tính IP = WL - WP',
    'Quên dùng γđn dưới mực nước ngầm',
    'Nhầm đơn vị: phải thống nhất hệ SI (kN/m³, kPa)',
  ],

  reviewQuestions: [
    { id: 'rq1-1', chapterId: 'ch1', question: 'Đất gồm mấy pha? Mô tả đặc điểm và vai trò từng pha.', sourceRefs: [src] },
    { id: 'rq1-2', chapterId: 'ch1', question: 'Phân biệt khối lượng riêng (ρs) và khối lượng thể tích (ρ) của đất.', sourceRefs: [src] },
    { id: 'rq1-3', chapterId: 'ch1', question: 'Viết và giải thích công thức liên hệ γ, γk, W.', sourceRefs: [src] },
    { id: 'rq1-4', chapterId: 'ch1', question: 'Giới hạn Atterberg là gì? Ý nghĩa vật lý của IP và IL.', sourceRefs: [src] },
    { id: 'rq1-5', chapterId: 'ch1', question: 'Trình bày cách phân loại đất dính và đất rời.', sourceRefs: [src] },
    { id: 'rq1-6', chapterId: 'ch1', question: 'Tại sao phải dùng γđn khi tính ứng suất dưới MNN?', sourceRefs: [src] },
    { id: 'rq1-7', chapterId: 'ch1', question: 'Phân biệt nước liên kết và nước tự do trong đất.', sourceRefs: [src] },
  ],

  quizzes: [
    { id: 'q1-1', chapterId: 'ch1', type: 'multiple-choice', difficulty: 'nhận biết', question: 'Đất tự nhiên gồm mấy pha?', options: ['2 pha', '3 pha', '4 pha', '1 pha'], correctAnswer: '3 pha', explanation: 'Pha rắn (hạt), pha lỏng (nước), pha khí.', sourceRefs: [src] },
    { id: 'q1-2', chapterId: 'ch1', type: 'multiple-choice', difficulty: 'nhận biết', question: 'Đơn vị của trọng lượng thể tích γ là?', options: ['kg/m³', 'kN/m³', 'kPa', 'g/cm²'], correctAnswer: 'kN/m³', sourceRefs: [src] },
    { id: 'q1-3', chapterId: 'ch1', type: 'true-false', difficulty: 'thông hiểu', question: 'Hệ số rỗng e luôn nhỏ hơn 1.', correctAnswer: 'Sai', explanation: 'e có thể > 1 với đất sét mềm, bùn. Độ rỗng n mới luôn < 1.', sourceRefs: [src] },
    { id: 'q1-4', chapterId: 'ch1', type: 'multiple-choice', difficulty: 'thông hiểu', question: 'IP = 12%. Đất thuộc loại nào?', options: ['Cát', 'Á cát', 'Á sét', 'Sét'], correctAnswer: 'Á sét', explanation: '7 < 12 ≤ 17 → á sét.', sourceRefs: [src] },
    { id: 'q1-5', chapterId: 'ch1', type: 'multiple-choice', difficulty: 'vận dụng', question: 'γ = 18.5 kN/m³, W = 22%, Δ = 2.70. Hệ số rỗng e?', options: ['0.68', '0.78', '0.58', '0.88'], correctAnswer: '0.78', explanation: 'γk=18.5/1.22=15.16; e=2.70×10/15.16-1=0.78.', sourceRefs: [src] },
    { id: 'q1-6', chapterId: 'ch1', type: 'true-false', difficulty: 'nhận biết', question: 'Sr = 1 nghĩa là đất hoàn toàn khô.', correctAnswer: 'Sai', explanation: 'Sr=1: bão hòa hoàn toàn. Sr=0: khô.', sourceRefs: [src] },
    { id: 'q1-7', chapterId: 'ch1', type: 'multiple-choice', difficulty: 'thông hiểu', question: 'Khoáng vật nào trương nở mạnh nhất?', options: ['Kaolinite', 'Illite', 'Montmorillonite', 'Thạch anh'], correctAnswer: 'Montmorillonite', explanation: 'Cấu trúc 3 lớp, liên kết yếu giữa các đơn vị → hút nước trương nở mạnh.', sourceRefs: [src] },
    { id: 'q1-8', chapterId: 'ch1', type: 'short-answer', difficulty: 'vận dụng', question: 'Viết công thức tính γđn.', correctAnswer: 'γđn = (Δ - 1)/(1 + e) × γn', sourceRefs: [src] },
  ],

  exercises: [],
  sourceRefs: [src, { fileId: 'bt-ch1', fileName: 'BT chuong1.docx', fileType: 'exercise', confidence: 'high' }],
};
