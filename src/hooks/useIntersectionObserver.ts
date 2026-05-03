/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef, RefObject } from 'react';

export function useIntersectionObserver(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px' }
): [RefObject<HTMLDivElement>, boolean] {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, options.root]);

  return [ref, isIntersecting];
}
