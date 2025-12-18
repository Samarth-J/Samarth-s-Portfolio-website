import { useEffect } from 'react';

export function usePerformance() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.as = 'font';
      fontLink.type = 'font/woff2';
      fontLink.crossOrigin = 'anonymous';
      
      // Preload critical images
      const imageLink = document.createElement('link');
      imageLink.rel = 'preload';
      imageLink.as = 'image';
      imageLink.href = '/samarth-professional.jpg';
      
      document.head.appendChild(imageLink);
    };

    // Optimize animations for reduced motion
    const respectReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      
      if (mediaQuery.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
      }
    };

    // Defer non-critical operations
    const deferNonCritical = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          preloadCriticalResources();
        });
      } else {
        setTimeout(preloadCriticalResources, 100);
      }
    };

    respectReducedMotion();
    deferNonCritical();

    // Performance monitoring
    if ('performance' in window && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
          if (entry.entryType === 'first-input') {
            const fidEntry = entry as any; // PerformanceEventTiming
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
          }
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });

      return () => {
        observer.disconnect();
      };
    }
  }, []);
}