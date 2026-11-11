---
name: cloudtak-infra-analysis
description: Decide how a CloudTAK plugin gets external data in, where it persists, and how it shares data with other plugins, from the actual CloudTAK source. Use when planning a plugin that calls an external API (CAD, D4H, CalTopo, webhooks), when asking "where should this config/roster/cache live", "client-side or server route", "can plugin X read plugin Y's data", or before scaffolding anything with external data. Produces a source-cited recommendation, not code.
---

# CloudTAK infrastructure analysis

Purpose: before building, determine from the source in front of you how data should enter
CloudTAK, where it should live, and who can see it. Output is a short recommendation the user
can accept or push back on, with ADRs for the decisions.

Read `context/cloudtak-plugin-host.md` first. If it does not exist, run
`cloudtak-host-grounding`. Below, `<web>` means the web app root it recorded (`app/` in
current CloudTAK, `api/web/` in older releases).

## 1. Split the goal into three questions

- **Acquisition:** where does the data come from (external API, webhook, TAK Server, CoT already
  on the map, user entry), and does the call go client-side direct or through a server?
- **Persistence:** must it survive reload? Per device, per user, or all users?
- **Sharing:** does another plugin need it, and how loosely coupled must that be?

## 2. Pick a persistence layer that exists in this version

Verify each row against `<web>/src/database.ts`, `<web>/src/base/*` and `api/routes/` before
recommending it. Schemas change between releases.

| Layer | Where | Scope | Server change? | Use it for |
|---|---|---|---|---|
| `db.kv` via `<web>/src/base/kv.ts` | IndexedDB | Per device | None | Cached data shared across plugins, reactively |
| `localStorage` / Capacitor `Preferences` | Device | Per device | None | Small UI preferences. Never credentials |
| `ProfileConfig` (`<web>/src/base/profile.ts`) | `/api/profile` | Per user | Schema-locked; only existing typed keys | Built-in user settings, not plugin data |
| TAK mission logs / features | TAK Server | Mission members | None | Incident records that field users should see |
| TAK mission properties (TAK Server 5.9+) | TAK Server | Mission members | None if CloudTAK exposes the routes | Structured incident data, one key per section, atomic upsert |
| CloudTAK Connection + ETL layer | CloudTAK + Lambda/container | All users | Deploy an ETL | Scheduled sync with an outside system; holds its secrets server-side |
| Custom Postgres table via a server route | CloudTAK Postgres | All users | API image rebuild | Durable shared data with access control |

## 3. Acquisition: client-side or server, and CORS

- **Client-side direct** is simplest, but the token lives in the browser and the external host
  must send CORS headers for the CloudTAK origin. **Recommend a CORS spike before any UI is
  built** on a client-side call.
- **Server-side** (an ETL Connection, or a plugin server route) keeps secrets off the browser
  and allows caching. Keep the client interface the same either way, so switching is a
  one-file change if CORS forces it.
- **Credentials never go in `localStorage`, `db.kv` or source.** Use an ETL Connection's
  secrets or a server route.

## 4. Sharing between plugins

Plugins are separate repos and cannot import each other at compile time, but they share one
runtime: one Pinia, one Dexie database.

- Default: the owning plugin writes a namespaced `db.kv` key (`myplugin:roster`); consumers read
  it with the core `KV` helper. Publish the key names and a `.d.ts` of the shape as the contract.
- For an action rather than data (for example "create a CalTopo map for this new mission"), a
  small runtime contract on `window` is acceptable when it is documented, feature-detected by
  the caller and degrades cleanly when the provider plugin is absent.
- Reading another plugin's Pinia store by id works but is fragile; avoid it.

## 5. If visibility depends on who the user is

Client layers cannot enforce access. Only a server route, which validates the caller, can.
TAK channel/group scoping is the usual model: resolve the caller's groups the way CloudTAK's own
`marti` routes do and filter on them. If data must be hidden from field users, it belongs on a
management-only mission or behind a server route, never in a client cache as the authority.
LDAP is not a CloudTAK login backend; groups reach CloudTAK through the identity provider and
TAK Server.

## 6. Deliver

Write the recommendation into `docs/DESIGN.md` (a new "Architecture" section) and one ADR per
significant choice in `docs/decisions/ADR-NNN-<slug>.md` with Status, Date, Context, Decision,
Consequences and Alternatives considered. Include:

- CloudTAK facts with `path:line` citations.
- Acquisition, persistence and sharing choices with reasons.
- The spike list (CORS, rate limits, an upstream API gap) and the fallback for each.
- A phased build, spike first.
- Open items to confirm with the user, one at a time.

## Anti-patterns

- Recommending architecture without searching the current CloudTAK source.
- Using `ProfileConfig` for arbitrary plugin data.
- Building UI before the CORS spike on a client-side external call.
- Coupling one plugin to another plugin's modules instead of a documented contract.
- Enforcing visibility in a client layer.
- Editing the CloudTAK checkout or a sibling repo to make the plugin work. Gaps go upstream as a
  pull request, on request.
