# Claude Code Team Manager (CCTM)

A CLI tool that installs team management capabilities into any [Claude Code](https://docs.anthropic.com/en/docs/claude-code) project.

CCTM provides a structured team workflow with specialized agents (leader, requirements analyst, architect, engineer) that collaborate following the OPSX development methodology.

## Prerequisites

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) CLI installed
- [OpenSpec](https://github.com/ranyitz/openspec) recommended (CCTM works best with OPSX workflow)

## Installation

```bash
npm install -g claude-code-team-manager
```

## Quick Start

### 1. Install into your project

```bash
cd your-project
cctm init
```

This copies team skills and commands into your project's `.claude/` directory.

### 2. Create a team

In Claude Code:

```
/cctm:create
```

### 3. Track progress

```
/cctm:pinit my-feature
/cctm:pstatus my-feature
/cctm:pdone
/cctm:presume
/cctm:pupdate Added API layer
/cctm:plist
```

## CLI Commands

### `cctm init [path]`

Install CCTM templates into a project.

- `path` — Target project directory (default: current directory)
- `--force` — Overwrite existing files

### `cctm update [path]`

Update CCTM templates to the latest version (overwrites existing files).

## What Gets Installed

```
.claude/
├── skills/
│   ├── cctm-create-team/
│   │   ├── SKILL.md
│   │   └── team-agents/
│   │       ├── leader.md / leader.ZH-CN.md
│   │       ├── requirements_analyst.md / .ZH-CN.md
│   │       ├── architect.md / .ZH-CN.md
│   │       └── engineer.md / .ZH-CN.md
│   ├── cctm-pinit/
│   │   ├── SKILL.md
│   │   └── SKILL.ZH-CN.md
│   ├── cctm-pstatus/
│   │   ├── SKILL.md
│   │   └── SKILL.ZH-CN.md
│   ├── cctm-pdone/
│   │   ├── SKILL.md
│   │   └── SKILL.ZH-CN.md
│   ├── cctm-pupdate/
│   │   ├── SKILL.md
│   │   └── SKILL.ZH-CN.md
│   ├── cctm-presume/
│   │   ├── SKILL.md
│   │   └── SKILL.ZH-CN.md
│   └── cctm-plist/
│       ├── SKILL.md
│       └── SKILL.ZH-CN.md
└── commands/
    └── cctm/
        ├── create.md          # /cctm:create
        ├── pinit.md           # /cctm:pinit
        ├── pstatus.md         # /cctm:pstatus
        ├── pdone.md           # /cctm:pdone
        ├── pupdate.md         # /cctm:pupdate
        ├── presume.md         # /cctm:presume
        └── plist.md           # /cctm:plist
```

## Team Roles

| Role | Agent | Responsibility |
|------|-------|---------------|
| Team Lead | `leader` | Task dispatch, process control, quality review |
| Requirements Analyst | `requirements_analyst` | Requirements refinement, user stories |
| Architect | `architect` | Tech selection, architecture design, API planning |
| Engineer | `engineer` | UI development, business logic, TDD testing |

## Workflow

1. **Leader** receives the requirement and spawns agents on-demand
2. **Requirements Analyst** clarifies and documents requirements
3. **Architect** designs technical solution with phased task breakdown
4. **Engineer(s)** implement using TDD (can run in parallel for independent tasks)
5. **Leader** reviews quality and coordinates next steps

## Customization

After installation, you can customize agent definitions in `.claude/skills/cctm-create-team/team-agents/` to match your project's tech stack, conventions, and workflows.

## License

MIT
