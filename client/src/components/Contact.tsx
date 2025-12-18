import { Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

interface ContactProps {
  isDark: boolean;
}

export function Contact({ isDark }: ContactProps) {
  const { isVisible: titleVisible, elementRef: titleRef } = useScrollAnimation();
  const { isVisible: contactInfoVisible, elementRef: contactInfoRef } = useScrollAnimation({ threshold: 0.3 });
  const { isVisible: formVisible, elementRef: formRef } = useScrollAnimation({ threshold: 0.3 });

  const contactItems = [
    {
      icon: Mail,
      label: 'Email',
      value: 'samarthmj123@gmail.com',
      href: 'mailto:samarthmj123@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 7795462755',
      href: 'tel:+917795462755'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nargund, Karnataka, India',
      href: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Samarth-J',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/samarth-jodatti-58b388303',
      label: 'LinkedIn'
    }
  ];

  return (
    <section id="contact" className={`py-20 px-4 ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'} transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">
        {/* Animated Title */}
        <div
          ref={titleRef as React.RefObject<HTMLDivElement>}
          style={animationVariants.slideDown(titleVisible)}
        >
          <h2 className={`text-4xl font-bold mb-12 text-center ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Get In Touch
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Animated Contact Information */}
          <div
            ref={contactInfoRef as React.RefObject<HTMLDivElement>}
            style={animationVariants.slideLeft(contactInfoVisible)}
          >
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Contact Information
            </h3>
            <div className="space-y-6">
              {contactItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-4 transition-all duration-500 hover:scale-105"
                  style={{
                    opacity: contactInfoVisible ? 1 : 0,
                    transform: contactInfoVisible ? 'translateX(0)' : 'translateX(-30px)',
                    transitionDelay: `${index * 150}ms`
                  }}
                >
                  <div className={`p-3 rounded-lg transition-all duration-500 ${
                    isDark ? 'bg-blue-500/20' : 'bg-blue-100'
                  } ${contactInfoVisible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'}`}>
                    <item.icon className={isDark ? 'text-blue-400' : 'text-blue-600'} size={24} />
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={`font-semibold transition-colors duration-200 ${
                          isDark ? 'text-white hover:text-blue-400' : 'text-slate-900 hover:text-blue-600'
                        }`}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg transition-all duration-500 hover:scale-110 hover:-translate-y-1 ${
                      isDark ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/40' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                    style={{
                      opacity: contactInfoVisible ? 1 : 0,
                      transform: contactInfoVisible ? 'scale(1)' : 'scale(0.8)',
                      transitionDelay: `${600 + (index * 100)}ms`
                    }}
                    title={social.label}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Animated Contact Form */}
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            style={animationVariants.slideRight(formVisible)}
          >
            <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Send Me a Message
            </h3>
            <form className="space-y-4">
              <div
                style={{
                  opacity: formVisible ? 1 : 0,
                  transform: formVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '200ms',
                  transition: 'all 0.5s ease-out'
                }}
              >
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className={`w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-200 focus:scale-105 ${
                    isDark ? 'bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:border-blue-400' : 'bg-white border border-gray-300 text-slate-900 placeholder-gray-500 focus:border-blue-400'
                  }`}
                />
              </div>

              <div
                style={{
                  opacity: formVisible ? 1 : 0,
                  transform: formVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '300ms',
                  transition: 'all 0.5s ease-out'
                }}
              >
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className={`w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-200 focus:scale-105 ${
                    isDark ? 'bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:border-blue-400' : 'bg-white border border-gray-300 text-slate-900 placeholder-gray-500 focus:border-blue-400'
                  }`}
                />
              </div>

              <div
                style={{
                  opacity: formVisible ? 1 : 0,
                  transform: formVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '400ms',
                  transition: 'all 0.5s ease-out'
                }}
              >
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your message here..."
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg focus:outline-none transition-all duration-200 resize-none focus:scale-105 ${
                    isDark ? 'bg-slate-700 border border-slate-600 text-white placeholder-gray-500 focus:border-blue-400' : 'bg-white border border-gray-300 text-slate-900 placeholder-gray-500 focus:border-blue-400'
                  }`}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`w-full px-6 py-3 font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                  isDark ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                style={{
                  opacity: formVisible ? 1 : 0,
                  transform: formVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '500ms',
                  transition: 'all 0.5s ease-out'
                }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
