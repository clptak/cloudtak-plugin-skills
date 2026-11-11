---
name: cloudtak-plugin-scaffold
description: Create the skeleton of a new CloudTAK plugin repo from the templates in this skill, adapted to the CloudTAK version recorded in context/cloudtak-plugin-host.md, and get it loading in a running CloudTAK with a menu entry and an empty panel. Use after the design and host grounding are done, or when the user asks to "scaffold", "start", or "create the repo" for a CloudTAK plugin.
---

# Scaffold a CloudTAK plugin

Goal for this stage: the smallest plugin that loads, shows a menu entry, opens an empty panel
and unloads cleanly. No features yet.

## Before you write files

1. Confirm `context/cloudtak-plugin-host.md` exists and matches the checkout's current version.
   If not, run `cloudtak-host-grounding` first.
2. Ask, one at a time: the plugin's slug (`cloudtak-plugin-<slug>`), the menu label, the
   license (CloudTAK is AGPL-3.0; MIT and AGPL-3.0 are both common for plugins), and whether
   the panel is a menu page, a floating pane, or both (from `docs/DESIGN.md` if already decided).

## Files

Copy from `templates/` in this skill and replace the `__TOKENS__`:

| Template | Goes to | Notes |
|---|---|---|
| `index.ts` | repo root | Re-exports the plugin class. The host glob picks up `<plugins>/<slug>/index.ts` |
| `src/index.ts` | `src/index.ts` | The `PluginInstance`: `install`, `enable`, `disable` |
| `src/components/MenuPanel.vue` | `src/components/` | Empty panel using `@tak-ps/vue-tabler` |
| `package.json` | repo root | Host packages as `peerDependencies`; `@tak-ps/cloudtak` as a `file:` dev dependency for types |
| `tsconfig.json` | repo root | Matches the host's settings so `vue-tsc` agrees with the host build |
| `test/smoke.test.ts` | `test/` | Uses `node --test`; pure logic only, no DOM |
| `README.md` | repo root | Install and development sections filled in from the grounding doc |

Then **check each API used in the templates against the grounding doc.** Template code was
written against CloudTAK v13.107.3. If a method signature differs in the user's version, follow
the source, not the template, and note the difference in `context/cloudtak-plugin-host.md`.

## Rules the templates follow (keep them)

- `import type` for everything from `@tak-ps/cloudtak`; it is a types-only package outside the
  host build and a Vite alias to the real `plugin.ts` inside it.
- Register the route before the menu item; `menu.add` refuses a route that does not exist.
- In `disable()`, remove the menu item and any floating pane or bottom bar item you added.
- Components are loaded with `defineAsyncComponent` so the plugin does not slow first paint.
- Icons are wrapped in `markRaw`.
- Imports from CloudTAK's own source go through the host's `@` alias (`@/components/...`),
  never a relative `../../../src` path: Vite resolves the development symlink to its real
  location and relative paths into the host break.
- No credentials anywhere in the repo.

## Development loop

1. In the CloudTAK checkout, link the plugin into the web app's plugins directory recorded in
   the grounding doc, for example:
   `ln -s ~/dev/cloudtak-plugin-<slug> <CloudTAK>/app/plugins/<slug>`
2. Start the web dev server the way the grounding doc records (`npm run dev` or `npm run serve`
   in the web root). A new plugin needs a dev-server restart; edits after that hot-reload.
3. Open CloudTAK, confirm the menu entry appears, opens the panel and the browser console is
   clean.
4. `npm run typecheck` in the plugin repo.

## Gate

Show the user the menu entry and empty panel (a screenshot if you can drive a browser). Commit:
`Scaffold <slug> plugin`. Then hand off to `cloudtak-plugin-build`.
