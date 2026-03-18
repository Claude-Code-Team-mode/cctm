# CCTM 使用指南

## 安装

```bash
git clone git@github.com:Claude-Code-Team-mode/cctm.git
cd cctm
npm install
npm run build
npm install -g ./
```

## 快速开始

### 1. 在项目中初始化

```bash
cd your-project
cctm init
```

这会：
- 自动检测并安装 OpenSpec（如果没有）
- 自动初始化 OpenSpec（如果项目没有 `openspec/` 目录）
- 将 CCTM 模板复制到 `.claude/` 目录
- 将 CCTM schema 复制到 `openspec/schemas/cctm/`

### 2. 在 Claude Code 中创建团队

```
/cctm:create
```

执行后：
- 你（主会话）成为 **Team Leader**
- 自动检查是否有未完成的项目

### 3. 提出需求

直接告诉 Leader 你要做什么，例如：

```
帮我做一个登录页面，包含邮箱密码登录和 GitHub OAuth
```

## CCTM 命令 (独立命名空间)

CCTM 使用独立命令前缀 `/cctm:*`，便于区分团队工作流与常规 OpenSpec 使用：

| CCTM 命令 | 等价于 | 用途 |
|-----------|--------|------|
| `/cctm:new` | `/opsx:new --schema cctm` | 创建新变更 |
| `/cctm:continue` | `/opsx:continue` | 创建下一个 artifact |
| `/cctm:apply` | `/opsx:apply` | 实现任务 |
| `/cctm:verify` | `/opsx:verify` | 验证实现 |
| `/cctm:archive` | `/opsx:archive` | 归档变更 |

**所有变更统一存储在 `openspec/changes/`，便于查看进度。**

## 完整工作流

```
用户提需求
    │
    ▼
Leader → 需求分析师：细化需求、拆分阶段
    │
    ▼
Leader：决定阶段执行顺序（并行/串行）
    │
    ▼
每个阶段（= 一个 CCTM change）：
    │
    ├─ 需求分析师：
    │    → /cctm:new "{阶段名}"
    │    → /cctm:continue (proposal.md)
    │    → /cctm:continue (specs/)
    │
    ├─ 架构师：
    │    → /cctm:continue (design.md)
    │    → /cctm:continue (tasks.md)
    │
    ├─ 工程师：/cctm:apply（按需启动）
    │    → TDD 开发（RED → GREEN → REFACTOR）
    │
    ├─ 工程师：/cctm:verify
    │    → 验证实现是否匹配 specs
    │
    ├─ 架构师：/cctm:archive
    │    → 合并 delta specs
    │
    ├─ Leader：评审质量
    │
    └─ git commit（还原点）
    │
    ▼
下一阶段
```

## 可用命令

| 命令 | 说明 |
|------|------|
| `/cctm:create` | 创建团队，主会话成为 Leader |
| `/cctm:resume` | 恢复未完成项目（扫描 openspec/cctm/ + git history） |

## CCTM 工作流命令

| 命令 | 说明 | 使用者 |
|------|------|--------|
| `/cctm:new` | 创建新变更目录 | 需求分析师 |
| `/cctm:continue` | 创建下一个 artifact | 需求分析师/架构师 |
| `/cctm:apply` | 实现 tasks.md 中的任务 | 工程师 |
| `/cctm:verify` | 验证实现匹配 specs | 工程师 |
| `/cctm:archive` | 归档已完成的变更 | 架构师 |

## 团队角色

| 角色 | 职责 | 何时工作 |
|------|------|----------|
| **Leader**（你） | 派发任务、评审质量、做决策 | 全程 |
| 需求分析师 | 细化需求、拆分阶段、写 specs | 按需启动 |
| 架构师 | 技术方案、接口设计、任务拆分 | 每阶段启动 |
| 工程师 | TDD 开发、实现代码 | 按需启动 |

## 阶段状态判断

`/cctm:resume` 通过扫描 `openspec/changes/` 自动判断：

| 存在的 Artifact | 状态 |
|----------------|------|
| 只有 `proposal.md` | 需求进行中 |
| `proposal.md` + `specs/` | 需求完成，待架构 |
| `proposal.md` + `specs/` + `design.md` + `tasks.md` | 架构完成，待开发 |
| 代码已实现但未归档 | 待验证 + 归档 |
| 已归档到主 specs | 阶段完成 |

## 核心原则

1. **小阶段** — 一个需求拆成多个小 CCTM change，不做大而全
2. **流式迭代** — 实现过程中发现设计有误，随时更新 artifact 继续
3. **验证先归档** — `/cctm:verify` 在归档前捕获偏差
4. **每阶段 commit** — 创建还原点，方便回滚
5. **CCTM artifact 是唯一状态源** — 不需要单独的进度追踪
6. **独立命令** — 使用 `/cctm:*` 命令区分团队工作流

## 自定义

安装后可在 `.claude/skills/cctm-create-team/team-agents/` 中自定义各角色：
- 修改技术栈（默认 React/Vite/Vitest/TailwindCSS）
- 调整质量标准
- 添加项目特定规范