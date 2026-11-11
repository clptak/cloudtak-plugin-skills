# Agent instructions: building CloudTAK plugins

This repository contains skills for building CloudTAK web plugins. If you are an agent working
on a `cloudtak-plugin-*` repository, read
`plugins/cloudtak-plugin-kit/skills/cloudtak-plugin-workflow/SKILL.md` first and follow it. It
names the skill to read at each stage:

1. `skills/cloudtak-plugin-interview/SKILL.md`
2. `skills/cloudtak-host-grounding/SKILL.md`
3. `skills/cloudtak-infra-analysis/SKILL.md`
4. `skills/cloudtak-plugin-scaffold/SKILL.md` (templates in its `templates/` folder)
5. `skills/cloudtak-plugin-build/SKILL.md`
6. `skills/cloudtak-plugin-ship/SKILL.md`

All paths are relative to `plugins/cloudtak-plugin-kit/`.

Non-negotiable rules:

- Ask the user one question at a time, with the reason.
- Never state how CloudTAK works without a `path:line` citation from the user's local checkout.
- The CloudTAK checkout and other repos are read-only. Only the plugin repo is writable.
- No credentials in the browser or the repo.
