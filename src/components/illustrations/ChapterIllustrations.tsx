'use client';

// ============================================================
// Chapter Illustrations — Technical SVG Diagrams
// Cơ Học Đất UTC — All 7 chapters
// ============================================================

interface IllustrationProps {
  width?: number;
  height?: number;
}

// ===== CHAPTER 1: Soil Classification + Physical Properties =====
export function Ch1SoilTriangle({ width = 480, height = 340 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 480 340" width={width} height={height} style={{ fontFamily: 'inherit' }}>
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b8ff6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="480" height="340" fill="rgba(6,10,20,0.6)" rx="12" />
      <text x="240" y="22" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="1">PHÂN LOẠI ĐẤT — ASTM / USCS</text>

      {/* Soil layer diagram */}
      {/* Sand layer */}
      <rect x="40" y="45" width="180" height="52" fill="rgba(234,179,8,0.15)" stroke="rgba(234,179,8,0.4)" strokeWidth="1" rx="4" />
      <text x="50" y="66" fill="#eab308" fontSize="10" fontWeight="600">CÁT (SAND)</text>
      <text x="50" y="82" fill="#94a3b8" fontSize="9">d = 0.075–4.75 mm | Không dính</text>
      <text x="50" y="92" fill="#64748b" fontSize="8">φ = 28°–40° | c ≈ 0</text>

      {/* Silt layer */}
      <rect x="40" y="105" width="180" height="52" fill="rgba(6,182,212,0.12)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" rx="4" />
      <text x="50" y="126" fill="#06b6d4" fontSize="10" fontWeight="600">BỤI / SÉT PHA (SILT)</text>
      <text x="50" y="142" fill="#94a3b8" fontSize="9">d = 0.002–0.075 mm | Ít dính</text>
      <text x="50" y="152" fill="#64748b" fontSize="8">IP = 1–17 | k = 10⁻⁷–10⁻⁵ m/s</text>

      {/* Clay layer */}
      <rect x="40" y="165" width="180" height="52" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.3)" strokeWidth="1" rx="4" />
      <text x="50" y="186" fill="#a855f7" fontSize="10" fontWeight="600">SÉT (CLAY)</text>
      <text x="50" y="202" fill="#94a3b8" fontSize="9">d {"<"} 0.002 mm | Dính</text>
      <text x="50" y="212" fill="#64748b" fontSize="8">IP {">"} 17 | k = 10⁻¹⁰–10⁻⁸ m/s</text>

      {/* Phase diagram */}
      <text x="265" y="42" fill="#94a3b8" fontSize="11" fontWeight="600">SƠ ĐỒ 3 PHA</text>

      {/* Volume column */}
      <rect x="270" y="50" width="50" height="220" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      {/* Air */}
      <rect x="270" y="50" width="50" height="50" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5" />
      <text x="295" y="80" textAnchor="middle" fill="#60a5fa" fontSize="9">KK (Vₐ)</text>
      {/* Water */}
      <rect x="270" y="100" width="50" height="90" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.3)" strokeWidth="0.5" />
      <text x="295" y="150" textAnchor="middle" fill="#67e8f9" fontSize="9">NƯỚC (Vw)</text>
      {/* Solid */}
      <rect x="270" y="190" width="50" height="80" fill="rgba(234,179,8,0.2)" stroke="rgba(234,179,8,0.4)" strokeWidth="0.5" />
      <text x="295" y="235" textAnchor="middle" fill="#fbbf24" fontSize="9">HẠT (Vs)</text>

      {/* Labels left */}
      <line x1="260" y1="50" x2="270" y2="50" stroke="rgba(255,255,255,0.2)" />
      <line x1="260" y1="100" x2="270" y2="100" stroke="rgba(255,255,255,0.2)" />
      <line x1="260" y1="190" x2="270" y2="190" stroke="rgba(255,255,255,0.2)" />
      <line x1="260" y1="270" x2="270" y2="270" stroke="rgba(255,255,255,0.2)" />
      <text x="255" y="75" textAnchor="end" fill="#64748b" fontSize="8">Vv</text>
      <text x="255" y="145" textAnchor="end" fill="#64748b" fontSize="8">V</text>

      {/* Right labels */}
      <line x1="320" y1="50" x2="340" y2="50" stroke="rgba(255,255,255,0.15)" />
      <line x1="320" y1="100" x2="340" y2="100" stroke="rgba(255,255,255,0.15)" />
      <text x="345" y="54" fill="#94a3b8" fontSize="8">Mₐ ≈ 0</text>
      <text x="345" y="114" fill="#94a3b8" fontSize="8">Mw</text>
      <text x="345" y="240" fill="#94a3b8" fontSize="8">Ms</text>

      {/* Key formulas */}
      <rect x="360" y="50" width="110" height="220" fill="rgba(15,20,40,0.8)" stroke="rgba(99,102,241,0.2)" strokeWidth="1" rx="6" />
      <text x="415" y="68" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="600">CHỈ TIÊU VẬT LÝ</text>
      {[
        { y: 88, sym: 'e', eq: '= Vv/Vs', color: '#67e8f9' },
        { y: 108, sym: 'n', eq: '= Vv/V', color: '#67e8f9' },
        { y: 128, sym: 'W', eq: '= Mw/Ms', color: '#fbbf24' },
        { y: 148, sym: 'S', eq: '= Vw/Vv', color: '#6ee7b7' },
        { y: 168, sym: 'γ', eq: '= W/V', color: '#f472b6' },
        { y: 188, sym: 'γd', eq: '= Wd/V', color: '#f472b6' },
        { y: 208, sym: 'Gs', eq: '≈ 2.65–2.75', color: '#a78bfa' },
        { y: 228, sym: 'IP', eq: '= WL - WP', color: '#fb923c' },
        { y: 248, sym: 'IL', eq: '= (W-WP)/IP', color: '#fb923c' },
      ].map(({ y, sym, eq, color }) => (
        <g key={sym}>
          <text x="373" y={y} fill={color} fontSize="9" fontWeight="600">{sym}</text>
          <text x="388" y={y} fill="#94a3b8" fontSize="8">{eq}</text>
        </g>
      ))}

      {/* Bottom note */}
      <text x="240" y="315" textAnchor="middle" fill="#475569" fontSize="9">
        Đất rời: e = 0.5–0.8 | Đất dính: e = 0.8–1.5 | e {"<"} 0.6: chặt
      </text>
    </svg>
  );
}

