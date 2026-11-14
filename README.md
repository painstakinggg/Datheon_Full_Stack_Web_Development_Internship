# Ibrahim Opeyemi Agboola — Personal Portfolio

A modern, responsive personal portfolio showcasing my work, technical skills, selected projects, and development journey as a Full Stack Web Developer.

**GitHub Repository:** [ibrahim-agboola-portfolio](https://github.com/painstakinggg/ibrahim-agboola-portfolio)

## About the Project

This portfolio introduces me, highlights my technical abilities, showcases selected projects, and gives visitors a way to get in touch.

It features a Midnight-inspired dark obsidian and purple visual system, a responsive layout, dark/light theme switching, and interactive project previews.

The portfolio itself is a frontend application. My broader full-stack development experience is represented through the projects featured on the website.

## Features

- Responsive layouts for desktop, tablet, and mobile
- Dark and light theme toggle
- Responsive navigation with a mobile menu
- About and technical skills sections
- Featured project showcase
- Project category filtering
- Interactive project preview modal
- Contact form with client-side validation
- Email composition through a `mailto:` fallback
- Copy-to-clipboard contact option
- SEO metadata
- Keyboard-accessible navigation interactions

## Technologies

| Technology | Purpose |
|---|---|
| React 19 | User interface |
| TypeScript | Type safety |
| Vite | Development server and production build |
| Tailwind CSS v4 | Styling and responsive layouts |
| Motion | Interface animations |
| Lucide React | Icons |
| HTML5 and CSS3 | Markup and styling |

## Featured Projects

| Project | Status | Link |
|---|---|---|
| AF LUXE | Ongoing | [View project](https://af-luxe-preview.pages.dev/) |
| NAFFY SCENTS | Ongoing | [View project](https://ea0a0a53.naffyscents.pages.dev/) |
| PAINSIONARY BOT | Built | [View bot](https://t.me/PainsionaryBot) |
| BUILDWPS | Deployed | [View project](https://buildwps.pages.dev/) |

## Project Structure

```text
ibrahim-agboola-portfolio/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── Projects.tsx
│   │   └── Skills.tsx
│   ├── data/
│   │   └── portfolio.ts
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js version supported by the installed Vite version
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/painstakinggg/ibrahim-agboola-portfolio.git
```

### 2. Open the project directory

```bash
cd ibrahim-agboola-portfolio
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The development server is configured to use port 3000. Open the local URL shown in your terminal (normally `http://localhost:3000`).

### 5. Create a production build

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

### 7. Run the configured TypeScript check

```bash
npm run lint
```

**Note:** The current `lint` script runs `tsc --noEmit`. It checks TypeScript without generating build output; it is not an ESLint command.

## Contact Form

The contact form currently validates input in the browser and provides an email-client (`mailto:`) and copy-to-clipboard fallback. It does not send messages directly to a backend or email service. Visitors need to complete sending the message in their own email application.

## Setup Notes and Troubleshooting

The repository currently does not include a package lockfile, so use `npm install` to install dependencies.

If setup or development commands fail:

- Check that your Node.js and npm versions are compatible with the installed Vite version.
- If the configured development port is already occupied, stop the process using it before restarting the server.
- Run `npm run lint` to identify TypeScript errors.
- Run `npm run build` and review the terminal output if the production build fails.
- If styling appears incorrect, verify that the Tailwind CSS Vite plugin is installed and configured.

These are practical setup checks; they are not presented as a record of specific errors encountered during development.

## AI-Assisted Development

AI-powered tools, including Google AI Studio, were used selectively during development to support implementation, explore ideas, and improve productivity. AI assistance was used as a development aid, and the generated work was integrated and reviewed during the development process.

## Contact

**Ibrahim Opeyemi Agboola**

- Email: [painstaking.web@gmail.com](mailto:painstaking.web@gmail.com)
- LinkedIn: [LinkedIn profile](https://www.linkedin.com/in/ibrahim-agboola-8607b5448/)
- GitHub: [@Painstakinggg](https://github.com/Painstakinggg)

---

Built with React, TypeScript, and a commitment to continuous learning.
