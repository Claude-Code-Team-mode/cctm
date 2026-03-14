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

### 2. 在 Claude Code 中创建团队

```
/cctm:create
```

执行后：
- 你（主会话）成为 **Team Leader**
- 自动启动 `requirements_analyst` 和 `architect` 并待命
- 自动检查是否有未完成的项目

### 3. 提出需求

直接告诉 Leader 你要做什么，例如：

```
帮我做一个登录页面，包含邮箱密码登录和 GitHub OAuth
```

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
每个阶段（= 一个 OPSX change）：
    │
    ├─ 需求分析师：/opsx:propose
    │    → proposal.md（意图、范围）
    │    → specs/（Given/When/Then 场景）
    │
    ├─ 架构师：审查 specs + 创建设计
    │    → design.md（技术方案）
    │    → tasks.md（TDD 任务清单）
    │
    ├─ 工程师：/opsx:apply（按需启动）
    │    → TDD 开发（RED → GREEN → REFACTOR）
    │
    ├─ 工程师：/opsx:verify
    │    → 验证实现是否匹配 specs
    │
    ├─ 工程师：/opsx:archive
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
| `/cctm:resume` | 恢复未完成项目（扫描 OPSX artifacts + git history） |

## 团队角色

| 角色 | 职责 | 何时工作 |
|------|------|----------|
| **Leader**（你） | 派发任务、评审质量、做决策 | 全程 |
| 需求分析师 | 细化需求、拆分阶段、写 specs | 启动时待命，按需调用 |
| 架构师 | 技术方案、接口设计、任务拆分 | 启动时待命，按需调用 |
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

1. **小阶段** — 一个需求拆成多个小 OPSX change，不做大而全
2. **流式迭代** — 实现过程中发现设计有误，随时更新 artifact 继续
3. **验证先归档** — `/opsx:verify` 在归档前捕获偏差
4. **每阶段 commit** — 创建还原点，方便回滚
5. **OPSX artifact 是唯一状态源** — 不需要单独的进度追踪

## 自定义

安装后可在 `.claude/skills/cctm-create-team/team-agents/` 中自定义各角色：
- 修改技术栈（默认 React/Vite/Vitest/TailwindCSS）
- 调整质量标准
- 添加项目特定规范