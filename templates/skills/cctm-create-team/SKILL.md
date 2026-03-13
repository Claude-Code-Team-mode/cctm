---
name: cctm-create-team
description: Create a team and become the leader. Use /cctm:create
---

# cctm-create-team

Create a team. The current main session becomes the **team leader** — no separate agent is spawned.

> All paths below are relative to the project root.

## Usage

```bash
/cctm:create
```

## Team Agents

Agent definitions at `.claude/skills/cctm-create-team/team-agents/`:

| Agent | File |
|-------|------|
| `leader` | `leader.md` / `leader.ZH-CN.md` |
| `requirements_analyst` | `requirements_analyst.md` / `requirements_analyst.ZH-CN.md` |
| `architect` | `architect.md` / `architect.ZH-CN.md` |
| `engineer` | `engineer.md` / `engineer.ZH-CN.md` |

## Startup Procedure

1. Read leader agent file at `.claude/skills/cctm-create-team/team-agents/leader.md`
2. **Internalize ALL rules** — permanent operating rules for this session, no exceptions
3. Spawn `requirements_analyst` and `architect` immediately (following Spawning Protocol) — on standby
4. Run `/cctm:resume` to check for unfinished projects
5. Wait for user requirements or continue from resumed project