// ===== CHAPTER 2: Compression Curve + Mohr Circle =====
export function Ch2CompressionMohr({ width = 480, height = 300 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 480 300" width={width} height={height}>
      <rect width="480" height="300" fill="rgba(6,10,20,0.6)" rx="12" />
      <text x="240" y="20" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="1">NÉN CỐ KẾT & VÒNG TRÒN MOHR</text>

      {/* === e-p curve === */}
      <text x="115" y="42" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="600">Đường cong e-p</text>

      {/* Axes */}
      <line x1="30" y1="55" x2="30" y2="200" stroke="#475569" strokeWidth="1" />
      <line x1="30" y1="200" x2="220" y2="200" stroke="#475569" strokeWidth="1" />
      <text x="22" y="60" textAnchor="end" fill="#94a3b8" fontSize="8">e</text>
      <text x="225" y="203" fill="#94a3b8" fontSize="8">p (kPa)</text>

      {/* NC line */}
      <path d="M 35,70 Q 80,100 130,140 Q 170,165 210,190" fill="none" stroke="#3b8ff6" strokeWidth="2" />
      <text x="215" y="188" fill="#3b8ff6" fontSize="8">NC</text>

      {/* OC line */}
      <path d="M 60,90 L 60,115 Q 90,125 130,140" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="38" y="88" fill="#a855f7" fontSize="7">OC</text>

      {/* pc label */}
      <line x1="60" y1="85" x2="60" y2="200" stroke="rgba(245,158,11,0.4)" strokeDasharray="3,2" strokeWidth="0.8" />
      <text x="60" y="210" textAnchor="middle" fill="#f59e0b" fontSize="8">pc</text>

      {/* a = slope annotation */}
      <line x1="90" y1="108" x2="140" y2="150" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <text x="100" y="125" fill="#f59e0b" fontSize="8">a=Δe/Δp</text>

      {/* Grid ticks p */}
      {[50, 100, 150, 200].map((p, i) => {
        const x = 30 + i * 47;
        return (
          <g key={p}>
            <line x1={x} y1="197" x2={x} y2="203" stroke="#475569" />
            <text x={x} y="212" textAnchor="middle" fill="#475569" fontSize="7">{p}</text>
          </g>
        );
      })}

      {/* === Mohr Circle === */}
      <text x="355" y="42" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="600">Vòng tròn Mohr</text>

      {/* Axes */}
      <line x1="250" y1="55" x2="250" y2="220" stroke="#475569" strokeWidth="1" />
      <line x1="245" y1="200" x2="470" y2="200" stroke="#475569" strokeWidth="1" />
      <text x="242" y="60" textAnchor="end" fill="#94a3b8" fontSize="8">τ</text>
      <text x="472" y="203" fill="#94a3b8" fontSize="8">σ</text>

      {/* Mohr circle 1 (small) */}
      <ellipse cx="300" cy="200" rx="30" ry="30" fill="rgba(59,143,246,0.08)" stroke="#3b8ff6" strokeWidth="1.5" />
      {/* Mohr circle 2 (medium) */}
      <ellipse cx="340" cy="200" rx="50" ry="50" fill="rgba(168,85,247,0.06)" stroke="#a855f7" strokeWidth="1.5" />
      {/* Mohr circle 3 (large) */}
      <ellipse cx="395" cy="200" rx="75" ry="75" fill="rgba(244,114,182,0.05)" stroke="#f472b6" strokeWidth="1.5" />

      {/* Failure envelope (common tangent) */}
      <line x1="260" y1="172" x2="465" y2="105" stroke="#fbbf24" strokeWidth="1.5" />
      <text x="460" y="100" fill="#fbbf24" fontSize="8">τ=σtanφ+c</text>

      {/* c intercept */}
      <circle cx="260" cy="172" r="2" fill="#fbbf24" />
      <text x="248" y="170" textAnchor="end" fill="#fbbf24" fontSize="8">c</text>

      {/* φ angle arc */}
      <path d="M 270,200 A 10,10 0 0,0 267,192" fill="none" stroke="#f59e0b" strokeWidth="1" />
      <text x="275" y="196" fill="#f59e0b" fontSize="8">φ</text>

      {/* σ1, σ3 labels */}
      <text x="271" y="212" fill="#94a3b8" fontSize="7">σ₃</text>
      <text x="291" y="212" fill="#94a3b8" fontSize="7">σ₁</text>

      {/* Bottom key */}
      <text x="240" y="260" fill="#475569" fontSize="8">TN nén 1 trục: Eoed=(1+e₁)/a</text>
      <text x="240" y="274" fill="#475569" fontSize="8">Darcy: v = k·i,  (k: 10⁻³ cát → 10⁻¹⁰ sét)</text>
      <text x="240" y="288" fill="#475569" fontSize="8">Mohr-Coulomb: τ = c + σ·tan(φ)</text>
    </svg>
  );
}

