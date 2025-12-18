import { useState, useEffect, lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { LazySection } from "./components/LazySection";
import { usePerformance } from "./hooks/usePerformance";

// Lazy load non-critical components
const ThreeBackground = lazy(() => import("./components/ThreeBackground").then(module => ({ default: module.ThreeBackground })));
const About = lazy(() => import("./components/About").then(module => ({ default: module.About })));
const Experience = lazy(() => import("./components/Experience").then(module => ({ default: module.Experience })));
const Projects = lazy(() => import("./components/Projects").then(module => ({ default: module.Projects })));
const Skills = lazy(() => import("./components/Skills").then(module => ({ default: module.Skills })));
const Education = lazy(() => import("./components/Education").then(module => ({ default: module.Education })));
const Contact = lazy(() => import("./components/Contact").then(module => ({ default: module.Contact })));
const Footer = lazy(() => import("./components/Footer").then(module => ({ default: module.Footer })));

function Portfolio() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for saved theme preference
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    // Default to dark mode
    return true;
  });

  // Use performance hook
  usePerformance();

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update document class for Tailwind dark mode
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
  };

  // Loading fallback component
  const LoadingFallback = () => (
    <div className={`py-20 px-4 flex items-center justify-center ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
      <div className={`animate-spin rounded-full h-8 w-8 border-b-2 ${isDark ? 'border-blue-400' : 'border-blue-600'}`}></div>
    </div>
  );

  return (
    <div className={`${isDark ? 'dark bg-slate-900 text-white' : 'bg-white text-slate-900'} min-h-screen transition-colors duration-500`}>
      {/* Critical above-the-fold content */}
      <Navigation isDark={isDark} onThemeToggle={handleThemeToggle} />
      <Hero isDark={isDark} />
      
      {/* Lazy loaded background */}
      <Suspense fallback={null}>
        <ThreeBackground isDark={isDark} />
      </Suspense>
      
      {/* Lazy loaded sections with fallbacks */}
      <LazySection fallback={<LoadingFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <About isDark={isDark} />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<LoadingFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <Experience isDark={isDark} />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<LoadingFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <Projects isDark={isDark} />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<LoadingFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <Skills isDark={isDark} />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<LoadingFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <Education isDark={isDark} />
        </Suspense>
      </LazySection>
      
      <LazySection fallback={<LoadingFallback />}>
        <Suspense fallback={<LoadingFallback />}>
          <Contact isDark={isDark} />
        </Suspense>
      </LazySection>
      
      <Suspense fallback={<LoadingFallback />}>
        <Footer isDark={isDark} />
      </Suspense>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Portfolio} />
      {/* Final fallback route */}
      <Route component={Portfolio} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
