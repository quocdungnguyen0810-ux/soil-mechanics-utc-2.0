// ============================================================
// KaTeX Rendering Utilities — Cơ Học Đất UTC
// Professional MathType-quality formula rendering
// ============================================================

import katex from 'katex';

// Vietnamese soil mechanics KaTeX macros (single-backslash for runtime)
const SOIL_MACROS: Record<string, string> = {
  '\\dn':    '\\text{đn}',
  '\\bh':    '\\text{bh}',
  '\\bt':    '\\text{bt}',
  '\\gh':    '\\text{gh}',
  '\\oed':   '\\text{oed}',
  '\\cp':    '\\text{cp}',
  '\\kN':    '\\,\\text{kN}',
  '\\kPa':   '\\,\\text{kPa}',
};

const KATEX_OPTIONS: katex.KatexOptions = {
  throwOnError: false,
  errorColor: '#f43f5e',
  strict: false,
  trust: true,
  macros: SOIL_MACROS,
};

/**
 * Render a LaTeX string to HTML using KaTeX.
 * Returns safe HTML string for dangerouslySetInnerHTML.
 */
export function renderLatex(latex: string, displayMode = true): string {
  if (!latex || !latex.trim()) return '';
  try {
    return katex.renderToString(latex, { ...KATEX_OPTIONS, displayMode });
  } catch {
    // Fallback: render without strict options
    try {
      return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return `<span class="katex-error">${escapeHtml(latex)}</span>`;
    }
  }
}

/**
 * Render an inline symbol or short formula (for variable names in tables).
 */
export function renderSymbol(text: string): string {
  if (!text) return '';
  // If it looks like LaTeX (contains letters with subscripts/superscripts)
  if (/[_^{}\\]/.test(text)) {
    return renderLatex(text, false);
  }
  return escapeHtml(text);
}

/**
 * Process text containing mixed LaTeX ($...$) and plain text.
 * Supports $$...$$ for display math blocks.
 */
export function renderTextWithLatex(text: string): string {
  if (!text) return '';

  let result = '';
  let remaining = text;

  while (remaining.length > 0) {
    // Display math: $$...$$
    const ddIdx = remaining.indexOf('$$');
    const sIdx = remaining.indexOf('$');

    if (ddIdx !== -1 && ddIdx === sIdx) {
      // starts with $$
      const closeIdx = remaining.indexOf('$$', 2);
      if (closeIdx !== -1) {
        result += escapeHtml(remaining.slice(0, ddIdx));
        const latex = remaining.slice(ddIdx + 2, closeIdx);
        result += `<span class="katex-display-wrapper">${renderLatex(latex, true)}</span>`;
        remaining = remaining.slice(closeIdx + 2);
        continue;
      }
    }

    if (sIdx !== -1) {
      // inline math $...$
      const closeIdx = remaining.indexOf('$', sIdx + 1);
      if (closeIdx !== -1 && closeIdx !== sIdx) {
        result += escapeHtml(remaining.slice(0, sIdx));
        const latex = remaining.slice(sIdx + 1, closeIdx);
        result += renderLatex(latex, false);
        remaining = remaining.slice(closeIdx + 1);
        continue;
      }
    }

    // no more math
    result += escapeHtml(remaining);
    break;
  }

  return result;
}

/**
 * Check if a string contains LaTeX notation.
 */
export function hasLatex(text: string): boolean {
  return /\$[^$]+\$/.test(text) || /\\[a-zA-Z]/.test(text) || /[_^]/.test(text);
}

/**
 * Escape HTML special characters.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