// ===== CHAPTER 3: Stress Distribution + Settlement =====
export function Ch3StressSettlement({ width = 480, height = 300 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 480 300" width={width} height={height}>
      <rect width="480" height="300" fill="rgba(6,10,20,0.6)" rx="12" />
      <text x="240" y="20" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="1">ỨNG SUẤT & ĐỘ LÚN NỀN ĐẤT</text>

      {/* === Boussinesq stress bulb === */}
      <text x="120" y="42" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="600">Phân bố ứng suất (Boussinesq)</text>

      {/* Load */}
      <rect x="80" y="48" width="80" height="12" fill="rgba(234,179,8,0.3)" stroke="rgba(234,179,8,0.6)" rx="2" />
      <text x="120" y="58" textAnchor="middle" fill="#fbbf24" fontSize="9">q (tải trọng)</text>
      {/* Load arrows */}
      {[90, 105, 120, 135, 150].map(x => (
        <line key={x} x1={x} y1="60" x2={x} y2="68" stroke="#fbbf24" strokeWidth="1" markerEnd="url(#arr)" />
      ))}

      {/* Ground surface */}
      <line x1="20" y1="68" x2="230" y2="68" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Stress bulbs (isobar lines) */}
      {[
        { ry: 25, rx: 30, cy: 93, color: '#f43f5e', label: '0.8q', ly: 90 },
        { ry: 45, rx: 55, cy: 113, color: '#f97316', label: '0.5q', ly: 130 },
        { ry: 70, rx: 80, cy: 138, color: '#eab308', label: '0.2q', ly: 185 },
        { ry: 95, rx: 105, cy: 163, color: '#22c55e', label: '0.1q', ly: 235 },
      ].map(({ ry, rx, cy, color, label, ly }) => (
        <g key={label}>
          <ellipse cx="120" cy={cy} rx={rx} ry={ry} fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="3,2" opacity="0.7" />
          <text x={120 + rx + 4} y={ly} fill={color} fontSize="7">{label}</text>
        </g>
      ))}

      {/* Depth axis */}
      <line x1="25" y1="68" x2="25" y2="270" stroke="#475569" strokeWidth="1" />
      <text x="18" y="170" textAnchor="middle" fill="#94a3b8" fontSize="8" transform="rotate(-90,18,170)">Độ sâu z</text>

      {/* Center line */}
      <line x1="120" y1="68" x2="120" y2="270" stroke="#475569" strokeDasharray="4,2" strokeWidth="0.5" />

      {/* === Settlement Diagram === */}
      <text x="355" y="42" textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="600">Sơ đồ tính lún</text>

      {/* Soil layers */}
      <rect x="250" y="68" width="210" height="40" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.3)" />
      <text x="355" y="88" textAnchor="middle" fill="#818cf8" fontSize="9">Lớp 1: h₁, E₁ (không chịu lún)</text>

      <rect x="250" y="108" width="210" height="55" fill="rgba(168,85,247,0.15)" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" />
      <text x="355" y="130" textAnchor="middle" fill="#c084fc" fontSize="9" fontWeight="600">Lớp nén lún: h₂, Eoed</text>
      <text x="355" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">S = Σ(σz·h/Eoed)</text>

      <rect x="250" y="163" width="210" height="35" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.2)" />
      <text x="355" y="183" textAnchor="middle" fill="#67e8f9" fontSize="9">Lớp 3: Nền cứng (không lún)</text>

      {/* Stress diagram */}
      <text x="310" y="210" fill="#94a3b8" fontSize="9" fontWeight="600">Ứng suất bản thân σbt:</text>
      <text x="310" y="224" fill="#64748b" fontSize="8">σbt = Σγᵢhᵢ</text>
      <text x="310" y="238" fill="#94a3b8" fontSize="9" fontWeight="600">Điều kiện dừng tính:</text>
      <text x="310" y="252" fill="#64748b" fontSize="8">σz {"<"} 0.2σbt</text>
      <text x="310" y="266" fill="#64748b" fontSize="8">hoặc σz {"<"} 0.1σbt (đất yếu)</text>
    </svg>
  );
}

