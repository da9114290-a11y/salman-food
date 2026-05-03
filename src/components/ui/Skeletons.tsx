/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Skeleton = ({ className = '' }: { className?: string }) => (
  <div className={`bg-gray-200 animate-pulse rounded-md ${className}`} />
);

export const MenuCardSkeleton = () => (
  <div className="bg-white rounded-card shadow-card p-0 overflow-hidden flex flex-col h-full border border-brand-border/50">
    <Skeleton className="aspect-[16/9] rounded-none" />
    <div className="p-5 flex-1 flex flex-col gap-3">
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-brand-border/30">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-10 w-24 rounded-brand" />
      </div>
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="w-full min-h-[90vh] bg-brand-dark flex items-center justify-center">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
      <div className="space-y-8">
        <Skeleton className="h-12 w-1/2 bg-white/10" />
        <Skeleton className="h-24 w-full bg-white/10" />
        <Skeleton className="h-6 w-3/4 bg-white/10" />
        <div className="flex gap-4">
          <Skeleton className="h-14 w-40 bg-white/10 rounded-brand" />
          <Skeleton className="h-14 w-40 bg-white/10 rounded-brand" />
        </div>
      </div>
      <div className="hidden lg:block">
        <Skeleton className="aspect-square w-full bg-white/10 rounded-full" />
      </div>
    </div>
  </div>
);
