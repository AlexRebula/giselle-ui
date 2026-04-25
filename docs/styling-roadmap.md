---
sidebar_position: 1
sidebar_label: 'Styling Roadmap'
---

# giselle-ui — Styling Roadmap

This document defines the styling strategy for `@alexrebula/giselle-ui`. The library is
framework-agnostic, has zero runtime dependencies, and must ship CSS that works without
any consumer build tool configuration beyond `import '@alexrebula/giselle-ui/styles.css'`.

---

## Current state (baseline)

The library currently uses:

- **CSS Custom Properties** (`--giselle-*`) in `src/styles.css` — design tokens for colour,
  border, background, accent. Supports light/dark mode via `[data-theme='dark']` and
  `prefers-color-scheme`.
- **Semantic class names** — components receive stable, predictable class names
  (`giselle-button`, `giselle-root`). No utility classes.
- **`cn()` utility** — a minimal class concatenation helper. Not clsx; not tailwind-merge.
- **`@radix-ui/react-slot`** — the only runtime dependency; enables `asChild` composition.

This baseline is already correct for a zero-dep component library. The `--giselle-*` token
system is the right foundation. The open question is authoring ergonomics and long-term scale.

---

## Candidate comparison

> Ranked by overall fit for a small, zero-runtime, framework-agnostic React component library.

| # | Approach | Community | Docs quality | Maturity | Bundle impact | Library fit |
|---|----------|-----------|-------------|---------|--------------|-------------|
| 1 | **CSS Modules** | ★★★★☆ | ★★★★★ | Mature — in every bundler | Zero — compiled away | ★★★★★ Ideal |
| 2 | **Tailwind CSS v4** | ★★★★★ | ★★★★★ | Stable — v4 GA 2025 | Zero — utility classes pre-generated | ★★★★☆ Good with caveats |
| 3 | **Vanilla Extract** | ★★★☆☆ | ★★★★☆ | Stable — used in MUI v6, Radix Themes | Zero — TypeScript → CSS at build | ★★★☆☆ Complex setup |
| 4 | **PandaCSS** | ★★★★☆ | ★★★★☆ | Growing — Chakra team, 2023 | Zero — utility classes pre-generated | ★★★☆☆ Token-heavy DX |
| 5 | **UnoCSS** | ★★★★☆ | ★★★★☆ | Growing — Vue-first, React support improving | Zero — atomic CSS | ★★★☆☆ |
| 6 | **Emotion / styled-components** | ★★★★☆ | ★★★★★ | Mature | Runtime — 8–15 kB | ★☆☆☆☆ Wrong direction |
| 7 | **Open Props** | ★★☆☆☆ | ★★★☆☆ | Niche — CSS vars library | Zero — just CSS vars | ★★☆☆☆ Too minimal |

---

## Recommendation

### Phase A — CSS Modules (recommended immediately)

**Why:** The current global class names (`giselle-button`) work fine now but do not scale. As
the library grows, naming collisions with consumer stylesheets become a real risk. CSS Modules
compile per-component scoped names at build time. The consumer still imports one `styles.css` —
the scoping is transparent.

**What changes:**
- Each component gets a sibling `<name>.module.css` file
- `cn()` is upgraded to accept module class values (no change to its signature, just usage)
- `tsup.config.ts` enables `cssModules: true`
- The global `styles.css` remains for tokens (`--giselle-*`) — it is not CSS Modules

**What stays the same:**
- Zero new runtime dependencies
- `import '@alexrebula/giselle-ui/styles.css'` still works identically for consumers
- `--giselle-*` token system is unchanged
- All component APIs and props are unchanged

**Trade-offs:**
- Slightly more files per component (one `.module.css` alongside each `.tsx`)
- Build config change (minor — one tsup option)

---

### Phase B — Tailwind CSS v4 (optional, adopt when consumer ecosystem warrants it)

**Why Tailwind (if you adopt it):**
- Largest community of any CSS framework by a significant margin
- v4 (2025) is pure CSS — the config is a `@import "tailwindcss"` directive; no `tailwind.config.js`
- `@source` directive in v4 lets a library declare where Tailwind should scan its own files,
  without requiring the consumer to add the library path to their content config
- Natural fit: `cn()` is already in place; upgrading to `clsx` + `tailwind-merge` is a one-liner
- Utility classes inside components do not leak to consumers — they are pre-generated into CSS

**The library-specific caveats:**
- Tailwind classes are not self-describing to humans reading the library source (`px-4 py-2
  rounded-md` is less readable than `.giselle-button` for a new contributor)
- Consumers who do NOT use Tailwind still need to import the generated CSS — identical to now;
  no issue
- Consumers who DO use Tailwind and want to extend/override component styles need to understand
  which utilities were applied — this is harder than overriding a named CSS class

**Adoption trigger:** Adopt Tailwind when the majority of consumer projects using this library
already use Tailwind — so the class language is shared rather than siloed in the library.

**If you adopt Tailwind:**
1. Add `tailwindcss` to `devDependencies` (not peerDependencies — consumers do not need it)
2. Add `@tailwindcss/vite` to the tsup/vite build pipeline
3. Upgrade `cn()` to `clsx` + `tailwind-merge` (or use the `cn` convention from shadcn/ui)
4. Replace semantic CSS classes with utility compositions inside components
5. Keep `--giselle-*` tokens as CSS Custom Properties — Tailwind v4 can reference them as
   `theme('colors.giselle-accent')` via `@theme { --color-giselle-accent: var(--giselle-accent); }`

---

### Phase C — Vanilla Extract (only if token system becomes the primary concern)

Vanilla Extract is excellent if:
- The library grows to 50+ components with a complex design token hierarchy
- You want TypeScript autocomplete on token values at authoring time
- You are willing to accept a more complex build setup

It is not worth the overhead for a small-to-medium library. The current `--giselle-*` token
system already solves 80% of what Vanilla Extract's `createGlobalTheme` solves, with zero
tooling investment.

**Skip unless the library grows significantly in scope.**

---

## Decision summary

| When | What to do |
|------|-----------|
| Now | Stay on CSS Custom Properties + semantic class names. It is correct. |
| Next component added | Add CSS Modules per-component. Prevents naming collisions as the library scales. |
| Tailwind consumer majority | Adopt Tailwind v4. Keep `--giselle-*` tokens; use utility classes internally. |
| 50+ components, rich token hierarchy | Evaluate Vanilla Extract then. Not before. |

---

## What to avoid

| Approach | Why |
|----------|-----|
| Emotion / styled-components | Runtime cost; wrong direction for a zero-dep library |
| `@mui/material` | Explicitly forbidden by library rules — this is giselle-UI, not giselle-MUI |
| Inline `style` props for layout | Not themeable; not overridable by consumers |
| Hardcoded hex or rgba literals | Always use `--giselle-*` tokens so consumers can theme the library |

---

## Current `cn()` and when to upgrade it

The current `cn()` is a plain filter-and-join:

```ts
export function cn(...values: Array<string | undefined | null | false>): string {
  return values.filter(Boolean).join(' ');
}
```

This is fine for Phase A (CSS Modules). It handles conditional class names without needing
conflict resolution because semantic class names do not conflict.

If Tailwind is adopted (Phase B), upgrade to `clsx` + `tailwind-merge`:

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

This resolves Tailwind utility conflicts when consumers pass `className` overrides — e.g.
`<Button className="bg-red-500">` correctly overrides the library's `bg-violet-600` rather
than both being applied and the last one winning by specificity.

---

_Last updated: April 2026._
