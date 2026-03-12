---
name: cctm-pdone
description: 标记阶段完成并记录交付物。使用 /cctm:pdone [phase-number]
---

# 阶段完成

标记阶段完成并记录交付物。

## 执行步骤

1. 如未指定阶段，使用 `status.json` 中的 `currentPhase`
2. 收集信息：摘要、交付物、关键决策、经验教训
3. 创建 `phases/{nn}-{phase-name}.md` 完成记录
4. 更新 `status.json`：设置阶段为 `completed`，推进 `currentPhase`
5. 更新 `plan.md`：修改阶段状态标记为 `[completed]`
6. 更新 `index.json`：递增 `completedPhases`

### 阶段记录格式 — phases/{nn}-{name}.md

```markdown
# 阶段 1: 框架搭建

## 状态: 已完成
- 开始时间: 2026-03-12T10:00:00Z
- 完成时间: 2026-03-12T12:00:00Z
- OPSX Change: ai-chat-phase1

## 交付物
- 创建 `src/mpa/main/pages/aiChat/` 目录结构
- 定义 TypeScript 类型 `src/types/aiChat.ts`
- 配置路由 `src/mpa/main/App.tsx`

## 关键决策
- 使用 zustand 做状态管理（与项目保持一致）
- 使用 EventSource API 实现流式输出

## 经验教训
- 桥接库可能需要特定的初始化顺序

## 备注
- 阶段 2 可以立即开始，无阻塞项
```

## 检查清单

- [ ] 使用 ISO 8601 时间戳
- [ ] 保持 `index.json` 与 `status.json` 同步
- [ ] 永远不要覆盖已有的阶段记录 — 只追加或更新
- [ ] 同时维护 `.md` 和 `.json` 两种表示的一致性
