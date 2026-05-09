# @alexrebula/giselle-ui — Copilot Instructions

This is a **public, MIT-licensed** React + TypeScript component library.
It is independent of MUI and any MUI theme.

## ⚠️ Copyright rule — read this first

This package is MIT-licensed and public. It must contain **zero code derived from any
proprietary theme or kit** — including any theme from the MUI Store, especially any commercial kit used in the sibling
`alexrebula` portfolio project.

**Hard rules — non-negotiable:**

1. **No third-party theme code.** Never copy or adapt code or utilities from any MUI Store
   theme, commercial theme, or proprietary kit — free or paid. Identifiers such as
   `varAlpha`, `varFade`, `varBlur`, `customShadows`, `_mock`, or any other utility
   originating in a third-party theme must not appear in this package. If similar
   functionality is needed, write it from scratch independently.

2. **No imports from the `alexrebula` portfolio.** This package must not import from
   `alexrebula/src/` or any path inside that private repo.

3. **No MUI or proprietary dependencies.** This library is framework-agnostic by design.
   Allowed dependencies: `react`, `react-dom`, `@radix-ui/react-slot`, and fully open-source utilities only.

## What this package is

A standalone React + TypeScript UI component library. Independent theming via CSS Custom
Properties. No MUI. Designed to be publishable and usable without any external theme provider.

## Stack

- React 19, TypeScript 5.9 (strict, no `any`)
- `@radix-ui/react-slot` — the only runtime dependency (enables `asChild` composition)
- CSS Custom Properties for theming (`--giselle-*` tokens in `src/styles.css`)
- `cn()` utility for conditional class names (`src/utils/cn.ts`)
- tsup for building (ESM + CJS + CSS)
- Storybook 8 for visual development
- No MUI, no proprietary dependencies

## Brand identity — the Giselle mango tree

The Giselle ecosystem is named after the Filipino partner of the author. The Philippine national fruit is the Carabao mango — both the logo mark and the ecosystem metaphor.

- **The tree** = shared foundation: CSS custom property conventions, TypeScript patterns, accessibility discipline
- **Each branch** = a package (`giselle-mui`, `giselle-sections-sdk`, `giselle-ui`, `giselle-docs`)
- **Each mango** = a release at its own ripeness stage

Ripeness scale: 🟢 green = alpha · 🟡 yellow-green = beta · 🟠 golden = stable · 🟤 amber = LTS

`giselle-ui` is the **green mango** — youngest branch, independent of MUI, themed via CSS custom properties (`--giselle-*` tokens).

**Palette:** Mango gold `#F5A623` · Deep grove `#2E7D32` · Lime `#76C442` · Ripe flesh `#FFF3CD` · Dark grove `#1A2B1A` · Warm tan `#F5EDDC`

**WC-6:** The planned wide hero illustration — watercolour mango tree with per-package label badges. See `alexrebula/docs/brand/logo-concept.md` Track A.

## Component rules (non-negotiable)

1. **Zero new runtime dependencies.** `@radix-ui/react-slot` is the only allowed runtime dep.
   Raise this as a question before adding anything else.

2. **Use CSS Custom Properties for theming.** Every colour, spacing, and border value must
   use a `--giselle-*` token defined in `src/styles.css`. Never hardcode hex, rgba, or px literals.

3. **`cn()` for class composition.** Always use the `cn()` utility for merging classNames.
   Never concatenate strings manually.

4. **`...props` spread on root element.** Enables `data-*`, `aria-*`, `id`, `className`
   without prop drilling.

5. **`className` prop on every component.** Consumers must always be able to override styles.

6. **`asChild` pattern via `@radix-ui/react-slot`** where polymorphism is needed (see `Button`).

7. **No hardcoded copy.** Components are structural shells. Text content comes from props.

## Styling approach

Current: **CSS Custom Properties + semantic class names** (`.giselle-button`, `.giselle-root`).

Phase A (next): **CSS Modules per component** — `button.module.css` alongside `button.tsx`.
Enable `cssModules: true` in `tsup.config.ts`. Global `styles.css` stays for token definitions.

See `docs/styling-roadmap.md` for the full strategy, candidate comparison table, and
decision guide (Phase A: CSS Modules → Phase B: Tailwind v4 when warranted).

## Current components

| Component | File | Status |
|-----------|------|--------|
| `Button` | `src/components/button.tsx` | ✅ Shipped — with `asChild`/`Slot` |
| `ThemeProvider` | `src/components/theme-provider.tsx` | ✅ Shipped |
| `useTheme` hook | `src/hooks/use-theme.ts` | ✅ Shipped |
| `cn()` utility | `src/utils/cn.ts` | ✅ Shipped |
| Token styles | `src/styles.css` | ✅ Shipped — light + dark mode CSS vars |

