# CCTM 流程问题追踪

## 待处理问题

### Issue #1: 审批强制机制

**优先级**: P0
**状态**: 记录中，保持现状
**发现时间**: 2026-03-18

**问题描述**:
`/cctm:archive` 的 SKILL.md 写了 "Leader approved the quality" 作为前置条件，但这只是文字描述，没有强制检查。Engineer 理论上可以直接归档，跳过 leader 审批。

**可选方案**:
| 方案 | 描述 | 优点 | 缺点 |
|------|------|------|------|
| A. 新增 `/cctm:review` | Engineer 调用后等待 Leader 审批，审批通过才能 archive | 流程明确，有阻断点 | 多一个命令 |
| B. 强化现有流程 | 在 engineer.md 的 Memory 和 `/cctm:archive` SKILL 中强调"必须 leader 口头/书面确认后才能 archive" | 简单，不改架构 | 依赖自觉 |

**当前决定**: 保持现状，后续观察实际使用情况再决定

### Issue #9: `/cctm:archive` 权限不一致

**优先级**: P0
**状态**: ✅ 已解决
**发现时间**: 2026-03-18

**问题描述**:
`cctm-archive/SKILL.md` 权限表与 `architect.md` 职责定义矛盾：
- SKILL.md 写 engineer 可用，architect 不可用
- 但 architect.md 明确说 architect 负责归档
- ISSUES.md Issue #8 也确认了 architect 归档

**解决方案**:
更新 `cctm-archive/SKILL.md` 权限表：
- architect: ✅ 可用（审批后）
- engineer: ❌ 不可用

### Issue #2: Phase 间切换协议

**优先级**: P2
**状态**: 无需处理
**发现时间**: 2026-03-18

**问题描述**:
一个 phase 完成后（archive → git commit），如何开始下一个 phase 没有明确规定。

**决定**: 保持现状。大模型有能力理解流程顺序，或主动询问用户下一步该做什么。无需过度规定。

### Issue #3: 回滚流程

**优先级**: P3
**状态**: 无需处理
**发现时间**: 2026-03-18

**问题描述**:
当 `/cctm:verify` 失败或 Leader 审批不通过时，没有明确的回滚流程。

**决定**: 保持现状。回滚由用户决定，模型会询问或用户主动提出。当前已有 "git commit per phase" 作为还原点，足够支撑用户回滚需求。

### Issue #4: 并行 Phase 冲突处理

**优先级**: P3
**状态**: 无需处理
**发现时间**: 2026-03-18

**问题描述**:
并行 phase 可能导致 specs 重叠、文件所有权冲突、delta specs 合并冲突。

**决定**: 保持现状。实际使用中是 task 级别并行而非 phase 级别并行，且 architect 会先分析依赖关系。一般不会出现冲突。

### Issue #11: 无状态持久化

**优先级**: P3
**状态**: 无需处理
**发现时间**: 2026-03-18

**问题描述**:
Session 中断后，通过 `/cctm:resume` 扫描 artifacts + git 恢复。但中断时的对话上下文、决策理由丢失。

**决定**: 保持现状。Leader 可以重新理解 artifacts 恢复上下文。如果需要记录决策理由，可在 design.md 中补充 Decision Log（由 architect 自行决定）。

### Issue #12: 缺少冲突解决机制

**优先级**: P3
**状态**: 无需处理
**发现时间**: 2026-03-18

**问题描述**:
并行 engineer 修改共享文件时，只能"报告给 leader"，没有定义冲突处理流程。

**决定**: 保持现状。tasks.md 已定义 file ownership，engineer 遵守规则即可。如果真的冲突，git 会检测到，leader 手动处理。

### Issue #13: 缺少估算机制

**优先级**: P3
**状态**: 无需处理
**发现时间**: 2026-03-18

**问题描述**:
没有 effort 估算，leader 难以判断是否需要并行工程师。

**决定**: 保持现状。Leader 根据任务复杂度自行判断，或在 member 报告中获取建议。

### Issue #14: Artifact 一致性风险

**优先级**: P3
**状态**: 无需处理
**发现时间**: 2026-03-18

**问题描述**:
流式迭代允许 Engineer 实现时更新 artifacts，但可能导致 artifacts 与代码不一致、tasks.md checkbox 状态与实际不符。

**决定**: 保持现状。`/cctm:verify` 会检查偏差，能捕获问题。

### Issue #15: 跨 Phase 依赖修改

**优先级**: P3
**状态**: 无需处理
**发现时间**: 2026-03-18

**问题描述**:
Phase 1 已归档后，用户要求修改 Phase 1 需求，会影响依赖它的后续 phases。

**决定**: 保持现状。复杂场景，让 leader 根据具体情况决定。强行规定反而限制灵活性。

### Issue #16: Leader 瓶颈

**优先级**: P3
**状态**: 无需处理
**发现时间**: 2026-03-18

**问题描述**:
所有协调都经过 leader，并行多个 engineer 时可能成为瓶颈。

**决定**: 保持现状。Executor-Driven 模式已简化 leader 负担（member 报告 + 建议，leader 只执行）。瓶颈是设计权衡，换来的是流程可控。

### Issue #5: `/cctm:new` 权限限制

**优先级**: P2
**状态**: ✅ 已解决
**发现时间**: 2026-03-18

**问题描述**:
`/cctm:new` 没有限制，architect 或 engineer 理论上可以创建新 change 目录。

**解决方案**:
在 `cctm-new/SKILL.md` 中添加权限表，明确只有 requirements-analyst 和 leader 可以使用。

---

## 已解决问题

### Issue #10: 文档不一致性修复

