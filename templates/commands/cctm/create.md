---
name: "CCTM: Create"
description: "Create a team and become the leader. Usage: /cctm:create"
category: Team
tags: [team, workflow, agents]
---

Create a team. The current main session becomes the **team leader** — no separate agent is spawned.

## Execution

1. Read the leader agent file at `.claude/skills/cctm-create-team/team-agents/leader.md` (use `leader.ZH-CN.md` for Chinese-speaking users)
2. Apply the leader agent instructions to the current session (you ARE the leader now)
3. First run `/cctm:presume` to check for unfinished projects
4. Wait for user to provide requirements or continue from resumed project

## Example

```bash
/cctm:create
```
