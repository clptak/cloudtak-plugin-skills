# cloudtak-plugin-skills

Agent skills for building [CloudTAK](https://github.com/dfpc-coe/CloudTAK) web plugins: from an
operator's idea to a plugin another agency can install.

They encode the workflow used to build three production plugins for search and rescue:
[incident-manager](https://github.com/clptak/cloudtak-plugin-incident-manager),
[print](https://github.com/clptak/cloudtak-plugin-print) and
[caltopo-sync](https://github.com/clptak/cloudtak-plugin-caltopo-sync).

The core idea: **the agent works from the CloudTAK source and from your decisions, not from its
memory.** CloudTAK ships several releases a week; whatever a model learned about its plugin API
in training is probably out of date.

## The flow

| # | Stage | Skill | You get |
|---|---|---|---|
| 1 | Interview | `cloudtak-plugin-interview` | `docs/DESIGN.md` with locked decisions, one question at a time |
| 2 | Ground | `cloudtak-host-grounding` | `context/cloudtak-plugin-host.md`, every fact cited to `file:line` in your CloudTAK checkout |
| 3 | Decide | `cloudtak-infra-analysis` | Where data comes from, where it lives, who can see it; ADRs |
| 4 | Scaffold | `cloudtak-plugin-scaffold` | A plugin that loads with a menu entry and an empty panel |
| 5 | Build | `cloudtak-plugin-build` | The feature, one tested and committed slice at a time |
| 6 | Ship | `cloudtak-plugin-ship` | Field-verified release with an install guide for other admins |

`cloudtak-plugin-workflow` runs the whole sequence and enforces the gates between stages.

## Install

### Claude Code

```
/plugin marketplace add clptak/cloudtak-plugin-skills
/plugin install cloudtak-plugin-kit@cloudtak-plugin-skills
```

Then, in an empty folder for your new plugin:

```
Build a CloudTAK plugin that <what it should do>. My CloudTAK checkout is at ~/CloudTAK.
```

### Claude.ai / Claude desktop

Zip any folder under `plugins/cloudtak-plugin-kit/skills/` and upload it as a custom skill in
Settings. Start with `cloudtak-plugin-workflow`; it names the others.

### Other agents (Codex, Cursor, Copilot, Gemini CLI)

Point the agent at `AGENTS.md`, or copy the `skills/` folder into the location your tool reads.
The skills are plain Markdown and do not depend on Claude-specific features.

## What you need

- A local clone of CloudTAK at the version you deploy (`git clone https://github.com/dfpc-coe/CloudTAK`).
- Node.js 22.6 or later (the test script uses `--experimental-strip-types`).
- A CloudTAK instance to test in: the web dev server from the clone, or your own deployment.
- Real, de-identified sample data from your agency for tests.

## Status

0.1.0, November 2026. Template code was checked against CloudTAK v13.107.3. Run
`cloudtak-host-grounding` against your own checkout before scaffolding; it records what is
different.

Presented at CivTAK 2026.