// ===== CHAPTER 4: Consolidation =====
export function Ch4Consolidation({ width = 480, height = 280 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 480 280" width={width} height={height}>
      <rect width="480" height="280" fill="rgba(6,10,20,0.6)" rx="12" />
      <text x="240" y="20" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="1">LÝ THUYẾT CỐ KẾT TERZAGHI</text>

      {/* === U-t curve === */}
      <text x="115" y="40" textAnchor="middle" fill="#67e8f9" fontSize="10" fontWeight="600">Độ cố kết U(t)</text>

      <line x1="30" y1="50" x2="30" y2="195" stroke="#475569" strokeWidth="1" />
      <line x1="30" y1="195" x2="220" y2="195" stroke="#475569" strokeWidth="1" />
      <text x="18" y="54" fill="#94a3b8" fontSize="8">U%</text>
      <text x="225" y="198" fill="#94a3b8" fontSize="8">t</text>

      {/* U axis ticks */}
      {[0, 25, 50, 75, 100].map((u, i) => {
        const y = 195 - i * (145 / 4);
        return (
          <g key={u}>
            <line x1="27" y1={y} x2="33" y2={y} stroke="#475569" />
            <text x="24" y={y + 3} textAnchor="end" fill="#475569" fontSize="7">{u}</text>
          </g>
        );
      })}

      {/* U-t curve (approximate) */}
      <path d="M 30,195 Q 60,185 90,160 Q 130,130 165,100 Q 190,80 210,65" fill="none" stroke="#3b8ff6" strokeWidth="2" />
      <text x="215" y="63" fill="#3b8ff6" fontSize="8">U(t)</text>

      {/* t90, t50 markers */}
      <line x1="30" y1="158" x2="91" y2="158" stroke="rgba(245,158,11,0.5)" strokeDasharray="3,2" strokeWidth="0.8" />
      <line x1="91" y1="158" x2="91" y2="195" stroke="rgba(245,158,11,0.5)" strokeDasharray="3,2" strokeWidth="0.8" />
      <text x="91" y="207" textAnchor="middle" fill="#f59e0b" fontSize="7">t₅₀</text>
      <text x="24" y="161" textAnchor="end" fill="#f59e0b" fontSize="7">50</text>

      <line x1="30" y1="122" x2="169" y2="122" stroke="rgba(52,211,153,0.5)" strokeDasharray="3,2" strokeWidth="0.8" />
      <line x1="169" y1="122" x2="169" y2="195" stroke="rgba(52,211,153,0.5)" strokeDasharray="3,2" strokeWidth="0.8" />
      <text x="169" y="207" textAnchor="middle" fill="#34d399" fontSize="7">t₉₀</text>
      <text x="24" y="125" textAnchor="end" fill="#34d399" fontSize="7">90</text>

      {/* === e-lgp curve === */}
      <text x="355" y="40" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="600">Đường cong e-lgp</text>

      <line x1="250" y1="50" x2="250" y2="195" stroke="#475569" strokeWidth="1" />
      <line x1="250" y1="195" x2="470" y2="195" stroke="#475569" strokeWidth="1" />
      <text x="240" y="54" fill="#94a3b8" fontSize="8">e</text>
      <text x="472" y="198" fill="#94a3b8" fontSize="8">lgp</text>

      {/* NC line (steep slope Cc) */}
      <line x1="330" y1="80" x2="460" y2="170" stroke="#f43f5e" strokeWidth="2" />
      <text x="465" y="168" fill="#f43f5e" fontSize="8">NC</text>

      {/* OC line (flat slope Cs) + kink at pc */}
      <line x1="260" y1="110" x2="330" y2="120" stroke="#a855f7" strokeWidth="1.5" />
      <line x1="330" y1="120" x2="330" y2="80" stroke="rgba(255,255,255,0.15)" strokeDasharray="3,2" />

      {/* pc marker */}
      <line x1="330" y1="55" x2="330" y2="195" stroke="rgba(245,158,11,0.4)" strokeDasharray="3,2" strokeWidth="0.8" />
      <text x="330" y="207" textAnchor="middle" fill="#f59e0b" fontSize="8">pc</text>

      {/* Cc slope indicator */}
      <line x1="370" y1="113" x2="420" y2="146" stroke="rgba(255,255,255,0.2)" />
      <text x="400" y="120" fill="#f59e0b" fontSize="8">Cc</text>
      <text x="262" y="113" fill="#a78bfa" fontSize="8">Cs</text>

      {/* Formula area */}
      <rect x="250" y="215" width="220" height="55" fill="rgba(15,20,40,0.6)" rx="6" stroke="rgba(99,102,241,0.15)" />
      <text x="260" y="230" fill="#818cf8" fontSize="9" fontWeight="600">Công thức cố kết:</text>
      <text x="260" y="245" fill="#94a3b8" fontSize="8">Cv = k·(1+e)/a·γw</text>
      <text x="260" y="258" fill="#94a3b8" fontSize="8">Tv = Cv·t / Hdr²</text>
      <text x="260" y="271" fill="#94a3b8" fontSize="8">S∞ = Cc·H/(1+e₀)·lg(p₂/p₁)</text>

      {/* Bottom text */}
      <text x="115" y="220" textAnchor="middle" fill="#475569" fontSize="8">Cv: hệ số cố kết</text>
      <text x="115" y="234" textAnchor="middle" fill="#475569" fontSize="8">Tv: nhân tố thời gian</text>
      <text x="115" y="248" textAnchor="middle" fill="#475569" fontSize="8">Hdr: chiều dài đường thoát nước</text>
    </svg>
  );
}

