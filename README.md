# StudyFlow

A personal academic progress tracker focused on syllabus tracking, self-reported understanding, revision suggestions, and exam workload.

Early development: Stage 1 of 9 complete

## What StudyFlow is

StudyFlow is a study tracker (not a teaching or assessment platform). Today it is a navigable shell with three placeholder pages.

## Roadmap/status table

| Stage | Goal | Status |
|---|---|---|
| Stage 1 | Project foundation (shell, tokens, domain model, repository, provider) | done |
| Stage 2 | Subjects and syllabus management | planned |
| Stage 3 | Progress tracking | planned |
| Stage 4 | Self-reported understanding and revision record | planned |
| Stage 5 | Dashboard subject details | planned |
| Stage 6 | Upcoming exams | planned |
| Stage 7 | Analysis | planned |
| Stage 8 | Persistence hardening and notices | planned |
| Stage 9 | Polish and acceptance | planned |

## Tech stack

| Technology | Version (from repo) | Notes |
|---|---|---|
| React | ^19.3.1 | UI |
| React DOM | ^19.3.1 | DOM renderer |
| React Router (hash routes) | ^7.18.4 | HashRouter used |
| Vite | ^8.3.5 | Build/dev server |
| Vitest | ^5.0.5 | Test runner (itest run) |
| @testing-library/react | ^16.3.3 | Component tests |
| @testing-library/user-event | ^14.6.8 | User events |
| ESLint | ^10.13.0 | Linting |
| JavaScript | Plain JS (no TypeScript) | As per project |
| CSS | Plain CSS with custom properties | Tokens in src/styles/tokens.css |

## Getting started

### Prerequisites

- Node.js: Vite requires engines ^20.19.0 || >=22.12.0; built with Node v24.19.0.

### Install

`powershell
npm install
` 

### Start the dev server

`powershell
npm run dev
` 

## Using StudyFlow

**What works right now:**

- Navigate between Dashboard, Subjects, and Analysis using the navigation (top bar on desktop, bottom tab bar below 640 px).
- Use the browser's back and forward buttons (hash routes via react-router-dom HashRouter).
- Use the "Skip to main content" link with the keyboard.

## Data and privacy

- All data is stored in the browser's localStorage under the key studyflow.data (see src/storage/repository.js).
- No network calls were found in src/ and index.html; no account, no server.

## Licence

No licence has been chosen yet.

