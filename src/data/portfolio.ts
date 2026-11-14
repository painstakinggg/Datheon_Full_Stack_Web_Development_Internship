import afLuxeImage from '../assets/images/project_af_luxe_1794618825407.jpg';
import naffyScentsImage from '../assets/images/project_naffy_scents_1794618826984.jpg';
import painsionaryBotImage from '../assets/images/project_painsionary_bot_1794618827840.jpg';
import buildWpsImage from '../assets/images/project_buildwps_1794618827467.jpg';

export interface NavLink {
  label: string;
  href: string;
}

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  items: string[];
}

export type ProjectCategory = 'All' | 'E-Commerce' | 'Automation' | 'Web Platform';

export interface ProjectItem {
  id: string;
  index: string;
  name: string;
  category: Exclude<ProjectCategory, 'All'>;
  description: string;
  status: 'Ongoing' | 'Built' | 'Deployed';
  linkLabel: string;
  url: string;
  technologies: string[];
  image: string;
  imageAlt: string;
}

export interface ArchitectureModule {
  id: string;
  label: string;
  fileName: string;
  summary: string;
  stack: string[];
  code: string[];
}

export const PERSONAL_INFO = {
  fullName: 'IBRAHIM OPEYEMI AGBOOLA',
  displayBrand: 'Ibrahim Agboola',
  title: 'Full Stack Developer',
  email: 'painstaking.web@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ibrahim-agboola-8607b5448/',
  github: 'https://github.com/Painstakinggg',
  heroIntro:
    'I build modern web applications, e-commerce platforms and automation solutions that turn ideas into functional digital experiences.',
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const ABOUT_PARAGRAPHS: string[] = [
  "I'm Ibrahim Opeyemi Agboola, a Full Stack Developer passionate about building modern, responsive, and user-focused digital experiences.",
  'I work on web applications, e-commerce platforms, automation solutions, and cloud-based systems. I enjoy turning ideas into functional products, solving technical challenges, and exploring technologies that make digital experiences more efficient and accessible.',
  'My approach combines creativity, continuous learning, and practical problem-solving, with a focus on writing maintainable code and building solutions that deliver real value.',
  "I'm constantly expanding my technical knowledge and taking on new challenges to grow as a developer.",
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    index: '01',
    title: 'Frontend Development',
    subtitle: 'Responsive interfaces, typed component architecture, and accessible UI engineering.',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript ES6+',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Responsive Web Design',
    ],
  },
  {
    id: 'backend',
    index: '02',
    title: 'Backend Development',
    subtitle: 'Structured API services, relational persistence, and secure access flows.',
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'SQLite',
      'Database Integration',
      'Authentication',
    ],
  },
  {
    id: 'cloud',
    index: '03',
    title: 'Cloud and Deployment',
    subtitle: 'Edge hosting, serverless execution, and distributed storage workflows.',
    items: [
      'Cloudflare Pages',
      'Cloudflare Workers',
      'Cloudflare D1',
      'Cloudflare R2',
      'Vercel',
      'Netlify',
    ],
  },
  {
    id: 'tools',
    index: '04',
    title: 'Tools and Automation',
    subtitle: 'Version control, rapid build tooling, bot automation, and API integrations.',
    items: [
      'Git',
      'GitHub',
      'GitLab',
      'Google AI Studio',
      'Termux',
      'Vite',
      'Telegram Bot Development',
      'API Integration',
      'Workflow Automation',
    ],
  },
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'af-luxe',
    index: '01',
    name: 'AF LUXE',
    category: 'E-Commerce',
    description:
      'An e-commerce platform featuring product discovery, shopping bag, checkout and order management functionality.',
    status: 'Ongoing',
    linkLabel: 'Live Preview',
    url: 'https://af-luxe-preview.pages.dev/',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Cloudflare Workers', 'Cloudflare D1', 'Cloudflare R2'],
    image: afLuxeImage,
    imageAlt: 'AF LUXE tailored luxury apparel and leather goods showcase preview',
  },
  {
    id: 'naffy-scents',
    index: '02',
    name: 'NAFFY SCENTS',
    category: 'E-Commerce',
    description:
      'A fragrance e-commerce platform focused on product discovery, fragrance shopping and online ordering.',
    status: 'Ongoing',
    linkLabel: 'Live Preview',
    url: 'https://ea0a0a53.naffyscents.pages.dev/',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide React', 'Cloudflare Pages'],
    image: naffyScentsImage,
    imageAlt: 'NAFFY SCENTS artisanal glass fragrance bottle studio preview',
  },
  {
    id: 'painsionary-bot',
    index: '03',
    name: 'PAINSIONARY BOT',
    category: 'Automation',
    description:
      'A Telegram vocabulary-learning bot designed to deliver structured English vocabulary lessons.',
    status: 'Built',
    linkLabel: 'Project Link',
    url: 'https://t.me/PainsionaryBot',
    technologies: ['JavaScript', 'Cloudflare Workers', 'Cloudflare D1', 'Telegram Bot API', 'Cron Triggers'],
    image: painsionaryBotImage,
    imageAlt: 'PAINSIONARY BOT editorial lexicon notebook and writing instruments preview',
  },
  {
    id: 'buildwps',
    index: '04',
    name: 'BUILDWPS',
    category: 'Web Platform',
    description:
      'A professional web design and development website showcasing services, projects and business information.',
    status: 'Deployed',
    linkLabel: 'Live Website',
    url: 'https://buildwps.pages.dev/',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide React', 'GSAP', 'Flickity', 'Cloudflare Pages Functions', 'Cloudflare D1', 'Cloudflare R2'],
    image: buildWpsImage,
    imageAlt: 'BUILDWPS modern web design and development workstation showcase preview',
  },
];

