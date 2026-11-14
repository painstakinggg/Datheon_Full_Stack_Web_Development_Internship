import { useEffect, useState } from 'react';
import { ArrowUpRight, Layers, Maximize2, X } from 'lucide-react';
import {
  FEATURED_PROJECTS,
  type ProjectCategory,
  type ProjectItem,
} from '../data/portfolio';

const FILTER_OPTIONS: ProjectCategory[] = ['All', 'E-Commerce', 'Automation', 'Web Platform'];

interface ProjectPreviewImageProps {
  project: ProjectItem;
  className?: string;
}

function ProjectPreviewImage({ project, className = '' }: ProjectPreviewImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-[#120D1D] to-zinc-950 p-6 text-center ${className}`}
      >
        <Layers className="h-8 w-8 text-violet-400" aria-hidden="true" />
        <p className="mt-3 font-display text-lg font-semibold text-zinc-100">{project.name}</p>
        <p className="mt-1 text-xs text-zinc-400">{project.category}</p>
      </div>
    );
  }

  return (
    <img
      src={project.image}
      alt={project.imageAlt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] ${className}`}
    />
  );
}

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [inspectedProject, setInspectedProject] = useState<ProjectItem | null>(null);

  const visibleProjects =
    selectedCategory === 'All'
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((project) => project.category === selectedCategory);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && inspectedProject) {
        setInspectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inspectedProject]);

  return (
    <section
      id="projects"
      className="border-b border-zinc-200/80 py-16 sm:py-24 dark:border-zinc-800/80"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-violet-700 dark:text-violet-400">
              03. Featured Projects
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50 [text-wrap:balance]">
              Selected web applications, storefronts, and automation tools.
            </h2>
          </div>

          {/* Interactive Category Filter Control */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-100/80 p-1 dark:border-zinc-800 dark:bg-[#0E0E14]"
          >
            {FILTER_OPTIONS.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={active}
                  className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-white text-zinc-950 shadow-xs dark:bg-violet-600 dark:text-white'
                      : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors duration-150 hover:border-violet-400/70 dark:border-zinc-800 dark:bg-[#0C0C12] dark:hover:border-violet-500/50"
            >
              <div>
                {/* 4:3 Visual Preview Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-zinc-200 bg-zinc-950 dark:border-zinc-800">
                  <ProjectPreviewImage project={project} />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setInspectedProject(project)}
                    aria-label={`Inspect preview details for ${project.name}`}
                    className="absolute right-3 bottom-3 inline-flex min-h-[36px] items-center gap-1.5 rounded-lg border border-white/20 bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:border-violet-400 hover:bg-black/90"
                  >
                    <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Preview</span>
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7">
                  {/* Unboxed Metadata Line */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    <span className="font-mono tabular-nums text-violet-700 dark:text-violet-400">
                      {project.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-zinc-800 dark:text-zinc-200">
                      Status: {project.status}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                    {project.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Unboxed Stack Tags + Clickable External Link */}
              <div className="border-t border-zinc-200/80 px-6 py-5 dark:border-zinc-800/80 sm:px-7">
                <div className="grid grid-cols-2 gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="flex min-h-9 min-w-0 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-center text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-[#111019] dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-500 active:bg-violet-700 whitespace-nowrap shrink-0"
                  >
                    <span>{project.linkLabel}</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>

                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Project Preview */}
      {inspectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setInspectedProject(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-[#0C0C12]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                <span className="font-mono text-violet-700 dark:text-violet-400">
                  {inspectedProject.index}
                </span>
                <span aria-hidden="true">·</span>
                <span>{inspectedProject.category}</span>
                <span aria-hidden="true">·</span>
                <span>Status: {inspectedProject.status}</span>
              </div>
              <button
                type="button"
                onClick={() => setInspectedProject(null)}
                aria-label="Close project preview"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 transition-colors hover:border-violet-400 hover:text-violet-600 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-violet-500 dark:hover:text-violet-400"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-950">
              <ProjectPreviewImage project={inspectedProject} />
            </div>

            <div className="p-6 sm:p-7">
              <h3
                id="project-modal-title"
                className="font-display text-2xl font-bold text-zinc-950 dark:text-zinc-50"
              >
                {inspectedProject.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                {inspectedProject.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {inspectedProject.technologies.map((tech, index) => (
                  <span key={tech} className="inline-flex items-center gap-2">
                    {index > 0 && (
                      <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-700">
                        /
                      </span>
                    )}
                    <span>{tech}</span>
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-zinc-200 pt-5 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setInspectedProject(null)}
                  className="min-h-[40px] rounded-lg border border-zinc-300 px-4 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-600"
                >
                  Close
                </button>
                <a
                  href={inspectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-violet-500"
                >
                  <span>Open {inspectedProject.linkLabel}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
