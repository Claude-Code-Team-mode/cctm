---
name: cctm-create-team
description: Create a team and become the leader. Use /cctm:create
---

# cctm-create-team

Create a team. The current main session becomes the **team leader** — no separate agent is spawned.

## Usage

```bash
/cctm:create
```

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
1. main session becomes leader (no agent spawn)
   -> First runs /cctm:presume to check for unfinished projects
   -> Waits for user to provide requirements
   -> Dispatches tasks to corresponding roles
```

Leader spawns other members on demand:
- Requirements related -> spawn `requirements_analyst`
- Technical related -> spawn `architect`
- Development related -> spawn `engineer` (can run multiple in parallel)

## Startup Procedure

1. Read the leader agent file at `.claude/skills/cctm-create-team/team-agents/leader.md` (use `leader.ZH-CN.md` for Chinese users)
2. Apply leader instructions to the current session (you ARE the leader)
3. Run `/cctm:presume` to check for unfinished projects
4. Wait for user to provide requirements or continue from resumed project
