import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code2, Github, Linkedin, Mail, Moon, Sun } from 'lucide-react';
import { ARCHITECTURE_MODULES, PERSONAL_INFO } from '../data/portfolio';
import type { ThemeMode } from '../hooks/useTheme';

interface HeroProps {
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export function Hero({ theme, onToggleTheme }: HeroProps) {
  const [activeTabId, setActiveTabId] = useState<string>(ARCHITECTURE_MODULES[0].id);

  const activeModule =
    ARCHITECTURE_MODULES.find((mod) => mod.id === activeTabId) ?? ARCHITECTURE_MODULES[0];

  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80"
    >
      {/* Subtle Midnight atmospheric glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.14),transparent_68%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.18),transparent_68%)]"
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Primary Typography & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between lg:col-span-7"
          >
            <div>
              <p className="text-sm font-semibold tracking-wide text-violet-700 dark:text-violet-400">
                {PERSONAL_INFO.title}
              </p>

              <h1 className="mt-4 font-display text-[clamp(2.25rem,4.4vw,3.75rem)] font-bold leading-[1.06] tracking-tight text-zinc-950 dark:text-zinc-50 [text-wrap:balance]">
                {PERSONAL_INFO.fullName}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-300">
                {PERSONAL_INFO.heroIntro}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-violet-500 active:bg-violet-700 whitespace-nowrap shrink-0"
                >
                  <span>View My Projects</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors duration-150 hover:border-violet-500 hover:text-violet-700 dark:border-zinc-700 dark:bg-[#0E0E14] dark:text-zinc-100 dark:hover:border-violet-400 dark:hover:text-violet-300 whitespace-nowrap shrink-0"
                >
                  Contact Me
                </a>
              </div>
            </div>

            {/* Direct Channel Links */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-zinc-200/80 pt-6 text-sm text-zinc-600 dark:border-zinc-800/80 dark:text-zinc-400">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-violet-700 dark:hover:text-violet-300"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{PERSONAL_INFO.email}</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-violet-700 dark:hover:text-violet-300"
              >
                <Github className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-violet-700 dark:hover:text-violet-300"
              >
                <Linkedin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive Developer Architecture Workbench & Theme Switch */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:col-span-5"
          >
            <div className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-[#0C0C12] dark:shadow-none sm:p-6">
              {/* Top Utility Bar: Layer Selector Title + Working Theme Toggle */}
              <div>
                <div className="flex items-center justify-between gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    <Code2 className="h-4 w-4 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                    <span>Stack Architecture</span>
                  </div>

                  <button
                    type="button"
                    onClick={onToggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                    className="inline-flex min-h-[36px] items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:border-violet-400 hover:text-violet-700 dark:border-zinc-800 dark:bg-[#14141D] dark:text-zinc-300 dark:hover:border-violet-500/60 dark:hover:text-violet-300 whitespace-nowrap shrink-0"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="h-3.5 w-3.5 text-violet-400" aria-hidden="true" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="h-3.5 w-3.5 text-violet-600" aria-hidden="true" />
                        <span>Midnight Mode</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Interactive Segmented Control */}
                <div
                  role="tablist"
                  aria-label="Engineering architecture layers"
                  className="mt-4 grid grid-cols-2 gap-1 rounded-lg bg-zinc-100 p-1 sm:grid-cols-4 dark:bg-[#14141D]"
                >
                  {ARCHITECTURE_MODULES.map((mod) => {
                    const isActive = mod.id === activeModule.id;
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTabId(mod.id)}
                        className={`rounded-md px-2.5 py-2 text-xs font-medium transition-colors whitespace-nowrap ${
                          isActive
                            ? 'bg-white text-zinc-950 shadow-xs dark:bg-violet-600 dark:text-white'
                            : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                        }`}
                      >
                        {mod.label}
                      </button>
                    );
                  })}
                </div>

                {/* Code Window */}
                <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-[#FAFAFC] dark:border-zinc-800/90 dark:bg-[#07070B]">
                  <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2.5 text-xs text-zinc-500 dark:border-zinc-800/90 dark:text-zinc-400">
                    <span className="font-mono">{activeModule.fileName}</span>
                    <span>TypeScript</span>
                  </div>
                  <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-800 dark:text-zinc-200">
                    <code>
                      {activeModule.code.map((line, idx) => (
                        <div key={idx} className="flex gap-4">
                          <span className="w-4 select-none text-right tabular-nums text-zinc-400 dark:text-zinc-600">
                            {idx + 1}
                          </span>
                          <span className="whitespace-pre">{line}</span>
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>

              {/* Module Description & Unboxed Stack Metadata */}
              <div className="mt-4 border-t border-zinc-200 pt-4 dark:border-zinc-800">
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {activeModule.summary}
                </p>
                <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-violet-700 dark:text-violet-400">
                  {activeModule.stack.map((item, idx) => (
                    <span key={item} className="inline-flex items-center gap-2">
                      {idx > 0 && (
                        <span aria-hidden="true" className="text-zinc-400 dark:text-zinc-600">
                          ·
                        </span>
                      )}
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Discipline Strip Below Split */}
        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-zinc-200/80 pt-8 text-xs font-medium text-zinc-600 sm:grid-cols-4 dark:border-zinc-800/80 dark:text-zinc-400">
          <div>
            <span className="block font-display text-sm font-semibold text-zinc-950 dark:text-zinc-100">
              Web Applications
            </span>
            <span className="mt-1 block">React, TypeScript &amp; Vite</span>
          </div>
          <div>
            <span className="block font-display text-sm font-semibold text-zinc-950 dark:text-zinc-100">
              E-Commerce Platforms
            </span>
            <span className="mt-1 block">Discovery, Bag &amp; Checkout</span>
          </div>
          <div>
            <span className="block font-display text-sm font-semibold text-zinc-950 dark:text-zinc-100">
              Cloud Systems
            </span>
            <span className="mt-1 block">Cloudflare Pages, Workers &amp; D1</span>
          </div>
          <div>
            <span className="block font-display text-sm font-semibold text-zinc-950 dark:text-zinc-100">
              Automation Solutions
            </span>
            <span className="mt-1 block">Telegram Bots &amp; API Workflows</span>
          </div>
        </div>
      </div>
    </section>
  );
}
