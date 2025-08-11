import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'solid';
}

export default function Button({ variant = 'solid', className = '', ...props }: Props) {
  const base = 'h-8 px-3 rounded-xl';
  const styles =
    variant === 'ghost'
      ? 'border border-slate-200 hover:bg-slate-50'
      : 'bg-slate-900 text-white hover:bg-black';
  return <button {...props} className={`${base} ${styles} ${className}`}></button>;
}
