# DealBird

A Vite-powered React + TypeScript front-end that will evolve into DealBird. The repository currently contains the scaffolded project along with a working build pipeline.

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer (ships with recent Node.js versions)

## Quick Start

Install dependencies, launch the dev server, and open the app in your browser:

```bash
npm install
npm run dev -- --host
```

The dev server runs on <http://localhost:5173>. Pass `-p <port>` to choose a different port.

## Available Scripts

- `npm run dev` – Start Vite in development mode.
- `npm run build` – Type-check and build the production bundle into `dist/`.
- `npm run preview` – Serve the production build locally.
- `npm run lint` – Lint the project using the ESLint configuration in `eslint.config.js`.

## Deployment

Build the production bundle and deploy the contents of the `dist/` directory to your hosting provider:

```bash
npm run build
```

## Next Steps

- Replace the default React content in `src/App.tsx` with the initial DealBird UI.
- Add automated tests and CI as features solidify.
