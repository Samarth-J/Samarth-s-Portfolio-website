import { useState } from 'react';
import { Code, ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

interface ProjectsProps {
  isDark: boolean;
}

export function Projects({ isDark }: ProjectsProps) {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects = [
    {
      title: 'Data Analytics Project',
      period: 'January 2025',
      shortDescription: 'Analyzed large datasets to identify business trends using Python, SQL, and Tableau.',
      description: [
        'Analyzed a large dataset to identify trends and patterns that inform business strategies.',
        'Leveraged Python for data manipulation and applied SQL for efficient database querying.',
        'Created interactive dashboards using Tableau to visualize findings.',
        'Delivered a comprehensive report that assisted in decision-making processes and streamlined operational efficiency.',
      ],
      skills: ['Python', 'SQL', 'Tableau', 'Data Visualization'],
      type: 'Data Analytics',
      color: 'blue',
      // Add these when you have actual links
      // githubUrl: 'https://github.com/username/project',
      // liveUrl: 'https://project-demo.com',
    },
    {
      title: 'Ticket Price Calculator App',
      period: 'November 2024',
      shortDescription: 'Android application for calculating museum ticket prices in NYC using Java.',
      description: [
        'Created an Android application using Java and Android Studio to calculate ticket prices for trips to museums in NYC.',
        'Processed user inputted information in the back-end of the app to return a subtotal price based on the tickets selected.',
        'Utilized the layout editor to create a UI for the application in order to allow different scenes to interact with each other.',
      ],
      skills: ['Java', 'Android Studio', 'UI/UX Design', 'Mobile Development'],
      type: 'Mobile App',
      color: 'green',
      // Add these when you have actual links
      // githubUrl: 'https://github.com/username/ticket-calculator',
      // liveUrl: 'https://play.google.com/store/apps/details?id=com.example.app',
    },
  ];

  const toggleExpanded = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  const getColorClasses = (color: string, isDark: boolean) => {
    const colors = {
      blue: {
        bg: isDark ? 'bg-blue-500/20' : 'bg-blue-100',
        text: isDark ? 'text-blue-400' : 'text-blue-600',
        border: isDark ? 'border-blue-400/30' : 'border-blue-200',
        hover: isDark ? 'hover:border-blue-400/70' : 'hover:border-blue-400',
        tag: isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700',
      },
      green: {
        bg: isDark ? 'bg-green-500/20' : 'bg-green-100',
        text: isDark ? 'text-green-400' : 'text-green-600',
        border: isDark ? 'border-green-400/30' : 'border-green-200',
        hover: isDark ? 'hover:border-green-400/70' : 'hover:border-green-400',
        tag: isDark ? 'bg-green-500/20 text-green-300' : 'bg-green-100 text-green-700',
      },
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const { isVisible: titleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: subtitleVisible, elementRef: subtitleRef } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div
            ref={titleRef as React.RefObject<HTMLDivElement>}
            style={animationVariants.slideDown(titleVisible)}
          >
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Projects
            </h2>
          </div>
          <div
            ref={subtitleRef as React.RefObject<HTMLDivElement>}
            style={animationVariants.fadeIn(subtitleVisible)}
          >
            <p className={`text-lg sm:text-xl max-w-2xl mx-auto transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              A showcase of my technical projects and development work
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const colorClasses = getColorClasses(project.color, isDark);
            const isExpanded = expandedProject === index;
            const { isVisible, elementRef } = useScrollAnimation({ 
              threshold: 0.2,
              rootMargin: '0px 0px -100px 0px'
            });
            
            return (
              <div
                key={index}
                ref={elementRef as React.RefObject<HTMLDivElement>}
                className={`group relative border rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-700 ease-out hover:-translate-y-2 hover:scale-[1.02] ${
                  isDark 
                    ? 'bg-slate-800/60 border-slate-700 hover:bg-slate-800/80 hover:shadow-2xl hover:shadow-blue-500/10' 
                    : 'bg-white border-gray-200 hover:bg-gray-50 hover:shadow-2xl hover:shadow-gray-500/10'
                } ${colorClasses.hover}`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
                  transitionDelay: `${index * 200}ms`
                }}
              >
                {/* Project Header */}
                <div className="flex items-start gap-4 sm:gap-6 mb-6">
                  <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 group-hover:scale-110 ${colorClasses.bg}`}>
                    <Code className={`${colorClasses.text} transition-colors duration-300`} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className={`text-xl sm:text-2xl font-bold mb-2 transition-colors duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                          <span className={`text-xs sm:text-sm px-3 py-1 rounded-full font-medium transition-colors duration-300 ${colorClasses.tag}`}>
                            {project.type}
                          </span>
                          <span className={`text-sm sm:text-base transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {project.period}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {/* Placeholder for future links */}
                        {/* <button className={`p-2 rounded-lg transition-all duration-300 ${isDark ? 'hover:bg-slate-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
                          <Github size={18} />
                        </button>
                        <button className={`p-2 rounded-lg transition-all duration-300 ${isDark ? 'hover:bg-slate-700 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}>
                          <ExternalLink size={18} />
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="mb-6">
                  <p className={`text-base sm:text-lg leading-relaxed transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {project.shortDescription}
                  </p>
                  
                  {/* Expandable Details */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <ul className="space-y-3">
                      {project.description.map((item, i) => (
                        <li key={i} className={`flex items-start gap-3 text-sm sm:text-base transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${colorClasses.text.replace('text-', 'bg-')}`}></span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleExpanded(index)}
                    className={`mt-4 flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3 ${colorClasses.text}`}
                  >
                    {isExpanded ? (
                      <>
                        Show Less <ChevronUp size={16} className="transition-transform duration-300" />
                      </>
                    ) : (
                      <>
                        Show More <ChevronDown size={16} className="transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1.5 text-xs sm:text-sm rounded-full border font-medium transition-all duration-300 hover:scale-105 ${
                        isDark 
                          ? 'bg-slate-700/80 text-blue-300 border-blue-400/30 hover:bg-slate-700 hover:border-blue-400/50' 
                          : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:border-blue-300'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Hover Gradient Effect */}
                <div className={`absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5' 
                    : 'bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5'
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 lg:mt-16">
          <p className={`text-base sm:text-lg mb-6 transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Interested in collaborating or learning more about my work?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isDark 
                ? 'bg-blue-600 hover:bg-blue-500 text-white hover:shadow-blue-500/25' 
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-blue-500/25'
            }`}
          >
            Get In Touch
            <ExternalLink size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}