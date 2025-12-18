import { GraduationCap, Award } from 'lucide-react';
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

interface EducationProps {
  isDark: boolean;
}

export function Education({ isDark }: EducationProps) {
  const { isVisible: titleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: educationVisible, elementRef: educationRef } = useScrollAnimation({ threshold: 0.3 });
  const { isVisible: certificationsVisible, elementRef: certificationsRef } = useScrollAnimation({ threshold: 0.3 });

  const certifications = [
    {
      title: 'Python for Data Science',
      issuer: 'NPTEL (IIT Madras)',
      icon: '🐍',
    },
    {
      title: 'Machine Learning Specialization',
      issuer: 'Coursera (Stanford and Deep Learning.ai)',
      icon: '🤖',
    },
    {
      title: 'Deloitte Australia - Data Analytics Job Simulation',
      issuer: 'Deloitte',
      icon: '📊',
    },
  ];

  return (
    <section id="education" className={`py-20 px-4 transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">
        {/* Animated Title */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={animationVariants.slideDown(titleVisible)}
        >
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Education & Certifications
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Animated Education Section */}
          <div
            ref={educationRef as React.RefObject<HTMLDivElement>}
            style={animationVariants.slideLeft(educationVisible)}
          >
            <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              <GraduationCap 
                size={28} 
                className={`transition-all duration-500 ${
                  educationVisible ? 'rotate-0 scale-100' : 'rotate-12 scale-75'
                }`}
              />
              Education
            </h3>
            <div className={`border rounded-lg p-6 transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
              isDark ? 'bg-slate-800/50 border-slate-700 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20' : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10'
            }`}>
              <h4 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Bachelor of Artificial Intelligence And Data Science
              </h4>
              <p className={`font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                Govt Engineering College, Nargund
              </p>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                December 2022 – August 2026
              </p>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Pursuing a comprehensive degree in AI and Data Science with focus on machine
                learning, data analytics, and cloud-based solutions.
              </p>
            </div>
          </div>

          {/* Animated Certifications Section */}
          <div
            ref={certificationsRef as React.RefObject<HTMLDivElement>}
            style={animationVariants.slideRight(certificationsVisible)}
          >
            <h3 className={`text-2xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              <Award 
                size={28} 
                className={`transition-all duration-500 ${
                  certificationsVisible ? 'rotate-0 scale-100' : '-rotate-12 scale-75'
                }`}
              />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 transition-all duration-700 hover:scale-105 hover:-translate-y-1 ${
                    isDark ? 'bg-slate-800/50 border-slate-700 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20' : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10'
                  }`}
                  style={{
                    opacity: certificationsVisible ? 1 : 0,
                    transform: certificationsVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span 
                      className="text-2xl transition-all duration-500"
                      style={{
                        transform: certificationsVisible ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(180deg)',
                        transitionDelay: `${index * 150 + 200}ms`
                      }}
                    >
                      {cert.icon}
                    </span>
                    <div>
                      <h5 className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {cert.title}
                      </h5>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
