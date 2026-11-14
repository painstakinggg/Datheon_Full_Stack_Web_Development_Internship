import { useEffect, useState } from 'react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NAV_LINKS, PERSONAL_INFO } from '../data/portfolio';
import type { ThemeMode } from '../hooks/useTheme';

interface NavbarProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-[#F8F8FB]/90 backdrop-blur-md transition-colors duration-200 dark:border-zinc-800/80 dark:bg-[#060609]/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-lg font-bold tracking-tight text-zinc-950 transition-colors hover:text-violet-600 dark:text-zinc-50 dark:hover:text-violet-400 whitespace-nowrap shrink-0"
        >
          {PERSONAL_INFO.displayBrand}
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors duration-150 hover:text-zinc-950 hover:underline hover:decoration-violet-500 hover:underline-offset-8 dark:text-zinc-400 dark:hover:text-zinc-50 whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-150 hover:bg-violet-500 active:bg-violet-700 whitespace-nowrap shrink-0"
          >
            Let&apos;s Connect
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-800 transition-colors hover:border-violet-400 hover:text-violet-600 dark:border-zinc-800 dark:bg-[#0E0E14] dark:text-zinc-200 dark:hover:border-violet-500/60 dark:hover:text-violet-400 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-zinc-200 bg-[#F8F8FB] px-4 py-5 dark:border-zinc-800 dark:bg-[#08080D] md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium text-zinc-800 transition-colors hover:bg-zinc-200/60 hover:text-violet-700 dark:text-zinc-200 dark:hover:bg-zinc-800/60 dark:hover:text-violet-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="flex min-h-[44px] items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:border-violet-400 dark:border-zinc-800 dark:bg-[#0E0E14] dark:text-zinc-200"
            >
              <span>{theme === 'dark' ? 'Midnight Dark Theme' : 'Daylight Light Theme'}</span>
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-violet-400" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4 text-violet-600" aria-hidden="true" />
              )}
            </button>

            <a
              href="#contact"
              onClick={handleLinkClick}
              className="flex min-h-[44px] items-center justify-center rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-violet-500"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
