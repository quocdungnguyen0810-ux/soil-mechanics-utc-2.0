'use client';

import { useState, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { allLabs, getLabById } from '@/lib/data/labs';
import { calculateLabResults } from '@/lib/labCalculations';

export function ReportModule() {
  const { selectedLabId, studentInfo, setStudentInfo, labInputData } = useAppStore();
  const [activeSection, setActiveSection] = useState<'info' | 'preview'>('info');
  const reportRef = useRef<HTMLDivElement>(null);

  const lab = selectedLabId ? getLabById(selectedLabId) : allLabs[0];

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      html2pdf()
        .set({
          margin: 10,
          filename: `Bao_cao_TN_${lab?.labNumber || ''}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(reportRef.current)
        .save();
    } catch (err) {
      console.error('PDF export error:', err);
      alert('Lỗi xuất PDF. Hãy thử in (Ctrl+P) thay thế.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div className="mb-8 no-print">
        <h1 className="font-display text-3xl font-bold mb-3">📋 Báo cáo thí nghiệm</h1>
        <p className="text-dark-300">Tạo báo cáo tự động theo mẫu báo cáo thí nghiệm Cơ học đất UTC.</p>
      </div>

      {/* Section tabs */}
      <div className="flex gap-1 mb-6 no-print">
        <button
          onClick={() => setActiveSection('info')}
          className={`tab-btn ${activeSection === 'info' ? 'active' : ''}`}
        >
          Thông tin sinh viên
        </button>
        <button
          onClick={() => setActiveSection('preview')}
          className={`tab-btn ${activeSection === 'preview' ? 'active' : ''}`}
        >
          Xem trước & Xuất
        </button>
      </div>

      {activeSection === 'info' && <StudentInfoForm />}
      {activeSection === 'preview' && (
        <div>
          {/* Export buttons */}
          <div className="flex gap-3 mb-6 no-print">
            <button onClick={handleExportPDF} className="btn-primary">
              📥 Xuất PDF
            </button>
            <button onClick={handlePrint} className="btn-secondary">
              🖨️ In báo cáo
            </button>
          </div>

          {/* Report preview */}
          <div ref={reportRef}>
            <ReportPreview lab={lab} />
          </div>
        </div>
      )}
    </div>
  );
}

function StudentInfoForm() {
  const { studentInfo, setStudentInfo } = useAppStore();

  const fields: { key: keyof typeof studentInfo; label: string; placeholder: string }[] = [
    { key: 'studentName', label: 'Họ và tên', placeholder: 'Nguyễn Văn A' },
    { key: 'studentId', label: 'Mã sinh viên', placeholder: '2011XXXX' },
    { key: 'className', label: 'Lớp', placeholder: 'Cầu đường - K62' },
    { key: 'courseYear', label: 'Khóa', placeholder: 'K62' },
    { key: 'group', label: 'Nhóm', placeholder: '1' },
    { key: 'team', label: 'Tổ', placeholder: '1' },
    { key: 'labDate', label: 'Ngày thí nghiệm', placeholder: '01/01/2026' },
    { key: 'instructor', label: 'Giáo viên hướng dẫn', placeholder: 'TS. Nguyễn Văn B' },
  ];

  return (
    <div className="glass-card">
      <h3 className="font-display font-semibold text-lg mb-4">👤 Thông tin sinh viên</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-xs text-dark-400 mb-1 block">{label}</label>
            <input
              type="text"
              value={studentInfo[key]}
              onChange={(e) => setStudentInfo({ [key]: e.target.value })}
              placeholder={placeholder}
              className="input-field"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportPreview({ lab }: { lab: any }) {
  const { studentInfo, labInputData } = useAppStore();

  if (!lab) return null;

  const data = labInputData[lab.id] || {};
  const results = calculateLabResults(lab.id, data);

  return (
    <div className="bg-white text-black p-8 rounded-xl" style={{ fontFamily: "'Times New Roman', serif", fontSize: '13px', lineHeight: '1.6' }}>
      {/* Header */}
      <div className="text-center mb-6" style={{ borderBottom: '2px solid black', paddingBottom: '12px' }}>
        <p style={{ fontSize: '13px', fontWeight: 'bold' }}>BỘ GIÁO DỤC VÀ ĐÀO TẠO</p>
        <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{studentInfo.universityName}</p>
        <p style={{ fontSize: '13px' }}>{studentInfo.facultyName}</p>
        <p style={{ fontSize: '13px' }}>{studentInfo.departmentName}</p>
        <div style={{ margin: '16px 0' }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold' }}>BÁO CÁO THÍ NGHIỆM</p>
          <p style={{ fontSize: '16px', fontWeight: 'bold' }}>CƠ HỌC ĐẤT</p>
        </div>
      </div>

      {/* Student Info */}
      <div className="mb-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px', fontSize: '13px' }}>
        <p>Họ và tên: <strong>{studentInfo.studentName || '.....................'}</strong></p>
        <p>MSSV: <strong>{studentInfo.studentId || '.....................'}</strong></p>
        <p>Lớp: <strong>{studentInfo.className || '.....................'}</strong></p>
        <p>Khóa: <strong>{studentInfo.courseYear || '.....................'}</strong></p>
        <p>Nhóm: <strong>{studentInfo.group || '.....................'}</strong></p>
        <p>Tổ: <strong>{studentInfo.team || '.....................'}</strong></p>
        <p>Ngày TN: <strong>{studentInfo.labDate || '.....................'}</strong></p>
        <p>GVHD: <strong>{studentInfo.instructor || '.....................'}</strong></p>
      </div>

      {/* Lab content */}
      <div style={{ borderTop: '1px solid #ccc', paddingTop: '16px' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 'bold', textAlign: 'center', margin: '16px 0' }}>
          BÀI {lab.labNumber}: {lab.title.toUpperCase()}
        </h2>

        {/* Objective */}
        <div className="mb-4">
          <p style={{ fontWeight: 'bold' }}>I. MỤC ĐÍCH THÍ NGHIỆM</p>
          <p style={{ paddingLeft: '16px' }}>{lab.objective}</p>
        </div>

        {/* Principle */}
        <div className="mb-4">
          <p style={{ fontWeight: 'bold' }}>II. NGUYÊN LÝ - QUY TRÌNH</p>
          <p style={{ paddingLeft: '16px' }}>{lab.principle}</p>
        </div>

        {/* Formulas */}
        {lab.formulas.length > 0 && (
          <div className="mb-4">
            <p style={{ fontWeight: 'bold' }}>III. CÔNG THỨC TÍNH</p>
            {lab.formulas.map((f: any) => (
              <p key={f.id} style={{ paddingLeft: '16px', fontFamily: "'Courier New', monospace", fontSize: '13px' }}>
                {f.expression}
              </p>
            ))}
          </div>
        )}

        {/* Results table */}
        <div className="mb-4">
          <p style={{ fontWeight: 'bold' }}>IV. SỐ LIỆU VÀ KẾT QUẢ</p>
          {results.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0', fontSize: '12px' }}>
              <thead>
                <tr>
                  {lab.resultTableSchema.map((col: any) => (
                    <th key={col.key} style={{ border: '1px solid black', padding: '6px', textAlign: 'center', background: '#f5f5f5' }}>
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row: any, i: number) => (
                  <tr key={i}>
                    {lab.resultTableSchema.map((col: any) => (
                      <td key={col.key} style={{ border: '1px solid black', padding: '6px', textAlign: 'center' }}>
                        {row[col.key] !== undefined ? (typeof row[col.key] === 'number' ? (row[col.key] as number).toFixed(3) : row[col.key]) : ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ paddingLeft: '16px', color: '#888', fontStyle: 'italic' }}>Chưa có dữ liệu. Vui lòng nhập dữ liệu trong phần Thí nghiệm.</p>
          )}
        </div>

        {/* Questions */}
        {lab.questions.length > 0 && (
          <div className="mb-4">
            <p style={{ fontWeight: 'bold' }}>V. CÂU HỎI</p>
            {lab.questions.map((q: any, i: number) => (
              <div key={q.id} style={{ paddingLeft: '16px', marginBottom: '8px' }}>
                <p><strong>Câu {i + 1}:</strong> {q.question}</p>
                <p style={{ paddingLeft: '16px' }}><em>Trả lời:</em> {q.suggestedAnswer || '..............................'}</p>
              </div>
            ))}
          </div>
        )}

        {/* Remarks */}
        <div className="mb-4">
          <p style={{ fontWeight: 'bold' }}>VI. NHẬN XÉT</p>
          <p style={{ paddingLeft: '16px' }}>.......................................................................................</p>
          <p style={{ paddingLeft: '16px' }}>.......................................................................................</p>
        </div>

        {/* Signature */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold' }}>GIÁO VIÊN HƯỚNG DẪN</p>
            <p style={{ fontSize: '11px', fontStyle: 'italic' }}>(Ký và ghi rõ họ tên)</p>
            <div style={{ height: '60px' }} />
            <p>{studentInfo.instructor || '.....................'}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 'bold' }}>SINH VIÊN</p>
            <p style={{ fontSize: '11px', fontStyle: 'italic' }}>(Ký và ghi rõ họ tên)</p>
            <div style={{ height: '60px' }} />
            <p>{studentInfo.studentName || '.....................'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}


