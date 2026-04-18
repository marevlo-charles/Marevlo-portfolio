# Marevlo React Portfolio

A deployable React, TypeScript, Tailwind CSS, and Vite portfolio site for Marevlo Research.

## Stack

- React 19
- TypeScript
- Tailwind CSS v4
- Vite

## Project structure

- `src/App.tsx` app shell
- `src/components/site/*` page sections and layout
- `src/components/ui/*` reusable presentation helpers
- `src/content/site-content.ts` editable portfolio copy and links
- `src/hooks/*` scroll reveal and stat animation hooks
- `src/assets/*` brand assets

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production-ready files are generated in `dist/`.

## Deploy

### Vercel

1. Import the `Marevlo-portfolio` folder as a new project.
2. Framework preset: `Vite`
3. Build command: `npm run build`
4. Output directory: `dist`

### Netlify

1. Create a new site from the `Marevlo-portfolio` folder.
2. Build command: `npm run build`
3. Publish directory: `dist`

## Content updates

For most portfolio edits, start with `src/content/site-content.ts`.

That file controls:

- hero copy
- venture cards
- capabilities
- metrics
- contact links

## Suggested next upgrades

- add real LinkedIn and X links
- connect a contact form backend or Formspree
- add case studies and blog routes
- plug in analytics and SEO metadata
