import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

interface SkillsProps {
  isDark: boolean;
}

export function Skills({ isDark }: SkillsProps) {
  const { isVisible: titleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: courseworkVisible, elementRef: courseworkRef } = useScrollAnimation({ threshold: 0.2 });

  const skillCategories = [
    {
      category: 'Languages',
      skills: ['Python', 'Java', 'C', 'HTML5', 'CSS', 'SQL'],
    },
    {
      category: 'Data Science & ML',
      skills: ['Machine Learning', 'Data Visualization', 'Data Analysis', 'Statistical Analysis'],
    },
    {
      category: 'Tools & Platforms',
      skills: ['VS Code', 'IntelliJ', 'PyCharm', 'Power BI', 'Tableau', 'Azure'],
    },
    {
      category: 'Databases',
      skills: ['MongoDB', 'SQL', 'Database Management'],
    },
  ];

  const courses = [
    'Data Structures',
    'Database Management',
    'Data Analyst',
    'Algorithms Analysis',
    'Artificial Intelligence',
  ];

  return (
    <section id="skills" className={`py-20 px-4 ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'} transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">
        {/* Animated Title */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={animationVariants.slideDown(titleVisible)}
        >
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Skills
          </h2>
        </div>

        {/* Animated Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const { isVisible, elementRef } = useScrollAnimation({ 
              threshold: 0.3,
              rootMargin: '0px 0px -50px 0px'
            });
            
            return (
              <div
                key={index}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={`border rounded-lg p-6 transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                  isDark ? 'bg-slate-700/50 border-slate-600 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20' : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10'
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-3 transition-all duration-500"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                        transitionDelay: `${(index * 150) + (i * 80)}ms`
                      }}
                    >
                      <div 
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          isDark ? 'bg-blue-400' : 'bg-blue-600'
                        }`}
                        style={{
                          transform: isVisible ? 'scale(1)' : 'scale(0)',
                          transitionDelay: `${(index * 150) + (i * 80)}ms`
                        }}
                      ></div>
                      <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Animated Coursework Section */}
        <div
          ref={courseworkRef as React.RefObject<HTMLDivElement>}
          className={`mt-12 border rounded-lg p-8 transition-all duration-700 ${
            isDark ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/30' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
          }`}
          style={{
            opacity: courseworkVisible ? 1 : 0,
            transform: courseworkVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)'
          }}
        >
          <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Relevant Coursework
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {courses.map((course, i) => (
              <div
                key={i}
                className={`px-4 py-3 rounded-lg text-center border transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
                  isDark ? 'bg-slate-700/50 text-gray-300 border-blue-400/20 hover:border-blue-400/50' : 'bg-white text-gray-700 border-blue-200 hover:border-blue-400'
                }`}
                style={{
                  opacity: courseworkVisible ? 1 : 0,
                  transform: courseworkVisible ? 'scale(1)' : 'scale(0.9)',
                  transitionDelay: `${i * 100}ms`
                }}
              >
                {course}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
