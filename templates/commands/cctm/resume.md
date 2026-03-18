---
name: "CCTM: Resume"
description: "Resume an unfinished project by scanning OPSX artifacts and git history. Usage: /cctm:resume"
---

Resume an unfinished project. Scans OPSX artifacts and git history to automatically reconstruct project context.

## Usage

```bash
/cctm:resume
```

## Execution

1. Scan `openspec/changes/` for existing change folders
2. Check artifacts to determine phase status (proposal/specs/design/tasks)
3. Read `git log --oneline -20` for recent progress
4. Summarize current state and next steps
5. Resume from where things left off

> For full details including status detection table, see `.claude/skills/cctm-resume/SKILL.md`

## Example

```bash
/cctm:resume
```