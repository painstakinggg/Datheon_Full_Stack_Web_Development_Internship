import type { ReactNode } from 'react';
import { Cloud, Code2, Server, Wrench } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolio';

const CATEGORY_ICONS: Record<string, ReactNode> = {
  frontend: <Code2 className="h-5 w-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />,
  backend: <Server className="h-5 w-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />,
  cloud: <Cloud className="h-5 w-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />,
  tools: <Wrench className="h-5 w-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />,
};

export function Skills() {
  return (
    <section
      id="skills"
      className="border-b border-zinc-200/80 py-16 sm:py-24 dark:border-zinc-800/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-violet-700 dark:text-violet-400">
            02. Technical Skills
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50 [text-wrap:balance]">
            Core technologies across frontend, backend, cloud, and automation.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SKILL_CATEGORIES.map((category) => (
            <article
              key={category.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 transition-colors duration-150 hover:border-violet-400/70 dark:border-zinc-800 dark:bg-[#0C0C12] dark:hover:border-violet-500/50 sm:p-8"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#14141D]">
                      {CATEGORY_ICONS[category.id]}
                    </div>
                    <div>
                      <span className="font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                        {category.index}
                      </span>
                      <h3 className="font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {category.subtitle}
                </p>

                <ul className="mt-6 divide-y divide-zinc-200/80 border-t border-zinc-200/80 dark:divide-zinc-800/80 dark:border-zinc-800/80">
                  {category.items.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center justify-between py-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200"
                    >
                      <span>{skill}</span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs text-violet-600/70 dark:text-violet-400/70"
                      >
                        —
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
