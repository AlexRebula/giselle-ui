# Giselle UI

A clean, modern, professional React + TypeScript component library for the Giselle brand.

`@alexrebula/giselle-ui` is designed as a production-ready, publishable npm package with strong defaults for accessibility, theming, and developer experience.

## Tech Stack

- React 19
- TypeScript 5.9 (strict mode)
- tsup library build (ESM + CJS)
- Storybook 8

## Installation

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

## License

MIT
