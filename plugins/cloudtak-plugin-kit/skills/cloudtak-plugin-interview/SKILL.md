---
name: cloudtak-plugin-interview
description: Gather the requirements for a CloudTAK plugin by interviewing the user one question at a time, then write docs/DESIGN.md with a locked-decisions table. Use at the start of a new plugin, before a large feature, or when the user says "interview me", "help me spec this plugin", or describes an operational need loosely.
---

# Interview the user

The person asking is usually an operator, not a product manager: a SAR coordinator, a
dispatcher, a fire GIS specialist. They know exactly what the field needs and will not volunteer
it unless asked. Your job is to draw it out and write it down so nothing is rebuilt later.

## How to ask

- One question per message. State why you are asking in one line.
- Offer two to four concrete options when you can, with a recommended default marked. "Other"
  is always allowed.
- When an answer creates a follow-up, ask the follow-up next. Do not move to a new topic with a
  thread left open.
- Stop when every row below has an answer or an explicit "later".

## What to cover

1. **The moment of use.** Who opens this, during which phase of an incident, on what device
   (desktop in a command post, phone in the field, a wall display)?
2. **What done looks like in the field.** The physical or operational check that proves it
   works: a printed map that measures against a UTM tool, a CalTopo map that updates within a
   minute, an ICS form a supervisor will sign.
3. **Data in.** Every source: CoT already on the map, a TAK mission (DataSync), an external API,
   a webhook, user entry. For each external API: auth method, rate limits, CORS.
4. **Data out.** Where results go: mission logs, mission features over CoT, mission properties
   (TAK Server 5.9+), a file download, another system.
5. **Who may see it.** Channels/groups, management-only versus field. If visibility matters,
   the answer forces a server route (see `cloudtak-infra-analysis`).
6. **Persistence.** Must it survive reload? Per device, per user, all users?
7. **Other plugins.** Does it read from or feed another plugin?
8. **Placement.** Main menu entry, floating pane, bottom bar item, or a combination.
9. **Non-goals for v1.** Write them down; they stop scope creep later.
10. **Install environment.** Docker Compose on a VPS, AWS, or both; how the operator rebuilds
    CloudTAK today.

## Output: docs/DESIGN.md

```markdown
# <plugin-name> — Design

Status: draft | accepted. CloudTAK version: <git describe of the checkout>.

## 1. Goal
One paragraph in the user's words.

## 2. Locked decisions
| Decision | Choice | Why |
|---|---|---|
| ... | ... | the user's reason, not yours |

## 3. Non-goals for v1

## 4. What "verified" means
The field check from question 2.

## 5. Open items
Anything answered "later", one per line.
```

Read the table back to the user and get an explicit yes before stage 2. A decision the user
did not make is not locked: mark it OPEN.
