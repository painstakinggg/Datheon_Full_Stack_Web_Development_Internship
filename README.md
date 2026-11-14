# Datheon — Full-Stack Web Development Internship

A collection of selected projects completed as part of the Datheon Full-Stack Web Development Internship. The repository is organised so each project has its own source code, dependencies, and project-specific documentation.

The work demonstrates practical frontend development, responsive interface design, API integration, browser storage, interactive application behaviour, and deployment.

## Projects

### Task 1 — Personal Developer Portfolio

**Live website:** [https://iagboola.vercel.app](https://iagboola.vercel.app)

A responsive personal portfolio presenting my background, technical skills, selected work, and contact information.

**Highlights**
- Responsive layout and mobile navigation
- Dark and light theme switching
- About and technical skills sections
- Selected project showcase with category filtering
- Interactive project previews
- Contact options, including email and copy-to-clipboard
- SEO metadata and keyboard-accessible interactions

**Technology**
- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Motion
- Lucide React

**Source location:** Repository root (src/)

### Task 2 — Taskflow Productivity Tracker

A responsive task manager for organising personal, work, study, and health-related tasks.

**Highlights**
- Create, edit, and delete tasks
- Optional descriptions and due dates
- Work, Personal, Study, and Health categories
- Completion status and task filters
- Search by task title or description
- Category filtering and productivity statistics
- Browser localStorage persistence
- Responsive desktop, tablet, and mobile layouts

**Technology**
- React 19
- TypeScript
- Vite
- CSS
- Lucide React
- Browser localStorage

**Source location:** [task-2-task-manager/](./task-2-task-manager/)

**Documentation:** [Task 2 README](./task-2-task-manager/README.md)

### Task 4 — Forma E-commerce Store

**Live website:** [https://forma-datheon.vercel.app](https://forma-datheon.vercel.app)

A responsive storefront and shopping-bag experience using product and category data from FakeStoreAPI.

**Highlights**
- Product catalogue loaded from FakeStoreAPI
- Product search, category filtering, and sorting
- Product favourites for the current session
- Add-to-bag interaction without automatically opening the shopping bag
- Shopping-bag drawer with quantity controls and item removal
- Cart persistence using browser localStorage
- Subtotal, estimated tax, shipping, and total calculations
- Simulated checkout flow
- Responsive navigation, full-height menu drawer, and editorial footer
- Loading, empty, and API error states

**Technology**
- React 19
- TypeScript
- Vite
- CSS
- Lucide React
- FakeStoreAPI
- Browser localStorage

**Source location:** [task-4-ecommerce-cart/](./task-4-ecommerce-cart/)

**Documentation:** [Task 4 README](./task-4-ecommerce-cart/README.md)

> **Checkout note:** Forma is an internship demonstration. Checkout is simulated; it does not collect real payments, create backend orders, or transmit customer details to a server. Product data comes from FakeStoreAPI, and the tax and shipping figures are demonstration assumptions rather than a real merchant policy.

## Repository structure

\`\`\`text
Datheon_Full_Stack_Web_Development_Internship/
├── src/                         # Task 1: Personal Developer Portfolio
├── task-2-task-manager/          # Task 2: Taskflow Productivity Tracker
│   ├── src/
│   └── README.md
├── task-4-ecommerce-cart/        # Task 4: Forma E-commerce Store
│   ├── src/
│   └── README.md
├── .github/
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
\`\`\`

## Running the projects locally

Each project is a separate application. Install dependencies and run the development server from the relevant project directory.

### Task 1 — Portfolio

From the repository root:

\`\`\`bash
npm install
npm run dev
\`\`\`

### Task 2 — Taskflow

\`\`\`bash
cd task-2-task-manager
npm install
npm run dev
\`\`\`

### Task 4 — Forma

\`\`\`bash
cd task-4-ecommerce-cart
npm install
npm run dev
\`\`\`

For each application, Vite prints the local development URL in the terminal.

## Production builds

Run the following from the relevant project directory:

\`\`\`bash
npm run build
npm run preview
\`\`\`

The projects have their own package configuration and build scripts. Refer to each project's README for its requirements, data behaviour, and scope.

## Development approach

The projects were developed iteratively, with attention to:
- Clear component structure and maintainable code
- Responsive layouts across common screen sizes
- Accessible controls, labels, and keyboard focus
- Loading, empty, and error states where applicable
- Practical documentation and setup instructions
- Testing and deployment appropriate to each project

AI-powered development tools were used selectively to support research, implementation, troubleshooting, and refinement. AI assistance formed part of the development workflow; the resulting code and project decisions were reviewed and integrated into the applications.

## Scope and implementation notes

- Task 1 is deployed at [iagboola.vercel.app](https://iagboola.vercel.app).
- Task 2 is maintained as a separate application in this repository. A public deployment link is not listed here.
- Task 4 is deployed at [forma-datheon.vercel.app](https://forma-datheon.vercel.app).
- Task 2 and Task 4 use browser localStorage for local persistence; this does not provide cross-device synchronisation or a remote database.
- Forma uses a public demonstration API and a simulated checkout. It is not a production payment or order-processing system.

## Author

**Ibrahim Opeyemi Agboola**

- GitHub: [@Painstakinggg](https://github.com/Painstakinggg)
- LinkedIn: [LinkedIn profile](https://www.linkedin.com/in/ibrahim-agboola-8607b5448/)
- Email: [painstaking.web@gmail.com](mailto:painstaking.web@gmail.com)

---

Built as part of the Datheon Full-Stack Web Development Internship, with a focus on practical implementation and continuous learning.
