---
name: "CCTM: Resume"
description: "Resume an unfinished project by scanning OPSX artifacts and git history. Usage: /cctm:resume"
category: Team
tags: [team, workflow, resume]
---

Resume an unfinished project. Scans OPSX artifacts and git history to automatically reconstruct project context.

> All paths below are relative to the project root.

## Execution

1. Scan `openspec/changes/` for existing OPSX change folders
2. For each change folder, check which artifacts exist (`proposal.md`, `specs/`, `design.md`, `tasks.md`) to determine phase status:
   - Has `proposal.md` + `specs/` but no `design.md` → requirements done, needs architecture
   - Has `design.md` + `tasks.md` but code not implemented → architecture done, needs development
   - Has implemented code but not archived → needs verify + archive
   - Fully archived → phase complete
3. Read `git log --oneline -20` to understand recent progress
4. Summarize the current state to the user:
   - Which phases are complete
   - Which phase is in progress and what step it's at
   - What needs to happen next
5. Resume from where things left off

## Example

```bash
/cctm:resume
```
