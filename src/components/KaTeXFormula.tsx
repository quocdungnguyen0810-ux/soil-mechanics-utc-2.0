'use client';

import { useEffect, useRef } from 'react';
import { renderLatex } from '@/lib/utils/katex';

interface KaTeXFormulaProps {
  latex: string;
  display?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function KaTeXFormula({ latex, display = true, size = 'md', className = '' }: KaTeXFormulaProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && latex) {
      ref.current.innerHTML = renderLatex(latex, display);
    }
  }, [latex, display]);

  const sizeClass = {
    sm:  'text-sm',
    md:  'text-base',
    lg:  'text-xl',
    xl:  'text-3xl',
  }[size];

  if (display) {
    return (
      <div
        ref={ref}
        className={`katex-display-wrapper ${sizeClass} ${className}`}
        style={{ fontSize: size === 'xl' ? '1.6em' : size === 'lg' ? '1.3em' : '1em' }}
      />
    );
  }
  return (
    <span
      ref={ref}
      className={`katex-inline ${sizeClass} ${className}`}
    />
  );
}