// ===== CHAPTER 5: Bearing Capacity Failure Modes =====
export function Ch5BearingCapacity({ width = 480, height = 300 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 480 300" width={width} height={height}>
      <rect width="480" height="300" fill="rgba(6,10,20,0.6)" rx="12" />
      <text x="240" y="18" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="1">SỨC CHỊU TẢI NỀN ĐẤT — TERZAGHI</text>

      {/* === 3 failure modes === */}
      {/* 1. General shear */}
      <text x="80" y="38" textAnchor="middle" fill="#f43f5e" fontSize="9" fontWeight="600">1. Cắt tổng quát</text>
      <rect x="40" y="45" width="80" height="14" fill="rgba(234,179,8,0.3)" stroke="#eab308" strokeWidth="1" rx="1" />
      <text x="80" y="55" textAnchor="middle" fill="#fbbf24" fontSize="7">Móng</text>
      {/* Failure surface */}
      <path d="M 40,59 Q 65,85 80,105 Q 95,85 120,59" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
      <path d="M 40,59 Q 15,75 20,110 Q 35,130 60,120" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3,2" />
      <path d="M 120,59 Q 145,75 140,110 Q 125,130 100,120" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3,2" />
      {/* Heave */}
      <path d="M 20,100 Q 5,90 10,75" fill="none" stroke="#f43f5e" strokeWidth="1" />
      <path d="M 140,100 Q 155,90 150,75" fill="none" stroke="#f43f5e" strokeWidth="1" />
      <text x="5" y="72" fill="#f43f5e" fontSize="7">↑ trồi</text>
      <text x="148" y="72" fill="#f43f5e" fontSize="7">↑</text>
      <text x="80" y="140" textAnchor="middle" fill="#64748b" fontSize="7">Đất chặt/cứng</text>

      {/* 2. Local shear */}
      <text x="240" y="38" textAnchor="middle" fill="#f97316" fontSize="9" fontWeight="600">2. Cắt cục bộ</text>
      <rect x="200" y="45" width="80" height="14" fill="rgba(234,179,8,0.3)" stroke="#eab308" strokeWidth="1" rx="1" />
      <path d="M 200,59 Q 220,90 240,108 Q 260,90 280,59" fill="none" stroke="#f97316" strokeWidth="1.5" />
      <path d="M 200,59 Q 185,78 190,100" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
      <path d="M 280,59 Q 295,78 290,100" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="2,2" opacity="0.6" />
      <text x="240" y="135" textAnchor="middle" fill="#64748b" fontSize="7">Đất TB — c'=2c/3</text>
      <text x="240" y="145" textAnchor="middle" fill="#64748b" fontSize="7">tanφ'=2tanφ/3</text>

      {/* 3. Punching */}
      <text x="400" y="38" textAnchor="middle" fill="#a855f7" fontSize="9" fontWeight="600">3. Cắt xuyên</text>
      <rect x="360" y="45" width="80" height="14" fill="rgba(234,179,8,0.3)" stroke="#eab308" strokeWidth="1" rx="1" />
      <line x1="360" y1="59" x2="360" y2="115" stroke="#a855f7" strokeWidth="1.5" />
      <line x1="440" y1="59" x2="440" y2="115" stroke="#a855f7" strokeWidth="1.5" />
      <path d="M 360,115 Q 400,125 440,115" fill="none" stroke="#a855f7" strokeWidth="1.5" />
      {/* Settlement arrows */}
      {[380, 400, 420].map(x => (
        <line key={x} x1={x} y1="59" x2={x} y2="90" stroke="#a855f7" strokeWidth="0.8" />
      ))}
      <text x="400" y="138" textAnchor="middle" fill="#64748b" fontSize="7">Đất rời/xốp/yếu</text>
      <text x="400" y="148" textAnchor="middle" fill="#64748b" fontSize="7">Lún thẳng đứng</text>

      {/* Ground line */}
      <line x1="10" y1="59" x2="470" y2="59" stroke="rgba(148,163,184,0.3)" strokeWidth="0.5" strokeDasharray="5,3" />

      {/* === Terzaghi formula === */}
      <rect x="15" y="165" width="450" height="120" fill="rgba(15,20,40,0.7)" rx="8" stroke="rgba(99,102,241,0.2)" />
      <text x="240" y="183" textAnchor="middle" fill="#818cf8" fontSize="10" fontWeight="600">Công thức Terzaghi</text>

      <text x="240" y="204" textAnchor="middle" fill="#f1f5f9" fontSize="12" fontStyle="italic">
        pgh = c·Nc + γ·Df·Nq + 0.5·γ·B·Nγ
      </text>

      <line x1="30" y1="212" x2="450" y2="212" stroke="rgba(255,255,255,0.06)" />

      <text x="50" y="228" fill="#94a3b8" fontSize="8">• Móng băng: hệ số 0.5</text>
      <text x="50" y="242" fill="#94a3b8" fontSize="8">• Móng vuông: pgh = 1.3cNc + γDfNq + 0.4γBNγ</text>
      <text x="50" y="256" fill="#94a3b8" fontSize="8">• Móng tròn: pgh = 1.3cNc + γDfNq + 0.3γBNγ</text>
      <text x="50" y="270" fill="#64748b" fontSize="7">Nc, Nq, Nγ: hệ số SCT tra bảng theo φ  |  [p] = pgh / Fs (Fs = 2÷3)</text>
    </svg>
  );
}

