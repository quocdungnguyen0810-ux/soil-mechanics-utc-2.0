/**
 * Shared Lab Calculation Engine
 * Used by both LabModule (interactive) and ReportModule (PDF export)
 * 
 * Each lab has its own calculation function based on lab ID.
 * Handles: lab1 (moisture), lab2 (Atterberg limits), lab4 (specific gravity),
 *          lab5 (unit weight), lab6 (shear), lab7 (consolidation)
 */

export function calculateLabResults(
  labId: string,
  data: Record<string, number | string>
): Record<string, any>[] {
  switch (labId) {
    case 'lab1':
      return calcLab1Moisture(data);
    case 'lab2':
      return calcLab2Atterberg(data);
    case 'lab4':
      return calcLab4SpecificGravity(data);
    case 'lab5':
      return calcLab5UnitWeight(data);
    case 'lab6':
      return calcLab6Shear(data);
    case 'lab7':
      return calcLab7Consolidation(data);
    default:
      return [];
  }
}

/** Lab 1: Độ ẩm tự nhiên — W = (m₁-m₂)/(m₂-m₀) × 100% */
function calcLab1Moisture(data: Record<string, any>): Record<string, any>[] {
  const results: Record<string, any>[] = [];
  for (let i = 1; i <= 2; i++) {
    const m0 = parseFloat(data[`lab1-m0-${i}`]) || 0;
    const m1 = parseFloat(data[`lab1-m1-${i}`]) || 0;
    const m2 = parseFloat(data[`lab1-m2-${i}`]) || 0;
    if (m0 && m1 && m2) {
      const mn = m1 - m2;      // khối lượng nước
      const mh = m2 - m0;      // khối lượng hạt khô
      const W = mh > 0 ? (mn / mh) * 100 : 0;
      results.push({ sample: `Mẫu ${i}`, m0, m1, m2, mn, mh, W });
    }
  }
  return results;
}

/** Lab 2: Giới hạn chảy, dẻo — IP = WL - WP */
function calcLab2Atterberg(data: Record<string, any>): Record<string, any>[] {
  const WL = parseFloat(data['lab2-wl']) || 0;
  const WP = parseFloat(data['lab2-wp']) || 0;
  if (WL && WP) {
    const IP = WL - WP;
    return [{ WL, WP, IP }];
  }
  return [];
}

/** Lab 4: Tỷ trọng — Δ = mh/(m₁ + mh - m₂) */
function calcLab4SpecificGravity(data: Record<string, any>): Record<string, any>[] {
  const m1 = parseFloat(data['lab4-m1-1']) || 0;
  const mh = parseFloat(data['lab4-mh-1']) || 0;
  const m2 = parseFloat(data['lab4-m2-1']) || 0;
  if (m1 && mh && m2) {
    const denom = m1 + mh - m2;
    const delta = denom > 0 ? mh / denom : 0;
    return [{ sample: 'Mẫu 1', m1, mh, m2, delta }];
  }
  return [];
}

/** Lab 5: Khối lượng thể tích — ρ = (m₁-m₀)/V */
function calcLab5UnitWeight(data: Record<string, any>): Record<string, any>[] {
  const m0 = parseFloat(data['lab5-m0']) || 0;
  const V = parseFloat(data['lab5-V']) || 0;
  const m1 = parseFloat(data['lab5-m1']) || 0;
  if (m0 && V && m1) {
    const rho = (m1 - m0) / V;
    const gamma = rho * 10;
    return [{ m0, V, m1, rho, gamma }];
  }
  return [];
}

/** Lab 6: Sức chống cắt — τ = σ tanφ + c */
function calcLab6Shear(data: Record<string, any>): Record<string, any>[] {
  const results: Record<string, any>[] = [];
  for (let i = 1; i <= 3; i++) {
    const sigma = parseFloat(data[`lab6-s${i}`]) || 0;
    const tau = parseFloat(data[`lab6-t${i}`]) || 0;
    if (sigma || tau) results.push({ sigma, tau });
  }
  return results;
}

/** Lab 7: Nén cố kết — eᵢ = e₀ - (1+e₀)×ΔHᵢ/H₀ */
function calcLab7Consolidation(data: Record<string, any>): Record<string, any>[] {
  const e0 = parseFloat(data['lab7-e0']) || 0;
  const H0 = parseFloat(data['lab7-H0']) || 0;
  const results: Record<string, any>[] = [];
  for (let i = 1; i <= 4; i++) {
    const p = parseFloat(data[`lab7-p${i}`]) || 0;
    const dH = parseFloat(data[`lab7-dH${i}`]) || 0;
    if (p && H0) {
      const e = e0 - (1 + e0) * dH / H0;
      results.push({ p, dH, e, a: 0 });
    }
  }
  // Calculate coefficient of compressibility between consecutive levels
  for (let i = 1; i < results.length; i++) {
    const de = results[i - 1].e - results[i].e;
    const dp = results[i].p - results[i - 1].p;
    results[i].a = dp > 0 ? de / dp : 0;
  }
  return results;
}
