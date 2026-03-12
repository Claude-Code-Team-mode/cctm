---
name: "CCTM: Create"
description: "Create and activate a team. Usage: /cctm:create {requirement} or /cctm:create [team-name] {requirement}"
category: Team
tags: [team, workflow, agents]
---

Create and activate a team to handle requirements. Only the **team leader** is spawned initially — the leader decides when and who to spawn next.

**Input**: The argument format is `{requirement description}` or `[team-name] {requirement description}`

## Available Teams

| Team Name | Description | Leader Agent | Default |
|-----------|-------------|-------------|---------|
| `frontend` | Frontend development team | `leader` | ✓ |

## Execution

1. Parse the input:
   - If the first word matches a known team name (`frontend`), use it as the team name and the rest as the requirement
   - Otherwise, default to `frontend` and treat the entire input as the requirement
2. Create team via `TeamCreate` with the team name
3. Read the leader agent file at `.claude/skills/cctm-create-team/team-agents/leader.md` (use `leader.ZH-CN.md` for Chinese-speaking users)
4. Spawn **only** the `leader` agent via the Agent tool with:
   - The leader agent file content as system context
   - The requirement description as the task
   - `team_name` set to the created team
5. Leader takes over from here — dispatches tasks to other agents as needed

## Examples

```bash
# Default team (frontend) - just pass the requirement
/cctm:create Add user authentication with OAuth2

# Explicit team name
/cctm:create frontend Fix the modal closing issue on dashboard
```
