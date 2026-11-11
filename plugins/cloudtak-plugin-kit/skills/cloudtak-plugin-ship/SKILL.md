---
name: cloudtak-plugin-ship
description: Verify and release a CloudTAK plugin so another agency's admin can install it. Covers the field check, the install section of the README, release notes from commits, and a tagged release installable through the CloudTAK WEB_PLUGINS build argument. Use when the user says "ship", "release", "deploy", "tag", or "get this ready for another agency".
---

# Ship a CloudTAK plugin

The reader of a plugin README is often a part-time admin at a small agency with one VPS. Write
for them.

## 1. Verify

Run in order and report each result:

1. `npm run typecheck` and `npm test` pass.
2. Fresh install test: clone the repo into a clean CloudTAK checkout's plugins directory (or
   build with `WEB_PLUGINS`), rebuild, and load it. This catches files that only existed on the
   developer's machine.
3. **The field check from `docs/DESIGN.md` section 4,** done by the user or with them watching:
   the printed sheet against a grid tool, the outside system updating, the form a supervisor
   would sign. Unit tests do not replace this.
4. No secrets: search the repo and its history for tokens, passwords and agency-internal URLs.
5. Agency-specific content (names, default channels, reference PDFs) is on a separate branch or
   in configuration, so `main` is generic.

## 2. README install section

Must answer, in this order: what it does in two sentences; which CloudTAK version it was tested
with; required server pieces (an ETL, a sidecar service, a Caddy route) and why each exists; the
`WEB_PLUGINS` install and the manual clone install; how to update; how to remove; known limits.
Take the facts from `context/cloudtak-plugin-host.md`, not memory.

## 3. Release notes

Generate from commit subjects since the last tag, grouped by issue or feature. Write them for
the admin: what changed for users, anything they must do on upgrade (new ETL version, new
environment variable, data migration).

## 4. Tag

Ask the user for the version number. Tag, push, and create the release only when the user asks.
State the CloudTAK version it was tested against in the release notes.

## 5. Hand-off

If another agency will run it, offer to write a one-page "first incident" quick start for their
users, in the plain language of the design interview.
