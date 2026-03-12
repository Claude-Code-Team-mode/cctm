---
name: cctm-create-team
description: Create and activate a team to handle requirements. Use /cctm:create
---

# cctm-create-team

Create and activate a team to handle requirements. Only the **team leader** is spawned initially — the leader decides when and who to spawn next.

## Usage

```bash
/cctm:create
```

defaults to `frontend`.

## Available Teams

| Team Name | Description | Leader Agent | Default |
|-----------|-------------|-------------|---------|
| `frontend` | Frontend development team | `leader` | ✓ |

## Team Agents

All agent definitions are located at:

```
.claude/skills/cctm-create-team/team-agents/
```

| Agent | File |
|-------|------|
| `leader` | `.claude/skills/cctm-create-team/team-agents/leader.md` / `leader.ZH-CN.md` |
| `requirements_analyst` | `.claude/skills/cctm-create-team/team-agents/requirements_analyst.md` / `requirements_analyst.ZH-CN.md` |
| `architect` | `.claude/skills/cctm-create-team/team-agents/architect.md` / `architect.ZH-CN.md` |
| `engineer` | `.claude/skills/cctm-create-team/team-agents/engineer.md` / `engineer.ZH-CN.md` |

## Workflow

```
1. leader (the only agent spawned at startup)
   -> Receives requirement, spawns other members on demand
   -> First runs /cctm:presume to check for unfinished projects
   -> Dispatches tasks to corresponding roles
```

Leader spawns other members on demand:
- Requirements related -> spawn `requirements_analyst`
- Technical related -> spawn `architect`
- Development related -> spawn `engineer` (can run multiple in parallel)

## Startup Procedure

1. Parse input:
   - If the first word matches a known team name (`frontend`), use it; rest = requirement
   - Otherwise, default to `frontend`; entire input = requirement
2. Create team via `TeamCreate`
3. Read the leader agent file at `.claude/skills/cctm-create-team/team-agents/leader.md` (use `leader.ZH-CN.md` for Chinese users)
4. Spawn **only** the `leader` agent with the requirement description
5. Leader takes over from here — dispatches tasks to other agents as needed

## Examples

```bash
# Default team (frontend) - just pass the requirement
/cctm:create Add user authentication with OAuth2

# Explicit team name
/cctm:create frontend Fix the modal closing issue on dashboard
```