## File structure per component

```
src/components/<name>.tsx         — component + exported Props interface
src/components/<name>.module.css  — scoped styles (Phase A: when CSS Modules enabled)
```

Barrel export in `src/index.ts`. New components must be added to the barrel.

## What Copilot should help build

- New components following all rules above
- Storybook stories (`stories/<Name>.stories.tsx`) with `argTypes: { control: false }` for
  `ReactNode` and complex-object props
- CSS Module files when CSS Modules is enabled (Phase A)
- `docs/styling-roadmap.md` updates when styling phases are completed

## Session bootstrap: where Copilot should look first

| File | Purpose |
|------|---------|
| [`docs/styling-roadmap.md`](../docs/styling-roadmap.md) | Full styling strategy — Phase A (CSS Modules), Phase B (Tailwind), decision table |
| [`src/styles.css`](../src/styles.css) | CSS Custom Property token definitions (light + dark mode) |
| [`src/components/button.tsx`](../src/components/button.tsx) | Reference component — follow this pattern for new components |

### Next planned work (priority order)

1. **CSS Modules Phase A** — enable `cssModules: true` in tsup, add `button.module.css`,
   keep `styles.css` for global tokens. See `docs/styling-roadmap.md` Phase A.
2. **Storybook story for Button** — verify scoped class in DOM, confirm `className` override works.
3. **Additional components** — raise component ideas against the rule: does this solve a
   recurring accessibility or styling problem that is non-trivial to get right without help?

---

## Contributor profiles — code review tone

This repository welcomes contributors at all experience levels. When reviewing any PR:

- **Hold the same quality standard regardless of contributor experience.** Do not lower the bar — explain what needs to change and why, just as you would for any contributor.
- **Explain the why, not just the what.** Do not say "use `const` here"; say "use `const` here because this value never changes — it signals to anyone reading the code that this was intentional, not a mistake."
- **One issue per comment.** Do not stack multiple changes into one comment.
- **Acknowledge what is correct before noting what to improve.**
- **When something is wrong, show what correct looks like** — not just "this is wrong"; show the fixed version and explain why it is better.
- **Four sentences max per comment.** Link to MDN or the repo README instead of writing a lecture inline.
- **No jargon without a definition.** If a term like "idempotent", "side effect", or "type assertion" appears in a comment, define it in the same sentence.
- **Do not ask for perfection.** If the code is correct, passes the quality gate, and solves the problem — it ships. Encourage, merge, move on.

---

## MUI Store quality bar (enforce always — not just before submission)

These rules come directly from the MUI Store submission requirements
(`https://support.mui.com/hc/en-us/articles/11440613164444`). They are development
standards, not pre-submission checklists. Every component must comply from the moment
it is written.

### Do not use `React.FC`

Use plain function declarations. `React.FC` is redundant, adds implicit `children` typing
baggage, and is explicitly banned by the MUI Store quality bar.

```tsx
// ❌ wrong
const MyComponent: React.FC<MyProps> = ({ foo }) => { ... }

// ✅ correct
function MyComponent({ foo }: MyProps) { ... }
```

**Enforcement:** Any new component using `React.FC` must be refactored before merge.

### `styled()` / `shouldForwardProp` note

This library does **not** currently use `styled()` and must not introduce MUI,
emotion-specific, or proprietary styling APIs through examples or new component code.
If the project ever explicitly adopts a **non-MUI, fully open-source** `styled` helper in
the future, that helper must include an equivalent prop-filtering mechanism (for example,
`shouldForwardProp`) so custom styling props do not leak into the DOM.

Until such a helper is intentionally added to the stack, prefer the current styling
approach documented in this file: CSS Custom Properties and semantic class names.

### No source maps in the distributed build

`sourcemap: true` is acceptable for local development. Any **production distribution**
build must set `sourcemap: false`.

### Browser support targets

All components must work in — and must not use APIs, CSS features, or DOM behaviour
unavailable in — the current MUI Core supported browser matrix.

Treat the upstream MUI Core browser support matrix as the source of truth rather than
duplicating specific version numbers in this file.
### Images and SVGs

- No low-resolution raster images. Any raster asset must look sharp at >200 PPI.
- SVG files must be optimised — no verbose metadata, no inline raster data.
- If SVGs are added to Storybook or a demo app, run them through `svgo` before committing.

