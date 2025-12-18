import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

interface FooterProps {
  isDark: boolean;
}

export function Footer({ isDark }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { isVisible, elementRef } = useScrollAnimation({ threshold: 0.5 });

  return (
    <footer className={`border-t py-8 px-4 transition-colors duration-500 ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-100 border-gray-200'}`}>
      <div 
        ref={elementRef as React.RefObject<HTMLDivElement>}
        className="max-w-6xl mx-auto text-center"
        style={animationVariants.fadeIn(isVisible)}
      >
        <p 
          className={`mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out',
            transitionDelay: '200ms'
          }}
        >
          © {currentYear} Samarth Jodatti. All rights reserved.
        </p>
        <p 
          className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease-out',
            transitionDelay: '400ms'
          }}
        >
          Designed and built with React, Tailwind CSS, and Three.js
        </p>
      </div>
    </footer>
  );
}
