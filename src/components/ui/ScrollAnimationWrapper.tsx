/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  className?: string;
  id?: string;
}

export const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  className = '',
  id,
}) => {
  const variants = {
    fadeUp: {
      initial: { y: 40, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideLeft: {
      initial: { x: -60, opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
    slideRight: {
      initial: { x: 60, opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
    scale: {
      initial: { scale: 0.85, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
    },
  };

  const selectedVariant = variants[animation];

  return (
    <motion.div
      id={id}
      initial={selectedVariant.initial}
      whileInView={selectedVariant.animate}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1], 
        delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
