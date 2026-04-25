# Giselle UI

A clean, modern, professional React + TypeScript component library for the Giselle brand.

`@alexrebula/giselle-ui` is designed as a production-ready, publishable npm package with strong defaults for accessibility, theming, and developer experience.

## Status

> **Beta — active development. Not yet published to npm.**
>
> First public npm release is planned alongside the portfolio site launch (May/June 2026).
> Until then, reference from disk using `"file:../path/to/giselle-ui"` in your `package.json`.

**The test suite will receive a full review and overhaul before the first npm publish.**
No package ships to npm until the tests meet the same standard as the implementation.

## Tech Stack

- React 19
- TypeScript 5.9 (strict mode)
- tsup library build (ESM + CJS)
- Storybook 8

## Installation

> **Not yet published to npm.** This will work after the package is released.

```bash
npm install @alexrebula/giselle-ui
```

## Usage

```tsx
import { Button, ThemeProvider } from '@alexrebula/giselle-ui';
import '@alexrebula/giselle-ui/styles.css';

export function App() {
  return (
    <ThemeProvider>
      <Button onClick={() => console.log('Hello Giselle UI')}>Click me</Button>
    </ThemeProvider>
  );
}
```

## Development

```bash
npm install
npm run typecheck
npm run build
npm run storybook
```

## Library Structure

- `src/components/` – reusable UI components
- `src/hooks/` – reusable hooks
- `src/utils/` – utility helpers
- `src/types/` – shared type definitions
- `.storybook/` and `stories/` – Storybook configuration and examples

## Accessibility, Theming, and Dark Mode

- Accessible component primitives and keyboard focus styles
- `ThemeProvider` with `light`, `dark`, and `system` modes
- CSS variable-based tokens for easy customization

## Publishing

This package is configured with `main`, `module`, `types`, and `exports` fields for npm publication.

## Roadmap

- Expand React component coverage from portfolio patterns
- Add design tokens and richer composition primitives
- Publish official Giselle UI packages for Angular
- Publish official Giselle UI packages for Vue

## Project Vision

**A modern, framework-agnostic UI component library and design system.**

Currently focused on **React + TypeScript** with a clean, accessible, and highly reusable component set built on top of modern best practices.

### Status
- **In active development**
- First public release planned after the main portfolio site is live (expected May/June 2026)
- The library is being extracted and refined from my personal portfolio project

### Vision

**Giselle UI** package separates data from presentation.

This clean boundary makes components more reusable, easier to test, and simpler to evolve over time.
It is the foundation of the Giselle UI ecosystem and can be used independently in any project.

We aim for this package to become a consistent, high-quality component library across multiple frameworks:

- React (current focus)
- Angular (planned)
- Vue (planned)
- Future frameworks as needed

### What’s coming
- Clean, accessible components
- Strong TypeScript support
- Comprehensive Storybook documentation
- Performance-focused design
- Framework-specific packages (`@alexrebula/giselle-ui`, `@alexrebula/giselle-mui`, etc.)

Stay tuned — the first components will be published soon.

---

## License

MIT

---

Made with ❤️ by [Alex Rebula](https://github.com/AlexRebula)