export const ARCHITECTURE_MODULES: ArchitectureModule[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    fileName: 'Storefront.tsx',
    summary: 'Typed React interfaces with responsive layout geometry and state-driven shopping flows.',
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    code: [
      'export function Storefront({ catalog }: Props) {',
      '  const [bag, setBag] = useBagState();',
      '  return (',
      '    <main className="grid gap-8 md:grid-cols-3">',
      '      {catalog.map((item) => (',
      '        <ProductTile key={item.id} item={item} onAdd={setBag} />',
      '      ))}',
      '    </main>',
      '  );',
      '}',
    ],
  },
  {
    id: 'backend',
    label: 'Backend API',
    fileName: 'orders.route.ts',
    summary: 'Express REST endpoints backed by SQLite integration and validated request handlers.',
    stack: ['Node.js', 'Express.js', 'SQLite'],
    code: [
      "router.post('/api/orders', requireAuth, async (req, res) => {",
      '  const payload = validateOrderInput(req.body);',
      '  const record = await db.insertOrder(payload);',
      '  return res.status(201).json({',
      '    orderId: record.id,',
      '    status: record.status,',
      '  });',
      '});',
    ],
  },
  {
    id: 'edge',
    label: 'Edge & Cloud',
    fileName: 'worker.ts',
    summary: 'Cloudflare Workers paired with D1 databases and R2 object storage at the edge.',
    stack: ['Cloudflare Workers', 'D1', 'R2'],
    code: [
      'export default {',
      '  async fetch(request: Request, env: Env) {',
      '    const { results } = await env.DB',
      "      .prepare('SELECT id, name, slug FROM products WHERE active = 1')",
      '      .all();',
      '    return Response.json(results);',
      '  },',
      '};',
    ],
  },
  {
    id: 'automation',
    label: 'Automation',
    fileName: 'lessonBot.ts',
    summary: 'Structured Telegram lesson delivery and automated workflow orchestration.',
    stack: ['Telegram Bot API', 'Workflow Automation'],
    code: [
      "bot.command('lesson', async (ctx) => {",
      '  const entry = await getNextVocabularyLesson(ctx.from.id);',
      '  await ctx.reply(formatLessonCard(entry), {',
      "    parse_mode: 'HTML',",
      '  });',
      '});',
    ],
  },
];
