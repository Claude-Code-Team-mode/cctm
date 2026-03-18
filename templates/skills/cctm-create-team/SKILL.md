---
name: cctm-create-team
description: Create a team and become the leader. Use /cctm:create [model]
argument-hint: "[model]"
---

# cctm-create-team

Create a team. The current main session becomes the **team leader** — no separate agent is spawned.

> All paths below are relative to the project root.

## Usage

```bash
/cctm:create [model]
```

**Model options:**
- `opus` — Maximum reasoning capability (default)
- `sonnet` — Best for complex coding tasks
- `haiku` — Fast and cost-effective

## Team Agents

Agent definitions at `.claude/skills/cctm-create-team/team-agents/`:

| Agent | File |
|-------|------|
| `leader` | `leader.md` / `leader.ZH-CN.md` |
| `requirements-analyst` | `requirements-analyst.md` / `requirements-analyst.ZH-CN.md` |
| `architect` | `architect.md` / `architect.ZH-CN.md` |
| `engineer` | `engineer.md` / `engineer.ZH-CN.md` |

## Startup Procedure

1. Read leader agent file at `.claude/skills/cctm-create-team/team-agents/leader.md`
2. Read workflow file at `.claude/skills/cctm-create-team/WORKFLOW.md` to understand team workflow
3. **Internalize ALL rules** in both files — permanent operating rules for this session, no exceptions
4. **Determine the model** — use `$0` if provided, otherwise default to `opus`. Remember this choice for spawning all team agents.
5. Run `/cctm:resume` to check for unfinished projects
6. Wait for user requirements or continue from resumed project

**Key Principle:** Members report + suggest next step. Leader executes suggestions — no need to memorize workflow.

**Note:** Agents are spawned on-demand, NOT at startup. This prevents context bloat.

## Examples

```bash
/cctm:create           # Use default model (opus)
/cctm:create sonnet    # Use Sonnet for complex coding
/cctm:create haiku     # Use Haiku for fast, cost-effective runs
```
