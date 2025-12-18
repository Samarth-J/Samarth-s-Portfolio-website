import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Global observer instance for better performance
let globalObserver: IntersectionObserver | null = null;
const observedElements = new Map<Element, (isVisible: boolean) => void>();

function getGlobalObserver(options: IntersectionObserverInit) {
  if (!globalObserver) {
    globalObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const callback = observedElements.get(entry.target);
        if (callback) {
          callback(entry.isIntersecting);
        }
      });
    }, options);
  }
  return globalObserver;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = false // Changed default to false for repeated animations
  } = options;

  const handleVisibilityChange = useCallback((visible: boolean) => {
    setIsVisible(visible); // Always update visibility state
    
    // Only unobserve if triggerOnce is true and element becomes visible
    if (visible && triggerOnce && elementRef.current) {
      const observer = getGlobalObserver({ threshold, rootMargin });
      observer.unobserve(elementRef.current);
      observedElements.delete(elementRef.current);
    }
  }, [triggerOnce, threshold, rootMargin]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = getGlobalObserver({ threshold, rootMargin });
    observedElements.set(element, handleVisibilityChange);
    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
        observedElements.delete(element);
      }
    };
  }, [threshold, rootMargin, handleVisibilityChange]);

  return { isVisible, elementRef };
}

// Animation variants for different effects
export const animationVariants = {
  fadeIn: (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.8s ease-out'
  }),
  
  slideUp: (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
    transition: 'all 0.8s ease-out'
  }),
  
  slideDown: (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(-50px)',
    transition: 'all 0.8s ease-out'
  }),
  
  slideLeft: (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
    transition: 'all 0.8s ease-out'
  }),
  
  slideRight: (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
    transition: 'all 0.8s ease-out'
  }),
  
  scaleIn: (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'scale(1)' : 'scale(0.8)',
    transition: 'all 0.8s ease-out'
  }),
  
  rotateIn: (isVisible: boolean) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'rotate(0deg) scale(1)' : 'rotate(-10deg) scale(0.8)',
    transition: 'all 0.8s ease-out'
  })
};