---
name: cloudtak-plugin-build
description: Build a CloudTAK plugin feature in small vertical slices, each one typechecked, tested, seen working in a running CloudTAK and committed, with decisions recorded as ADRs. Use after scaffolding, or when the user asks to implement, add, or fix a feature in a cloudtak-plugin-* repo.
---

# Build in slices

A slice is the thinnest change a user can see working end to end: one button that writes one
mission log, not "the data layer". Slices keep a long build reviewable and make it easy to stop
before a callout with something that works.

## Before the first slice

1. Read `docs/DESIGN.md`, `context/cloudtak-plugin-host.md` and `docs/decisions/`.
2. Write `docs/PLAN.md`: the slices in order, each with what the user will see and how it will be
   checked. Put any spike (CORS, an unfamiliar TAK Server route) first. Show the user the plan
   and get a yes.

## The loop, per slice

1. **Restate the slice** in one sentence and the check that proves it.
2. **Search before writing.** Find the host code the slice touches and cite it. If the design
   assumed an API that is not there, stop and tell the user. Do not patch the host.
3. **Put logic in plain modules.** Parsing, coordinate conversion, CoT building, form filling,
   schema migration: `src/lib/` or `src/domain/`, no Vue or DOM imports, with a `node --test`
   file beside it. Components stay thin.
4. **Write the test first** for any logic with a right answer (coordinates, scale, a parsed CAD
   call, an ICS form field). Use real samples from the user where you can, with personal data
   removed.
5. **Implement.**
6. **Check:** `npm run typecheck`, `npm test`, then the slice in a running CloudTAK. Look at the
   browser console. If you can drive a browser, take a screenshot.
7. **Commit** with a message that says what the user can now do: `Debrief: ICS 204A PDF`, not
   `update files`. Reference the issue if there is one.
8. **Record decisions.** If the slice settled something with alternatives (where data lives,
   who can edit, what happens on conflict), add an ADR. If it changed a locked decision, update
   `docs/DESIGN.md` and tell the user.

## CloudTAK-specific habits

- **Mission writes:** prefer the host's mission helpers (`Subscription` logs, CoT with a
  `mission-guid` destination, mission properties where TAK Server 5.9 is present) over raw
  fetches. Cite the helper you used.
- **Concurrency:** more than one manager edits during a real incident. Anything stored as one
  whole document is last-writer-wins. Split it per section, or use mission properties with one
  key per section.
- **Visibility:** check every new piece of data against the design's "who may see it" row before
  it is written anywhere a field user can read.
- **Offline and mobile:** CloudTAK runs on phones with bad signal. Handle a failed request with a
  message the user can act on, never a silent spinner.
- **Upstream gaps:** if the plugin needs something CloudTAK, node-tak or node-cot lacks, write
  it up as a proposed upstream change on a separate branch, and only open a pull request when
  the user asks. Keep the plugin working without it in the meantime.

## When the user is unhappy with a result

Ask what they expected to see, one question at a time, before changing code. Then fix the
smallest thing and show them again.
