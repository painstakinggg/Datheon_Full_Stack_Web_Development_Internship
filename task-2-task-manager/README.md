# Taskflow — Datheon Internship Task 2

A responsive task manager and productivity tracker built with React, TypeScript, and Vite.

## Features

- Create, edit, and delete tasks
- Add optional descriptions and due dates
- Organize tasks into Work, Personal, Study, and Health categories
- Mark tasks as completed or active
- Filter by All tasks, Today, Upcoming, Completed, or Active
- Search task titles and descriptions
- Filter by category
- View task totals, completed tasks, pending tasks, and overdue tasks
- Persist tasks in browser localStorage, with a visible warning if the browser cannot save changes
- Confirm before deleting a task
- Use local calendar dates for Today and overdue calculations
- Provide visible keyboard focus and accessible names for search and category filters
- Responsive desktop, tablet, and mobile layouts

## Technology

- React 19
- TypeScript
- Vite
- CSS
- Lucide React
- Browser localStorage

## Run locally

Requirements: Node.js compatible with Vite 8 and npm.

```bash
cd task-2-task-manager
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Data storage

Tasks are stored in this browser using the localStorage key `datheon-task-manager-v1`. Data remains after a page refresh in the same browser profile. Clearing browser site data or using another browser/device will not carry the tasks across.

## Scope

This is a frontend productivity application. It does not use a remote database, user accounts, or cloud synchronization.
