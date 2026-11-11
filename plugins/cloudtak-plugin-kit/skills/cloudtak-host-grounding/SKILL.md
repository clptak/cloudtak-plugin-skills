---
name: cloudtak-host-grounding
description: Read the local CloudTAK checkout and write context/cloudtak-plugin-host.md, a source-cited description of how plugins load and what the PluginAPI offers in that exact version. Use before scaffolding, after updating CloudTAK, or whenever a plugin breaks after a CloudTAK upgrade.
---

# Ground the agent in the CloudTAK source

Do not describe the plugin API from memory. Paths have moved between releases (for example the
web app lived in `api/web/` and now lives in `app/`). Find everything by searching, cite
`path:line`, and write it down once so every later session starts from facts.

## Find, don't assume

Run these from the CloudTAK checkout root and record what you find:

| What | How to find it | Record |
|---|---|---|
| Version | `git describe --tags`, `git log -1 --format=%ci` | version and date at the top of the doc |
| Web app root | `find . -maxdepth 3 -name plugin.ts -not -path '*/node_modules/*'` | the directory holding the front-end `plugin.ts` |
| Plugin loader | `grep -rn "import.meta.glob" <web root>/src/main.ts` | the glob patterns and where `install()` and `enable()` are called |
| PluginAPI surface | the `get <name>()` accessors in `<web root>/plugin.ts` | each accessor and its methods with line numbers |
| Lifecycle | `PluginInstance` and `PluginStatic` in `plugin.ts` | when `enable`/`disable` fire (usually when the map loads) |
| Menu item shape | `MenuItemConfig` in `src/stores/modules/menu.ts` | required and optional fields |
| Parent route for menu pages | `grep -n "name: 'home-menu'" <web root>/src/router.ts` | the parent route name |
| Type alias | `grep -n "@tak-ps/cloudtak" <web root>/vite.config.ts` | whether `import type ... from '@tak-ps/cloudtak'` resolves |
| Host-provided packages | `dependencies` in `<web root>/package.json` | treat these as peer dependencies, never bundle them |
| Build-time install | `grep -rn WEB_PLUGINS Dockerfile api/bin` | how the Docker build clones plugins into the web tree |
| Missions | `src/base/subscription.ts` | `Subscription.load`, `.log.create`, `.log.list`, feature writes |
| Mission properties | `grep -rn "property" api/routes/marti-mission*.ts` | whether TAK Server 5.9 key/value properties are exposed |

As of CloudTAK v13.107.3 (October 2026) the accessors were: `menu`, `routes`, `map`, `feature`,
`cot`, `breadcrumb`, `float`, `bottomBar`, plus `app`, `router`, `pinia`. Treat that line as a
hint for what to look for, never as the answer.

## Output: context/cloudtak-plugin-host.md

Sections, each with `path:line` citations:

1. Loading model and plugin directory layout the glob accepts.
2. Lifecycle: `install`, `enable`, `disable`, and what triggers each.
3. PluginAPI accessors and method signatures.
4. Stores and services a plugin can reach (map store, float store, Subscription, Profile).
5. Persistence options that exist in this version.
6. Development loop: how to run the web dev server and link the plugin into the plugins
   directory.
7. Production install: the `WEB_PLUGINS` build argument or the manual clone path.
8. **Gaps:** anything the design needs that the API does not offer. Each gap becomes either an
   ADR (work around it) or an upstream pull request (add it).

If an earlier version of this file exists, diff the facts against the new checkout and list
what changed at the top. That list is the upgrade checklist for the plugin.
