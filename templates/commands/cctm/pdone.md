---
name: "CCTM: Phase Done"
description: "Mark a phase as completed. Usage: /cctm:pdone [phase-number]"
category: Workflow
tags: [workflow, progress, team, tracking]
---

Mark a phase as completed and record deliverables.

**Input**: Optional phase number. If omitted, uses current phase from `status.json`.

## Execution

**IMPORTANT:** Read the full SKILL definition at `skills/cctm-pdone/SKILL.md` (or `SKILL.ZH-CN.md` for Chinese) for detailed file formats.

1. If no phase number, use `currentPhase` from status.json
2. Gather: summary, deliverables, key decisions, lessons learned
3. Create `phases/{nn}-{phase-name}.md` completion record
4. Update status.json: phase status -> `completed`, advance `currentPhase`
5. Update plan.md: change phase status marker to `[completed]`
6. Update index.json: increment `completedPhases`, update `currentPhase`

## Examples

```bash
# Complete current phase
/cctm:pdone

# Complete specific phase
/cctm:pdone 2
```