// ===== CHAPTER 6: Earth Pressure (Rankine) =====
export function Ch6EarthPressure({ width = 480, height = 300 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 480 300" width={width} height={height}>
      <rect width="480" height="300" fill="rgba(6,10,20,0.6)" rx="12" />
      <text x="240" y="18" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="1">ÁP LỰC ĐẤT LÊN TƯỜNG CHẮN — RANKINE</text>

      {/* === Retaining wall === */}
      {/* Wall */}
      <rect x="160" y="35" width="20" height="200" fill="rgba(148,163,184,0.2)" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
      <text x="170" y="148" textAnchor="middle" fill="#94a3b8" fontSize="8" transform="rotate(-90,170,148)">TƯỜNG CHẮN</text>

      {/* Soil fill (left) */}
      <rect x="30" y="35" width="130" height="200" fill="rgba(234,179,8,0.08)" />
      <text x="95" y="55" textAnchor="middle" fill="#fbbf24" fontSize="9">ĐẤT LẤP</text>
      <text x="95" y="68" textAnchor="middle" fill="#94a3b8" fontSize="8">c, φ, γ</text>
      {/* Soil hatching */}
      {[50, 80, 110, 140, 170, 200, 230].map((y, i) => (
        <line key={i} x1="30" y1={y} x2={Math.min(160, 30 + (y - 35) * 0.5)} y2={y} stroke="rgba(234,179,8,0.1)" />
      ))}

      {/* Active pressure diagram (triangular) */}
      <polygon points="160,35 145,235 160,235" fill="rgba(239,68,68,0.2)" stroke="#ef4444" strokeWidth="1.5" />
      <text x="140" y="145" textAnchor="end" fill="#ef4444" fontSize="8">σa</text>
      <text x="130" y="250" fill="#ef4444" fontSize="8">Ea=½KaγH²</text>

      {/* Passive side (right) */}
      <rect x="180" y="135" width="130" height="100" fill="rgba(6,182,212,0.08)" />
      <text x="245" y="165" textAnchor="middle" fill="#67e8f9" fontSize="9">ĐẤT BỊ ĐỘNG</text>
      <polygon points="180,135 220,235 180,235" fill="rgba(6,182,212,0.2)" stroke="#06b6d4" strokeWidth="1.5" />
      <text x="225" y="195" fill="#06b6d4" fontSize="8">σp</text>

      {/* H label */}
      <line x1="20" y1="35" x2="20" y2="235" stroke="#475569" strokeWidth="0.8" />
      <line x1="15" y1="35" x2="25" y2="35" stroke="#475569" />
      <line x1="15" y1="235" x2="25" y2="235" stroke="#475569" />
      <text x="12" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9" transform="rotate(-90,12,140)">H</text>

      {/* H/3 point */}
      <circle cx="145" cy="168" r="3" fill="#fbbf24" />
      <text x="143" y="175" textAnchor="end" fill="#fbbf24" fontSize="7">H/3</text>

      {/* === Formula Panel === */}
      <rect x="320" y="35" width="145" height="235" fill="rgba(15,20,40,0.8)" rx="8" stroke="rgba(99,102,241,0.2)" />
      <text x="393" y="54" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="600">Lý thuyết Rankine</text>

      {[
        { y: 74, text: 'Ka = tan²(45−φ/2)', color: '#ef4444', label: 'Chủ động' },
        { y: 94, text: '= (1−sinφ)/(1+sinφ)', color: '#ef4444', label: '' },
        { y: 118, text: 'Kp = tan²(45+φ/2)', color: '#06b6d4', label: 'Bị động' },
        { y: 138, text: '= (1+sinφ)/(1−sinφ)', color: '#06b6d4', label: '' },
        { y: 162, text: 'K₀ = 1 − sinφ', color: '#a855f7', label: 'Tĩnh (Jaky)' },
      ].map(({ y, text, color, label }) => (
        <g key={y}>
          {label && <text x="330" y={y - 10} fill="#475569" fontSize="7">{label}:</text>}
          <text x="330" y={y} fill={color} fontSize="8" fontStyle="italic">{text}</text>
        </g>
      ))}

      <line x1="328" y1="178" x2="458" y2="178" stroke="rgba(255,255,255,0.06)" />

      <text x="330" y="194" fill="#475569" fontSize="7">Ka {'<'} K₀ {'<'} Kp (luôn đúng)</text>
      <text x="330" y="210" fill="#94a3b8" fontSize="8">Đất rời (c=0):</text>
      <text x="330" y="224" fill="#67e8f9" fontSize="8">σa = Ka·γ·z</text>
      <text x="330" y="240" fill="#94a3b8" fontSize="8">Đất dính (c{">"} 0):</text>
      <text x="330" y="254" fill="#67e8f9" fontSize="8">σa = Ka·γ·z − 2c√Ka</text>
      <text x="330" y="264" fill="#475569" fontSize="7">zc = 2c/(γ√Ka)</text>
    </svg>
  );
}