**解决时间**: 2026-03-18

**问题描述**:
多处文档存在不一致或冗余：

1. `create.md` 步骤5要求立即 spawn agents，与新流程（按需 spawn）矛盾
2. `requirements-analyst.md`、`architect.md`、`engineer.md` 有空的 `## Question Routing` 标题
3. `engineer.md` 有完整的 Question Routing 表，但其他两个文件没有

**解决方案**:
1. 更新 USAGE.md 中的错误描述
2. 恢复所有 agent 的 Question Routing 表，确保每个 agent 知道问题该找谁：
   - requirements-analyst: 技术→architect，方向→leader
   - architect: 需求→requirements-analyst，方向→leader
   - engineer: 需求→requirements-analyst，技术→architect，方向→leader
3. 简化 commands 文件作为入口，指向 skills 获取详情

### Issue #17: USAGE.md 过时

**优先级**: P0
**状态**: ✅ 已解决
**发现时间**: 2026-03-18

**问题描述**:
USAGE.md 多处描述与新流程不一致：
- 行90, 116: engineer 归档 → 应为 architect 归档
- 角色"启动时待命" vs "按需启动" 描述不一致

**解决方案**:
更新所有不一致的描述，确保与当前流程一致。requirements-analyst 改为"启动时待命"（Issue #18）。

### Issue #18: 团队启动时默认成员

**优先级**: P0
**状态**: ✅ 已解决
**发现时间**: 2026-03-19

**问题描述**:
团队创建时没有默认启动任何成员，导致"团队启动不成功"。用户需要手动启动 requirements-analyst 才能开始工作。

**解决方案**:
修改默认行为：`/cctm:create` 时自动 spawn `requirements-analyst` 并保持待命，用户可以立即提出需求。

| Agent | 原流程 | 新流程 |
|-------|--------|--------|
| requirements-analyst | 按需 spawn | 启动时 spawn，保持待命 |
| architect | 按需 spawn | 保持不变 |
| engineer | 按需 spawn | 保持不变 |

### Issue #19: Phase 执行流程问题

**优先级**: P0
**状态**: ✅ 已解决
**发现时间**: 2026-03-19

**问题描述**:
实际执行时架构师可能一次性做所有 phase 的 design/task，而不是逐个 phase 执行。这导致上下文溢出。

**用户预期**:
- 每个 phase 是独立的"小团体"（architect + engineer）
- Phase 完成后该团体 shutdown
- 下一个 phase 启动全新的 architect（全新上下文）

**解决方案**:
1. 在 WORKFLOW.md 中强调"逐个 phase 执行，每个 phase 独立实例"
2. 在 architect.md 和 engineer.md 中明确：
   - 只负责当前 phase，不做其他 phase
   - 必须在 archive 后 shutdown
   - 禁止跨 phase 引用 artifacts
3. 在 leader.md 中明确 spawn 时需要告诉 agent 是哪个 phase

| Agent | 原流程 | 新流程 |
|-------|--------|--------|
| architect | 按"需求"spawn | **明确指定 phase name**，该 phase 完成后 shutdown |
| engineer | 按"需求"spawn | **明确指定 phase name**，与 architect 绑定为 phase team |

### Issue #8: Agent 生命周期与上下文管理

**解决时间**: 2026-03-18

**更新时间**: 2026-03-19

**问题描述**:
原流程在 `/cctm:create` 时就 spawn requirements-analyst 和 architect 并全程待命，会导致上下文累积。

**解决方案**:
修改为按需 spawn，用完 shutdown（后因 Issue #18 调整 requirements-analyst 为启动时 spawn）：

| Agent | 原流程 | 调整后流程 |
|-------|--------|-----------|
| requirements-analyst | 启动时 spawn，全程待命 | **启动时 spawn，全程待命**（Issue #18 恢复） |
| architect | 启动时 spawn，全程待命 | 每阶段 spawn，归档后 shutdown |
| engineer | 按需 spawn | **每阶段 spawn，归档后 shutdown**（Issue #19 调整） |

**新增流程**:
- architect 负责 review engineer 的实现
- architect 负责 /cctm:archive（原为 engineer）
- 每个 phase 结束后 architect 和 engineer 都 shutdown

### Issue #7: 安装时自动复制 CCTM Schema

**解决时间**: 2026-03-18

**问题描述**:
`cctm init` 会自动安装 OpenSpec，但不会把 `schemas/cctm/` 复制到项目的 `openspec/schemas/cctm/`。

**解决方案**:
修改 `src/index.ts` 和 `src/utils.ts`，在 `runInit` 中添加复制 schema 的步骤：
- 源: `schemas/cctm/`
- 目标: `openspec/schemas/cctm/`

### Issue #6: 命令权限表

**解决时间**: 2026-03-18

为所有 CCTM 命令添加了权限表：

| 命令 | requirements-analyst | architect | engineer | leader |
|------|:--------------------:|:---------:|:--------:|:------:|
| `/cctm:new` | ✅ | ❌ | ❌ | ✅ |
| `/cctm:continue` | ✅ | ✅ | ❌ | ✅ |
| `/cctm:apply` | ❌ | ❌ | ✅ | ✅ |
| `/cctm:verify` | ❌ | ❌ | ✅ | ✅ |
| `/cctm:archive` | ❌ | ❌ | ✅ | ✅ |

### Issue #5: `/cctm:new` 权限限制

**解决时间**: 2026-03-18

在 `cctm-new/SKILL.md` 中添加了权限限制表：
- requirements-analyst: ✅ 可用
- leader: ✅ 可用
- architect: ❌ 不可用
- engineer: ❌ 不可用