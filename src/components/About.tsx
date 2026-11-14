import { ABOUT_PARAGRAPHS } from '../data/portfolio';

const FOCUS_PRINCIPLES = [
  {
    index: '01',
    title: 'Maintainable Architecture',
    detail: 'Structured TypeScript, reusable UI modules, and clean separation of concerns.',
  },
  {
    index: '02',
    title: 'End-to-End Delivery',
    detail: 'Connecting responsive interfaces with REST APIs, databases, and edge hosting.',
  },
  {
    index: '03',
    title: 'Practical Automation',
    detail: 'Building bots and API workflows that streamline repetitive digital tasks.',
  },
];

export function About() {
  return (
    <section
      id="about"
      className="border-b border-zinc-200/80 py-16 sm:py-24 dark:border-zinc-800/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Section Title Column */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold tracking-wider text-violet-700 dark:text-violet-400">
              01. About Me
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50 [text-wrap:balance]">
              Engineering digital products with clarity and purpose.
            </h2>
          </div>

          {/* Biography Prose Column */}
          <div className="lg:col-span-8">
            <div className="space-y-5 text-base leading-relaxed text-zinc-700 sm:text-[17px] dark:text-zinc-300">
              {ABOUT_PARAGRAPHS.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Clean Architectural Principles Row (Hairline dividers, no nested cards) */}
            <div className="mt-12 grid grid-cols-1 gap-8 border-t border-zinc-200 pt-8 sm:grid-cols-3 dark:border-zinc-800">
              {FOCUS_PRINCIPLES.map((principle) => (
                <div key={principle.index}>
                  <span className="font-mono text-xs tabular-nums text-violet-700 dark:text-violet-400">
                    {principle.index}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold text-zinc-950 dark:text-zinc-100">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {principle.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