// ===== CHAPTER 7: Slope Stability (Fellenius) =====
export function Ch7SlopeStability({ width = 480, height = 300 }: IllustrationProps) {
  return (
    <svg viewBox="0 0 480 300" width={width} height={height}>
      <rect width="480" height="300" fill="rgba(6,10,20,0.6)" rx="12" />
      <text x="240" y="18" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600" letterSpacing="1">ỔN ĐỊNH MÁI DỐC — FELLENIUS</text>

      {/* Slope geometry */}
      {/* Ground */}
      <polygon
        points="20,240 200,240 200,80 330,80 330,240 460,240"
        fill="rgba(120,100,60,0.12)"
        stroke="rgba(180,150,80,0.4)"
        strokeWidth="1.5"
      />

      {/* Slope shading */}
      <polygon
        points="200,240 330,80 330,240"
        fill="rgba(120,100,60,0.2)"
        stroke="rgba(180,150,80,0.5)"
        strokeWidth="1"
      />

      {/* Slip circle */}
      <circle cx="330" cy="80" r="180" fill="none" stroke="rgba(239,68,68,0.6)" strokeWidth="2" strokeDasharray="6,3" />

      {/* Slice dividers */}
      {[210, 235, 260, 285, 310].map((x, i) => {
        const angle = Math.acos((x - 330) / 180);
        const y = 80 + 180 * Math.sin(Math.PI - angle);
        return (
          <line key={i} x1={x} y1={240} x2={x} y2={Math.min(240, y)} stroke="rgba(59,143,246,0.4)" strokeWidth="0.8" />
        );
      })}

      {/* Single slice force diagram */}
      <g transform="translate(255,175)">
        {/* Slice */}
        <rect x="-12" y="-40" width="24" height="50" fill="rgba(99,102,241,0.15)" stroke="#818cf8" strokeWidth="0.8" />
        {/* W arrow (down) */}
        <line x1="0" y1="-40" x2="0" y2="-65" stroke="#fbbf24" strokeWidth="1.5" />
        <polygon points="0,-65 -3,-55 3,-55" fill="#fbbf24" />
        <text x="5" y="-68" fill="#fbbf24" fontSize="7">Wᵢ</text>
        {/* N arrow (perpendicular) */}
        <line x1="0" y1="10" x2="15" y2="25" stroke="#67e8f9" strokeWidth="1.2" />
        <text x="18" y="28" fill="#67e8f9" fontSize="7">Nᵢ</text>
        {/* T arrow (tangential) */}
        <line x1="0" y1="10" x2="-12" y2="22" stroke="#f472b6" strokeWidth="1.2" />
        <text x="-30" y="26" fill="#f472b6" fontSize="7">Tᵢ</text>
        {/* Alpha angle */}
        <path d="M 0,10 A 10,10 0 0,1 8,17" fill="none" stroke="#f59e0b" strokeWidth="0.8" />
        <text x="10" y="10" fill="#f59e0b" fontSize="7">α</text>
      </g>

      {/* Center of circle */}
      <circle cx="330" cy="80" r="4" fill="none" stroke="#ef4444" strokeWidth="1.5" />
      <line x1="330" y1="76" x2="330" y2="84" stroke="#ef4444" />
      <line x1="326" y1="80" x2="334" y2="80" stroke="#ef4444" />
      <text x="335" y="78" fill="#ef4444" fontSize="8">O</text>

      {/* Radius line */}
      <line x1="330" y1="80" x2="256" y2="222" stroke="rgba(239,68,68,0.3)" strokeWidth="0.8" strokeDasharray="3,2" />
      <text x="285" y="162" fill="#ef4444" fontSize="8">R</text>

      {/* === Formula panel === */}
      <rect x="345" y="85" width="125" height="185" fill="rgba(15,20,40,0.85)" rx="8" stroke="rgba(99,102,241,0.2)" />
      <text x="408" y="102" textAnchor="middle" fill="#818cf8" fontSize="9" fontWeight="600">PP Fellenius</text>

      <text x="354" y="118" fill="#94a3b8" fontSize="8">Fs = ΣMc / ΣMt</text>
      <line x1="352" y1="124" x2="462" y2="124" stroke="rgba(255,255,255,0.06)" />

      <text x="354" y="138" fill="#67e8f9" fontSize="7">Nᵢ = Wᵢ·cosαᵢ</text>
      <text x="354" y="150" fill="#67e8f9" fontSize="7">Tᵢ = Wᵢ·sinαᵢ</text>
      <text x="354" y="162" fill="#67e8f9" fontSize="7">lᵢ = bᵢ/cosαᵢ</text>

      <line x1="352" y1="168" x2="462" y2="168" stroke="rgba(255,255,255,0.06)" />
      <text x="354" y="180" fill="#f1f5f9" fontSize="7">Fs = Σ(cᵢlᵢ+Nᵢtanφᵢ)</text>
      <text x="354" y="192" fill="#f1f5f9" fontSize="7">     / Σ(Wᵢsinαᵢ)</text>

      <line x1="352" y1="198" x2="462" y2="198" stroke="rgba(255,255,255,0.06)" />
      <text x="354" y="210" fill="#94a3b8" fontSize="7">Tiêu chuẩn ổn định:</text>
      <text x="354" y="222" fill="#22c55e" fontSize="7">Fs {">"} [Fs]</text>
      <text x="354" y="234" fill="#94a3b8" fontSize="7">Tạm: [Fs] = 1.1–1.2</text>
      <text x="354" y="246" fill="#94a3b8" fontSize="7">Vĩnh cửu: 1.3–1.5</text>
      <text x="354" y="258" fill="#94a3b8" fontSize="7">Đập lớn: 1.5–2.0</text>

      {/* Slope angle label */}
      <text x="100" y="255" fill="#475569" fontSize="8">Góc mái dốc β</text>
      <text x="100" y="268" fill="#475569" fontSize="8">Tìm Fs_min → lưới thử tâm</text>
    </svg>
  );
}

