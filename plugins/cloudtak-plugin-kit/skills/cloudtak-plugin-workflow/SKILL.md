---
name: cloudtak-plugin-workflow
description: Start here for any new CloudTAK plugin or a major feature in an existing one. Runs the six-stage flow (interview, ground, decide, scaffold, build, ship) and hands off to the other cloudtak-plugin-kit skills at each stage. Use when the user says "build a CloudTAK plugin", "add a plugin that...", "extend CloudTAK with...", or opens an empty cloudtak-plugin-* repo.
---

# CloudTAK plugin workflow

A CloudTAK plugin is TypeScript and Vue source that CloudTAK's own Vite build compiles into
the web app. There is no runtime upload. Everything an agent "knows" about the plugin API from
training data is probably stale: CloudTAK ships several releases a week. This workflow exists
so the agent works from the source in front of it, and from the user's decisions, not from
memory.

## The six stages

| # | Stage | Skill | Output | Gate before moving on |
|---|---|---|---|---|
| 1 | Interview | `cloudtak-plugin-interview` | `docs/DESIGN.md` with a locked-decisions table | User has confirmed every locked decision |
| 2 | Ground | `cloudtak-host-grounding` | `context/cloudtak-plugin-host.md`, cited to file:line | Every API the design needs is found in source, or flagged missing |
| 3 | Decide | `cloudtak-infra-analysis` | Data acquisition, persistence and sharing recommendation; ADRs in `docs/decisions/` | User accepts the recommendation; spikes for risky calls (CORS) are passed |
| 4 | Scaffold | `cloudtak-plugin-scaffold` | A plugin that loads, shows a menu entry and an empty panel | Typecheck passes; plugin appears in a running CloudTAK |
| 5 | Build | `cloudtak-plugin-build` | Working feature, one vertical slice at a time | Each slice: typecheck, tests, seen working in the host, committed |
| 6 | Ship | `cloudtak-plugin-ship` | README install section, release notes, a tagged release | Verified in the field the way it will be used |

Run them in order for a new plugin. For a feature in an existing plugin, start at stage 1 with
a short interview and skip stage 4.

## Rules that apply to every stage

1. **One question at a time.** Give the reason for each question. Never batch five questions;
   the user is often a responder answering between calls.
2. **Assume nothing.** Region, agency, channel names, IDs, data owners, who may see what:
   ask. A wrong assumption about who can see data is a safety problem, not a style problem.
3. **Cite the source.** Any statement about CloudTAK behaviour carries a path and line number
   from the local checkout. If you cannot find it, say so.
4. **One writable repo.** The plugin repo is writable. The CloudTAK checkout and sibling plugin
   repos are read-only reference. Never edit them. Upstream changes go in a separate branch and
   pull request, by explicit request.
5. **Record decisions where the next agent will find them.** Locked decisions go in
   `docs/DESIGN.md`; decisions with alternatives worth remembering get an ADR in
   `docs/decisions/ADR-NNN-*.md`.
6. **Prove it outside the test suite.** A print plugin is verified with a ruler on paper; a
   sync plugin by watching the other system update. Ask the user what "correct" looks like in
   the field and check that, not only the unit tests.

## Starting a session

1. Find the CloudTAK checkout. Ask for the path if it is not obvious (common: `~/CloudTAK`,
   `~/dev/CloudTAK`, `~/tak-stack/CloudTAK`). Record its version (`git describe --tags`).
2. Check for `docs/DESIGN.md`, `context/` and `docs/decisions/` in the plugin repo. If they exist,
   read them first: this is a resumed session and earlier decisions stand unless the user
   reopens them.
3. Tell the user which stage you are starting and what it will produce.
