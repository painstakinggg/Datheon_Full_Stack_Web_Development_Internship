import { BookOpen, BriefcaseBusiness, Code2 } from 'lucide-react';

const DEVELOPMENT_ITEMS = [
  {
    icon: BriefcaseBusiness,
    title: 'Datheon Full-Stack Web Development Internship',
    status: 'Ongoing',
    description:
      'Building practical development experience through structured tasks and real-world web application projects.',
  },
  {
    icon: Code2,
    title: 'Hands-on Project Experience',
    description:
      'Creating responsive websites, e-commerce platforms, automation tools, and cloud-based applications.',
  },
  {
    icon: BookOpen,
    title: 'Continuous Technical Learning',
    description:
      'Expanding practical knowledge across frontend and backend development, APIs, databases, and cloud deployment.',
  },
];

export function ProfessionalDevelopment() {
  return (
    <section
      id="professional-development"
      className="border-b border-zinc-200/80 py-16 sm:py-24 dark:border-zinc-800/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-violet-700 dark:text-violet-400">
            02. Professional Development
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50 [text-wrap:balance]">
            Continuous learning, practical experience, and technical growth.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {DEVELOPMENT_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 transition-colors duration-150 hover:border-violet-400/70 dark:border-zinc-800 dark:bg-[#0C0C12] dark:hover:border-violet-500/50 sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-[#14141D]">
                  <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                </div>
                <p className="mt-6 font-mono text-xs tabular-nums text-violet-700 dark:text-violet-400">
                  0{index + 1}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  {item.title}
                </h3>
                {'status' in item && (
                  <span className="mt-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {item.status}
                  </span>
                )}
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
