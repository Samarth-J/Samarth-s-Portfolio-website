import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

interface AboutProps {
  isDark: boolean;
}

export function About({ isDark }: AboutProps) {
  const { isVisible: titleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: contentVisible, elementRef: contentRef } = useScrollAnimation({ threshold: 0.2 });
  const { isVisible: statsVisible, elementRef: statsRef } = useScrollAnimation({ threshold: 0.3 });

  const stats = [
    { number: "4+", label: "Internships & Projects" },
    { number: "3", label: "Certifications" },
    { number: "10+", label: "Technical Skills" },
    { number: "2026", label: "Graduation Year" }
  ];

  return (
    <section id="about" className={`py-20 px-4 ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'} transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">
        {/* Animated Title */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={animationVariants.slideDown(titleVisible)}
        >
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            About Me
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Animated Content */}
          <div
            ref={contentRef as React.RefObject<HTMLDivElement>}
            style={animationVariants.slideLeft(contentVisible)}
          >
            <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              I'm an aspiring Artificial Intelligence and Data Science professional with a passion
              for leveraging data to solve real-world challenges. Currently pursuing my Bachelor's
              degree in Artificial Intelligence and Data Science from Govt Engineering College,
              Nargund.
            </p>
            <p className={`text-lg leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              With hands-on experience in AI model deployment, data analytics, and cloud-based
              solutions, I've developed a strong foundation in Python, SQL, machine learning, and
              data visualization tools like Tableau and Power BI.
            </p>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              I'm seeking an opportunity to apply my analytical and problem-solving skills to
              innovative AI-driven solutions and contribute to a dynamic organization while
              growing as a data-focused professional.
            </p>
          </div>

          {/* Animated Stats Grid */}
          <div
            ref={statsRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-2 gap-6"
            style={animationVariants.slideRight(statsVisible)}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  isDark ? 'bg-slate-700 border-blue-400/30 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20' : 'bg-white border-blue-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10'
                }`}
                style={{
                  transitionDelay: statsVisible ? `${index * 100}ms` : '0ms',
                  opacity: statsVisible ? 1 : 0,
                  transform: statsVisible ? 'scale(1)' : 'scale(0.8)'
                }}
              >
                <div className={`text-3xl font-bold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {stat.number}
                </div>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
