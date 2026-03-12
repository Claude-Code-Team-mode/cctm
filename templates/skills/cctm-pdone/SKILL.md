---
name: cctm-pdone
description: Mark a phase as completed and record deliverables. Use /cctm:pdone [phase-number]
---

# Phase Done

Mark a phase as completed and record deliverables.

## Execution

1. If no phase number, use `currentPhase` from `status.json`
2. Gather: summary, deliverables, key decisions, lessons learned
3. Create `phases/{nn}-{phase-name}.md` completion record
4. Update `status.json`: set phase to `completed`, advance `currentPhase`
5. Update `plan.md`: change phase status marker to `[completed]`
6. Update `index.json`: increment `completedPhases`, update `currentPhase`

### Phase Record Format — phases/{nn}-{name}.md

```markdown
# Phase 1: Framework Setup

## Status: Completed
- Started: 2026-03-12T10:00:00Z
- Completed: 2026-03-12T12:00:00Z
- OPSX Change: ai-chat-phase1

## Deliverables
- Created `src/mpa/main/pages/aiChat/` directory structure
- Defined TypeScript types in `src/types/aiChat.ts`
- Configured routing in `src/mpa/main/App.tsx`

## Key Decisions
- Used zustand for state management (consistent with project)
- Streaming via EventSource API

## Lessons Learned
- Specific initialization order may be required for bridge libraries

## Notes
- Phase 2 can start immediately, no blockers
```

## Checklist

- [ ] Use ISO 8601 timestamps
- [ ] Keep `index.json` in sync with `status.json`
- [ ] Never overwrite existing phase records — append or update only
- [ ] Maintain both `.md` and `.json` representations consistently
