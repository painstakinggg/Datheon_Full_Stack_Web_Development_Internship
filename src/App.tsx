import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProfessionalDevelopment } from './components/ProfessionalDevelopment';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#F8F8FB] text-[#111118] transition-colors duration-200 dark:bg-[#060609] dark:text-[#F4F4F8]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      <main id="main-content">
        <Hero theme={theme} onToggleTheme={toggleTheme} />
        <About />
        <ProfessionalDevelopment />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <Footer theme={theme} onToggleTheme={toggleTheme} />
    </div>
  );
}
