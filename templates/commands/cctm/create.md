---
name: "CCTM: Create"
description: "Create a team and become the leader. Usage: /cctm:create [model]"
argument-hint: "[model]"
---

Create a team. The current main session becomes the **team leader** — no separate agent is spawned.

## Usage

```bash
/cctm:create [model]
```

**Model options:**
- `opus` — Maximum reasoning capability (default)
- `sonnet` — Best for complex coding tasks
- `haiku` — Fast and cost-effective

## Execution

1. Read leader rules and workflow from `.claude/skills/cctm-create-team/`
2. Internalize all rules — permanent operating rules for this session
3. Determine model — use argument or default to `opus`
4. **Spawn `requirements-analyst`** immediately — stays on standby for user requirements
5. Run `/cctm:resume` to check for unfinished projects
6. Wait for user requirements or continue from resumed project

> For full details, see `.claude/skills/cctm-create-team/SKILL.md`

## Examples

```bash
/cctm:create           # Use default model (opus)
/cctm:create sonnet    # Use Sonnet for complex coding
/cctm:create haiku     # Use Haiku for fast, cost-effective runs
```