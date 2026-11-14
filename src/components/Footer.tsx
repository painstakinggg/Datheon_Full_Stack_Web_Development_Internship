import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { NAV_LINKS, PERSONAL_INFO } from '../data/portfolio';
import type { ThemeMode } from '../hooks/useTheme';

interface FooterProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Footer({ theme, onToggleTheme }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200/80 bg-white py-12 dark:border-zinc-800/80 dark:bg-[#050508]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
              {PERSONAL_INFO.fullName}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {PERSONAL_INFO.title}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Send email"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:border-violet-400 hover:text-violet-700 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-violet-500/60 dark:hover:text-violet-300"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:border-violet-400 hover:text-violet-700 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-violet-500/60 dark:hover:text-violet-300"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:border-violet-400 hover:text-violet-700 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-violet-500/60 dark:hover:text-violet-300"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:border-violet-400 hover:text-violet-700 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-violet-500/60 dark:hover:text-violet-300"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-violet-400" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4 text-violet-600" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200/80 pt-6 text-xs text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
          <p>
            &copy; {currentYear} {PERSONAL_INFO.fullName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
