import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100',
    primary: 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    success: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-100',
    warning: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
    danger: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-100',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
