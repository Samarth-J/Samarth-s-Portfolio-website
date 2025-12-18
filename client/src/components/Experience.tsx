import { Briefcase } from 'lucide-react';
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

interface ExperienceProps {
  isDark: boolean;
}

export function Experience({ isDark }: ExperienceProps) {
  const { isVisible: titleVisible, elementRef: titleRef } = useScrollAnimation();
  
  const experiences = [
    {
      title: 'AI Azure Intern',
      company: 'Edunet Foundation',
      period: 'May 2025 – June 2025',
      type: 'Internship',
      description: [
        'Attended a 4-week internship on AI solutions with Microsoft Azure cloud services.',
        'Acquired real-world experience in deploying, managing, and optimizing AI models in the Azure ecosystem.',
        'Implemented practical projects involving cloud-based AI tools for application to real-world scenarios.',
        'Worked with mentors to learn AI development workflows, data management, and deployment best practices.',
      ],
      skills: ['Azure', 'AI', 'Cloud Services', 'Model Deployment'],
    },
    {
      title: 'Data Analytics Virtual Intern',
      company: 'Deloitte – Forage',
      period: 'February 2025',
      type: 'Job Simulation',
      description: [
        'Completed a practical job simulation focused on data analysis and forensic technology in a professional consulting context.',
        'Analyzed datasets to identify trends, anomalies, and actionable insights for business decision-making.',
        'Applied forensic analytics techniques to detect irregularities and potential fraud patterns in data.',
        'Gained exposure to real-world consulting workflows, client reporting formats, and data-driven problem-solving.',
      ],
      skills: ['Data Analysis', 'Forensic Analytics', 'Consulting', 'Business Intelligence'],
    },
    {
      title: 'Artificial Intelligence & Data Analytics Intern (Green Skills)',
      company: 'Edunet Foundation',
      period: 'Oct 2025 – Nov 2025',
      type: 'Virtual Internship',
      description: [
        'Completed a 4-week virtual internship focused on Artificial Intelligence and Data Analytics with Green Skills under the Skills4Future program.',
        'Gained practical exposure to AI concepts, data analytics techniques, and sustainable technology applications.',
        'Worked on hands-on learning modules aligned with industry-relevant use cases and real-world problem solving.',
        'Strengthened skills in data-driven decision-making, analytical thinking, and responsible AI practices.',
      ],
      skills: ['AI', 'Data Analytics', 'Green Skills', 'Sustainable Technology', 'Skills4Future'],
      credentials: 'AICTE · Shell India Markets Pvt. Ltd · Edunet Foundation',
    },
  ];

  return (
    <section id="experience" className={`py-20 px-4 transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">
        {/* Animated Title */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={animationVariants.slideDown(titleVisible)}
        >
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Experience
          </h2>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const { isVisible, elementRef } = useScrollAnimation({ 
              threshold: 0.2,
              rootMargin: '0px 0px -100px 0px'
            });
            
            return (
              <div
                key={index}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={`border rounded-lg p-6 transition-all duration-700 hover:scale-105 hover:-translate-y-2 ${
                  isDark ? 'bg-slate-800/50 border-slate-700 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20' : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10'
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg transition-all duration-500 ${
                    isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                  } ${isVisible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'}`}>
                    <Briefcase className={isDark ? 'text-blue-400' : 'text-blue-600'} size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {exp.title}
                        </h3>
                        <p className={isDark ? 'text-blue-400' : 'text-blue-600'}>
                          {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {exp.period}
                        </p>
                        <p className={`text-xs px-3 py-1 rounded-full inline-block transition-all duration-500 ${
                          isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'
                        } ${isVisible ? 'scale-100' : 'scale-75'}`}>
                          {exp.type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 mb-4 ml-16">
                  {exp.description.map((item, i) => (
                    <li 
                      key={i} 
                      className={`flex items-start gap-2 transition-all duration-500 ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                        transitionDelay: `${(index * 200) + (i * 100)}ms`
                      }}
                    >
                      <span className={`mt-1 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 ml-16">
                  {exp.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-sm rounded-full border transition-all duration-500 hover:scale-110 ${
                        isDark ? 'bg-slate-700 text-blue-300 border-blue-400/30 hover:border-blue-400/50' : 'bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-400'
                      }`}
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'scale(1)' : 'scale(0.8)',
                        transitionDelay: `${(index * 200) + 400 + (i * 50)}ms`
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Credentials Section */}
                {(exp as any).credentials && (
                  <div 
                    className={`mt-4 ml-16 p-3 rounded-lg border-l-4 transition-all duration-500 ${
                      isDark ? 'bg-green-500/10 border-l-green-400 border border-green-400/20' : 'bg-green-50 border-l-green-500 border border-green-200'
                    }`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${(index * 200) + 600}ms`
                    }}
                  >
                    <p className={`text-xs font-medium mb-1 ${isDark ? 'text-green-300' : 'text-green-700'}`}>
                      Credential Partners:
                    </p>
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {(exp as any).credentials}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
