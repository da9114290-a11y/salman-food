/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: string;
  showSkeleton?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[16/9]',
  showSkeleton = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Red-tinted base64 placeholder
  const blurDataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Skeleton Shimmer */}
      <AnimatePresence>
        {(!isLoaded && !hasError && showSkeleton) && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-light z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full animate-shimmer" 
                 style={{ backgroundSize: '200% 100%' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      {hasError ? (
        <div className="absolute inset-0 bg-brand-red/10 flex flex-col items-center justify-center text-brand-red p-4 text-center">
          <span className="font-heading font-black text-2xl mb-1">SF</span>
          <span className="text-[10px] uppercase font-bold tracking-widest">Image Unavailable</span>
        </div>
      ) : (
        <>
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            loading="lazy"
            className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            {...props}
          />
          {/* Subtle noise/blur placeholder behind to prevent layout shift */}
          {!isLoaded && (
            <div 
              className="absolute inset-0 blur-sm scale-110 opacity-50"
              style={{ backgroundImage: `url(${blurDataURL})`, backgroundSize: 'cover' }}
            />
          )}
        </>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};
