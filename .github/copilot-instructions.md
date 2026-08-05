<!-- GENERATED FILE — DO NOT EDIT.
     Source: CLAUDE.md · Regenerate: ./scripts/sync-ai-instructions.sh -->

# CLAUDE.md

Instructions for AI assistants working in this repository.

> This file is the **single source of truth** for AI instructions.
> `.github/copilot-instructions.md` is generated from it — see [Syncing](#syncing).

## Project

A single React application used as a personal learning lab for React fundamentals. The app grows over time: each concept the user studies becomes a tab (button) in the app. The goal is understanding every mandatory React term, not shipping a product.

The authoritative spec — including the ordered concept path — is [docs/requirements.md](docs/requirements.md) (written in Romanian). Read it before proposing work.

## Who you are talking to

An experienced developer, fluent in Python / Java / C#, with **no JavaScript and no React experience**.

- Do **not** explain general programming (variables, functions, classes, OOP, recursion).
- Do explain **everything** JS- and React-specific, including what looks trivial: `const` vs `let`, ES modules, `map`, promises, `async/await`.
- Anchor every new concept to a language they already know — `props` ≈ constructor arguments, a component ≈ a class with a single `render`, `key` ≈ stable identity in a list. When there is no equivalent (hooks, re-render semantics), say so explicitly.

## Teaching protocol (hard rules)

For every concept, in this order: **explain → answer questions → write code together.**

- Never write code before the explanation has landed.
- One concept per session.
- Ask before writing code.
- Write the **smallest** working example that demonstrates the concept, not a complete one.
- Never scaffold future lessons — no placeholders, no folders, no imports for concepts not yet reached.
- When the user asks to be guided step by step, do not hand over the full solution.
- Reply in **Romanian**. Write repository artifacts (code, comments, `notes.md`, docs) in **English**.

## Stack & commands

Vite · React 19 · TypeScript · npm. Vitest + React Testing Library are added only when the testing lesson is reached. Do not add other dependencies without an explicit, discussed reason.

Commands (available once Lesson 0 has created the app):

```bash
npm install
npm run dev      # dev server
npm run build    # type-check + production build
npm run preview  # serve the build
npm test         # from the testing lesson onward
```

## Repo layout

```
src/
  App.tsx              # demo registry (see below) — keep this file short
  demos/               # one file per concept: <Concept>.tsx
  components/          # shared presentational components
  hooks/               # one custom hook per file
  context/             # one provider + its consumer hook, per file
  lib/                 # small pure helpers (no React)
```

## Demo registry (App.tsx)

`App.tsx` owns a typed registry and nothing else:

```ts
type Demo = { id: string; step: number; title: string; element: ReactNode };

const demos: Demo[] = [
  // { id: 'counter', step: 2, title: 'useState (Counter)', element: <Counter /> },
];
```

Active demo selection:

```ts
const [activeId, setActiveId] = useState(demos[0]?.id ?? "");
const active = demos.find((d) => d.id === activeId) ?? demos[0];
```

The shell renders `Pas {active.step} — {active.title}`; the demo renders only its own content.

**Adding a demo = one new file in `src/demos/` + one new entry in the `demos` array. Nothing else is touched.**

## Code conventions

- Function components only.
- Type props with a local `Props` type in the same file.
- No `any`. No non-null assertions (`!`) to silence the type checker.
- One default export per demo file: the demo component. Everything else is a named export.
- Every `src/demos/<Concept>.tsx` starts with a header block:

```ts
// Pas N — <Concept>.
// DE CE există acest pas: <explicație în română — motivul, nu descrierea codului>.
```

- All other comments explain WHY a piece of code exists, not what it does. Write them in Romanian.
- Commit message format: `pas N — concept (ComponentName)` (e.g. `pas 2 — useState (Counter)`).

## Definition of done for a demo

- The demo appears in the `demos` array and renders correctly in the app.
- The file has the required `// Pas N —` header comment.
- `npm run build` passes.
- The user can explain the concept in their own words without looking at the code.

## Syncing

`.github/copilot-instructions.md` is a generated copy of this file. Never edit it by hand.

```bash
./scripts/sync-ai-instructions.sh           # regenerate after editing CLAUDE.md
./scripts/sync-ai-instructions.sh --check   # exit 1 if the copy is stale (CI / pre-commit)
```

To enforce it locally, wire the check into a hook yourself:

```bash
printf '#!/bin/sh\nexec ./scripts/sync-ai-instructions.sh --check\n' > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```
