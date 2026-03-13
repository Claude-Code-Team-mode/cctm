---
name: cctm-resume
description: 通过扫描 OPSX artifact 和 git 历史恢复未完成项目。使用 /cctm:resume
---

# cctm-resume

恢复未完成的项目。通过扫描 OPSX artifact 和 git 历史自动重建项目上下文 — 不需要单独的进度追踪。

> 以下所有路径相对于项目根目录。

## 用法

```bash
/cctm:resume
```

## 工作原理

项目状态从 **OPSX artifact + git 历史** 推导 — 文件系统就是唯一的状态源。

### 阶段状态检测

对 `openspec/changes/` 中的每个文件夹：

| 存在的 Artifact | 状态 |
|----------------|------|
| 空或仅有 `proposal.md` | 需求进行中 |
| `proposal.md` + `specs/` | 需求完成，待架构设计 |
| `proposal.md` + `specs/` + `design.md` + `tasks.md` | 架构完成，待开发 |
| 代码已实现但未归档 | 待验证 + 归档 |
| delta specs 已归档到主 specs | 阶段完成 |

### 执行步骤

1. 检查 `openspec/changes/` 是否存在 — 不存在则无进行中项目
2. 列出所有 change 文件夹，分析每个文件夹中的 artifact 存在情况
3. 读取 `git log --oneline -20` 获取近期提交上下文
4. 输出摘要：

```markdown
## 项目状态

### 已完成阶段
- {phase-name}: 已归档

### 当前阶段: {phase-name}
- 状态: {如 "架构完成，准备开发"}
- 下一步: {如 "启动工程师实现 tasks.md"}

### 待开始阶段
- {phase-name}: 未开始
```

5. 从当前阶段的下一步继续
