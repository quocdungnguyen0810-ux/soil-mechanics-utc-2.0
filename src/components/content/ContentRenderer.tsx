'use client';

import React from 'react';
import { renderLatex } from '@/lib/utils/katex';

interface ContentRendererProps {
  content: string;
  className?: string;
}

/**
 * Rich content renderer that supports:
 * - Bold text (**...**)
 * - Inline LaTeX ($...$)
 * - Bullet/numbered lists
 * - Markdown-style tables
 * - Auto paragraph spacing
 */
export function ContentRenderer({ content, className = '' }: ContentRendererProps) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    // Detect table rows
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      tableBuffer.push(trimmed);
      inTable = true;
      continue;
    }

    // End of table — flush buffer
    if (inTable) {
      elements.push(<ContentTable key={`table-${i}`} rows={tableBuffer} />);
      tableBuffer = [];
      inTable = false;
    }

    if (!trimmed) {
      elements.push(<br key={i} />);
      continue;
    }

    // Bold headers
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      elements.push(
        <p key={i} className="font-semibold text-white mt-4 mb-1.5 text-sm">
          {trimmed.replace(/\*\*/g, '')}
        </p>
      );
      continue;
    }

    // Bullet list
    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      elements.push(
        <p key={i} className="pl-4 text-dark-200 text-sm leading-relaxed">
          {'  '}• {renderInlineContent(trimmed.substring(2))}
        </p>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(trimmed)) {
      elements.push(
        <p key={i} className="pl-4 text-dark-200 text-sm leading-relaxed">
          {'  '}{renderInlineContent(trimmed)}
        </p>
      );
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-sm text-dark-200 leading-relaxed">
        {renderInlineContent(trimmed)}
      </p>
    );
  }

  // Flush trailing table
  if (inTable && tableBuffer.length > 0) {
    elements.push(<ContentTable key="table-end" rows={tableBuffer} />);
  }

  return <div className={`prose-content space-y-0.5 ${className}`}>{elements}</div>;
}

/**
 * Render inline content with bold (**...**) and LaTeX ($...$) support.
 */
function renderInlineContent(text: string): React.ReactNode {
  // Split by LaTeX and bold patterns
  const parts = text.split(/(\$[^$]+\$|\*\*[^*]+\*\*)/g);

  return parts.map((part, i) => {
    // Inline LaTeX
    if (part.startsWith('$') && part.endsWith('$')) {
      const latex = part.slice(1, -1);
      try {
        const html = renderLatex(latex, false);
        return <span key={i} className="katex-inline" dangerouslySetInnerHTML={{ __html: html }} />;
      } catch {
        return <code key={i} className="text-cyan-300 text-xs font-mono">{latex}</code>;
      }
    }

    // Bold
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }

    return <span key={i}>{part}</span>;
  });
}

/**
 * Render a markdown-style table from rows.
 */
function ContentTable({ rows }: { rows: string[] }) {
  if (rows.length === 0) return null;

  // Parse cells
  const parsedRows = rows.map((row) =>
    row.split('|').filter((c) => c.trim()).map((c) => c.trim())
  );

  // Detect separator row (----) — avoid regex with backslash-s to prevent Tailwind scanner issue
  const isSeparatorCell = (c: string) => c.trim().length > 0 && c.replace(/[-: ]/g, '').length === 0;
  const hasSeparator = parsedRows.length > 1 && parsedRows[1].every(isSeparatorCell);
  const headerRow = parsedRows[0];
  const dataRows = hasSeparator ? parsedRows.slice(2) : parsedRows.slice(1);

  return (
    <div className="my-3 overflow-x-auto">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            {headerRow.map((cell, i) => (
              <th key={i} className="px-3 py-2 text-left text-dark-400 font-medium border-b border-white/10 bg-white/[0.02]">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataRows.map((row, ri) => (
            <tr key={ri} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-1.5 text-dark-300">
                  {renderInlineContent(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
