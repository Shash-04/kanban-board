import React from 'react';
import { getInitials } from '@/lib/boardUtils';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  const colors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  const color = colors[name.length % colors.length];
  const initials = getInitials(name);

  return (
    <div
      className={`${sizes[size]} ${color} rounded-full flex items-center justify-center font-semibold text-white ${className}`}
      title={name}
    >
      {initials}
    </div>
  );
}
