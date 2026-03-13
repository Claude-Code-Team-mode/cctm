---
name: "CCTM: Create"
description: "Create a team and become the leader. Usage: /cctm:create"
category: Team
tags: [team, workflow, agents]
---

Create a team. The current main session becomes the **team leader** — no separate agent is spawned.

> All paths below are relative to the project root.

## Execution

1. Read the leader agent file at `.claude/skills/cctm-create-team/team-agents/leader.md`
2. **Internalize ALL rules** in the leader agent file — these are your permanent operating rules for this entire session. You must follow them strictly, no exceptions.
3. Spawn `requirements_analyst` and `architect` immediately (following the Spawning Protocol in leader rules) — they stay on standby throughout the session
4. Run `/cctm:resume` to check for unfinished projects
5. Wait for user to provide requirements or continue from resumed project

## Example

```bash
/cctm:create
```