// ===== MASTER COMPONENT — pick by chapterId =====
interface ChapterIllustrationProps {
  chapterId: string;
  compact?: boolean;
}

export function ChapterIllustration({ chapterId, compact = false }: ChapterIllustrationProps) {
  const w = compact ? 340 : 480;
  const h = compact ? 220 : 300;

  const map: Record<string, JSX.Element> = {
    ch1: <Ch1SoilTriangle width={w} height={h} />,
    ch2: <Ch2CompressionMohr width={w} height={h} />,
    ch3: <Ch3StressSettlement width={w} height={h} />,
    ch4: <Ch4Consolidation width={w} height={compact ? 200 : 280} />,
    ch5: <Ch5BearingCapacity width={w} height={h} />,
    ch6: <Ch6EarthPressure width={w} height={h} />,
    ch7: <Ch7SlopeStability width={w} height={h} />,
  };

  const illustration = map[chapterId];
  if (!illustration) return null;

  return (
    <div style={{
      borderRadius: '0.75rem',
      overflow: 'hidden',
      border: '1px solid rgba(99,102,241,0.1)',
      background: 'rgba(6,10,20,0.6)',
    }}>
      <div style={{
        padding: '0.5rem 0.75rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(15,20,40,0.5)',
      }}>
        <span style={{ fontSize: '0.65rem', color: 'rgba(148,163,184,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          📐 Hình vẽ minh họa kỹ thuật
        </span>
      </div>
      <div style={{ padding: '0.5rem', overflowX: 'auto', display: 'flex', justifyContent: 'center' }}>
        {illustration}
      </div>
    </div>
  );
}
