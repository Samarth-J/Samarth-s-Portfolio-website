import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface HeroProps {
  isDark: boolean;
}

export function Hero({ isDark }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);



  return (
    <section
      id="home"
      className={`min-h-screen relative pt-16 pb-8 transition-all duration-500 ${isDark ? 'bg-slate-900' : 'bg-gray-100'
        }`}
    >
      {/* Background Pattern with Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 transition-all duration-1000 ${isDark ? 'bg-purple-500' : 'bg-purple-300'
          } ${isVisible ? 'scale-100 opacity-10' : 'scale-0 opacity-0'}`}></div>
        <div className={`absolute bottom-20 left-20 w-64 h-64 rounded-full opacity-10 transition-all duration-1000 delay-200 ${isDark ? 'bg-blue-500' : 'bg-blue-300'
          } ${isVisible ? 'scale-100 opacity-10' : 'scale-0 opacity-0'}`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        {/* Header with Fade In Animation */}
        <div className={`text-center mb-12 pt-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}>
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'
            }`}>
            Personal Portfolio
          </h1>
          <p className={`text-lg sm:text-xl transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
            AI & Data Science Professional
          </p>
        </div>

        {/* Main Content Card with Slide Up Animation */}
        <div className={`max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden transition-all duration-1000 delay-300 ${isDark ? 'bg-slate-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'
          } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>

          {/* Available Badge with Bounce Animation */}
          <div className="relative">
            <div className={`absolute top-8 left-8 z-10 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
              }`}>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                AVAILABLE
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-8 lg:p-12 items-center min-h-[600px]">

            {/* Left Content with Staggered Animation */}
            <div className="space-y-8">
              <div>
                <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-1000 delay-500 ${isDark ? 'text-white' : 'text-slate-900'
                  } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  Hello, I'm<br />
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Samarth Jodatti
                  </span>
                </h2>

                <p className={`text-lg sm:text-xl leading-relaxed mb-8 transition-all duration-1000 delay-700 ${isDark ? 'text-gray-300' : 'text-gray-600'
                  } ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  I'm a passionate <span className="font-semibold text-purple-500">AI & Data Science Professional</span> and{' '}
                  <span className="font-semibold text-blue-500">Developer</span>.
                  I strive to build immersive and beautiful web applications through
                  carefully crafted code and user-centric design. And I can turn data into intelligent solutions with hands-on experience in analytics, machine learning, and AI.
                </p>

                <button
                  onClick={() => {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-1000 delay-900 hover:scale-105 hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                  Say Hello!
                </button>
              </div>


            </div>

            {/* Right Content - Professional Photo with Slide In Animation */}
            <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
              <div className="relative group">
                <div className={`w-80 h-96 sm:w-96 sm:h-[28rem] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:scale-105 ${isDark ? 'ring-4 ring-purple-500/20' : 'ring-4 ring-purple-500/10'
                  }`}>
                  {/* Optimized Professional Photo */}
                  <OptimizedImage
                    src="/samarth-professional.jpg"
                    alt="Samarth Jodatti - AI & Data Science Professional"
                    className="w-full h-full object-cover transition-all duration-500"
                    placeholder="Loading professional photo..."
                    onError={() => {
                      // Fallback handled by OptimizedImage component
                    }}
                  />
                </div>

                {/* Floating Elements with Delayed Animation */}
                <div className={`absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-800 animate-pulse transition-all duration-700 delay-1200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                  }`}></div>

                {/* Decorative Elements with Slide Up Animation */}
                <div className={`absolute -bottom-6 -left-6 px-6 py-3 rounded-2xl shadow-lg transition-all duration-700 delay-1000 ${isDark ? 'bg-slate-700 text-white' : 'bg-white text-slate-900'
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="text-sm font-semibold">Available for hire</div>
                  <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Open to opportunities
                  </div>
                </div>

                {/* Floating Particles Animation */}
                <div className={`absolute top-1/4 -left-8 w-2 h-2 bg-purple-400 rounded-full transition-all duration-1000 delay-1400 ${isVisible ? 'opacity-60 animate-ping' : 'opacity-0'
                  }`}></div>
                <div className={`absolute top-1/2 -right-6 w-3 h-3 bg-blue-400 rounded-full transition-all duration-1000 delay-1600 ${isVisible ? 'opacity-40 animate-pulse' : 'opacity-0'
                  }`}></div>
                <div className={`absolute bottom-1/4 -left-4 w-1 h-1 bg-pink-400 rounded-full transition-all duration-1000 delay-1800 ${isVisible ? 'opacity-80 animate-bounce' : 'opacity-0'
                  }`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Hint with Fade In Animation */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="animate-bounce">
            <ArrowDown size={32} className={`mx-auto transition-colors duration-300 ${isDark ? 'text-purple-400' : 'text-purple-600'
              }`} />
          </div>
          <p className={`text-sm mt-2 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
}
