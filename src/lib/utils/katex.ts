// ============================================================
// KaTeX Rendering Utilities — Cơ Học Đất UTC
// Professional MathType-quality formula rendering
// ============================================================

import katex from 'katex';

/**
 * Normalize LaTeX string — fix common issues from data files.
 * Data files often have double-escaped backslashes: \\\\gamma → \\gamma
 * KaTeX needs single backslash: \gamma
 */
function normalizeLatex(latex: string): string {
  let result = latex;

  // Fix double-escaped backslashes: \\\\command → \\command
  // In runtime string: "\\\\" → "\\" which is still double.
  // We need to collapse runs of backslashes before LaTeX commands.
  result = result.replace(/\\\\/g, '\\');

  // If after normalization we lost all backslashes, the original was fine
  // Check: if no LaTeX commands remain, try original
  if (!result.includes('\\') && latex.includes('\\')) {
    result = latex;
  }

  return result;
}

/**
 * Render a LaTeX string to HTML using KaTeX.
 * Returns safe HTML string for dangerouslySetInnerHTML.
 */
export function renderLatex(latex: string, displayMode = true): string {
  try {
    // Try with normalization first
    const normalized = normalizeLatex(latex);
    return katex.renderToString(normalized, {
      displayMode,
      throwOnError: false,
      errorColor: '#f43f5e',
      strict: false,
      trust: true,
      macros: {
        // Vietnamese soil mechanics notation
        '\\\\dn': '\\\\text{đn}',
        '\\\\bh': '\\\\text{bh}',
        '\\\\bt': '\\\\text{bt}',
        '\\\\gh': '\\\\text{gh}',
        '\\\\oed': '\\\\text{oed}',
      },
    });
  } catch (error) {
    // Fallback: try the original string
    try {
      return katex.renderToString(latex, {
        displayMode,
        throwOnError: false,
        errorColor: '#f43f5e',
        strict: false,
        trust: true,
      });
    } catch {
      console.error('KaTeX render error:', error);
      return `<span class="katex-error">${escapeHtml(latex)}</span>`;
    }
  }
}

/**
 * Process text containing inline LaTeX ($...$) and display LaTeX ($$...$$).
 * Returns HTML string.
 */
export function renderTextWithLatex(text: string): string {
  if (!text) return '';

  // Handle display math $$...$$ first
  let result = text.replace(/\$\$([^$]+)\$\$/g, (_match, latex) => {
    return `<div class="katex-display-wrapper my-2">${renderLatex(latex, true)}</div>`;
  });

  // Then handle inline math $...$
  const parts = result.split(/(\$[^$]+\$)/g);
  return parts
    .map((part) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        const latex = part.slice(1, -1);
        return renderLatex(latex, false);
      }
      return escapeHtml(part);
    })
    .join('');
}

/**
 * Check if a string contains LaTeX notation.
 */
export function hasLatex(text: string): boolean {
  return /\$[^$]+\$/.test(text) || /\\[a-zA-Z]+/.test(text);
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
