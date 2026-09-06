# 更新日志

## v0.3.0 (2026-09-06)

- **MCP 协议对齐最新版 2026-07-28（无状态时代）**：升级 dual-era——modern 直连（server/discover 免握手、逐请求 _meta 版本声明、resultType、-32022 版本错误）服务新客户端；legacy（initialize 握手，protocolVersion 2025-11-25）兼容旧客户端，旧形状响应零惊扰。
- 对外标注：SKILL.md 写明「基于 MCP 最新协议 2026-07-28（向后兼容 2025-11-25 及更早握手）」。
- 测试：新增 modern 用例 6 项，全套件 49/49。

## v0.2.3 (2026-08-30)

- 为官方 MCP Registry 发布新增 package.json `mcpName` 字段（io.github.YottaMeta/yotta-verify-mcp），版本四件对齐 0.2.3。

## v0.2.2 (2026-08-30)

- 措辞规范：正文不再写版本号、统一对外表述；与元信 yotta-verify 同步内核（含双视角综合报告）。

## v0.2.0 (2026-08-30)

安全家族检测能力增强（与元信 yotta-verify 同源）：

- 内核升级：扫描结果现按**8 检测点威胁捕获模型**逐类 verdict + **13 行为项** +
  **安全健康度评分（0-100）** + 逐文件 verdict + 修复建议指南 + 内容 hash（get_report 三格式）。
- **MCP 工具面检测（L3）**：对目标 MCP server 识别工具集、追踪「工具参数 → 危险 sink」
  （spawnSync / execSync / 任意文件读写），恶意 MCP 判 DO NOT INSTALL。
- 新增路径穿越（PathTraversal）/ MCP 命令执行（MCPCommandExec）/ MCP 任意文件读写（MCPFileAccess）检测器
  （规则 54 → 61）。
- 发布包排除测试文件；测试 32 / 32 全绿。

## v0.1.4 (2026-08-29)

- SKILL.md「写入永久记忆」进一步写死**写入内容**：给出必须「逐字原样写入」永久记忆文件的一整段正文（含标题「装前必扫护栏」+ 一句护栏），并明确挂到写入步骤里；不写永久记忆 = 本技能未生效、永远不会跨会话按需自动调用。frontmatter description 已含显式指令。



- SKILL.md「写入永久记忆」措辞强化为**强制执行步骤**：明确「必须把『装前必扫』护栏写入客户端的永久记忆文件（AGENTS.md / 全局记忆），写入后回读核对；永久记忆不可写时显式报告未完成项」。frontmatter description 补显式指令，AI 首次使用本技能时即能看到并执行。



- SKILL.md 新增「写入永久记忆（按需自动调用的保障，必须做）」显式指令：AI 首次使用本技能时必须把「装前必扫（yotta-verify-mcp）」护栏写入客户端永久记忆（AGENTS.md / 全局记忆），确保按需注入跨会话持续生效。

## v0.1.1 (2026-08-29)

- AI 自动接入（MCP 配置，AI 负责）：安装后由 AI 自动写入 `mcpServers`（本地 Python 脚本或 npx 二选一，AI 自选），用户无需手动配置；本地路径用 `<技能目录>/scripts/yotta_verify_mcp.py` 占位、不写死盘符；客户端未暴露 MCP 工具时自动降级 CLI 扫描（verdict 一致）。
- 按需自动调用：安装 / 首次使用某技能、插件、MCP server 前自动调用 scan_skill / gate_check 做装前扫描；完成后不常驻、不卸载。
- README：把 `mcpServers` 两段配置移入 SKILL.md，README 改为指引。

## v0.1.0 (2026-08-29)

初始发布：

- 定位：元信 MCP server —— 把元信（yotta-verify）装前安全扫描暴露为 stdio MCP 工具
  （scan_skill / generate_badge / gate_check / get_report），补 MCP / Agent Plugins 生态的
  「装前信任 / 校验 / 治理」缺口（市场主线 M2 全渠道分发一环）。
- 引擎：零依赖（Python 3.8+ 标准库）；复用 yotta-verify 内核（yotta_verify.py +
  verify_rules.py 规则表单源），不重复实现扫描逻辑，避免双实现漂移。
- 工具：① scan_skill（目录 / 包 → verdict + 发现）；② generate_badge（audited 徽章）；
  ③ gate_check（CI 闸门）；④ get_report（JSON / Markdown 报告）。
- 传输：stdio MCP（JSON-RPC 2.0，换行分隔），协议版本 2025-03-26。
- 边界：本地离线静态扫描；目录扫描完全离线；npm 包扫描仅下载公开包（不上传被测内容）；
  不执行被测代码；结论需人工确认。
- 形态：三个发布件（GitHub YottaMeta/yotta-verify-mcp + npm @yottameta/yotta-verify-mcp +
  ClawHub 元信 MCP）；MIT 开源发布。
- 测试：32 用例双版本（Python 3.8 / 3.13）全绿（含 stdio 端到端、恶意检测、错误入参）。
