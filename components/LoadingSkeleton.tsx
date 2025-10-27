'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export default function Skeleton({ 
  className = '', 
  variant = 'rectangular', 
  width, 
  height, 
  animation = 'pulse' 
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200';
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full'
  };
  
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: ''
  };
  
  const style = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height })
  };
  
  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
    />
  );
}

// Predefined skeleton components for common use cases
export function ColorPaletteSkeleton() {
  return (
    <div className="card animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Generated Palette</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="color-preview group relative rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <Skeleton height={96} className="w-full" />
            <div className="p-3 text-center">
              <Skeleton width={80} height={16} className="mx-auto" />
              <div className="flex justify-center space-x-2 mt-2">
                <Skeleton width={16} height={16} className="rounded" />
                <Skeleton width={16} height={16} className="rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ButtonSkeleton() {
  return (
    <Skeleton 
      width={120} 
      height={40} 
      className="rounded-xl"
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="card">
      <Skeleton height={24} width="60%" className="mb-4" />
      <Skeleton height={16} width="100%" className="mb-2" />
      <Skeleton height={16} width="80%" className="mb-4" />
      <div className="flex space-x-2">
        <Skeleton width={80} height={32} className="rounded-lg" />
        <Skeleton width={80} height={32} className="rounded-lg" />
      </div>
    </div>
  );
}
